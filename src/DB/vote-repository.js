const voterSchema = require('../model/voter-schema');
const userSchema = require('../model/user-schema');
const { checkUsers } = require('./user-repository');

exports.giveVote = async (voter, votedFor, votes) => {
  const user = await checkUsers(votedFor);
  const newRating = user.rating + Number(votes);
  await userSchema.findOneAndUpdate(
    { user_name: votedFor },
    { rating: newRating }
  );
  return voterSchema.create({ voter, votedFor, votes });
};

exports.getTotalVote = async (user_name) => {
  return voterSchema.find({ votedFor: user_name });
};

exports.findByUsername = async (user_name) => {
  return checkUsers(user_name);
};

exports.findVoter = async (voter) => {
  return voterSchema.find({ voter });
};

exports.withdrawVote = async (voterUser, votedForUser) => {
  return await voterSchema
    .where('voter')
    .equals(voterUser)
    .where('votedFor')
    .equals(votedForUser)
    .deleteOne();
};

exports.changeVote = async (voterUser, votedForUser) => {
  const user = await voterSchema
    .where('voter')
    .equals(voterUser)
    .where('votedFor')
    .equals(votedForUser);
  if (user[0].votes !== 0) {
    const newVote = user[0].votes * -1;

    return await voterSchema
      .where('voter')
      .equals(voterUser)
      .where('votedFor')
      .equals(votedForUser)
      .updateOne({ votes: newVote });
  }
  return await voterSchema
    .where('voter')
    .equals(voterUser)
    .where('votedFor')
    .equals(votedForUser)
    .updateOne({ votes: 1 });
};
