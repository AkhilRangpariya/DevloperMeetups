const express = require('express');
const { user: User } = require('../model/user');
const { validateSignUpData } = require('../utils/validation');
const bcrypt = require('bcrypt');

// const app = express();
// const router = express.Router();

// app.use('/', () => {});
// Router.use('/', () => {});

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {

    // validationn of req
    validateSignUpData(req);

    // Encription of the password 
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = bcrypt.hash(password, 10);

    // creating a new instance of the user model
    const userData = new User({ firstName, lastName, emailId, password: passwordHash });

    try {
        await userData.save();
        console.log("user added successfully!");
        res.send("user added successfully!");
    }
    catch (error) {
        console.log("Error saving the user:");
        res.status(400).send("Error occured when saving the user:" + error.message);
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.find({ emailId: emailId });
        if (!user) {
            throw new Error('EmailId or Password are Invalid!');
        }

        // /offload the logic of make hase comparision
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            // TODO: create a JWT token
            // hidding the user id inside the jwt token 
            // const token = await jwt.sign({_id: user._Id}, "DEV@7meetup", {expiresIn: '1d'});
            // console.log(token);

            // offload the logic of creation of jwt token in schema methods 
            const token = await user.getJWT();

            // add token to cookie and send the response back to the user
            res.cookie('token', token, { expires: new Date(Date.now() + 8 * 3600000) });

            res.send('Login Successful!');
        }
        else {
            throw new Error("EmailId or Password are Invalid!");
        }

    }
    catch(error) {
        res.status(400).send("ERROR: " + error.message);
    }
})

module.exports = authRouter;