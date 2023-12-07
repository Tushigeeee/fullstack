import React from "react";
import { Header } from "../../components/header/Header";
import "./Home.css";
export const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        This is Home Page
      </div>
    </div>
  );
};
