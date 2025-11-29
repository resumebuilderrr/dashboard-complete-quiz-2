const Contact = require("../Models/Contact");
const Profile = require("../Models/Profile");
const User = require("../Models/User");

const getContactInfo = async (req, res) => {
  try {
    const userId = req.userId;

    const data = await User.findById(userId).populate({
      path: "profile",
      populate: { path: "contact" }, // populate nested contact
    });

    if (!data) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (!data.profile) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Contact info fetched successfully",
      success: true,
      data: data.profile.contact, // return contact info only
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const addContactInfo = async (req, res) => {
  try {
    const { id: profileId } = req.params;

    const {
      phoneNumber,
      phoneType,
      address,
      websites,
      socialLinks: { linkedin, github, twitter, facebook, instagram } = {},
    } = req.body;

    const selectedProfile = await Profile.findById(profileId).populate(
      "contact"
    );

    if (!selectedProfile) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }

    // Check if contact already exists
    let contact;
    if (selectedProfile.contact) {
      // Update existing contact
      contact = await Contact.findByIdAndUpdate(
        selectedProfile.contact._id,
        {
          phoneNumber,
          phoneType,
          address,
          websites,
          socialLinks: { linkedin, github, twitter, facebook, instagram },
        },
        { new: true }
      );
    } else {
      // Create new contact
      contact = new Contact({
        phoneNumber,
        phoneType,
        address,
        websites,
        socialLinks: { linkedin, github, twitter, facebook, instagram },
      });
      await contact.save();
      selectedProfile.contact = contact._id;
      await selectedProfile.save();
    }

    return res.status(200).json({
      message: "Contact info saved successfully",
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { addContactInfo, getContactInfo };
