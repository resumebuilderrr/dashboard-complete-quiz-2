import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import defaultImage from "../assets/defaultImg.jpg";

const Profile = () => {
  const { loggedIn, loading } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [profileNotFound, setProfileNotFound] = useState(false);

  useEffect(() => {
    if (!loggedIn?._id) return;

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/getUserProfileById/${loggedIn._id}`
        );

        console.log(loggedIn);
        if (!res.data?.data) {
          setProfileNotFound(true);
        } else {
          setUserProfile(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setProfileNotFound(true);
      }
    };

    fetchUserProfile();
  }, [loggedIn]);

  if (loading) return <p>Loading...</p>;
  if (!loggedIn) return <p>You need to log in to view your profile.</p>;

  //no profile created
  if (profileNotFound || !userProfile) {
    return (
      <div className="main-container">
        <div className="inside-card" style={{ textAlign: "center" }}>
          <img
            src={defaultImage}
            alt="Default"
            className="pf image"
            style={{ width: "120px", borderRadius: "50%" }}
          />

          <h2>Welcome {loggedIn.username}. </h2>
          <p>You haven’t set up your profile yet.</p>

          <Link to="/profileInfo" className="btn btn-primary">
            Setup Your Profile
          </Link>
        </div>
      </div>
    );
  }

  //if profile exits, show its details
  const location = `${userProfile.city}, ${userProfile.country}`;

  return (
    <div className="main-container">
      <div className="inside-card">
        {/* <img
          src={userProfile.avatar || defaultImage}
          alt="Profile"
          className="cover image"
        />

        <img
          src={loggedIn.coverPicture || defaultImage}
          alt="Cover"
          className="pf image"
        /> */}

        <br />
        <h3>
          {userProfile.firstName} {userProfile.lastName}
        </h3>
        <h5>{userProfile.headline || "headline"}</h5>
        <p>{userProfile.summary || "about"}</p>
        <p>{location || "Location not set"}</p>

        <Link to="/contactInfo">Contact Info</Link>

        <div className="buttons">
          <Link className="btn btn-primary">Upload Resume</Link>
          <Link className="btn btn-primary" to={"/profileInfo"}>
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
