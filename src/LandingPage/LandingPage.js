import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <main className="LandingPage">
      <h2>Welcome to Shoppa</h2>
      <p>
        This web app will allow you to save your favorite stores and make a
        grocery shopping list
      </p>
      <Link to="/nav">
        {""}
        <button>Start</button>{" "}
      </Link>
    </main>
  );
}
