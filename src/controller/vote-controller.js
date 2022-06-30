const {
  giveVoteService,
  totalVoteService,
} = require('../service/vote-service');

exports.giveVote = async (req, res) => {
  try {
    const { user_name: voter } = req.userData;
    const { votedFor, vote } = req.body;

    const message = await giveVoteService(voter, votedFor, vote);
    res.status(200).send({ message });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.getVotes = async (req, res) => {
  try {
    const { user_name } = req.params;
    const message = await totalVoteService(user_name);
    res.send({ message: 'User rating: ' + message });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
