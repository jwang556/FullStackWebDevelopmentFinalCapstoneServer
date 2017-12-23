// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

/*
var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


*/

var durationSchema = new Schema({
    hour: {
        type: Number,
        min: 0,
        required: true
    },
    minute: {
        type: Number,
        min: 0,
        max: 60,
        reuired: true
    }
});

// create a schema
var employeeSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    loginUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoginUser'
    },
    hireDate: {
        type: Date, 
        default: '1/1/1900'
    },
    dateOfBirth: {
        type: Date, 
        default: '1/1/1900'
    },
    gender: {
        type: String,
        required: true
    },
    homeAddress: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    phoneNumberLandline: {
        type: String,
        required: true
    },
    phoneNumberCell: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Employee = mongoose.model('employee', employeeSchema);

// make this available to our Node applications
module.exports = Employee;