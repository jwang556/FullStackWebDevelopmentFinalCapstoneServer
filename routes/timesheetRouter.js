var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Verify = require('./verify');

var Shift = require('../models/shift');
var Timesheet = require('../models/timesheet');
var timesheetRouter  = express.Router();

timesheetRouter.use(bodyParser.json());

timesheetRouter.route('/')
.put(function (req, res, next) {   
     var startingMonday = "";
    var endingFriday = "";
    var employee = "";

    if(req.body.startingMonday)
        startingMonday = req.body.startingMonday;

    if(req.body.endingFriday)
        endingFriday = req.body.endingFriday;

    if(req.body.employee)
        employee = req.body.employee;

    /*
    var filter = {
        'startTime': ,
        'endTime': 
    };*/

    var timesheet = {
        'employee': employee,
        'startDate': startingMonday,
        'endDate': endingFriday,
        'timePeriod': startingMonday + '-' + endingFriday,
        'status': 'unsubmitted',
        'mondayShifts': [
        ],
        'tuesdayShifts':[
        ],
        'wednesdayShifts':[
        ],
        'thursdayShifts':[
        ],
        'fridayShifts':[
        ],
        'tasks':[
        ],
        'filledHours':[
        ],
        'unfilledHours':[
        ],
        'recordedHours':[
        ],
        'comments':[
        ]
    };

    console.log('1');

    var startingMondayDate = new Date(startingMonday);

    Shift.find({
    }).
    exec(function(err, shifts) {
      if(err) throw err;
            console.log(shifts);
      for(var i=0; i<shifts.length; i++)
      {
        console.log(shifts[i].startTime.getDate());
        console.log(shifts[i].startTime.getMonth());
        console.log(shifts[i].startTime.getFullYear());
        console.log(startingMondayDate.getDate());
        console.log(startingMondayDate.getMonth());
        console.log(startingMondayDate.getFullYear());
        if(shifts[i].startTime.getDate() == startingMondayDate.getDate() && shifts[i].startTime.getMonth() == startingMondayDate.getMonth() && shifts[i].startTime.getFullYear() == startingMondayDate.getFullYear())
         {
            console.log('match');
            var s = {startTime: shifts[i].startTime, endTime: shifts[i].endTime};
            timesheet.mondayShifts.push(s);
            console.log(timesheet.mondayShifts);
            console.log(timesheet);
         }   
      }      
    });

    //console.log('moday shifts');
    //console.log(timesheet.mondayShifts);
    //console.log('2');

    var startingTuesdayDate = new Date(startingMonday);
    startingTuesdayDate.setDate(startingTuesdayDate.getDate()+1);

    Shift.find({
    }).
    exec(function(err, shifts) {
      if(err) throw err;
            console.log(shifts);
      for(var i=0; i<shifts.length; i++)
      {
        if(shifts[i].startTime.getDate() == startingTuesdayDate.getDate() && shifts[i].startTime.getMonth() == startingTuesdayDate.getMonth() && shifts[i].startTime.getFullYear() == startingTuesdayDate.getFullYear())
         {
            var s= {startTime: shifts[i].startTime, endTime: shifts[i].endTime};
            timesheet.tuesdayShifts.push(s);
         }   
      }      
    });

    var startingWednesdayDate = new Date(startingMonday);
    startingWednesdayDate.setDate(startingWednesdayDate.getDate()+2);

    Shift.find({
    }).
    exec(function(err, shifts) {
      if(err) throw err;
            console.log(shifts);
      for(var i=0; i<shifts.length; i++)
      {
        if(shifts[i].startTime.getDate() == startingWednesdayDate.getDate() && shifts[i].startTime.getMonth() == startingWednesdayDate.getMonth() && shifts[i].startTime.getFullYear() == startingWednesdayDate.getFullYear())
         {
            var s= {startTime: shifts[i].startTime, endTime: shifts[i].endTime};
            timesheet.wednesdayShifts.push(s);
         }   
      }      
    });

    //console.log('3');

    var startingThursdayDate = new Date(startingMonday);
    startingThursdayDate.setDate(startingThursdayDate.getDate()+3);

    Shift.find({
    }).
    exec(function(err, shifts) {
      if(err) throw err;
            console.log(shifts);
      for(var i=0; i<shifts.length; i++)
      {
        if(shifts[i].startTime.getDate() == startingThursdayDate.getDate() && shifts[i].startTime.getMonth() == startingThursdayDate.getMonth() && shifts[i].startTime.getFullYear() == startingThursdayDate.getFullYear())
         {
            var s = {startTime: shifts[i].startTime, endTime: shifts[i].endTime};
            timesheet.thursdayShifts.push(s);
         }   
      }      
    });

    var startingFridayDate = new Date(startingMonday);
    startingFridayDate.setDate(startingFridayDate.getDate()+4);

    Shift.find({
    }).
    exec(function(err, shifts) {
      if(err) throw err;
            console.log(shifts);
      for(var i=0; i<shifts.length; i++)
      {
        if(shifts[i].startTime.getDate() == startingFridayDate.getDate() && shifts[i].startTime.getMonth() == startingFridayDate.getMonth() && shifts[i].startTime.getFullYear() == startingFridayDate.getFullYear())
         {
            var s = {startTime: shifts[i].startTime, endTime: shifts[i].endTime};
            timesheet.fridayShifts.push(s);
         }   
      }      
    });



    console.log('b4');
    console.log(timesheet);
    new Timesheet(timesheet).save(function(err, timesheet) {
        if(err) throw err;
        console.log('created');
        console.log(timesheet);
        res.json(timesheet);
    });
    
});

