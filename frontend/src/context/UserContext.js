import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

export const UserProvider = (props) => {
  const { children } = props;

  const [currentUser, setCurrentUser] = useState(null);

  const [userContextLoading, setUserContextLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
    setUserContextLoading(false);
  }, []);

  const signUp = (userInfo) => {
    setCurrentUser(userInfo);
  };
  const signIn = (userInfo) => {
    setCurrentUser(userInfo);
  };

  const signOut = () => {
    console.log("UserProvider --> logout");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const UPDATE_USER = async (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setCurrentUser(JSON.parse(updatedUser));
  };

  return (
    <userContext.Provider
      value={{
        currentUser,
        userContextLoading,
        signOut,
        signIn,
        signUp,
        UPDATE_USER,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(userContext);
  return context;
};
