const { giveVote, getVotes } = require('../controller/vote-controller');
const { jwtAuth } = require('../middleware/jwt-auth');
const { isValid } = require('../middleware/vote-validation');

exports.voteRouter = (app) => {
  app.post('/vote', jwtAuth, isValid, giveVote);
  app.get('/vote/:user_name', getVotes);
};
