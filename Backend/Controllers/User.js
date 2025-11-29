const User = require("../Models/User");

// Add user
const addUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const newUser = await User.create({
      email,
      username,
      password,
    });

    res.status(200).json({
      message: "User added successfully.",
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error adding user" });
  }
};

// Get users
const getUsers = async (req, res) => {
  try {
    const data = await User.find({});

    res.status(200).json({
      message: "Users found successfully.",
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

module.exports = { getUsers, addUser };
