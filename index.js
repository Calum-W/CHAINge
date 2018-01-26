web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// asciiToHex = Web3.utils.asciiToHex;
contractInstance = new web3.eth.Contract(ABI_DEFINITION, CONTRACT_ADDRESS);

candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}
