const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  name: String,
  address: String,
  phoneNumber: String,
  websites: [String],
  summary: String,
  workExperience: [
    {
      title: String,
      duration: {
        startDate: Date,
        endDate: mongoose.Schema.Types.Mixed, // can be Date or String
      },
      description: String,
    },
  ],
  education: [
    {
      title: String,
      institute: String,
      duration: {
        startDate: Date,
        endDate: mongoose.Schema.Types.Mixed,
      },
      description: String,
    },
  ],
  technicalSkills: [String],
  languages: [String],
  certifications: [String],
  awards: [String],
  templateName: String,
});

module.exports = mongoose.model("Resume", resumeSchema);
