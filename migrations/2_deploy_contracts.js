var Voting = artifacts.require("./Voting.sol");

module.exports = function(deployer) {
  deployer.deploy(Voting, {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"});
};
