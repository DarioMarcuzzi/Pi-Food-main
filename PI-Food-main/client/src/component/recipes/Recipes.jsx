//COMPONENTE PARA RENDERIZAR LAS RECETAS
import React from "react";
import { Link } from "react-router-dom";


export  default function Recipes(recipes) {
  const { name, image, dietTypes, id, healthScore} = recipes;
  return (
    <div>
      <div>
        <h1
        >{name}</h1>
      </div>
      <Link to={`/recipes${id}`}
        >
          <img
              src={image} 
              alt={name}/>
      </Link>
      <div>
        <h2>healthScore</h2>
        <p>{healthScore}</p>
      </div>

      <div>
        <h2>DietType</h2>

        <>{dietTypes.map
          (dietType => {
            return <li key={dietType.id} >{dietType}</li>
          }
        )}</>

        
        

      </div>



    </div>    
  );
}  






