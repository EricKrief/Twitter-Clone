const userService = require('../services/user.service.ts');
const requestPromise = require('request-promise');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


async function login(req, res) {
    const user = await userService.getUserByCredentials(req.body.email, req.body.password);
    if (!user) {
        return res.status(400).send({ message: 'Incorrect email or password' });
    }
    //Remove password from jwt payload.
    delete user.password;
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET);
    await userService.updateLastLoginDate(user._id);
    res.status(200).send({ token: token, username: user.username });
}

async function register(req, res) {
    const userByEmail = await userService.getUserByEmail(req.body.email);
    //If user was found then email or username is already taken.
    if (userByEmail) {
        const emailTakenErrorMessage = 'Email already taken';
        return res.status(409).send(emailTakenErrorMessage);
    }
    const userByUsername = await userService.getUserByUsername(req.body.username);
    if (userByUsername) {
        const usernameTakenErrorMessage = 'Username already taken';
        return res.status(409).send(usernameTakenErrorMessage);
    }
    //Generate random avatar url and initialize user.
    await requestPromise('https://randomuser.me/api/?inc=picture').then(data => {
        const randomAvatarUrl = JSON.parse(data).results[0].picture.large;
        const user = {
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatarUrl: randomAvatarUrl,
            registrationDate: new Date(Date.now()).toString(),
            lastLoginDate: new Date(Date.now()).toString()
        };
        //Save new user and send response without password.
        userService.registerUser(user);
        delete user.password;
        const token = jwt.sign({ user: user }, process.env.JWT_SECRET);
        res.status(201).send({ user, token });
    }).catch(error => res.status(400).send(error));
}

module.exports.login = login;
module.exports.register = register;