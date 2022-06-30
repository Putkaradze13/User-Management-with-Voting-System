require('dotenv').config();
const express = require('express');
const logger = require('./src/log/logger');
const { connectToDB } = require('./src/DB/connectionToDB');
const { router } = require('./src/router/router');
const { voteRouter } = require('./src/router/vote-router');

const { PORT, MDB_URL } = process.env;

connectToDB(MDB_URL);

const app = express();

app.use(express.json());

router(app);
voteRouter(app);

app.listen(PORT, () => logger.info('Server started'));

const shutdown = () => process.exit();

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
