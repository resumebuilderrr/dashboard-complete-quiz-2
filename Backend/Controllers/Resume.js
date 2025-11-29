const Resume = require("../Models/Resume");
const User = require("../Models/User");

const addResume = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      name,
      address,
      phoneNumber,
      websites,
      summary,
      workExperience,
      education,
      technicalSkills,
      languages,
      certifications,
      awards,
      templateName, // ✅ FIXED
    } = req.body;

    // Basic validation
    if (!name || !summary) {
      return res.status(400).json({
        success: false,
        message: "Name and Summary are required fields",
      });
    }

    const resumeData = {
      name,
      address,
      phoneNumber,
      templateName, // ✅ FIXED
      websites: websites || [],
      summary,

      // array-safe mapping
      workExperience: Array.isArray(workExperience)
        ? workExperience
        : workExperience
        ? [workExperience]
        : [],

      education: Array.isArray(education)
        ? education
        : education
        ? [education]
        : [],

      technicalSkills: technicalSkills || [],
      languages: languages || [],
      certifications: certifications || [],
      awards: awards || [],
      user: userId,
    };

    const resume = new Resume(resumeData);
    await resume.save();

    const user = await User.findById(userId);
    user.createdResume = resume._id;
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Resume created successfully",
      data: resume,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserResume = async (req, res) => {
  try {
    const userId = req.userId; // from middleware

    const user = await User.findById(userId).populate("createdResume");

    if (!user.createdResume) {
      return res.status(404).json({
        success: false,
        message: "No resume found for this user",
      });
    }

    console.log(user.createdResume);
    return res.status(200).json({
      success: true,
      data: user.createdResume,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addResume, getUserResume, getResumeById };
