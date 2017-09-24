/*
This Token Contract implements the standard token functionality (https://github.com/ethereum/EIPs/issues/20) as well as the following OPTIONAL extras intended for use by humans.

In other words. This is intended for deployment in something like a Token Factory or Mist wallet, and then used by humans.
Imagine coins, currencies, shares, voting weight, etc.
Machine-based, rapid creation of many tokens would not necessarily need these extra features or will be minted in other manners.

1) Initial Finite Supply (upon creation one specifies how much is minted).
2) In the absence of a token registry: Optional Decimal, Symbol & Name.
3) Optional approveAndCall() functionality to notify a contract if an approval() has occurred.

.*/



pragma solidity ^0.4.8;

contract AddressRegistration {

    mapping(bytes32=>address) public registry;
    function AddressRegistration() {

    }

    function getAddress(bytes32 id) constant returns(address){
      return registry[id];
    }

    function setAddress(bytes32 id) {
      if(registry[id] !=address(0)) {
        require(registry[id] == msg.sender);
        registry[id] = msg.sender;
      }
      else {
        registry[id] = msg.sender;
      }
    }

}
