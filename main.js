var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

var auth = expressJWT({secret: 'SECRET'});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

mongoose.connect(process.env.MONGOLAB_COPPER_URI || 'mongodb://localhost/pme');

app.use(express.static('public'));
app.use(express.static('node_modules'));

var LocalStrategy = require('passport-local').Strategy;

app.get('/admin', function (req, res) {
  
  Form.find().exec(function(err, rel){
    res.json(rel)
  })

});

app.get('/register', function (req, res) {
  res.sendFile(__dirname + '/register.html');
});

app.put('/update', function(req,res){
  Form.findOneAndUpdate({"nick": "lemon"},{$inc:{"pushUp":1}}, function(err, doc){
      // user.pushUps += amount
      if(err){
          console.log("Something wrong when updating data!");
      }

      console.log(doc);
  });
})

var Form = require("./public/form.js");
var User = require("./public/user.js");

// var form1 = new Form({email: 'gal@gal77.com', company: 'meGusta', subject: 'text', text: 'this is a text'});

app.post('/admin',function(req,res){
  var newForm = new Form(req.body);
  
  newForm.save();
//respond back
  res.end();
})

app.post('/register', function(req, res, next){
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

app.listen(process.env.PORT || '9000');


// app.get('/logged', auth, function (req, res) {
//   res.json(req.user);
// });
//   passport.use('login', new LocalStrategy(function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }

//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }

//       return done(null, user);
//     });
//   }
// ));