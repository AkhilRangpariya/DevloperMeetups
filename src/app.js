const express = require('express');
const { connectDB } = require("./config/database");
const { user: User } = require('./model/user');
const { ReturnDocument } = require('mongodb');
const app = express();
const {validateSignUpData} = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// app.get('/user', (req, res) => {
//     console.log('get user route sent.');
// });

// // e is optinal over her because after e there are ? question mark  => regular expresion are work over here 
// // '/u(se)?r' => now se are optinal '/ur' 
// // '/use+r' => you can as many e as you want '/useeeer
// // '/u*r'   => inmiddle you can add nay thigns and any charactors like 'uafdafsdfasfafsafr'
// // '/a/' => in path route just one a is must 
// //  $ => is end & . => for start 
// app.post('use?r', (req, res) => {
//     // it's route handlers 
//     console.log('post user route sent.');
// });

// //  this req.query => will return the extra add on parameters that pass in api calls
// // for extra reoute or dynamic routes after main rout like '/user/:userId' => it's get using req.params (that after : colon && colon means it's dynamic routes) or '/user/:userId/:password/:name' 



// // app.get('/user', (req, res) => {
// //     console.log(req.query);
// //     res.send('user get data sent.');
// // })

// // request handlers 
// // any thigns after the slash all are matched with first route 
// // so sequence of code are metter because of this any maching things 
// app.use('/', (req, res) => {
//     res.send('Hello form the server!');
// });
// // request handlers 


// // '/hello/123' are matched 
// // 'hello1233' are not match with below code  
// app.use('/hello', (req, res) => {
//     res.send('hello route data sent.');
// });

// // middlewared => before matching the exact routes they match ethe middle ware 
// // mached route => is call lingo also called middle ware

// app.use('/data', (req, res) => {
//     console.log('test route data sent.')
// })

 
// app.listen(7777, () => {
//     console.log("Server is succesfully listening,");
// })



// MIDDLEWARE 
// app.use(() => {
//     // all there route apply this code and move forward
// });
// same as app.use(express.json());
app.use(express.json());
app.use(cookieParser());
// json are convert it into the js object using above express.json() middle ware 



// app.post('/signup', async (req, res) => {
    // const userObj = {
    //     firstName: 'ak',
    //     lastName: 'R',
    //     emailId: 'ak@gmail.com',
    //     password: 'ak@1234',
    //     gender: 'male', 
    // }
//     // creating a new instance of the user model
//     const userData = new user(userObj);

//     try{
//         await userData.save();
//         console.log("user added successfully!");
//         res.send("user added successfully!");
//     }
//     catch{
//         console.log("Error saving the user:");
//         res.status(400).send("Error saving the user:");
//     }
// })

// dynamic user data storing 
app.post('/signup', async (req, res) => {

    // validationn of req
    validateSignUpData(req);

    // Encription of the password 
    const {firstName, lastName, emailId, password} = req.body;

    const passwordHash = bcrypt.hash(password, 10);

    // creating a new instance of the user model
    const userData = new User({firstName, lastName, emailId, password: passwordHash});
  
    try{
        await userData.save();
        console.log("user added successfully!");
        res.send("user added successfully!");
    }
    catch(err){
        console.log("Error saving the user:");
        res.status(400).send("Error occured when saving the user:" + err.message);
    }
});

app.post('/login', async (req, res) => {
    try{
        const {emailId, password} = req.body;

        const user = await User.find({emailId: emailId});
        if(!user){
            throw new Error ('EmailId or Password are Invalid!');
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){
            // create a JWT token
            const token = await jwt.sign({_id: user._Id}, "DEV@7meetup");
            console.log(token);

            // add token to cookie and send the response back to the user
            res.cookie('token', token);

            res.send('Login Successful!');
        }
        else{
            throw new Error("EmailId or Password are Invalid!");    
        }

    }
    catch{
        res.status(400).send("ERROR: " + err.message);
    }
})

app.get('/profile', async(req,res) => {
    try{

        const cookies = req.cookies;
        
        const {token} = cookies;

        if(!token){
            throw new Error('Please login again!');
        }
        // validate my token 
        const decodedMessage = await jwt.verify(token, 'DEV@7meetup');
        
        const { _id } = decodedMessage;
        
        console.log(cookies);

        const user = await User.find(_id);
        if(!user){
            throw new Error('Please login again! something get wrong')
        }  
        res.send(user);
    }
    catch(err){
        res.status(400).send('Invalid tokens ' + err.message)
    }
})

app.get('/user', async (req, res) => {
    const userEmail = req.body.emailId;

    try{
        const users = await User.find({emailId: userEmail});
        if(users.length === 0){
            console.log("no user fond");
            res.status(404).send('User not found');
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        console.log('Something went worng');
        res.status(404).send('Something went wrong');
    }
});
app.get('/feed', async (req, res) => {
    try{
        const users = await User.find({});
        if(users.length === 0){
            console.log("no user fond");
            res.status(404).send('User not found');
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        console.log('Something went worng');
        res.status(404).send('Something went wrong');
    }
});

app.delete('/user', async (req, res) => {
    const userId = req.body.userId;

    try{
        const user = await User.findByIdAndDelete(userId);
        console.log('user found & deleted succesfully');
        res.send('user deleted successfully');
    }
    catch{
        console.log('user not found');
        res.send.status(404).send('Something went worng | user not found');
    }
});

app.patch('/user', async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try{
        const user = await User.findByIdAndUpdate({ _id: userId }, data, { ReturnDocument: " ", runValidators: true, })
        res.send('User update successfully');
    }
    catch(err){
        res.status(400).send('Update Failed'+ err.message );   
    }
});


// devtinder is a database, users is a collection, stored entrys are document
app.get('/', (req, res) => {
    console.log('get call heppen');
    res.send('get call successfully called!');
})
connectDB()
    .then(() => {
        console.log("Database connection establishede :smile:");
        app.listen(7777, () => {
            console.log("Server is succesfully listening,");
        })
    })
    .catch(() => {
        console.log("Database can not be connected!!");
    })