const mongoose = require('mongoose');
const logger = require('../log/logger');

exports.connectToDB = async (url) => {
  mongoose.connect(url, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on('error', (error) => logger.error(error));
  db.once('open', () => logger.info('Connected to Database'));
};
