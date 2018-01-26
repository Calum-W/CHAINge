web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
asciiToHex = Web3.utils.asciiToHex
contractInstance = new web3.eth.Contract(ABI_DEFINITION, CONTRACT_ADDRESS);
// VotingContract = web3.eth.contract(ABI_DEFINITION)
// contractInstance = VotingContract.at(CONTRACT_ADDRESS)
console.log(contractInstance)

accounts = web3.eth.getAccounts()


// var accounts = accountsObj._rejectionHandler0
console.log(accounts)

// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate", "type":"bytes32"}], "name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}], "payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}], "name":"validCandidate","outputs":[{"name":"", "type":"bool"}], "payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}], "name":"bytes32ToString", "outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"", "type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
// VotingContract = web3.eth.contract(abi);
// // In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
// contractInstance = VotingContract.at('0x9cd95204ab37ff237d5bb701ca7be81653162229');


candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}
validNumber = null

function voteForCandidate() {
  if (validNumber == null) {
    console.log("validNumber is null")
    return
  }

  candidateName = $("#candidate").val();

  accounts
  .then((accounts) => {
    contractInstance.methods.voteForCandidate((asciiToHex(candidateName)).send({from: validNumber}), function() {
      let div_id = candidates[candidateName];
      $("#" + div_id).html(contractInstance.methods.totalVotesFor(asciiToHex(candidateName)).call());
      alert("Your vote has been submitted")
    });
  })
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.methods.totalVotesFor(asciiToHex(name)).call()
    $("#" + candidates[name]).html(val);
  }
});

$("#account-number-submit").click(function() {
  enteredNumber = document.getElementById("account-number").value
  enterAccountNumber(enteredNumber);

})

function enterAccountNumber(enteredNumber) {
console.log(accounts)
accounts
.then((accounts) => {
      for(var i=0; i < accounts.length; i++) {
        if (accounts[i] == enteredNumber) {
          validNumber = accounts[i];
          console.log(i)
          console.log("validNumber = " + validNumber)
          console.log("contractInstance = " + contractInstance)
          contractInstance.methods.registerVoter(asciiToHex(validNumber), {from: validNumber});
        }
      }
      if (validNumber == null) {
        alert("That's not a valid account number");
      }
      })
}
