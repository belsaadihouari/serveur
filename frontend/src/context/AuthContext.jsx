// AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showmessageSignin, setshowmessageSignin] = useState(false);
  const [showmessageError, setshowmessageError] = useState(false);
  const [showmessagerating, setshowmessagerating] = useState(false);
  const [rating, setrating] = useState(null);
  const [emailuser, setemailuser] = useState(null);
  const [Loading, setLoading] = useState(false);
  const login = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwt");
      const res = await fetch(
        "https://server-portfolio-hb.onrender.com/check",
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        // console.error(`Réponse HTTP non OK: ${res.status}`);
        setIsAuthenticated(false);
        return;
      }

      const data = await res.json();
      setrating(data.user.rating);
      setIsAuthenticated(true);
      setLoading(false);
      setemailuser(data.user.email);
      // const extractedData = {
      //   rating: data.user.rating,
      //   id: data.id,
      //   email:data.email
      // };
      return 
    } catch (error) {
      //   console.error("Erreur lors de la requête:", error);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      setLoading(true);
      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        showmessageSignin,
        setshowmessageSignin,
        setshowmessageError,
        showmessageError,
        rating,
        setrating,
        Loading,
        setLoading,
        showmessagerating,
        setshowmessagerating,
        emailuser,
        setIsAuthenticated,
        setemailuser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
