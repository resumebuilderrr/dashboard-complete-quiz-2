import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CreativeVisual = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/getResumeById/${id}`,
          {
            withCredentials: true,
          }
        );
        setResume(res.data.data);
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchResume();
  }, [id]);

  if (!resume) return <h2>Loading Resume...</h2>;

  return (
    <div
      className="inside-card"
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
        lineHeight: "1.6",
        color: "#333",
      }}
    >
      <h1
        style={{ textAlign: "center", fontSize: "28px", letterSpacing: "1px" }}
      >
        {resume.name}
      </h1>

      <p style={{ textAlign: "center", fontSize: "14px", margin: "0" }}>
        {resume.address} • {resume.phoneNumber} • {resume.websites?.join(" | ")}
      </p>

      <hr style={{ margin: "25px 0", borderTop: "1px solid #ccc" }} />

      {/* === SUMMARY === */}
      <h2 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>
        SUMMARY
      </h2>
      <p style={{ marginBottom: "20px", fontSize: "14px" }}>{resume.summary}</p>

      <hr style={{ margin: "25px 0", borderTop: "1px solid #ccc" }} />

      {/* === WORK EXPERIENCE === */}
      <h2
        style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "15px" }}
      >
        WORK EXPERIENCE
      </h2>

      {resume.workExperience?.map((job, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            <span>{job.title}</span>
            <span>
              {job.duration?.startDate?.slice(0, 10)} -{" "}
              {job.duration?.endDate
                ? job.duration.endDate.slice(0, 10)
                : "Present"}
            </span>
          </div>
          <p style={{ marginTop: "8px", fontSize: "14px" }}>
            {job.description}
          </p>
        </div>
      ))}

      <hr style={{ margin: "25px 0", borderTop: "1px solid #ccc" }} />

      {/* === EDUCATION === */}
      <h2
        style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "15px" }}
      >
        EDUCATION
      </h2>

      {resume.education?.map((ed, i) => (
        <div key={i} style={{ marginBottom: "18px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            <span>{ed.title}</span>
            <span>
              {ed.duration?.startDate?.slice(0, 10)} -{" "}
              {ed.duration?.endDate
                ? ed.duration.endDate.slice(0, 10)
                : "Present"}
            </span>
          </div>
          <p style={{ margin: "3px 0 5px 0", fontSize: "14px" }}>
            {ed.institute}
          </p>
          <p style={{ marginBottom: "4px", fontSize: "14px" }}>
            {ed.description}
          </p>
        </div>
      ))}

      <hr style={{ margin: "25px 0", borderTop: "1px solid #ccc" }} />

      {/* === ADDITIONAL INFORMATION === */}
      <h2
        style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "15px" }}
      >
        ADDITIONAL INFORMATION
      </h2>

      <ul style={{ paddingLeft: "20px" }}>
        <li>
          <strong>Technical Skills: </strong>
          {resume.technicalSkills?.join(", ")}
        </li>
        <li>
          <strong>Languages: </strong>
          {resume.languages?.join(", ")}
        </li>
        <li>
          <strong>Certifications: </strong>
          {resume.certifications?.join(", ")}
        </li>
        <li>
          <strong>Awards: </strong>
          {resume.awards?.join(", ")}
        </li>
      </ul>
    </div>
  );
};

export default CreativeVisual;
