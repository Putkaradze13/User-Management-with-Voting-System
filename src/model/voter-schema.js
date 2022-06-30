const mongoose = require('mongoose');

const VOTE = {
  VOTEUP: 1,
  VOTEDOWN: -1,
};

const voterSchema = new mongoose.Schema({
  voter: {
    type: String,
    registered: true,
    required: true,
  },
  votedFor: {
    type: String,
    registered: true,
    required: true,
  },
  votes: {
    enum: [VOTE.VOTEDOWN, VOTE.VOTEUP],
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Voting', voterSchema);
