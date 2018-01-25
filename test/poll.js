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

  it('shows accurate number of votes cast for a candidate', function() {
    var currentElection;
    i = Math.floor(Math.random() * candidates.length)
    candidate = candidates[i]

    return Voting.new(candidates).then(function(instance) {
      currentElection = instance;
      return instance.registerVoter(accounts[0]);
    }).then(function(result) {
      return currentElection.voteForCandidate(candidate);
    }).then(function() {
      return currentElection.totalVotesFor(candidate);
    }).then(function(votes) {
      assert.equal(votes.toNumber(), 1, 'Cannot find cast votes for candidate')
    });
  });
});
