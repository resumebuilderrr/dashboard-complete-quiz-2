import axios from "axios";
import logo from "../assets/robo.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8080/logout", {
        withCredentials: true,
      });

      console.log(res.data.message);
      setLoggedIn(null);

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="logo" className="logo-img" />
        <p className="brand-text">Resumify</p>
      </Link>

      <input type="text" className="search-input" placeholder="Search" />

      <div style={{ display: "flex", paddingRight: "40px" }}>
        <Link to="/" className="nav-link">
          <i className="fa-solid fa-house"></i> Home
        </Link>

        <Link to="/templates" className="nav-link">
          <i class="fa-solid fa-pen-to-square"></i>Templates
        </Link>

        <Link to="/resumes" className="nav-link">
          <i class="fa-solid fa-file"></i> Resumes
        </Link>

        <Link to="/jobs" className="nav-link">
          <i className="fa-solid fa-briefcase"></i> Jobs
        </Link>

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-solid fa-user"></i> Me
          </button>

          <div
            className="dropdown-menu dropdown-menu-start" // <- Added this class
            aria-labelledby="dropdownMenuButton"
          >
            <Link className="dropdown-item" to="/profile">
              Profile
            </Link>

            <Link className="dropdown-item" to="/jobsIPosted">
              Jobs I Created
            </Link>

            <Link className="dropdown-item" to="/jobsIPosted">
              Get AI Suggestions
            </Link>

            {loggedIn ? (
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link className="dropdown-item" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
