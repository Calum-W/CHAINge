pragma solidity ^0.4.18;

contract Voting {

  struct Voter {
    bool voted;
    bool registered;
  }

  event Registered(address voter);

  mapping(address => Voter) public voters;

  mapping (bytes32 => uint8) public votesReceived;

  bytes32[] public candidateList;

  function Voting(bytes32[] candidateNames) public {
    candidateList = candidateNames;
  }

  function totalVotesFor(bytes32 candidate) view public returns (uint8) {
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  function voteForCandidate(bytes32 candidate) public registeredVoter {
    Voter storage currentVoter = voters[msg.sender];
    require(!currentVoter.voted);
    require(validCandidate(candidate));

    currentVoter.voted = true;
    votesReceived[candidate] += 1;
  }

  function validCandidate(bytes32 candidate) view public returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }

  function registerVoter(address account) public {
    Voter storage newVoter = voters[account];
    newVoter.registered = true;
    Registered(account);
  }

  modifier registeredVoter() {
    require(voters[msg.sender].registered);
    _;
  }
}
