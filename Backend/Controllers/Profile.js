const Profile = require("../Models/Profile");
const User = require("../Models/User");

// Get logged-in user's profile
const getLoggedInUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const data = await Profile.findById(userId);

    if (!data) {
      return res.status(404).json({
        message: "User profile not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "User profile found successfully",
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getUserProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await User.findById(id).populate("profile");

    if (!data) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Profile info fetched successfully",
      success: true,
      data: data.profile,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const addUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      firstName,
      lastName,
      nickName,
      headline,
      summary,
      skills,
      country,
      city,
      avatar,
    } = req.body;

    if (!firstName || !lastName) {
      return res.status(400).json({
        message: "First name and last name are required",
        success: false,
      });
    }

    const profileData = {
      firstName,
      lastName,
      nickName,
      headline,
      summary,
      skills,
      country,
      city,
      avatar,
    };

    Object.keys(profileData).forEach(
      (key) => profileData[key] === undefined && delete profileData[key]
    );

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Check if profile exists
    let existingProfile = await Profile.findById(user.profile);

    let result;

    if (existingProfile) {
      // UPDATE
      result = await Profile.findByIdAndUpdate(user.profile, profileData, {
        new: true,
      });

      return res.status(200).json({
        message: "Profile updated successfully",
        success: true,
        data: result,
      });
    }

    // CREATE
    result = await Profile.create({ _id: userId, ...profileData });

    // Attach profile to user
    user.profile = result._id;
    await user.save();

    return res.status(201).json({
      message: "Profile created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  getLoggedInUserProfile,
  addUserProfile,
  getUserProfileById,
};
