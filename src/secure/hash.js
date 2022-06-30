const crypto = require('crypto');
const util = require('util');
const hash = util.promisify(crypto.pbkdf2);

exports.hashing = async (pass, salt) => {
  salt = salt || crypto.randomBytes(16).toString('hex');
  let hashedPass = await hash(pass, salt, 100000, 64, 'sha512');
  hashedPass = hashedPass.toString('hex');

  return { hashedPass, salt };
};
