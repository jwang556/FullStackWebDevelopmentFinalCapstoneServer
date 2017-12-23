var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Verify = require('./verify');

var Employee = require('../models/employee');
var employeeRouter  = express.Router();
var passport = require('passport');

var LoginUser = require('../models/LoginUser');

employeeRouter.use(bodyParser.json());

employeeRouter.route('/')
.get(function (req, res, next) {
    var firstName = "";
    var lastName = "";
    var hireDate = "";
    var dateOfBirth = "";
    var gender = "";

    if(req.body.firstName && req.body.firstName.value)
        firstName = req.body.firstName.value;

    if(req.body.lastName && req.body.lastName.value)
        lastName = req.body.lastName.value;

    if(req.body.hireDate && req.body.hireDate.value)
        hireDate = req.body.hireDate.value;

    if(req.body.dateOfBirth && req.body.dateOfBirth.value)
        dateOfBirth = req.body.dateOfBirth.value;

    if(req.body.gender && req.body.gender.value)
        gender = req.body.gender.value;

    var filter = {
        'firstName': firstName,
        'lastName': lastName,
        'hireDate': hireDate,
        'dateOfBirth': dateOfBirth,
        'gender': gender
    };

    if(req.body.firstName && req.body.firstName.value == "")
        delete filter.firstName;

    if(req.body.lastName && req.body.lastName.value == "")
        delete filter.lastName;

    if(req.body.hireDate && req.body.hireDate.value == "")
        delete filter.hireDate;

    if(req.body.dateOfBirth && req.body.dateOfBirth.value == "")
        delete filter.dateOfBirth;

    if(req.body.gender && req.body.gender.value == "")
        delete filter.gender;

    Employee.find(filter, function (err, employees){
      if(err) throw err;

      res.json(employees);
    });
})

.put(function (req, res, next) {
    var firstName = "";
    var lastName = "";
    var hireDate = "";
    var dateOfBirth = "";
    var gender = "";
    var homeAddress = "";
    var email = "";
    var manager = "";
    var phoneNumberLandline = "";
    var phoneNumberCell = "";
 
    if(req.body.firstName)
        firstName = req.body.firstName;

    if(req.body.lastName)
        lastName = req.body.lastName;

    if(req.body.hireDate)
        hireDate = req.body.hireDate;

    if(req.body.dateOfBirth)
        dateOfBirth = req.body.dateOfBirth;

    if(req.body.gender)
        gender = req.body.gender;

    if(req.body.homeAddress)
        homeAddress = req.body.homeAddress;

    if(req.body.email)
        email = req.body.email;

    if(req.body.manager)
        manager = req.body.manager;

    if(req.body.phoneNumberLandline)
        phoneNumberLandline = req.body.phoneNumberLandline;

    if(req.body.phoneNumberCell)
        phoneNumberCell = req.body.phoneNumberCell;

    if(firstName == '')
        return;

    if(lastName == '')
        return;

    if(hireDate == '')
        return;

    if(dateOfBirth == '')
        return;

    if(gender == '')
        return;

    if(homeAddress == '')
        return;

    if(email == '')
        return;

    if(manager == '')
        manager = null;

    if(phoneNumberLandline == '')
        return;

    if(phoneNumberCell == '')
        return;

    console.log(manager);

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
            
            new Employee({"firstName": req.body.firstName, 
                "lastName": req.body.lastName,
                "loginUser": loginUser._id,
                "hireDate": req.body.hireDate,
                "dateOfBirth": req.body.dateOfBirth,
                "gender": req.body.gender,
                "homeAddress": req.body.homeAddress,
                "email": req.body.email,
                "manager": req.body.manager,
                "phoneNumberLandline": req.body.phoneNumberLandline,
                "phoneNumberCell": req.body.phoneNumberCell
            }).save(function(err, employee) {
                if(err) throw err;
                console.log('created');
                res.json(employee);
            });


            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({status: 'Registration Successful!'});
            });
        });
    });
    
     


});



employeeRouter.route('/searchEmployee')
.put(function (req, res, next) {
    console.log('searchEmployee');

    var firstName = "";
    var lastName = "";
    var hireDate = "";
    var dateOfBirth = "";
    var gender = "";

    if(req.body.firstName && req.body.firstName)
        firstName = req.body.firstName;

    if(req.body.lastName && req.body.lastName)
        lastName = req.body.lastName;

    if(req.body.hireDate && req.body.hireDate)
        hireDate = req.body.hireDate;

    if(req.body.dateOfBirth && req.body.dateOfBirth)
        dateOfBirth = req.body.dateOfBirth;

    if(req.body.gender && req.body.gender)
        gender = req.body.gender;

    var filter = {
        'firstName': firstName,
        'lastName': lastName,
        'hireDate': hireDate,
        'dateOfBirth': dateOfBirth,
        'gender': gender
    };

    if((req.body.firstName && req.body.firstName == "") || !req.body.firstName)
        delete filter.firstName;

    if(req.body.lastName && req.body.lastName == "" || !req.body.lastName)
        delete filter.lastName;

    if(req.body.hireDate && req.body.hireDate == "" || !req.body.hireDate)
        delete filter.hireDate;

    if(req.body.dateOfBirth && req.body.dateOfBirth == "" || !req.body.dateOfBirth)
        delete filter.dateOfBirth;

    if(req.body.gender && req.body.gender == "" || !req.body.gender)
        delete filter.gender;

    console.log(filter);
/*
    Employee.find(filter, function (err, employees){
      if(err) throw err;

      res.json(employees);
    });
*/
    Employee.
    find(filter).
    populate({ path: 'manager'}).
    exec(function(err, employees) {
      if(err) throw err;
      console.log(employees);
      res.json(employees);
    });
})

employeeRouter.route('/:employeeId')
.delete(function (req, res, next) {
    console.log('delete');
        Employee.findByIdAndRemove(req.params.employeeId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

employeeRouter.route('/saveEmployee/:employeeId')
.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    console.log('put hit');
    console.log(req.body);
    Employee.findById(req.params.employeeId, function (err, employee) {
        if (err) throw err;
        console.log(employee);

        var curTime = Date.now();

        var dif = curTime - employee.updatedAt;
        console.log(dif);

        if(dif < 1000)
            return;

        employee.firstName = req.body.firstName;
        employee.lastName = req.body.lastName;
        employee.hireDate = req.body.hireDate;
        employee.dateOfBirth = req.body.dateOfBirth;
        employee.gender = req.body.gender;
        employee.homeAddress = req.body.homeAddress;
        employee.email = req.body.email;
        employee.manager = req.body.manager;
        employee.phoneNumberLandline = req.body.phoneNumberLandline;
        employee.phoneNumberCell = req.body.phoneNumberCell;

        console.log(employee);

        employee.save(function (err, employee) {
            if (err) throw err;
            console.log('Updated Comments!');
            console.log(employee);
            res.json(employee);
        });
    });
});

module.exports = employeeRouter;