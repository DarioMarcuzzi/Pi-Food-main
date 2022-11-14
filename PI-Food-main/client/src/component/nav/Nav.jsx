import React from "react";
import { useState } from "react";
import './nav.css';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllRecipesMayor70} from "../../action/action";








const Nav = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");

  
  
  const renderRecipes = (e) => {
  dispatch(getAllRecipesMayor70(e.target.value))
  setOrder(e.target.value);
  console.log(order)
  
  }
  return (
    <div className="contenedor-nav">
      <div className="div-nav">
        <h1>Nav</h1>
      </div>
      <div>
        <button
        value={'Mayor70'}
        onClick={renderRecipes}
        >Dario</button>
      </div>
      <div>
        <Link to="/recipes/create">
          <button
         
          >Create Recite</button>
        </Link>
      </div>

    </div>
  );
}
export default Nav;