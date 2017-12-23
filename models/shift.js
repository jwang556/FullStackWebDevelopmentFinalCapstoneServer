// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// create a schema
var shiftSchema = new Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
		required: true
    },
    startTime: {
        type: Date,
		required:true
    },
    endTime: {
        type: Date
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Shift = mongoose.model('shift', shiftSchema);

// make this available to our Node applications
module.exports = Shift;
