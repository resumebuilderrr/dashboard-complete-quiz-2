import { createContext, useState, useEffect } from "react";

// Create context
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/isLoggedIn", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        //Backend now sends: { loggedIn: true/false, user: {...} }
        if (data.loggedIn) {
          setLoggedIn(data.user);
        } else {
          setLoggedIn(null);
        }

        setLoading(false);
      })
      .catch(() => {
        setLoggedIn(null);
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn, loading }}>
      {children}
    </UserContext.Provider>
  );
};
