import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const ContactInfo = () => {
  const { loggedIn, loading } = useContext(UserContext);
  const [inputFields, setInputFields] = useState({
    phoneNumber: "",
    phoneType: "",
    address: "",
    websites: "",
    socialLinks: {
      linkedin: "",
      github: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!loggedIn?._id || !loggedIn.profile) return;

    const fetchContactInfo = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/getContactInfo`, {
          withCredentials: true,
        });
        if (res.data.data) {
          setInputFields((prev) => ({
            ...prev,
            ...res.data.data,
            socialLinks: { ...prev.socialLinks, ...res.data.data.socialLinks },
          }));
        }
      } catch (err) {
        console.error("Error fetching contact info:", err);
      }
    };

    fetchContactInfo();
  }, [loggedIn]);

  console.log(loggedIn.profile);
  const handleTextChange = (e) => {
    const { name, value, dataset } = e.target;

    if (dataset.group === "socialLinks") {
      setInputFields((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value },
      }));
    } else {
      setInputFields((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddContactInfo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/addContactInfo/${loggedIn.profile}`,
        inputFields,
        {
          withCredentials: true,
        }
      );
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage("Failed to save contact info");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!loggedIn) return <p>You need to log in to view your profile.</p>;

  return (
    <div className="main-container ">
      <form onSubmit={handleAddContactInfo} className="inside-card">
        {message && <p className="response-message">{message}</p>}

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={inputFields.phoneNumber}
            onChange={handleTextChange}
          />
        </div>

        <div className="form-group">
          <label>Phone Type:</label>
          <div>
            {["Home", "Work", "Mobile"].map((type) => (
              <label key={type} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="phoneType"
                  value={type}
                  checked={inputFields.phoneType === type}
                  onChange={handleTextChange}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={inputFields.address}
            onChange={handleTextChange}
          />
        </div>

        <div className="form-group">
          <label>Websites (comma separated):</label>
          <input
            type="text"
            name="websites"
            value={inputFields.websites}
            onChange={handleTextChange}
          />
        </div>

        <div className="form-group">
          <label>Social Links:</label>
          {["linkedin", "github", "twitter", "facebook", "instagram"].map(
            (platform) => (
              <input
                className="mb-2"
                key={platform}
                type="text"
                name={platform}
                data-group="socialLinks"
                placeholder={
                  platform.charAt(0).toUpperCase() + platform.slice(1)
                }
                value={inputFields.socialLinks[platform]}
                onChange={handleTextChange}
              />
            )
          )}
        </div>

        <button className="btn btn-primary" type="submit">
          Save Contact Info
        </button>
      </form>
    </div>
  );
};

export default ContactInfo;
