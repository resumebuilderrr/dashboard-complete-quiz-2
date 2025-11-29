const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  nickName: String,
  headline: String,
  summary: String,

  // Job positions
  experience: [
    {
      title: { type: String, required: true },
      company: { type: String },
      location: String,
      startDate: Date,
      endDate: Date,
      current: { type: Boolean, default: false },
      description: String,
    },
  ],

  // Education section
  education: [
    {
      school: { type: String, required: true },
      degree: String,
      field: String,
      startYear: Number,
      endYear: Number,
    },
  ],

  // Skills
  skills: [{ type: String }],

  // Country / city
  country: { type: String },
  city: { type: String },

  // Profile picture
  avatar: { type: String },

  // Contact reference
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
  },
});

module.exports = mongoose.model("Profile", profileSchema);
