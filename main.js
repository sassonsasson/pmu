var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressJWT = require('express-jwt');

var auth = expressJWT({secret: 'SECRET'});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

mongoose.connect('mongodb://localhost/passportjwt');

app.use(express.static('public'));
app.use(express.static('node_modules'));

var LocalStrategy = require('passport-local').Strategy;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function (req, res) {
  res.sendFile(__dirname + '/public/templates/admin.html');
});

var Form = require("./public/form.js");

var form1 = new Form({email: 'gal@gal77.com', company: 'meGusta', subject: 'text', text: 'this is a text'});

form1.save()

console.log(form1)

app.listen(9000);


// app.get('/hello', auth, function (req, res) {
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


// app.post('/login', function(req, res, next){
//   passport.authenticate('login', function(err, user){
//     if(err){ return next(err); }

//     if (user) {
//       return res.json({token: user.generateJWT()});
//     } else {
//       return res.status(401);
//     }
//   })(req, res, next);
// });