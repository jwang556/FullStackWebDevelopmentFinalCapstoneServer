// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var attendeeSchema = new Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    status: {
        type: String,
        required: true
    }
});

var durationSchema = new Schema({
    hours: {
        type: Number,
        default: 0,
    },
    minutes: {
        type: Number,
        default: 0
    }
});

// create a schema
var meetingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true,
    },
    duration: {
        type: durationSchema, 
        required: true
    },
    attendee: [attendeeSchema],
    notes: {
        type: String
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Meeting = mongoose.model('meeting', meetingSchema);

// make this available to our Node applications
module.exports = Meeting;