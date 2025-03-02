const express = require('express');
const { userAuth } = require('../middlewares/auth');

const requestRouter = express.Router();


requestRouter.post('/sendconnectionrequest', userAuth, (req, res) => {
    req.send("Sending a connection request");
})

module.exports = requestRouter;