
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"registerVoter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voters","outputs":[{"name":"voted","type":"bool"},{"name":"registered","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"voter","type":"address"}],"name":"Registered","type":"event"}]')
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0xd3bcb506ae613205889af5b39c7f5c736b32f66f');
candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"};
validNumber = null

function voteForCandidate() {
  if (validNumber == null) {
    console.log("validNumber is null")
    return
  }
  candidateName = $("#candidate").val();
  contractInstance.voteForCandidate(candidateName, {from: validNumber}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
    alert("Your vote has been submitted")
  });
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
  }
});

$("#account-number-submit").click(function() {
  enteredNumber = document.getElementById("account-number").value
  enterAccountNumber(enteredNumber);
})

function enterAccountNumber(enteredNumber) {

      for(var i=0; i < web3.eth.accounts.length; i++) {
        if (web3.eth.accounts[i] == enteredNumber) {
          validNumber = web3.eth.accounts[i];
          console.log(i)
          console.log("validNumber = " + validNumber)
          console.log("contractInstance = " + contractInstance)
          contractInstance.registerVoter(validNumber, {from: validNumber});
        }
      }
      if (validNumber == null) {
        alert("That's not a valid account number");
      }
}
