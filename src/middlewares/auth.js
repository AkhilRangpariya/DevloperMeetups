const jwt = require('jsonwebtoken');
const User = require('../model/user')

const userAuth = async (req, res, next) => {
    // read teh token from the req cookies  

    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error('Token is not valid!!!!!!');
        }

        const decodedObj = await jwt.verify(token, 'DEV@7meetup');

        const {_id} = decodedObj;

        const user = await User.find(_id);
        if(!user){
            throw new Error('User not found!');
        }

        req.user = user;
        next(); 
    }
    catch{
        res.status(404).send('ERROR', err.message);
    }
}

module.exports = {
    userAuth,
}