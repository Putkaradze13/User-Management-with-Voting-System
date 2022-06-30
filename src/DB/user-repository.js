const userSchema = require('../model/user-schema');
const { hashing } = require('../secure/hash');

exports.checkUsers = async (user_name) => {
  return await userSchema.findOne({ user_name, deleted: false });
};

exports.createUser = async (
  first_name,
  last_name,
  user_name,
  role,
  password
) => {
  const { hashedPass, salt } = await hashing(password);
  return await userSchema.create({
    first_name,
    last_name,
    user_name,
    role,
    password: hashedPass,
    salt,
  });
};

exports.updateUser = async (
  user_name,
  first_name,
  last_name,
  password,
  userSalt
) => {
  const { hashedPass, salt } = await hashing(password, userSalt);

  return userSchema.findOneAndUpdate(
    { user_name },
    { first_name, last_name, password: hashedPass, salt }
  );
};

exports.findAllUsers = async (page = 0, limit = 10) => {
  return userSchema
    .find()
    .select(['first_name', 'last_name', 'user_name', '-_id'])
    .skip(page)
    .limit(limit);
};

exports.findOneUser = async (user_name) => {
  return userSchema
    .findOne({ user_name })
    .select(['first_name', 'last_name', 'createdAt', 'updatedAt', '-_id']);
};

exports.deleteUser = async (user_name) => {
  return userSchema.delete({ user_name });
};
