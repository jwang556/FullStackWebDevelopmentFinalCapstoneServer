// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// create a schema
var summarySchema = new Schema({
    type: {
		type: String,
		required: true
	},
	period: {
		type: String,
		required: true
    },
	day: {
        type: String,
		required: true
    },
    recordedHours: {
        type: String,
		required:true
    },
	filledHours: {
        type: String,
		required: true
    },
    unfilledHours: {
        type: String,
		required: true
    },
    shifts: [
      {
		shift: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Shift"
		}
	  }
    ],
	tasks: [
	  {
		task: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Task"
		},
		recordedHours: {
			type: String,
			required: true
		}
	  }
	]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Shift = mongoose.model('summary', summarySchema);

// make this available to our Node applications
module.exports = Summary;