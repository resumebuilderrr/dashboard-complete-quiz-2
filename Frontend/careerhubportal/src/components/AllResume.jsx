import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllResume = () => {
  const [resume, setResume] = useState([]);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get("http://localhost:8080/getUserResume", {
          withCredentials: true,
        });

        console.log(res.data.data);

        setResume(res.data.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchResume();
  }, []);

  return (
    <div className="main-container">
      <div className="inside-card">
        <h4>Recently Created Resumes</h4>

        {resume.length === 0 && (
          <p>
            No resumes found <br />
            <Link to={"/templates"}>Click here to create one.</Link>
          </p>
        )}

        {resume.map((res, index) => (
          <Link style={{ textDecoration: "none", color: "black" }}>
            <div key={index} className="inside-card">
              <h4>Template: {res.templateName}</h4>
              <p>Name: {res.name}</p>
              <p>Summary: {res.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllResume;
