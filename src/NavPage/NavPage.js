import React from "react";
import { Link } from "react-router-dom";

function NavPage() {
  return (
    <main>
      <Link to="/s-list">
        <button>View shopping lists</button>
      </Link>
      <Link to="/c-list">
        <button>Create new list</button>
      </Link>
    </main>
  );
}

export default NavPage;
