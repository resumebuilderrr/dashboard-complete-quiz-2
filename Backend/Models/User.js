const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: String,
  password: { type: String, required: true },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  createdResume: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
