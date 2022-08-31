import React from "react";
import { Link } from "react-router-dom";
import './landingPage.css';

const LandingPage = () => {
  return (
    <div className="contenedor">
      <h1 className="title">Landing Page</h1>
      <Link to="/recipes">
        <button className="boton-inicio">Recipes</button>
      </Link>
    </div>
  );
}

export default LandingPage;