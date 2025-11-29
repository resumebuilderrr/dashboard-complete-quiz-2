import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/getJobs", {
          withCredentials: true,
        });
        setJobs(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
  }, []); // run once on mount

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
                  <b>Uploaded By: </b>
                  {job.uploadedBy.username}
                </p>
                <p>
                  <b>Tools & Technologies: </b>
                  {job.toolsAndTech}
                </p>
                <p>
                  <b>Mode: </b>
                  {job.mode} <button className="btn btn-danger">Apply</button>
                </p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="main-container">
          <p className="inside-card">
            No Jobs listed yet.
            <br /> <Link to={"/createJob"}>Click here to create one.</Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Jobs;
