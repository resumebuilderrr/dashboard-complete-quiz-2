const Job = require("../Models/Job");

// Add job
const addJob = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, about, mode, toolsAndTech } = req.body;

    const newJob = await Job({
      title,
      about,
      mode,
      toolsAndTech,
    });

    newJob.uploadedBy = userId;
    newJob.save();
    res.status(200).json({
      message: "Job posted successfully.",
      success: true,
      data: newJob,
    });
    console.log(newJob);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error posted job" });
  }
};

// Get jobs
const getJobs = async (req, res) => {
  try {
    const data = await Job.find({}).populate("uploadedBy");

    res.status(200).json({
      message: "Jobs found successfully.",
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching jobs" });
  }
};

// Get my users
const getJobsIPosted = async (req, res) => {
  try {
    const uploadedBy = req.userId;
    const data = await Job.find({ uploadedBy });

    res.status(200).json({
      message: "Jobs found successfully.",
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching jobs" });
  }
};

// Delete a job by ID
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
      data: deletedJob,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error deleting job" });
  }
};

module.exports = { getJobs, addJob, getJobsIPosted, deleteJob };