timesheetRouter.route('/searchPersonalTimesheet')
.put(function (req, res, next) {
    var startingMonday = "";
    var endingFriday = "";
    var employee = "";

    if(req.body.startingMonday)
        startingMonday = req.body.startingMonday;

    if(req.body.endingFriday)
        endingFriday = req.body.endingFriday;

    if(req.body.employee)
        employee = req.body.employee;

    var filter = {
        'startDate': startingMonday,
        'endDate': endingFriday,
        'employee': employee
    };

    var mondayShifts = [];

    console.log('findShifts');

    Timesheet.
    find(filter).
    populate('employee').
    exec(function(err, timesheet) {
      if(err) throw err;
      console.log(timesheet);
      res.json(timesheet);
    });
});



timesheetRouter.route('/searchTimesheet')
.put(function (req, res, next) {
    var startingMonday = "";
    var endingFriday = "";
    var firstName = "";
    var lastName = "";
    var manager = "";

    if(req.body.startingMonday)
        startingMonday = req.body.startingMonday;

    if(req.body.endingFriday)
        endingFriday = req.body.endingFriday;

    if(req.body.firstName)
        firstName = req.body.firstName;

    if(req.body.lastName)
        lastName = req.body.lastName;

    if(req.body.manager)
        manager = req.body.manager;

     var filter = {
        'startingMonday': startingMonday,
        'endingFriday': endingFriday,
        'firstName': firstName,
        'lastName': lastName,
        'manager': manager
    };

    if((req.body.startingMonday && req.body.startingMonday == "") || !req.body.startingMonday)
        delete filter.startingMonday;

    if((req.body.endingFriday && req.body.endingFriday == "") || !req.body.endingFriday)
        delete filter.endingFriday;

    if((req.body.firstName && req.body.firstName == "") || !req.body.firstName)
        delete filter.firstName;

    if((req.body.lastName && req.body.lastName == "") || !req.body.lastName)
        delete filter.lastName;

    if((req.body.manager && req.body.manager == "") || !req.body.manager)
        delete filter.manager;

    Timesheet.
    find(filter).
    populate('employee').
    exec(function(err, timesheet) {
      if(err) throw err;
      console.log(timesheet);
      res.json(timesheet);
    });
});

timesheetRouter.route('/:timesheetId')
.delete(function (req, res, next) {
        /*console.log('delete');
        Task.findByIdAndRemove(req.params.taskId, function (err, resp) {
        if (err) throw err;
        res.json(resp);*/
    //});
});

timesheetRouter.route('/saveTimesheet/:timesheetId')
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
        /*
        Timesheet.findById(req.params.taskId, function (err, task) {
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
    });*/

    Timesheet.findById(req.params.timesheetId, function (err, timesheet) {
        if (err) throw err;
        console.log(timesheet);

        var curTime = Date.now();

        var dif = curTime - timesheet.updatedAt;
        console.log(dif);

        if(dif < 1000)
            return;

        timesheet.employee = req.body.employee;
        timesheet.startDate = req.body.startDate;
        timesheet.endDate = req.body.endDate;
        timesheet.timePeriod = req.body.timePeriod;
        timesheet.status = req.body.status;
        timesheet.mondayShifts = req.body.mondayShifts;
        timesheet.tuesdayShifts = req.body.tudesdayShifts;
        timesheet.wednesdayShifts = req.body.wednesdayShifts;
        timesheet.thursdayShifts = req.body.thursdayShifts;
        timesheet.fridayShifts = req.body.fridayShifts;
        timesheet.tasks = req.body.tasks;
        timesheet.filledHours = req.body.filledHours;
        timesheet.unfilledHours = req.body.unfilledHours;
        timesheet.recordedHours = req.body.recordedHours;
        timesheet.comments = req.body.comments;
        console.log(timesheet);

        timesheet.save(function (err, timesheet) {
            if (err) throw err;
            console.log('Updated Comments!');
            console.log(timesheet);
            res.json(timesheet);
        });
    });
});

module.exports = timesheetRouter;