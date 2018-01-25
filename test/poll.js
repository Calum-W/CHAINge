const Voting = artifacts.require('./Voting.sol')

contract('Voting', function (accounts) {

  var poll;

  beforeEach('create a Voting contract for each test', async function () {
    candidates = ["Ellie", "Nick", "Joe"]
    poll = await Voting.new(candidates);
  });

  it('returns true if candidate is valid', async function() {
    assert.equal(await poll.validCandidate("Ellie"), true);
  });

  it('returns false if candidate is invalid', async function() {
    assert.equal(await poll.validCandidate("Charles"), false);
  });

  it('starts with zero votes for each candidate', async function() {
    i = Math.floor(Math.random() * candidates.length)
    candidate = candidates[i]
    assert.equal(await poll.totalVotesFor(candidate), 0);
  });

  // it('allows a user to vote for a candidate', async function() {
  //   var voter_one = accounts[0];
  //   console.log(accounts)
  //   console.log(voter_one)
  //
  //   await poll.voteForCandidate("Ellie", {from: voter_one});
  //   console.log(poll.totalVotesFor("Ellie"))
  //   assert.equal(poll.totalVotesFor("Ellie"), 1);
  // });

  it("allows a user to register as a voter", function() {
  var currentElection;
  var loggedEvent;

  return Voting.new(candidates).then(function(instance) {
    currentElection = instance;
    return instance.registerVoter(accounts[0]);
  }).then(function(result) {
    loggedEvent = result.logs[0].event;
    assert.equal(loggedEvent, "Registered", 'Voter has not been registered')
  });
});

  // it('initializes with a candidate list', async function() {
  //   console.log(poll)
  //   assert.equal(await poll.candidateList, ["Ellie", "Nick", "Joe"]);
  // });

})

// it('makes a vote for a candidate', async function() {})

// it('restricts the voter to one vote', async function() {})
