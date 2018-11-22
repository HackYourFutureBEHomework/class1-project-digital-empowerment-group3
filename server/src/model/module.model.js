const mongoose = require('mongoose');

const ModuleSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		title2: String,
		title3: String,
		explanation: String,
		exercise: String,
		evaluation: String
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Module', ModuleSchema);