import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const navigate = useNavigate(); // ✅ fixed
  const [jobData, setJobData] = useState({
    title: "",
    about: "",
    mode: "onsite", // default value
    toolsAndTech: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/addJob", jobData, {
        withCredentials: true,
      });

      if (res.data.success) {
        setMessage("Job posted successfully!");
        setJobData({
          title: "",
          about: "",
          mode: "onsite",
          toolsAndTech: "",
        });
        navigate("/jobs"); // navigate after success
      } else {
        setMessage("Failed to post job.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error posting job.");
    }
  };

  return (
    <div className="container mt-4 inside-card">
      <h2>Post New Job</h2>
      {message && <p className="response-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-2">
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={jobData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-2">
          <label>About the Job</label>
          <textarea
            name="about"
            className="form-control"
            value={jobData.about}
            onChange={handleChange}
            rows={4}
            required
          ></textarea>
        </div>

        <div className="form-group mt-2">
          <label>Mode</label>
          <select
            name="mode"
            className="form-control"
            value={jobData.mode}
            onChange={handleChange}
          >
            <option value="onsite">Onsite</option>
            <option value="online">Online</option>
          </select>
        </div>

        <div className="form-group mt-2">
          <label>Tools & Technologies</label>
          <input
            type="text"
            name="toolsAndTech"
            className="form-control"
            value={jobData.toolsAndTech}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
