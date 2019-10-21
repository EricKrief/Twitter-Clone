const userModel = require('../models/schemas.ts').userModel;


async function getUserById(id) {
    return await userModel.findById(id).exec();
}

async function getUserByCredentials(email, password) {
    return await userModel.findOne({ email: email, password: password });
}

async function getUserByEmail(email) {
    return await userModel.findOne({ email: email });
}

async function getUserByUsername(username) {
    return await userModel.findOne({ username: username });
}

async function registerUser(user) {
    document = new userModel(user);
    await document.save();
}

async function updateLastLoginDate(userId) {
    return await userModel.findOneAndUpdate({ _id: userId }, {
        $set: { lastLoginDate: new Date(Date.now()).toString() }
    });
}


module.exports.getUserById = getUserById;
module.exports.getUserByCredentials = getUserByCredentials;
module.exports.getUserByEmail = getUserByEmail;
module.exports.registerUser = registerUser;
module.exports.getUserByUsername = getUserByUsername;
module.exports.updateLastLoginDate = updateLastLoginDate;