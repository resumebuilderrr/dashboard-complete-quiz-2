const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  phoneNumber: { type: String },
  phoneType: {
    type: String,
    enum: ["Home", "Work", "Mobile"],
  },
  address: String,
  websites: [String], // array of websites
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String,
    facebook: String,
    instagram: String,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
