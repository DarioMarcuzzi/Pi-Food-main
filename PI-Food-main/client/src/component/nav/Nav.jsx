import React from "react";
import './nav.css';
import { Link } from "react-router-dom";


const Nav = () => {
  return (
    <div className="contenedor-nav">
      <div className="div-nav">
        <h1>Nav</h1>
      </div>
      <div>
        <Link to="/recipes/create">
          <button>Create Recite</button>
        </Link>
      </div>

    </div>
  );
}
export default Nav;