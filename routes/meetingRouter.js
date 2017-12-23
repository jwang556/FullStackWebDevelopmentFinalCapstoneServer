var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Verify = require('./verify');

var Meeting = require('../models/meeting');
var meetingRouter  = express.Router();

meetingRouter.use(bodyParser.json());

meetingRouter.route('/')
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

    Meeting.find(filter, function (err, meeting){
      if(err) throw err;

      res.json(meeting);
    });
})

.put(function (req, res, next) {
    /*var firstName = "";
    var lastName = "";
    var hireDate = "";
    var dateOfBirth = "";
    var gender = "";
    var homeAddress = "";
    var email = "";
    var manager = "";
    var phoneNumberLandline = "";
    var phoneNumberCell = "";
    */

    var title = "";
    var host = "";
    var startTime = "";
    var endTime = "";
    var duration = "";
    var attendee = "";
    var notes = "";

    console.log(req.body);

    if(req.body.title)
        title = req.body.title;

    if(req.body.host)
        host = req.body.host;

    if(req.body.startTime)
        startTime = req.body.startTime;

    if(req.body.endTime)
        endTime = req.body.endTime;

    if(req.body.duration)
        duration = req.body.gender;

    if(req.body.attendee)
        attendee = req.body.attendee;

    if(req.body.notes)
        notes = req.body.note;
    
     new Meeting({"title": req.body.title, 
        "host": req.body.host,
        "startTime": req.body.startTime,
        "endTime": req.body.endTime,
        "duration": req.body.duration,
        "attendee": req.body.attendee,
        "notes": req.body.notes
        }).save(function(err, meeting) {

        if(err) throw err;
        console.log('created');
        res.json(meeting);
    });
});



meetingRouter.route('/searchMeeting')
.put(function (req, res, next) {
    var title = "";
    var host = "";
    var startTime = "";
    var endTime = "";
    var duration = "";

    if(req.body.title)
        title = req.body.title;

    if(req.body.host)
        lastName = req.body.lastName;

    if(req.body.startTime)
        startTime = req.body.startTime;

    if(req.body.endTime)
        endTime = req.body.endTime;

    if(req.body.duration)
        duration = req.body.duration;

    var filter = {
        'title': title,
        'host': host,
        'startTime': startTime,
        'endTime': endTime
    };

    if((req.body.title && req.body.title == "") || !req.body.title)
        delete filter.title;

    if((req.body.host && req.body.host == "") || !req.body.host || req.body.host == "Select One")
        delete filter.host;

    if(req.body.startTime && req.body.startTime == "" || !req.body.startTime)
        delete filter.startTime;

    if(req.body.endTime && req.body.endTime == "" || !req.body.endTime)
        delete filter.endTime;

/*
    Employee.find(filter, function (err, employees){
      if(err) throw err;

      res.json(employees);
    });
*/
//populate('host', {path: 'attendee', populate: {path: 'employee'}}).
//populate('host').
    Meeting.
    find(filter).
    populate('attendee.employee').
    populate('host').
    exec(function(err, meeting) {
      if(err) throw err;
      console.log(meeting);
      console.log('req.body.duration');
      console.log(req.body);
      let result = [];

      if((req.body.duration.hours == "" || req.body.duration.hours == null) && (req.body.duration.minutes == "" || req.body.duration.minutes == null))
      {
        res.json(meeting);
        return;
      }

      for(var i=0; i< meeting.length; i++)
      {
        if(meeting[i].duration.hours == req.body.duration.hours && meeting[i].duration.minutes == req.body.duration.minutes)
            result.push(meeting[i]);
      }

      console.log('result');
      console.log(result);

      res.json(result);
    });
})

meetingRouter.route('/searchUpcomingMeeting')
.put(function (req, res, next) {

    //var filter = {attendee: {employee: {$in: [
        //mongoose.Types.ObjectId(req.body.attendee)]}}};

    let attendee = mongoose.Types.ObjectId(req.body.attendee);
/*
    Employee.find(filter, function (err, employees){
      if(err) throw err;

      res.json(employees);
    });
*/
//populate('host', {path: 'attendee', populate: {path: 'employee'}}).
//populate('host').
    Meeting.
    find().
    populate('attendee.employee').
    populate('host').
    exec(function(err, meeting) {
      if(err) throw err;
      let result = [];
      console.log(meeting);
      for(var i=0; i<meeting.length; i++)
      {
        for(var j=0; j<meeting[i].attendee.length; j++)
        {
            console.log(i);
            console.log(j);
            console.log(meeting[i].attendee[j]);
            console.log(meeting[i].attendee[j]._id);
            console.log(req.body.attendee);
            if(meeting[i].attendee[j]._id == req.body.attendee)
            {  
                console.log('match');
                result.push(meeting[i]);
                break;
            }
        }
      }
      console.log(result);
      res.json(result);
    });
})

meetingRouter.route('/:meetingId')
.delete(function (req, res, next) {
    console.log('delete');
    Meeting.findByIdAndRemove(req.params.meetingId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

meetingRouter.route('/saveMeeting/:meetingId')
.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    console.log('put hit');
    console.log(req.body);
    Meeting.findById(req.params.meetingId, function (err, meeting) {
        if (err) throw err;
        console.log(meeting);

        var curTime = Date.now();

        var dif = curTime - meeting.updatedAt;
        console.log(dif);

        if(dif < 1000)
            return;

        meeting.attendee = req.body.attendee;
        meeting.duration = req.body.duration;
        meeting.endTime = req.body.endTime;
        meeting.host = req.body.host;
        meeting.notes = req.body.notes;
        meeting.startTime = req.body.startTime;
        meeting.endTime = req.body.endTime;
        /*
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
        */
        console.log(meeting);

        meeting.save(function (err, meeting) {
            if (err) throw err;
            console.log('Updated Meeting');
            console.log(meeting);
            res.json(meeting);
        });
    });
});

module.exports = meetingRouter;