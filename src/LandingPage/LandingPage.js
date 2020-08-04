import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import logo from "../App/logo.png";

export default function LandingPage() {
  return (
    <section className="LandingPageContainer">
      <main className="LandingPage">
        <h2 className="LPHeader">Welcome to Shoppa</h2>
        <img src={logo} alt="Shoppa_logo" className="shoppa_logo"></img>
        <p>
          This web app will allow you to save your favorite stores and create a
          grocery shopping list
        </p>
        <Link to="/s-list">
          {""}
          <button className="LPButton">Start</button>{" "}
        </Link>
      </main>
    </section>
  );
}
