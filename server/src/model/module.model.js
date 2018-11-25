const mongoose = require('mongoose');

const ModuleSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		title2: String,
		title3: String,
		title4: String,
		explanation: String,
		exercise: String,
		evaluation: String,
		completed: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Module', ModuleSchema);
