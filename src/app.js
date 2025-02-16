const express = require('express');
const { connectDB } = require("./config/database");
const { user: User } = require('./model/user');
const app = express();

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

    // creating a new instance of the user model
    const userData = new User(req.body);

    try{
        await userData.save();
        console.log("user added successfully!");
        res.send("user added successfully!");
    }
    catch{
        console.log("Error saving the user:");
        res.status(400).send("Error saving the user:");
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
})
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
})


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