import { Link } from "react-router-dom";

const NotLoggedIn = () => {
  return (
    <div className="main-container">
      <p className="inside-card">
        You need to Log in to access this.
        <Link to="/login">Click here to Login</Link>
      </p>
    </div>
  );
};

export default NotLoggedIn;
