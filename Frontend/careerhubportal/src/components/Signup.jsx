import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [inputFields, setInputFields] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setInputFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/signup",
        inputFields,
        {
          withCredentials: true,
        }
      );

      setMessage(res.data.message);
    } catch (err) {
      console.log(err);
      setMessage("Signup failed");
    }
  };

  return (
    <div className="main-container">
      <form className="inside-card" onSubmit={handleSignup}>
        <h2 className="title">Create Account</h2>

        {message && <p className="response-message">{message}</p>}

        {/* EMAIL */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={inputFields.email}
            placeholder="Enter your email"
            onChange={handleTextChange}
            required
          />
        </div>

        {/* USERNAME */}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={inputFields.username}
            placeholder="Enter username"
            onChange={handleTextChange}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={inputFields.password}
            placeholder="Enter password"
            onChange={handleTextChange}
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Signup
        </button>

        <p className="para">
          <Link to={"/login"}>Go to Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
