const mongoose = require('mongoose');

const ModuleSchema = mongoose.Schema(
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
);

module.exports = mongoose.model('Module', ModuleSchema);
