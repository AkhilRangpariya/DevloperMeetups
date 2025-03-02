const express = require('express');
const { user: User } = require('../model/user');
const { userAuth } = require('../middlewares/auth');

const profileRouter = express.Router();

profileRouter.get('/profile', userAuth, async (req, res) => {
    try {
        // TODO: validate the cookies
        // need library for read the cookies (called cookies parcer)

        // const cookies = req.cookies;

        // const {token} = cookies;

        // if(!token){
        //     throw new Error('Please login again!');
        // }
        // // validate(verify) my token 
        // const decodedMessage = await jwt.verify(token, 'DEV@7meetup');

        // const { _id } = decodedMessage;

        // console.log(cookies);

        // const user = await User.find(_id);
        // if(!user){
        //     throw new Error('Please login again! something get wrong')
        // }

        // req.user is alrady passed from the userAuth middleware function 
        const user = req.user;
        res.send(user);
    }
    catch (error) {
        res.status(400).send('Invalid tokens ' + error.message)
    }
})

module.exports = profileRouter;