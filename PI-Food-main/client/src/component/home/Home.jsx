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
      {/* <Nav /> */}
    </div>
    <h1 className="title-home">Home</h1>
    <Searchbar />
    <div className="ContenedorFiltros"> 
        

        <div className="ordenArtz">
          <label>Ordenar por: A - Z
          <select onChange={handleOrderAlphabetical}>
            <option value={"A-Z"}> A - Z</option>
            <option value={"Z-A"}> Z - A</option>
          </select>
          </label>
        </div>
        <div className="ordenMinMax">
          <label>Ordenar por: healt Score
          <select onChange={handleOrderHealthScore}>
            <option value={"Max"}>Max</option>
            <option value={"Min"}>Min</option>
          </select>
          </label>
        </div>
        <div className="dietTypes">
          <h2>Diets types</h2>
          <label>Gluten free:
          <input
            type="checkbox"
            onChange={handleOrderDietTypes}
            name="gluten free"
            value="gluten free"
          />
          </label>
          <label>Ketogenic:
          <input
            type="checkbox"
            onChange={handleOrderDietTypes}
            name="ketogenic"
            value="ketogenic"
          />
          </label>
          <label>Vegetarian:
          <input
            type="checkbox"
            onChange={handleOrderDietTypes}
            name="vegetarian"
            value="vegetarian"
          />
          </label>
          <label>Lacto vegetarian:
          <input
            type="checkbox"
            onChange={handleOrderDietTypes}
            name="lacto vegetarian"
            value="lacto vegetarian"
          />
          </label>
          <label>Ovo vegetarian:
          <input
            type="checkbox"
            onChange={handleOrderDietTypes}
            name="ovo vegetarian"
            value="ovo vegetarian"
          />
          </label>
          <label>Lacto ovo vegetarian:
          <input
            type="checkbox"
            onChange={handleOrderDietTypes}
            name="lacto ovo vegetarian"
            value="lacto ovo vegetarian"
          />
          </label>
          <label>Vegan:
          <input
            type="checkbox"
            onChange={handleOrderDietTypes}
            name="vegan"
            value="vegan"
          />
          </label>
          <label>Pescetarian:
          <input
            type="checkbox"
            onChange={handleOrderDietTypes}
            name="pescetarian"
            value="pescetarian"
          />
          </label>
          <label>Paleolithic:
          <input
            type="checkbox"
            onChange={handleOrderDietTypes}
            name="paleolithic"
            value="paleolithic"
          />
          </label>
          <label>Primal:
          <input
            type="checkbox"
            onChange={handleOrderDietTypes}
            name="primal"
            value="primal"
          />
          </label>
          <label>Low fodmap:
          <input
            type="checkbox"
            onChange={handleOrderDietTypes}
            name="low fodmap"
            value="low fodmap"
          />
          </label>
          <label>Whole 30:
          <input
            type="checkbox"
            onChange={handleOrderDietTypes}
            name="whole 30"
            value="whole 30"
          />
          </label>
          <label>Dairy free:
          <input
            type="checkbox"
            onChange={handleOrderDietTypes}
            name="dairy free"
            value="dairy free"
          />
          </label>
        </div>
    </div>
    <div>
      <button onClick={nextPage}>Next</button>

      <button onClick={prevPage}>Previous</button>
    </div>

    <div className="contenedor-recipes">
      {ListaRecipes.map((recipe) => {
        return (
          <div key={recipe.id} className="recipes">
            <Recipes
              key={recipe.id}
              name={recipe.name}
              id={recipe.id}
              image={recipe.image}
              healthScore={recipe.healthScore}
              dietTypes={recipe.dietTypes?.map((dietTypes) => dietTypes)}
            />
          </div>
        );
      })}
    </div>
    <div>
      <button onClick={nextPage}>Next</button>

      <button onClick={prevPage}>Previous</button>
    </div>
  </div>
);


}