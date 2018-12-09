const mongoose = require('mongoose');

const pathSchema = mongoose.Schema(
	{
		pathTitle: {
			type: String,
			required: true
		},

		modules: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Module'
			}
		]
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Path', pathSchema);