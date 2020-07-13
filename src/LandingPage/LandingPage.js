import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <main className="LandingPage">
      <h2 className="LPHeader">Welcome to Shoppa</h2>
      <p>
        This web app will allow you to save your favorite stores and create a
        grocery shopping list
      </p>
      <Link to="/nav">
        {""}
        <button className="LPButton">Start</button>{" "}
      </Link>
    </main>
  );
}
