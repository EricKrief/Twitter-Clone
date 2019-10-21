const router = require('express').Router();
const tweetController = require('../controller/tweet.controller.ts');
const checkAuthorization = require('../middleware/check-auth.ts');



router.post('/', checkAuthorization, tweetController.addTweet);

router.get('/', tweetController.getAllTweets);

router.delete('/:id', checkAuthorization, tweetController.deleteTweet);

router.post('/:id/star-toggle', checkAuthorization, tweetController.toggleStar);



module.exports = router;