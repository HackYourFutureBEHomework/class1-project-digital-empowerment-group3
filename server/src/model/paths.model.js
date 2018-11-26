const mongoose = require('mongoose');

const pathSchema = mongoose.Schema(
	{
		pathTitle: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Path', pathSchema);
