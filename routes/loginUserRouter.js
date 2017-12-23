var express = require('express');

var router = express.Router();

var passport = require('passport');

var LoginUser = require('../models/LoginUser');

var Employee = require('../models/employee');

var Verify = require('./verify');



/* GET users listing. */
router.get('/find', function(req, res, next) {

  LoginUser.find({}, function (err, users){
      if(err) throw err;

      res.json(users);
  });
});

router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

  LoginUser.find({}, function (err, users){
      if(err) throw err;

      res.json(users);
  });
});

router.post('/register', function(req, res) {
    LoginUser.register(new LoginUser({ username : req.body.username }),
        req.body.password, function(err, loginUser) {
          console.log('register');
          console.log(req.body.username);
          console.log(req.body.password);
          console.log(err);
        if (err) {
            return res.status(500).json({err: err});
        }
                if(req.body.firstname) {
            loginUser.firstname = req.body.firstname;
        }
        if(req.body.lastname) {
            loginUser.lastname = req.body.lastname;
        }

        if(req.body.role){
          loginUser.role = req.body.role;
        }
                loginUser.save(function(err,loginUser) {
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({status: 'Registration Successful!'});
            });
        });
    });
});



router.post('/login', function(req, res, next) {
	console.log('login found');

  passport.authenticate('local', function(err, loginUser, info) {
    console.log('authenticate');
    console.log(loginUser);
    if (err) {

      return next(err);

    }

    if (!loginUser) {

      return res.status(401).json({

        err: info

      });

    }

    console.log('loginUser');
    console.log(loginUser);

    req.logIn(loginUser, function(err) {

      if (err) {

        console.log('err');
        console.log(err);

        return res.status(500).json({

          err: 'Could not log in user'

        });

      }

        

      var token = Verify.getToken(loginUser);
      console.log('findEmployee');
      Employee.findOne({'loginUser': loginUser._id}, function (err, employees){
        console.log('found');
        if(err) 
          return res.status(500).json({
            err: 'Could not find Employee'
          });    

          console.log(employees);
         res.status(200).json({

          status: 'Login successful!',

          success: true,

          token: token,

          employeeId: employees._id,

          loginId: employees.loginUser

        });    
      });

      

    });

  })(req,res,next);
});



router.get('/logout', function(req, res) {

    req.logout();

  res.status(200).json({

    status: 'Bye!'

  });

});

router.get('/facebook', passport.authenticate('facebook'),
  function(req, res){});

router.get('/facebook/callback', function(req,res,next){
  console.log('callback');
  passport.authenticate('facebook', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
              var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});


module.exports = router;