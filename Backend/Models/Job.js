const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  applicants: Number,
  about: String,
  mode: {
    type: String,
    enum: ["onsite", "online"],
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  toolsAndTech: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", jobSchema);
