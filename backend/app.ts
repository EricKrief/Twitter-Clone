const express = require('express');
const cors = require('cors');
const membersRouter = require('./routes/members.ts');
const tweetRouter = require('./routes/tweets.ts');
const authRouter = require('./routes/auth.ts');
const connectToDataBase = require('./utils/connection.ts');
const errorHandler = require('./middleware/errors.ts');


const app = express();
require('dotenv').config();
connectToDataBase();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/members', membersRouter);
app.use('/api/tweets', tweetRouter);
app.use('/api/auth', authRouter);
app.use(errorHandler);


module.exports = app;