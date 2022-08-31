import { useEffect , useState} from "react";
import React from "react";
import { getRecipeById, reset } from "../../action/action";
import { useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom"; 
import { useParams } from "react-router-dom";






export default function Home() {

const dispatch = useDispatch();
const detail = useSelector(state => state.recipeDetails);
const [descripcion , setDescripcion] = useState('');
const [steps , setSteps] = useState([]);
const {id} = useParams();

// const description = detail.summary?.replace(/<[^>]*>/g, '') 

// const stepsArray = typeof detail.steps === 'string' ? detail.steps.split('|') : detail.steps?.map(step => step.step);






useEffect(() => {
  dispatch(getRecipeById(id));
  
} , [dispatch, id]);

useEffect(() => {
  setDescripcion(detail.summary?.replace(/<[^>]*>/g, ''));
  setSteps(typeof detail.steps === 'string' ? detail.steps.split('|') : detail.steps?.map(step => step.step));

} , [detail]);





  console.log(detail)
  return (
    <div>
      <h1>Details</h1>

      <div>
        <h2>{detail.name}</h2>
        <img src={detail.image} alt="No se cargo la Imagen" />
      </div>

      <div>
          <p>{descripcion}</p>
      </div>

      <div>
        <h2>Diet type:</h2>
        <>{detail.dietTypes?.map
          (dietType => {
            return <li key={dietType.id}>{dietType}</li>
          } 
        )}</>
      </div>

      <div>
        <h2>Dish types:</h2>
        <>{detail.dishTypes?.map(dishTypes => {return <li key={dishTypes.id}>{dishTypes}</li>}) } 
        
        </>
      </div>

      <div>
        <h2> Healt score: </h2>
        <p>{detail.healthScore}</p>
      </div>
      
      <div>
        <h2>Steps:</h2>
          <ol>
            {steps?.map(step =>{
              return <li key={step.id}>{step}</li>
            }) }
          </ol>

      </div>

        <br/>
      <div>
        <Link
       
        to="/recipes">
          <button onClick={reset}
        >Back</button>
        </Link>

      </div>
      
    </div>
  );
}