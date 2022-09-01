const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    })
})

app.post('/api/posts', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretKey', (err, authData) => {
       if(err){
           res.send(403);
           
       }else {
        res.json({
            message: 'Post created successfully',
            authData: authData
        })
       }
    });
   
})

app.post('/api/login', function(req, res) {
    //Mock User 
    const user = {
        id: 1,
        username: 'abhishek',
        email: 'abhishek@gmail.com'
    }
    jwt.sign({user: user}, {expiresIn: '30s'}, 'secretKey', (err, token) => {
       res.json({
           token: token
       })
    })
})

//Format of Tokem
// Authorization: Bearer <access_token>


//Verify token 

function verifyToken(req, res, next) {
    //Get Auth header value 
    const bearerHeader = req.headers['authorization'];

    //Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        //Split at the space 
        const bearer = bearerHeader.split(' ');
        //Get token from array 

        const bearerToken = bearer[1];
        //set the toekn
        req.token = bearerToken;

        //Next middleware 
        next();

    }else {
        //Forbidden 
        res.sendStatus(403);
    }

}
app.listen(5000, () => { console.log('Server started on port 5000')})