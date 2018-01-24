web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate", "type":"bytes32"}], "name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}], "payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}], "name":"validCandidate","outputs":[{"name":"", "type":"bool"}], "payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}], "name":"bytes32ToString", "outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"", "type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0x9cd95204ab37ff237d5bb701ca7be81653162229');
candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

function voteForCandidate() {
  candidateName = $("#candidate").val();
  contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
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

// Votes for a candidate
window.voteForCandidate = function(candidateID) {
  console.log(validNumber);
  try {
    if (validNumber == null) {
      document.getElementById("msg").innerHTML = "You need to be registered to vote.";
    };

    Voting.deployed().then(function(contractInstance) {
      contractInstance.vote(candidateID, {from: validNumber}).then(function(transaction) {
        transactionID = transaction.tx;
        let div_id = candidates[candidateID];
        return contractInstance.getCandidateVotes.call(candidateID).then(function(candidateVote) {
          // alert("Your vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain!")
          document.getElementById(div_id).innerHTML = candidateVote.toString();
          document.getElementById("results-table").style.display = "";
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
}

// Registers a voter as they load a page
window.validate = function() {
  let voterNumber = document.getElementById("account-number").value

  try {
    Voting.deployed().then(function(contractInstance) {
      for(var i=0; i < web3.eth.accounts.length; i++) {
        if (web3.eth.accounts[i] == voterNumber) {
          validNumber = web3.eth.accounts[i]
          contractInstance.registerVoter(web3.eth.accounts[i], { from: web3.eth.accounts[0] }).then(function() {
            return validNumber;
          });
        };
      };
    });
  } catch (err) {
    console.log(err);
  }
}
