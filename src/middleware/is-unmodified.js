const { checkUsers } = require('../DB/user-repository');

const isUnmodified = async (req, res, next) => {
  try {
    const user = await checkUsers(req.userData.user_name);
    if (!user) {
      return res.status(404).send({ error: { message: 'User not found' } });
    }
    const lastModified = Date.parse(user.updatedAt);
    const reqHeaderDate = Date.parse(req.headers['if-unmodified-since']);
    if (reqHeaderDate >= lastModified) {
      return res.status(412).send({ error: { message: 'Cannot modify data' } });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isUnmodified };
