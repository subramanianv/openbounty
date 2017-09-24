var JobRegistration = artifacts.require("./JobRegistration.sol");
var ST = artifacts.require("./HumanStandardToken.sol");
var JobTrackerOracle = artifacts.require('./JobTrackerOracle.sol');

module.exports = function(deployer) {
  deployer.deploy(JobRegistration)
};
