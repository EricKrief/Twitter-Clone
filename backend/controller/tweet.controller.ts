const tweetService = require('../services/tweet.service.ts');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


async function addTweet(req, res) {
    if (req.body.text.length === 0 || req.body.length > 240) {
        const tweetNumberOfCharactersError = 'Tweet content must be between 1 and 240 characters';
        return res.status(400).send(tweetNumberOfCharactersError);
    }
    const user = req.decodedToken.user;
    const newTweet = {
        _id: new mongoose.Types.ObjectId(),
        text: req.body.text,
        userId: user._id,
        username: user.username,
        postDate: new Date(Date.now()).toString(),
        stars: 0,
        avatarUrl: user.avatarUrl,
        starredBy: []
    }
    tweetService.addTweet(newTweet);
    //StarredBy is not requested to be part of the respone, but is necessary in DB.
    delete newTweet.starredBy;
    res.status(201).send(newTweet);
}


async function getAllTweets(req, res) {
    let tweets = [];
    try {
        const decodedToken = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        tweets = await tweetService.getAllTweets(decodedToken.user._id);
    }
    catch (error) {
        tweets = await tweetService.getAllTweets(null);
    }
    return res.status(200).send(tweets);
}


async function deleteTweet(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        const idFormatError = 'Invalid id format';
        return res.status(400).send(idFormatError);
    }
    const userId = req.decodedToken.user._id;
    const tweet = await tweetService.getTweetById(req.params.id);
    if (!tweet) {
        const tweetNotFoundError = `Tweet with id ${req.params.id} was not found`;
        return res.status(404).send(tweetNotFoundError);
    }
    if (tweet.userId !== userId) {
        const notOwnerError = `You are not the owner of tweet with id ${req.params.id}`;
        return res.status(403).send(notOwnerError);
    }
    await tweetService.deleteTweet(tweet.id);
    res.sendStatus(204);
}


async function toggleStar(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        const idFormatError = 'Invalid id format';
        return res.status(400).send(idFormatError);
    }
    const userId = req.decodedToken.user._id;
    const tweet = await tweetService.getTweetById(req.params.id);
    if (!tweet) {
        const tweetNotFoundError = `Tweet with id ${req.params.id} was not found`;
        return res.status(404).send(tweetNotFoundError);
    }
    const newTweet = await tweetService.toggleStar(userId, tweet.id);
    res.status(200).send({ stars: newTweet.stars, starredByMe: newTweet.starredBy.indexOf(userId) !== -1 })
}



module.exports.addTweet = addTweet;
module.exports.getAllTweets = getAllTweets;
module.exports.deleteTweet = deleteTweet;
module.exports.toggleStar = toggleStar;