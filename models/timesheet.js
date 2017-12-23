// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
	employee: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'employee',
		required: true
    },
	date: {
        type: Date,
		required: true
    },
	comment: {
        type: String,
		required: true,
		default: ''
    }
});

// create a schema
var timesheetSchema = new Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'employee',
		required: true
    },
	startDate: {
        type: Date,
		required: true
    },
    endDate: {
        type: Date,
		required:true
    },
	timePeriod: {
        type: String,
		required: true
    },
    status: {
        type: String,
		required: true
    },
    mondayShifts: [
      {
		startTime: {
			type: Date,
			required: true
		},
		endTime: {
			type: Date,
			required: true
		}
	  }
    ],
	tuesdayShifts: [
	  {
		startTime: {
			type: Date,
			required: true
		},
		endTime: {
			type: Date,
			required: true
		}
	  }
	],
	wednesdayShifts: [
	  {
		startTime: {
			type: Date,
			required: true
		},
		endTime: {
			type: Date,
			required: true
		}
	  }
	],
	thursdayShifts: [
	  {
		startTime: {
			type: Date,
			required: true
		},
		endTime: {
			type: Date,
			required: true
		}
	  }
	],
	fridayShifts: [
	  {
		startTime: {
			type: Date,
			required: true
		},
		endTime: {
			type: Date,
			required: true
		}
	  }
	],
	tasks: [
	  {
		task: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Task"
		},
		mondayHours: {
			type: Number,
			default: 0,
			required: true
		},
		tuesdayHours: {
			type: Number,
			default: 0,
			required: true
		},
		wednesdayHours: {
			type: Number,
			default: 0,
			required: true
		},
		thursdayHours: {
			type: Number,
			default: 0,
			required: true
		},
		fridayHours: {
			type: Number,
			default: 0,
			required: true
		},
		totalHours: {
			type: Number,
			default: 0,
			required: true
		}
	  }
	],
	filledHours: 
	  {
		mondayHours: {
			type: Number,
			default: 0,
			required: true
		},
		tuesdayHours: {
			type: Number,
			default: 0,
			required: true
		},
		wednesdayHours: {
			type: Number,
			default: 0,
			required: true
		},
		thursdayHours: {
			type: Number,
			default: 0,
			required: true
		},
		fridayHours: {
			type: Number,
			default: 0,
			required: true
		},
		totalHours: {
			type: Number,
			default: 0,
			required: true
		}
	  },
	unfilledHours: 
	  {
		mondayHours: {
			type: Number,
			default: 0,
			required: true
		},
		tuesdayHours: {
			type: Number,
			default: 0,
			required: true
		},
		wednesdayHours: {
			type: Number,
			default: 0,
			required: true
		},
		thursdayHours: {
			type: Number,
			default: 0,
			required: true
		},
		fridayHours: {
			type: Number,
			default: 0,
			required: true
		},
		totalHours: {
			type: Number,
			default: 0,
			required: true
		}
	  },
	recordedHours:
	  {
		mondayHours: {
			type: Number,
			default: 0,
			required: true
		},
		tuesdayHours: {
			type: Number,
			default: 0,
			required: true
		},
		wednesdayHours: {
			type: Number,
			default: 0,
			required: true
		},
		thursdayHours: {
			type: Number,
			default: 0,
			required: true
		},
		fridayHours: {
			type: Number,
			default: 0,
			required: true
		},
		totalHours: {
			type: Number,
			default: 0,
			required: true
		}
	  },
	comments: [commentSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Timesheet = mongoose.model('timesheet', timesheetSchema);

// make this available to our Node applications
module.exports = Timesheet;