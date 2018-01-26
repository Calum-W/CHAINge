const Voting = artifacts.require('./Voting.sol')

contract('Voting', function (accounts) {

  var poll;

  beforeEach('create a Voting contract for each test', async function () {
    candidates = ["Ellie", "Nick", "Joe", "Charles", "Cal", "Vale"];
    poll = await Voting.new(candidates);
    i = Math.floor(Math.random() * candidates.length);
    candidate = candidates[i];
  });

  it('returns true if candidate is valid', async function() {
    assert.equal(await poll.validCandidate("Ellie"), true);
  });

  it('returns false if candidate is invalid', async function() {
    assert.equal(await poll.validCandidate("Fred"), false);
  });

  it('starts with zero votes for each candidate', async function() {
    assert.equal(await poll.totalVotesFor(candidate), 0);
  });

  it('allows a user to register as a voter', async function() {
    var loggedEvent;
    var voter = accounts[0];

    var registration = await poll.registerVoter(voter);
    loggedEvent = registration.logs[0].event;
    assert.equal(loggedEvent, 'Registered', 'Voter not registered')
  });

  it('shows the total number of votes cast for a candidate', async function(){
    await poll.registerVoter(accounts[0]);
    await poll.voteForCandidate(candidate, {from: accounts[0]});
    assert.equal(await poll.totalVotesFor(candidate), 1);
  });

  // it('only allows a voter to vote once ', async function(){
  //   await poll.registerVoter(accounts[0]);
  //   await poll.voteForCandidate(candidate, {from: accounts[0]})
  //   assert.equal(await poll.voterNotVoted(), false);
  // });

})
// it('allows a user to vote for a candidate', async function() {
//   var voter_one = accounts[0];
//   console.log(accounts)
//   console.log(voter_one)
//
//   await poll.voteForCandidate("Ellie", {from: voter_one});
//   console.log(poll.totalVotesFor("Ellie"))
//   assert.equal(poll.totalVotesFor("Ellie"), 1);
// });

// it('makes a vote for a candidate', async function() {})

// it('restricts the voter to one vote', async function() {})
