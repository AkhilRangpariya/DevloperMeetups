const jwt = require('jsonwebtoken');
const User = require('../model/user')

// authentication of the token middleware
const userAuth = async (req, res, next) => {
    // read teh token from the req cookies  

    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error('Token is not valid!!!!!!');
        }

        const decodedObj = await jwt.verify(token, 'DEV@7meetup');

        // in decodedObj = {_id: '...', isa:'...'}   _id that we hidde and isa is added by jwt
        const { _id } = decodedObj;

        const user = await User.find(_id);
        if (!user) {
            throw new Error('User not found!');
        }

        req.user = user;
        next();
    }
    catch(error) {
        res.status(404).send('ERROR', error.message);
    }
}

module.exports = {
    userAuth,
}