import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function ResumeForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTemplate = location.state?.templateName;

  const [inputFields, setInputsFields] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    websites: "",
    summary: "",
  });

  const [workExperience, setWorkExperience] = useState([
    {
      jobTitle: "",
      company: "",
      location: "",
      achievements: "",
      startDate: "",
      endDate: "",
    },
  ]);

  const [education, setEducation] = useState([
    { degree: "", institution: "", location: "", yearStart: "", yearEnd: "" },
  ]);

  const [skills, setSkills] = useState({
    technicalSkills: "",
    languages: "",
    certifications: "",
    awards: "",
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setInputsFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setSkills((prev) => ({ ...prev, [name]: value }));
  };

  const handleWorkChange = (index, e) => {
    const updated = [...workExperience];
    updated[index][e.target.name] = e.target.value;
    setWorkExperience(updated);
  };

  const handleEducationChange = (index, e) => {
    const updated = [...education];
    updated[index][e.target.name] = e.target.value;
    setEducation(updated);
  };

  const addWorkField = () => {
    setWorkExperience([
      ...workExperience,
      {
        jobTitle: "",
        company: "",
        location: "",
        achievements: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const addEducationField = () => {
    setEducation([
      ...education,
      { degree: "", institution: "", location: "", yearStart: "", yearEnd: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedWork = workExperience.map((job) => ({
      title: job.jobTitle,
      company: job.company,
      description: job.achievements,
      location: job.location,
      duration: {
        startDate: job.startDate,
        endDate: job.endDate,
      },
    }));

    const formattedEducation = education.map((ed) => ({
      title: ed.degree,
      institute: ed.institution,
      location: ed.location,
      duration: {
        startDate: ed.yearStart,
        endDate: ed.yearEnd,
      },
      description: "",
    }));

    const payload = {
      ...inputFields,
      websites: inputFields.websites.split(","),
      workExperience: formattedWork,
      education: formattedEducation,
      technicalSkills: skills.technicalSkills.split(","),
      languages: skills.languages.split(","),
      certifications: skills.certifications.split(","),
      awards: skills.awards.split(","),
      templateName: selectedTemplate,
    };

    try {
      const res = await axios.post("http://localhost:8080/addResume", payload, {
        withCredentials: true,
      });

      if (res.data.success) {
        const resumeId = res.data.data._id;
        navigate(`/resume/${resumeId}`, {
          state: { templateName: selectedTemplate },
        });
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="resume-form container mt-4">
      <div className="inside-card">
        <h2 className="text-center ">Build Your Resume</h2>
        <Form onSubmit={handleSubmit}>
          {/* BASIC INFO */}
          <h4>Basic Information</h4>

          <Row>
            <Col>
              <Form.Control
                placeholder="Full Name"
                name="name"
                onChange={handleTextChange}
                value={inputFields.name}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Address"
                name="address"
                onChange={handleTextChange}
                value={inputFields.address}
              />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <Form.Control
                placeholder="Phone Number"
                name="phoneNumber"
                onChange={handleTextChange}
                value={inputFields.phoneNumber}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Websites (comma separated)"
                name="websites"
                onChange={handleTextChange}
                value={inputFields.websites}
              />
            </Col>
          </Row>

          <Form.Control
            className="mt-3"
            as="textarea"
            rows={3}
            placeholder="Summary"
            name="summary"
            onChange={handleTextChange}
            value={inputFields.summary}
          />

          {/* WORK EXPERIENCE */}
          <h4 className="mt-4">Work Experience</h4>

          {workExperience.map((job, index) => (
            <div key={index}>
              <Row className="mt-2">
                <Col>
                  <Form.Control
                    placeholder="Job Title"
                    name="jobTitle"
                    onChange={(e) => handleWorkChange(index, e)}
                    value={job.jobTitle}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Company"
                    name="company"
                    onChange={(e) => handleWorkChange(index, e)}
                    value={job.company}
                  />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col>
                  <Form.Control
                    placeholder="Location"
                    name="location"
                    onChange={(e) => handleWorkChange(index, e)}
                    value={job.location}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Achievements"
                    name="achievements"
                    onChange={(e) => handleWorkChange(index, e)}
                    value={job.achievements}
                  />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col>
                  <Form.Control
                    type="date"
                    placeholder="Start Date"
                    name="startDate"
                    onChange={(e) => handleWorkChange(index, e)}
                    value={job.startDate}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="date"
                    placeholder="End Date"
                    name="endDate"
                    onChange={(e) => handleWorkChange(index, e)}
                    value={job.endDate}
                  />
                </Col>
              </Row>
            </div>
          ))}

          <Button className="mt-2" onClick={addWorkField}>
            + Add More Work Experience
          </Button>

          {/* EDUCATION */}
          <h4 className="mt-4">Education</h4>

          {education.map((ed, index) => (
            <div key={index}>
              <Row className="mt-2">
                <Col>
                  <Form.Control
                    placeholder="Degree"
                    name="degree"
                    onChange={(e) => handleEducationChange(index, e)}
                    value={ed.degree}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Institution"
                    name="institution"
                    onChange={(e) => handleEducationChange(index, e)}
                    value={ed.institution}
                  />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col>
                  <Form.Control
                    placeholder="Location"
                    name="location"
                    onChange={(e) => handleEducationChange(index, e)}
                    value={ed.location}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Start Year"
                    name="yearStart"
                    onChange={(e) => handleEducationChange(index, e)}
                    value={ed.yearStart}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="End Year"
                    name="yearEnd"
                    onChange={(e) => handleEducationChange(index, e)}
                    value={ed.yearEnd}
                  />
                </Col>
              </Row>
            </div>
          ))}

          <Button className="mt-2" onClick={addEducationField}>
            + Add More Education
          </Button>

          {/* SKILLS */}
          <h4 className="mt-4">Skills & Other Information</h4>

          <Form.Control
            placeholder="Technical Skills (comma separated)"
            name="technicalSkills"
            onChange={handleSkillChange}
            value={skills.technicalSkills}
          />

          <Form.Control
            className="mt-2"
            placeholder="Languages (comma separated)"
            name="languages"
            onChange={handleSkillChange}
            value={skills.languages}
          />

          <Form.Control
            className="mt-2"
            placeholder="Certifications (comma separated)"
            name="certifications"
            onChange={handleSkillChange}
            value={skills.certifications}
          />

          <Form.Control
            className="mt-2"
            placeholder="Awards (comma separated)"
            name="awards"
            onChange={handleSkillChange}
            value={skills.awards}
          />

          <Button className="mt-4 w-100" type="submit">
            Submit Resume
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ResumeForm;
