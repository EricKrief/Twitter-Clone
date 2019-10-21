const router = require('express').Router();
const userController = require('../controller/user.controller.ts');


router.get('/:id', userController.getUserById);

//this is an extra route that was not required in the exercise. (I needed a route to get user by username).
router.post('/', userController.getUserByUsername);

router.get('/:id/tweets', userController.getUserTweets);




module.exports = router;
