const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');
const http = require('http');

const provider = new Web3.providers.HttpProvider("http://localhost:8545")
const web3 = new Web3(provider);
const asciiToHex = Web3.utils.asciiToHex;


const candidates = [];

do {
candidateName = prompt("Please give candidate name (three candidates)");
candidates.push(candidateName)
} while (candidates.length < 3)


web3.eth.getAccounts().then((accounts) => {
  const code = fs.readFileSync('./voting.sol').toString();
  const compiledCode = solc.compile(code);

  const compiledcontract = compiledCode.contracts[':Voting'];
  const byteCode = compiledcontract.bytecode;
  const abiDefinition = JSON.parse(compiledcontract.interface);

  const VotingContract = new web3.eth.Contract(abiDefinition, {data: byteCode, from: accounts[0], gas: 4700000})

let deployedContract ;

VotingContract.deploy({arguments: [candidates.map(asiiToHex)]})
.send(function (error, transactionHash) {
}).then((result) => {
  deployedContract = result
  deployedContract.setProvider(provider);
  return deployedContract.methods.totalVotesFor(asciiToHex(''))
}



})
