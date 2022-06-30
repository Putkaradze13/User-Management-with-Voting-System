const {
  signup,
  login,
  update,
  getAllUsers,
  getOneUser,
  deleteUser,
} = require('../controller/controllers');
const { isUnmodified } = require('../middleware/is-unmodified');
const { jwtAuth } = require('../middleware/jwt-auth');

exports.router = (app) => {
  app.post('/signup', signup);
  app.post('/login', login);
  app.put('/update/:username', jwtAuth, isUnmodified, update);
  app.get('/getAllUsers', getAllUsers);
  app.get('/getOneUser', getOneUser);
  app.delete('/deleteUser/:username', jwtAuth, deleteUser);
};
