const router = require('express').Router();
const authController = require('../controller/auth.controller.ts');
const validateUserCredentials = require('../middleware/validation.ts');

router.post('/register', validateUserCredentials, authController.register);

router.post('/login', authController.login);



module.exports = router;