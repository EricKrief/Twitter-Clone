const userService = require('../services/user.service.ts');
const tweetService = require('../services/tweet.service.ts');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


async function getUserById(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        const idFormatError = 'Invalid id format';
        return res.status(400).send(idFormatError);
    }
    const user = await userService.getUserById(req.params.id);
    if (!user) {
        const userNotFoundError = `User with id ${req.params.id} was not found`;
        return res.status(404).send(userNotFoundError);
    }
    user.password = undefined;
    res.status(200).send(user);
}

async function getUserByUsername(req, res) {
    const user = await userService.getUserByUsername(req.body.username);
    if (!user) {
        const userNotFoundError = `User with username ${req.body.username} was not found`;
        return res.status(404).send(userNotFoundError);
    }
    user.password = undefined;
    res.status(200).send(user);
}

async function getUserTweets(req, res) {
    let tweets = [];
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        const idFormatError = 'Invalid id format';
        return res.status(400).send(idFormatError);
    }
    const user = await userService.getUserById(req.params.id);
    if (!user) {
        const userNotFoundError = `User with id ${req.params.id} was not found`;
        return res.status(404).send(userNotFoundError);
    }
    try {
        const decodedToken = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        tweets = await tweetService.getUserTweets(req.params.id, decodedToken.user._id);
    }
    catch (error) {
        tweets = await tweetService.getUserTweets(req.params.id, null);
    }
    res.status(200).send(tweets);
}



module.exports.getUserById = getUserById;
module.exports.getUserTweets = getUserTweets;
module.exports.getUserByUsername = getUserByUsername;


