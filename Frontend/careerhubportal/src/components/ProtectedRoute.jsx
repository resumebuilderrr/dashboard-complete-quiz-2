import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import NotLoggedIn from "./NotLoggedIn";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
function ProtectedRoute({ element: Component }) {
  const location = useLocation();
  const { loggedIn, loading } = useContext(UserContext);

  if (loading) return <p>Loading...</p>;

  return loggedIn ? <Component state={location.state} /> : <NotLoggedIn />;
}

export default ProtectedRoute;
