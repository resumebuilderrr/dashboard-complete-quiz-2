import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const Navigate = useNavigate();
  const { setLoggedIn } = useContext(UserContext);

  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setInputFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/login", inputFields, {
        withCredentials: true,
      });

      setLoggedIn(res.data.data);
      setMessage(res.data.message);
      Navigate("/");
    } catch (err) {
      console.log(err);
      setMessage("Login failed");
    }
  };

  return (
    <div className="main-container">
      <form className="inside-card" onSubmit={handleLogin}>
        <h2 className="title">Login</h2>

        {message && <p className="auth-message">{message}</p>}

        {/* EMAIL */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="auth-input"
            placeholder="Email"
            value={inputFields.email}
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
            className="auth-input"
            placeholder="Password"
            value={inputFields.password}
            onChange={handleTextChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <p className="para">
          New User? <Link to="/signup">Create Account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
