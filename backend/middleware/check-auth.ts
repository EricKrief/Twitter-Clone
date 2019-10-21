const jwt = require('jsonwebtoken');




function checkAuthorization(req, res, next) {
    try {
        const token = req.headers.authorization;
        req.decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (error) {
        res.status(401).send('Authorization failed!');
    }

}


module.exports = checkAuthorization;