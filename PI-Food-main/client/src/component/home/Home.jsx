    import { useEffect, useState } from "react";
    import React from "react";
    import { getAllRecipes, alphabetialSort,orderHealtScore,actionFilterDietTypes } from "../../action/action";
    import { useDispatch, useSelector} from 'react-redux';
    import  Nav  from "../nav/Nav.jsx";
    import './home.css';
    import Recipes from '../recipes/Recipes.jsx';
    import Searchbar from "../searchbar/Searchbar";


    export default function Home() {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);
    const [ order , setOrder ] = useState("");
    const [ pagActual, setPagActual ] = useState(0);
    const [ orderDietTypes, setOrderDietTypes ] = useState([]);
    const [ listaRecipes, setListaRecipes ] = useState([]);

    
    
    useEffect(() => {

      dispatch(getAllRecipes());

      
    } ,[]);

    useEffect(() => {

      setListaRecipes(recipes);
      
      
    } ,[recipes , pagActual]);
    
    
    
     
    useEffect(() => {
    
      dispatch(actionFilterDietTypes(orderDietTypes));
    
    } , [dispatch,pagActual,orderDietTypes]);
    
    
    const nextPage = () => {

     if(listaRecipes.length <= pagActual + 9 ){
    
      setPagActual(pagActual)
      console.log(pagActual)
    }
    else{
      console.log(pagActual)
      setPagActual(pagActual + 9)
    }
  }
    
    const prevPage = () => {
      if(pagActual < 9){
      setPagActual(0);
      }
      else{
        setPagActual(pagActual - 9);
      }
    }
    
    
    const handleOrderAlphabetical = (e) => {
      dispatch(alphabetialSort(e.target.value));
      setOrder(e.target.value);
      console.log(order);
    }

    const handleOrderHealthScore = (e) => {
      setOrder(e.target.value);
      dispatch(orderHealtScore( e.target.value));
      console.log(e.target.value);
    }
    
    const handleOrderDietTypes =  (e) => {
      if(e.target.checked){
        setOrderDietTypes([...orderDietTypes, e.target.value]);
        
      }
    else{
      setOrderDietTypes(orderDietTypes.filter(dietType => dietType !== e.target.value));
      // orderDietTypes.splice(orderDietTypes.indexOf(e.target.value),1);

      
    }
    // setOrderDietTypesString([...orderDietTypesString, e.target.value]);
        
        // setOrderDietTypesString(orderDietTypes.join('|'));

        // let orderDietTypesString = orderDietTypes.join('|');


    }
    
    
    // setListaRecipes(recipes);
    let ListaRecipes = recipes.slice(pagActual, pagActual + 9);
    
    
    
    console.log(listaRecipes);

return (
  <div className="contenedor-home">
    <div className="div-nav">
    <Nav/>
    </div>
    <h1 className="title-home">Home</h1>
      <Searchbar/>
      <div>
        <label>Ordenar por: A - Z</label>
        <select onChange={handleOrderAlphabetical}>
          <option value={"A-Z"}> A - Z</option>
          <option value={"Z-A"}> Z - A</option>
        </select>
      </div>
        <label>Ordenar por: healt Score</label>
        <select onChange={handleOrderHealthScore}>
          <option value={"Max"}>Max</option>
          <option value={"Min"}>Min</option>
        </select>
      <button onClick={nextPage} >Next</button>
      &nbsp;
      <button onClick={prevPage}>Previous</button>
      <div>
          <h2>Diets types</h2>
          <label>Gluten free:</label>
          <input 
                type="checkbox" 
                onChange={handleOrderDietTypes}
                name="gluten free"
                value="gluten free"
          />
          <label>Ketogenic:</label>
          <input 
                type="checkbox"
                onChange={handleOrderDietTypes}
                name="ketogenic"
                value="ketogenic"
          />
          <label>Vegetarian:</label>
          <input 
                type="checkbox"
                onChange={handleOrderDietTypes}
                name="vegetarian"
                value="vegetarian"
          />
          <label>Lacto vegetarian:</label>
          <input 
                type="checkbox"
                onChange={handleOrderDietTypes}
                name="lacto vegetarian"
                value="lacto vegetarian"
          />
          <label>Ovo vegetarian:</label>
          <input 
                type="checkbox" 
                onChange={handleOrderDietTypes}
                name="ovo vegetarian"
                value="ovo vegetarian"
          />
          <label>Lacto ovo vegetarian:</label>
          <input 
                type="checkbox" 
                onChange={handleOrderDietTypes}
                name="lacto ovo vegetarian"
                value="lacto ovo vegetarian"
          />
          <label>Vegan:</label>
          <input 
                type="checkbox" 
                onChange={handleOrderDietTypes}
                name="vegan"
                value="vegan"
          />
          <label>Pescetarian:</label>
          <input 
                type="checkbox" 
                onChange={handleOrderDietTypes}
                name="pescetarian"
                value="pescetarian"
          />
          <label>Paleolithic:</label>
          <input 
                type="checkbox" 
                onChange={handleOrderDietTypes}
                name="paleolithic"
                value="paleolithic"
          />
          <label>Primal:</label>
          <input 
                type="checkbox"
                onChange={handleOrderDietTypes}
                name="primal"
                value="primal"
          />
          <label>Low fodmap:</label>
          <input 
                type="checkbox" 
                onChange={handleOrderDietTypes}
                name="low fodmap"
                value="low fodmap"
          />
          <label>Whole 30:</label>
          <input 
                type="checkbox" 
                onChange={handleOrderDietTypes}
                name="whole 30"
                value="whole 30"
          />
          <label>Dairy free:</label>
          <input 
                type="checkbox" 
                onChange={handleOrderDietTypes}
                name="dairy free"
                value="dairy free"
                />
        </div>


    <div className="contenedor-recipes" >
      {ListaRecipes.map(recipe => {
        return (
          <div className="recipes">        
          <Recipes
          key={recipe.id}
          name={recipe.name}
          id={recipe.id }
          image={recipe.image}
          healthScore={recipe.healthScore}
          dietTypes={recipe.dietTypes?.map(dietTypes => dietTypes)}
        />
      </div>

      )})}
      

    </div>
      
    
  </div>
);


}