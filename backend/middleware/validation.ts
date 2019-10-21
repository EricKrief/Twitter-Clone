const joi = require('joi');
const minPasswordLength = 8;

const emailSchema = joi.object({
    email: joi.string().email().required()
}).required();

const usernameSchema = joi.object({
    username: joi.string().required()
}).required();

const passwordSchema = joi.object({
    password: joi.string().min(minPasswordLength).regex(/(?=.*\d)(?=.*[A-Z])/).required()
}).required();


function validateUserCredentials(req, res, next) {
    const emailError = vaildateEmail(req.body.email);
    if (emailError) {
        return next(emailError);
    }
    const usernameError = vaildateUsername(req.body.username);
    if (usernameError) {
        return next(usernameError);
    }
    const passwordError = vaildatePassword(req.body.password);
    if (passwordError) {
        return next(passwordError);
    }
    next();
}


function vaildateEmail(email) {
    const emailObject = { email: email };
    const result = emailSchema.validate(emailObject);
    if (result.error) {
        const error = 'Email is invalid';
        return error;
    }
    else {
        return null;
    }
}


function vaildateUsername(username) {
    const usernameObject = { username: username };
    const result = usernameSchema.validate(usernameObject);
    if (result.error) {
        const error = 'Username is required';
        return error;
    }
    else {
        return null;
    }
}

function vaildatePassword(password) {
    const passwordObject = { password: password };
    const result = passwordSchema.validate(passwordObject);
    if (result.error) {
        const error = 'Password must be at least 8 characters and contain 1 capital letter and 1 number';
        return error;
    }
    else {
        return null;
    }
}



module.exports = validateUserCredentials;