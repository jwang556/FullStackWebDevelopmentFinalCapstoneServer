// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// create a schema
var taskSchema = new Schema({
    title: {
        type: String,
		required: true
    },
	leader: {
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
    assignee: [
      {
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee"
		}
	  }
    ],
    notes: {
        type: String
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Task = mongoose.model('task', taskSchema);

// make this available to our Node applications
module.exports = Task;
