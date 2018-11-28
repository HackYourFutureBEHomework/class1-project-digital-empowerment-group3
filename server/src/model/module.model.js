const mongoose = require('mongoose');

const ModuleSchema = mongoose.Schema(
<<<<<<< HEAD
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
=======
  {
    title: {
      type: String,
      required: true
    },
    explanation:string,
    exercise:string,
    evaluation:string,
  },
  {
    timestamps: true
  }
>>>>>>> refs/remotes/origin/mahmoudlb
);

module.exports = mongoose.model('Module', ModuleSchema);