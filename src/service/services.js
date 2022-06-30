require('dotenv').config();
const { hashing } = require('../secure/hash');
const {
  checkUsers,
  createUser,
  updateUser,
  findAllUsers,
  findOneUser,
  deleteUser,
} = require('../DB/user-repository');
const jwt = require('jsonwebtoken');

exports.signupService = async (
  first_name,
  last_name,
  user_name,
  role,
  password
) => {
  const userExists = await checkUsers(user_name);

  if (userExists) {
    throw new Error(`User '${user_name}' already exists.`);
  }

  await createUser(first_name, last_name, user_name, role, password);
};

exports.loginService = async (user_name, password) => {
  const userExists = await checkUsers(user_name);

  if (user_name.length < 1 || password.length < 1) {
    throw new Error(`Please input username and password!`);
  }

  if (!userExists) {
    throw new Error(`User '${user_name}' doesn't exist.`);
  }

  if (userExists.deleted === true) {
    throw new Error(`User '${user_name}' is deleted.`);
  }

  const salt = userExists.salt;
  const userPassword = await hashing(password, salt);

  if (userPassword.hashedPass !== userExists.password) {
    throw new Error(`Invalid username or password!`);
  }
  return jwt.sign({ user_name, role: userExists.role }, process.env.JWT_KEY, {
    expiresIn: '24h',
  });
};

exports.updateService = async (
  user_name,
  first_name,
  last_name,
  password,
  role,
  username
) => {
  if (!password) {
    throw new Error('Please, provide password.');
  }

  if (role !== 'admin' && username !== user_name) {
    throw new Error('Not allowed');
  }

  return await updateUser(user_name, first_name, last_name, password);
};

exports.getAllUserService = async (page, limit) => {
  return findAllUsers(parseInt(page), parseInt(limit));
};

exports.getOneUserService = async (user_name) => {
  const userExists = await checkUsers(user_name);

  if (!userExists) {
    throw new Error(`User '${user_name}' doesn't exist.`);
  }
  if (userExists.deketed === true) {
    throw new Error(`User '${user_name}' is deleted`);
  }

  return findOneUser(user_name);
};

exports.deleteService = async (user_name, role, username) => {
  await checkUsers(user_name);

  if (role !== 'admin' && username !== user_name) {
    throw new Error('Not allowed');
  }

  return deleteUser(user_name);
};
