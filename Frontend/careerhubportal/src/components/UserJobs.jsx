import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserJobs = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/getJobsIPosted", {
        withCredentials: true,
      });
      setJobs(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Delete Job
  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:8080/deleteJob/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("Job deleted successfully");
        fetchJobs(); // refresh the list after deletion
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting job");
    }
  };

  return (
    <>
      {jobs.length > 0 ? (
        <div className="main-container">
          <div className="inside-card">
            {jobs.map((job) => (
              <div key={job._id}>
                <h4>{job.title}</h4>
                <p>
                  <b>Job Description: </b>
                  {job.about}
                </p>
                <p>
                  <b>Tools & Technologies: </b>
                  {job.toolsAndTech}
                </p>
                <p>
                  <b>Mode: </b>
                  {job.mode}{" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteJob(job._id)} // ✅ pass function
                  >
                    Delete Job
                  </button>
                </p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="main-container">
          <p className="inside-card">
            You haven't created any job yet.
            <br /> <Link to={"/createJob"}>Click here to create one.</Link>
          </p>
        </div>
      )}
    </>
  );
};

export default UserJobs;
