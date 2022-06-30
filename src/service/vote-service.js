const { giveVote, getTotalVote } = require('../DB/vote-repository');

exports.giveVoteService = async (voter, votedFor, vote) => {
  const votedDoc = await giveVote(voter, votedFor, vote);

  return votedDoc;
};

exports.totalVoteService = async (user_name) => {
  const usersVotes = await getTotalVote(user_name);
  const totalVote = usersVotes.reduce(
    (total, curr) => (total += curr.votes),
    0
  );

  return totalVote;
};
