import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
export const Header = () => {
  return (
    <div className="Header">
      <div className="Header-Left">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          Home
        </Link>
      </div>
      <div className="Header-right">
        <div className="Header-Right-Item">
          <Link
            to="/products"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            Products
          </Link>
        </div>
      </div>
    </div>
  );
};
