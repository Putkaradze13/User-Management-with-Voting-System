const {
  findByUsername,
  findVoter,
  withdrawVote,
  changeVote,
} = require('../DB/vote-repository');

exports.isValid = async (req, res, next) => {
  try {
    const { user_name: voterUser } = req.userData;
    const { votedFor: votedForUser, vote } = req.body;

    const userExists = await findByUsername(votedForUser);

    const date = Date.now();
    const users = await findVoter(req.userData.user_name);

    const index = users.findIndex((user) => user.votedFor === votedForUser);

    if (voterUser === votedForUser) {
      return res
        .status(400)
        .send({ error: { message: "You can't vote for yourself." } });
    }
    if (!userExists) {
      return res.status(400).send({
        error: { message: `User '${votedForUser}' is not registered.` },
      });
    }
    if (users.length > 0 && date + 3600000 > users[0].date) {
      return res
        .status(400)
        .send({ error: { message: "You can't vote twice in an hour" } });
    }
    if ((index !== -1 && vote === '1') || (index !== -1 && vote === '-1')) {
      return res.status(400).send({
        error: { message: `You can't vote twice for the same user.` },
      });
    }

    if (
      (index === -1 && vote === 'withdraw') ||
      (index === -1 && vote === 'change')
    ) {
      return res.status(400).send({
        error: { message: `You must vote first.` },
      });
    }
    if (vote === 'withdraw') {
      await withdrawVote(voterUser, votedForUser);
      return res.status(200).send({
        message: `Vote withdrawed.`,
      });
    }
    if (vote === 'change') {
      await changeVote(voterUser, votedForUser);

      return res.status(200).send({
        message: `Vote changed.`,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
