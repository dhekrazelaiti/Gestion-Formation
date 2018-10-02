var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var bcrypt = require('bcrypt-nodejs');
var app = express();
var jwt = require ('jwt-simple');

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!!!!!!!!');
});

app.post('/register', (req,res)=>{
  var userData = req.body;
  console.log(userData.email);
  console.log(userData.password);
  console.log(userData.username);

  var user = new User(userData);
  user.save((err, result) => {
      if (err)
          console.log('saving user error');

          res.sendStatus(200);
  });
});
app.post('/login', async(req, res)=> {

   var loginData = req.body;
   console.log("****login Data:",loginData);

   var user = await User.findOne({email : loginData.email});
   console.log("****login Data 2*****:",loginData);
    
   if(!user)
        return res.status(401).send({message: 'Email or Password invalid'})

    bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
        if(!isMatch)
          return res.status(401).send({message : "Password is invalid"});

        var payload = {};

        var token = jwt.encode(payload, '123');
        
         res.status(200).send({token : token});
         console.log("***************",token)
      });
   });

mongoose.connect('mongodb://admin:admin2018@ds245170.mlab.com:45170/gestion_formation', { useNewUrlParser: true }, (err) => {
    if(!err)
        console.log('connected to mongo')
})

app.listen(3000);