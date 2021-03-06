import React from "react";
import { Link } from "react-router-dom";
import "./NavPage.css";

function NavPage() {
  return (
    <main className="NavPage">
      <Link to="/c-list">
        <button className="NPButton bottom">Create new list</button>
      </Link>
      <Link to="/s-list">
        <button className="NPButton top">View shopping lists</button>
      </Link>
    </main>
  );
}

export default NavPage;
