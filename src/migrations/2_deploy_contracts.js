var JobRegistration = artifacts.require("./JobRegistration.sol");
var ST = artifacts.require("./HumanStandardToken.sol");
var ar = artifacts.require("./HumanStandardToken.sol");

module.exports = function(deployer) {
  deployer.deploy(JobRegistration).then(function() {
    return deployer.deploy(ST, 200, "sss", 3, "sym")
  }).then(function() {
    return deployer.deploy(ar);
  });
};
