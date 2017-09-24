pragma solidity ^0.4.4;

import "./SafeMath.sol";
import "./HumanStandardToken.sol";

contract JobTracker is SafeMath {

    address public bountyCreator;
    uint public repoId;
    HumanStandardToken token;
    address public tokenAddress;
    enum requestState {
        Locked,
        Unlocked,
        Accepted
    }
    struct PullRequestStruct {
      uint256 pullRequestID;
      uint bountyTokens;
      requestState bountyState;
    }

    mapping(uint256 => PullRequestStruct) public pullRequests;

    //==========================================
    // CONSTRUCTOR
    //==========================================

    function JobTracker (address _tokenContract, uint _repoID) payable {
        bountyCreator = msg.sender;
        repoId = _repoID;
        token = HumanStandardToken(_tokenContract);
        tokenAddress = _tokenContract;
    }

    function isBountyCreator () constant returns (bool isTrue) {
        if (bountyCreator != msg.sender) return false;
    }

    //==========================================
    // SETTERS
    //==========================================

    function createBounty (uint256 _pullRequestID, uint256 bountyTokens) {
        pullRequests[_pullRequestID].bountyTokens = bountyTokens;
    }

    function acceptWork (uint256 pullRequestID, address bountyHunter)   {
        uint256 bountyTokens = pullRequests[pullRequestID].bountyTokens;
        require(token.transfer(bountyHunter, bountyTokens));
        pullRequests[pullRequestID].bountyState = requestState.Accepted;
    }

    function increaseBounty(uint256 pullRequestID, uint256 newTokens) {
      pullRequests[pullRequestID].bountyTokens = pullRequests[pullRequestID].bountyTokens + newTokens;
    }

    function lockBounty (uint256 pullRequestID) public   {
        pullRequests[pullRequestID].bountyState = requestState.Locked;
    }

    function unlockBounty (uint256 pullRequestID) public {
        pullRequests[pullRequestID].bountyState = requestState.Unlocked;
    }

}
