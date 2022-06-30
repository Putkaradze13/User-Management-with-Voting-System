const {
  signupService,
  loginService,
  updateService,
  getAllUserService,
  getOneUserService,
  deleteService,
} = require('../service/services');

exports.signup = async (req, res) => {
  try {
    const { first_name, last_name, user_name, role, password } = req.body;
    await signupService(first_name, last_name, user_name, role, password);
    return res
      .status(201)
      .send({ message: `User '${user_name}' successfully registered.` });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const message = await loginService(user_name, password);
    res.status(200).send({ message });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { username } = req.params;
    const { user_name, role } = req.userData;

    const { first_name, last_name, password } = req.body;
    await updateService(
      username,
      first_name,
      last_name,
      password,
      role,
      user_name
    );
    res.status(201).send({ message: 'User information updated!' });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const userList = await getAllUserService(page, limit);

    res.status(200).send({ users: userList });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const { user_name } = req.body;
    const oneUser = await getOneUserService(user_name);

    res.status(200).send({ user: oneUser });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { username } = req.params;
    const { user_name, role } = req.userData;

    await deleteService(username, role, user_name);
    res.status(201).send({ message: `User ${username} has been deleted!` });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};
