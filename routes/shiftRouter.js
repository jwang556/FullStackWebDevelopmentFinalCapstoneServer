var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Verify = require('./verify');

var Shift = require('../models/shift');
var shiftRouter  = express.Router();

shiftRouter.use(bodyParser.json());

shiftRouter.route('/punchin')
.put(function (req, res, next) {
    var employeeId = "";

    if(req.body.employeeId)
        employeeId = req.body.employeeId;

    var filter = {
        'employee': employeeId
    };

    //Shift.findOne(filter, {sort: {'startTime': -1}}, function (err, shift){
    Shift.find(filter).sort({'startTime': -1}).limit(1).exec(function(err, shift) {
      if(err) throw err;
      console.log(shift);

      res.json(shift);
    });
})

shiftRouter.route('/punchin/:shiftId')
.post(function (req, res, next) {
    var employeeId = "";
    console.log('req params' + req.params.shiftId);

    if(req.body.employeeId)
        employeeId = req.body.employeeId;

    var filter = {
        'employee': employeeId,
        '_id': req.params.shiftId
    };

    Shift.findOne(filter, function (err, shift){
      if(!shift) 
      { 
        var curDate = Date.now();
        //console.log('create shift');
        new Shift({"employee": employeeId, 
            "startTime": curDate,
            "endTime": null
            }).save(function(err, shift) {

            if(err) throw err;
            res.json(shift);
        });
      }
      else
      {
        var curTime = Date.now();

        var dif = curTime - shift.updatedAt;
        console.log(dif);

        if(dif < 1000)
            return;

        if(shift.endTime == null)
        {
            curDate = Date.now();
        
            shift.endTime = curDate;
            //console.log('punch out');
            shift.save(function (err, shift) {
                if (err) throw err;
                res.json(shift);
            });
        }
        else
        {
            var curDate = Date.now();
            //console.log('create shift');
            new Shift({"employee": employeeId, 
                "startTime": curDate,
                "endTime": null
                }).save(function(err, shift) {

                if(err) throw err;
                    res.json(shift);
            });
        }
      }

      
    });
    /*
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
    });*/
});



module.exports = shiftRouter;