var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Verify = require('./verify');

var Task = require('../models/task');
var taskRouter  = express.Router();

taskRouter.use(bodyParser.json());

taskRouter.route('/')
.get(function (req, res, next) {
    /*var firstName = "";
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
    });*/
})

.put(function (req, res, next) {
    var title = "";
    var leader = "";
    var startDate = "";
    var endDate = "";
    var assignee = "";
    var notes = "";

 
    if(req.body.title)
        title = req.body.title;

    if(req.body.leader)
        leader = req.body.leader;

    if(req.body.startDate)
        startDate = req.body.startDate;

    if(req.body.endDate)
        endDate = req.body.endDate;

    if(req.body.assignee)
        assignee = req.body.assignee;

    if(req.body.note)
        notes = req.body.notes;

    new Task({"title": title, 
        "leader": leader,
        "startDate": startDate,
        "endDate": endDate,
        "assignee": assignee,
        "notes": notes
        }).save(function(err, task) {

        if(err) throw err;
        console.log('created');
        res.json(task);
    });
});

taskRouter.route('/searchPersonalTask')
.put(function (req, res, next) {
    var employee = "";

    if(req.body.employeeId)
        employee = req.body.employeeId;

    Task.
    find().
    populate('leader').
    exec(function(err, tasks) {
      if(err) throw err;
      console.log('tasks');
      console.log(tasks);
      var result = [];

      for(var i=0; i<tasks.length; i++)
      {
        for(var j=0; j<tasks[i].assignee.length; j++)
        {
            console.log(i);
            console.log(j);
            console.log(employee);
            console.log(tasks[i].assignee[j]);
            console.log(tasks[i].assignee[j]._id);
            if(tasks[i].assignee[j]._id == employee)
            {
                result.push(tasks[i]);
            }
        }
      }

      console.log(result);
      res.json(result);
    });
  
})

taskRouter.route('/searchTask')
.put(function (req, res, next) {
    /*console.log('searchEmployee');

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

    Employee.
    find(filter).
    populate({ path: 'manager'}).
    exec(function(err, employees) {
      if(err) throw err;
      console.log(employees);
      res.json(employees);
    });*/

    console.log('searchTask');

    var title = "";
    var leader = "";
    var startDate = "";
    var endDate = "";

    if(req.body.title)
        title = req.body.title;

    if(req.body.leader)
        leader = req.body.leader;

    if(req.body.startDate)
        startDate = req.body.startDate;

    if(req.body.endDate)
        endDate = req.body.endDate;

    var filter = {
        'title': title,
        'leader': leader,
        'startDate': startDate,
        'endDate': endDate
    };

    if((req.body.title && req.body.title == "") || !req.body.title)
        delete filter.title;

    if(req.body.leader && (req.body.leader == "" || req.body.leader == "Select One") || !req.body.leader)
        delete filter.leader;

    if(req.body.startDate && req.body.startDate == "" || !req.body.startDate)
        delete filter.startDate;

    if(req.body.endDate && req.body.endDate == "" || !req.body.endDate)
        delete filter.endDate;

    Task.
    find(filter).
    populate('leader').
    exec(function(err, tasks) {
      if(err) throw err;
      console.log(tasks);
      res.json(tasks);
    });
  
})

taskRouter.route('/:taskId')
.delete(function (req, res, next) {
        console.log('delete');
        Task.findByIdAndRemove(req.params.taskId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

taskRouter.route('/saveTask/:taskId')
.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    /*console.log('put hit');
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
    });*/

        Task.findById(req.params.taskId, function (err, task) {
        if (err) throw err;
        console.log(task);

        var curTime = Date.now();

        var dif = curTime - task.updatedAt;
        console.log(dif);

        if(dif < 1000)
            return;

        task.title = req.body.title;
        task.leader = req.body.leader;
        task.startDate = req.body.startDate;
        task.endDate = req.body.endDate;
        task.assignee = req.body.assignee;
        task.notes = req.body.notes;

        task.save(function (err, task) {
            if (err) throw err;
            console.log('Updated Comments!');
            console.log(task);
            res.json(task);
        });
    });
});

module.exports = taskRouter;