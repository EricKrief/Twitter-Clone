const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    avatarUrl: String,
    registrationDate: String,
    lastLoginDate: String
});

const tweetSchema = new mongoose.Schema({
    text: String,
    userId: String,
    username: String,
    postDate: String,
    stars: Number,
    avatarUrl: String,
    starredBy: [{ type: mongoose.Types.ObjectId }]
});


module.exports.userModel = mongoose.model('user', userSchema);
module.exports.tweetModel = mongoose.model('tweet', tweetSchema);
