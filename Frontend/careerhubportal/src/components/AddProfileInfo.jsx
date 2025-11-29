import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const AddProfileInfo = () => {
  const { loggedIn } = useContext(UserContext);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [inputFields, setInputFields] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
    headline: "",
    summary: "",
    skills: "",
    country: "",
    city: "",
    avatar: "",
  });

  useEffect(() => {
    if (!loggedIn?._id) return;

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/getUserProfileById/${loggedIn._id}`,
          { withCredentials: true }
        );

        if (res.data?.data) {
          setInputFields((prev) => ({
            ...prev,
            ...res.data.data,
          }));
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [loggedIn]);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setInputFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddInfo = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/addUserProfile",
        { ...inputFields, userId: loggedIn._id },
        { withCredentials: true }
      );

      setMessage(res.data.message || "Profile updated!");
    } catch (err) {
      console.error(err);
      setMessage("Failed saving info");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="main-container">
      <form className="inside-card" onSubmit={handleAddInfo}>
        {message && <p className="response-message">{message}</p>}

        {/* FIRST NAME */}
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            onChange={handleTextChange}
            value={inputFields.firstName}
          />
        </div>

        {/* LAST NAME */}
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            onChange={handleTextChange}
            value={inputFields.lastName}
          />
        </div>

        {/* NICK NAME */}
        <div className="form-group">
          <label>Nick Name:</label>
          <input
            type="text"
            name="nickName"
            onChange={handleTextChange}
            value={inputFields.nickName}
          />
        </div>

        {/* HEADLINE */}
        <div className="form-group">
          <label>Headline:</label>
          <textarea
            name="headline"
            onChange={handleTextChange}
            value={inputFields.headline}
          />
        </div>

        {/* SUMMARY */}
        <div className="form-group">
          <label>About:</label>
          <textarea
            name="summary"
            onChange={handleTextChange}
            value={inputFields.summary}
          />
        </div>

        {/* SKILLS */}
        <div className="form-group">
          <label>Skills:</label>
          <input
            type="text"
            name="skills"
            onChange={handleTextChange}
            value={inputFields.skills}
          />
        </div>

        {/* COUNTRY */}
        <div className="form-group">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            onChange={handleTextChange}
            value={inputFields.country}
          />
        </div>

        {/* CITY */}
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            onChange={handleTextChange}
            value={inputFields.city}
          />
        </div>

        <button className="btn btn-primary">Save Info</button>
      </form>
    </div>
  );
};

export default AddProfileInfo;
