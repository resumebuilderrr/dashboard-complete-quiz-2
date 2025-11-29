import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CreativeVisual from "../templates/CreativeVisual";
import ClassicProfessional from "../templates/ClassicProfessional";

function ResumeBuilder({ state }) {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [templateName, setTemplateName] = useState(state?.templateName || "");

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

        // If templateName was not passed via state, get it from backend
        if (!templateName && res.data.data.templateName) {
          setTemplateName(res.data.data.templateName);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchResume();
  }, [id, templateName]);

  if (!resume) return <h2>Loading Resume...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      {templateName === "CreativeVisual" && <CreativeVisual id={id} />}
      {templateName === "ClassicProfessional" && (
        <ClassicProfessional id={id} />
      )}
      {templateName === "ModernMinimalist" && (
        <h2>Modern Template Coming Soon</h2>
      )}
      {templateName === "ATSSimple" && <h2>ATS Template Coming Soon</h2>}
      {templateName === "Executive" && <h2>Executive Template Coming Soon</h2>}
      {templateName === "StudentTemplate" && (
        <h2>Student Template Coming Soon</h2>
      )}
      {!templateName && <h2>Please select a template</h2>}
    </div>
  );
}

export default ResumeBuilder;
