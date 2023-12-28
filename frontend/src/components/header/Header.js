import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useUserContext } from "../../context/UserContext";

export const Header = () => {
  const { currentUser, signOut, userContextLoading } = useUserContext();

  if (userContextLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="Header">
      <div className="Header-Left">
        <Link to="/">Home</Link>
      </div>
      <div className="Header-right">
        <div className="Header-Right-Item">
          <Link to="/products">Products</Link>
          {currentUser ? (
            <>
              <Link
                onClick={() => signOut()}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link to="/signUp">Sign Up</Link>
              <Link to="/signIn">Sign In</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
