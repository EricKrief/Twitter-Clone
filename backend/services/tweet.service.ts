const tweetModel = require('../models/schemas.ts').tweetModel;


async function addTweet(user) {
    document = new tweetModel(user);
    await document.save();
}

async function getUserTweets(requestedUserId, accessTokenUserId) {
    const tweets = await tweetModel.find({ userId: requestedUserId });
    return modifyTweetsForClient(accessTokenUserId, tweets);
}


async function getAllTweets(accessTokenUserId) {
    const tweets = await tweetModel.find({});
    return modifyTweetsForClient(accessTokenUserId, tweets);
}

//Data in DB is stored differently than requested in client. This function adjusts for these changes.
async function modifyTweetsForClient(accessTokenUserId, tweets) {
    const modifiedTweets = [];
    //Access token was provided.
    if (accessTokenUserId) {
        tweets.forEach(tweet => {
            modifiedTweets.push({
                _id: tweet._id,
                text: tweet.text,
                userId: tweet.userId,
                username: tweet.username,
                postDate: tweet.postDate,
                stars: tweet.stars,
                //If -1 then user is not in starredBy array, thus the user did not star this post.
                starredByMe: tweet.starredBy.indexOf(accessTokenUserId) !== -1,
                avatarUrl: tweet.avatarUrl
            });
        });
    }
    else {
        //Access token was not provided.
        tweets.forEach(tweet => {
            modifiedTweets.push({
                _id: tweet._id,
                text: tweet.text,
                userId: tweet.userId,
                username: tweet.username,
                postDate: tweet.postDate,
                stars: tweet.stars,
                avatarUrl: tweet.avatarUrl
            });
        });
    }
    return modifiedTweets;
}


async function deleteTweet(tweetId) {
    return await tweetModel.deleteOne({ _id: tweetId });
}


async function getTweetById(tweetId) {
    return await tweetModel.findOne({ _id: tweetId });
}


async function toggleStar(userId, tweetId) {
    const tweet = await tweetModel.findOne({ _id: tweetId });
    if (tweet.starredBy.indexOf(userId) !== -1) {
        return await tweetModel.findOneAndUpdate({ _id: tweetId }, {
            $inc: { stars: -1 },
            $pull: { starredBy: userId }
        }, { new: true });
    }
    else {
        return await tweetModel.findOneAndUpdate({ _id: tweetId }, {
            $inc: { stars: 1 },
            $push: { starredBy: userId }
        }, { new: true });
    }
}


module.exports.addTweet = addTweet;
module.exports.getUserTweets = getUserTweets;
module.exports.getAllTweets = getAllTweets;
module.exports.modifyTweetsForClient = modifyTweetsForClient;
module.exports.getTweetById = getTweetById;
module.exports.deleteTweet = deleteTweet;
module.exports.toggleStar = toggleStar;