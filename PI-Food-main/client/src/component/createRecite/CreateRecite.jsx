import React from "react";
import Nav from "../nav/Nav.jsx";
import "./createRecipe.css"
import {useState, useEffect } from "react";
import { postRecipe } from "../../action/action.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


export default function CreateRecipe (){

  
  
  const [step, setStep] = useState(1);
  const [listSteps, setListSteps] = useState([]);
  const [stepsDescripcion, setStepsDescripcion] = useState('');
  const [dietTypes, setDietTypes] = useState([]);
  const dispatch = useDispatch();
  
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    summary: '',
    healthScore: Number,
    steps: '',
    dietTypes: [],
  });
  
  
  
  
  useEffect(() => {
    const stepsString = listSteps.join('|');
    setNewRecipe({
      ...newRecipe, 
      steps: stepsString,
      dietTypes: dietTypes
    })

  },[ listSteps, dietTypes]);


  const handleChange = (e) => {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    });
  }
  

  
  const captureSteps = (e) => {
    setStepsDescripcion(e.target.value);
  }

  const AddSteps = (e) => {
    e.preventDefault();
    if(stepsDescripcion !== ''){
      setListSteps([...listSteps, stepsDescripcion]);
      setStep(step + 1);
      setStepsDescripcion('');

    }
    else {
      alert("Por favor ingrese una descripcion para el paso")
    }
    console.log(listSteps);
  }
  
  const captureDiets = (e) => {
    if(e.target.checked){
      setDietTypes([...dietTypes, e.target.name]);
    }
    else {
      dietTypes.splice(dietTypes.indexOf(e.target.name), 1);
    }
    console.log(dietTypes)

}

const  updateRecipe = async (e) => {
  
  if(newRecipe.name.length > 4 && newRecipe.summary.length > 50 && newRecipe.summary.length < 100 && newRecipe.healthScore > 0 && newRecipe.healthScore < 10 && listSteps.length > 0) {
    
    dispatch(postRecipe(newRecipe));
    setNewRecipe({
      name: "",
      summary: "",
      healthScore: 0,
      steps: "",
      dietTypes: [],
    });
    setStep(1);

    console.log(newRecipe);
    alert("Receta creada con exito");
  }
  else {
    alert("Please fill in the form correctly");
  }

}




  return (
    <div className="contenedor-create-recipe">
      <Nav />
      <div className="title-create-recipe">
        <h1>Create you Recipe</h1>
      </div>
      <div className="contenedor-detaill-create-recipe">
      {/* INPUT NAME */}
        <div className="name-create-recipe">
          <h2>Name:</h2>
          <input
            type="text"
            name="name"
            value={newRecipe.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <span>{newRecipe.name.length === 0 ? <h5>ingresa un nombre mayor a 4 caracteres</h5>: newRecipe.name.length < 5? <h5 className="validacion-name-negative">Incorrecto</h5> : <h5 className="validacion-name-correct">Correcto</h5>}</span>
        </div>
        {/* INPUT SUMMARY */}
        <div>
          <h2>summary:</h2>
          <input
            name="summary"
            value={newRecipe.summary}
            type="text"
            placeholder="dish summary"
            onChange={handleChange}
          />
          <h5>{newRecipe.summary.length === 0? <h5>ingresa una descripcion del plato al menos debe tener entre 50 y 100 caracteres</h5>: newRecipe.summary.length > 50 && newRecipe.summary.length < 100? <h5 className="validacion-name-correct">Correcto</h5> : <h5 className="validacion-name-negative">Incorrecto</h5>}</h5>
        </div>
        {/* INPUT HEALTH SCORE */}
        <div>
          <h2>health score</h2>
          <p>Ingrese un numero entre el 0 y el 10</p>
          <input 
                type="number"
                name="healthScore"
                value={newRecipe.healthScore}
                placeholder="8"
                onChange={handleChange}
          />
          <h5>{newRecipe.healthScore !== 0 && newRecipe.healthScore > 0 && newRecipe.healthScore < 10 ? <h5 className="validacion-name-correct">Correcto</h5>:<h5 className="validacion-name-negative">Incorrecto</h5>}</h5>
        </div>
        {/* INPUT STEPS */}
        <div>
          <h2>steps: {step}</h2>
          <textarea 
                  value={stepsDescripcion}
                  name="steps" 
                  type="text" 
                  rows="4" 
                  cols="40"
                  onChange={captureSteps}
            />
            <button onClick={AddSteps}>Agregar Paso</button>
        </div>
        {/* INPUT DIETS */}
        <div>
          <h2>Diets types</h2>
          <label>Gluten free:</label>
          <input 
                type="checkbox" 
                onChange={captureDiets}
                name="gluten free"
                value="gluten free"
          />
          <label>Ketogenic:</label>
          <input 
                type="checkbox"
                onChange={captureDiets}
                name="ketogenic"
                value="ketogenic"
          />
          <label>Vegetarian:</label>
          <input 
                type="checkbox"
                onChange={captureDiets}
                name="vegetarian"
                value="vegetarian"
          />
          <label>Lacto vegetarian:</label>
          <input 
                type="checkbox"
                onChange={captureDiets}
                name="lacto vegetarian"
                value="lacto vegetarian"
          />
          <label>Ovo vegetarian:</label>
          <input 
                type="checkbox" 
                onChange={captureDiets}
                name="ovo vegetarian"
                value="ovo vegetarian"
          />
          <label>Lacto ovo vegetarian:</label>
          <input 
                type="checkbox" 
                onChange={captureDiets}
                name="lacto ovo vegetarian"
                value="lacto ovo vegetarian"
          />
          <label>Vegan:</label>
          <input 
                type="checkbox" 
                onChange={captureDiets}
                name="vegan"
                value="vegan"
          />
          <label>Pescetarian:</label>
          <input 
                type="checkbox" 
                onChange={captureDiets}
                name="pescetarian"
                value="pescetarian"
          />
          <label>Paleolithic:</label>
          <input 
                type="checkbox" 
                onChange={captureDiets}
                name="paleolithic"
                value="paleolithic"
          />
          <label>Primal:</label>
          <input 
                type="checkbox"
                onChange={captureDiets}
                name="primal"
                value="primal"
          />
          <label>Low fodmap:</label>
          <input 
                type="checkbox" 
                onChange={captureDiets}
                name="low fodmap"
                value="low fodmap"
          />
          <label>Whole 30:</label>
          <input 
                type="checkbox" 
                onChange={captureDiets}
                name="whole 30"
                value="whole 30"
          />
          <label>Dairy free:</label>
          <input 
                type="checkbox" 
                onChange={captureDiets}
                name="dairy free"
                value="dairy free"
                />
        </div>
        <div>
        <br/>
                <button onClick={updateRecipe}>CREATE RECIPE</button>
        </div>
        <Link to='/recipes'>
        <button>Home</button>
        </Link>
      </div>
    </div>
  );
}
