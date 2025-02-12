const express = require('express');

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
// app.get('/user', (req, res) => {
//     console.log(req.query);
//     res.send('user get data sent.');
// })

// request handlers 
// any thigns after the slash all are matched with first route 
// so sequence of code are metter because of this any maching things 
app.use('/', (req, res) => {
    res.send('Hello form the server!');
});
// request handlers 


// '/hello/123' are matched 
// 'hello1233' are not match with below code  
app.use('/hello', (req, res) => {
    res.send('hello route data sent.');
});

app.use('/data', (req, res) => {
    console.log('test route data sent.')
})

