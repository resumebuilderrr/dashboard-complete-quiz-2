const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
        success: false,
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create and save user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      role: "student", // default or remove this
    });

    await newUser.save();

    return res.status(200).json({
      message: "Signup successful",
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY || "2h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    console.log(token);
    return res.status(200).json({
      message: "Login successful",
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({ error: "Login failed" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // true in production with https
    sameSite: "lax",
  });

  return res.status(200).json({
    message: "Logged out successfully",
    success: true,
  });
};

const isLoggedInController = (req, res) => {
  return res.json({
    loggedIn: true,
    user: req.user,
  });
};

module.exports = { signup, login, logout, isLoggedInController };
