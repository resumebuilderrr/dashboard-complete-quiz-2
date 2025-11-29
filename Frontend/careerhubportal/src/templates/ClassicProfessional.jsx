import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import defaultImage from "../assets/defaultImg.jpg";

const ClassicProfessional = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/getResumeById/${id}`,
          { withCredentials: true }
        );
        setResume(res.data.data);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchResume();
  }, [id]);

  if (!resume) return <h2>Loading...</h2>;

  return (
    <div
      style={{
        display: "flex",
        maxWidth: "900px",
        margin: "40px auto",
        backgroundColor: "#f4dfd7",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* LEFT COLUMN */}
      <div
        style={{
          width: "30%",
          backgroundColor: "#f7e9e2",
          padding: "25px",
          borderRight: "2px solid #d6b8ab",
        }}
      >
        {/* IMAGE */}
        <img
          src={defaultImage}
          alt="profile"
          style={{
            width: "100%",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        />

        {/* CONTACT SECTION */}
        <h3 style={{ marginTop: "10px", color: "#6b4f4f" }}>CONTACT</h3>
        <div style={{ marginTop: "10px" }}>
          <p>📞 {resume.phoneNumber}</p>
          <p>📧 {resume.email}</p>
          <p>📍 {resume.address}</p>
        </div>

        <hr />

        {/* SKILLS */}
        <h3 style={{ marginTop: "20px", color: "#6b4f4f" }}>SKILLS</h3>
        <ul style={{ paddingLeft: "20px", lineHeight: "1.7" }}>
          {resume.technicalSkills?.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <hr />

        {/* LANGUAGES */}
        <h3 style={{ marginTop: "20px", color: "#6b4f4f" }}>LANGUAGES</h3>
        <ul style={{ paddingLeft: "20px", lineHeight: "1.7" }}>
          {resume.languages?.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </div>

      {/* RIGHT COLUMN */}
      <div style={{ width: "65%", padding: "35px" }}>
        {/* NAME */}
        <h1
          style={{
            fontSize: "26px",
            letterSpacing: "1px",
            marginBottom: "5px",
          }}
        >
          {resume.name?.toUpperCase()}
        </h1>

        {/* ABOUT ME */}
        <h2 style={{ color: "#6b4f4f", marginTop: "20px" }}>ABOUT ME</h2>
        <p style={{ whiteSpace: "pre-line", marginBottom: "25px" }}>
          {resume.summary}
        </p>

        {/* EDUCATION */}
        <h2 style={{ color: "#6b4f4f", marginBottom: "10px" }}>EDUCATION</h2>
        {resume.education?.map((ed, i) => (
          <div key={i} style={{ marginBottom: "15px" }}>
            <p style={{ fontWeight: "bold" }}>{ed.title}</p>
            <p>{ed.institute}</p>
            <p style={{ fontSize: "14px", color: "#333" }}>
              {ed.duration.startDate?.slice(0, 10)} —{" "}
              {ed.duration.endDate
                ? ed.duration.endDate.slice(0, 10)
                : "Present"}
            </p>
            <p>{ed.description}</p>
          </div>
        ))}

        {/* EXPERIENCE */}
        <h2 style={{ color: "#6b4f4f", marginTop: "25px" }}>EXPERIENCE</h2>
        {resume.workExperience?.map((job, i) => (
          <div key={i} style={{ marginBottom: "15px" }}>
            <p style={{ fontWeight: "bold" }}>
              {job.title} — {job.company}
            </p>

            <p style={{ fontSize: "14px" }}>
              {job.duration.startDate?.slice(0, 10)} —{" "}
              {job.duration.endDate
                ? job.duration.endDate.slice(0, 10)
                : "Present"}
            </p>

            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassicProfessional;
