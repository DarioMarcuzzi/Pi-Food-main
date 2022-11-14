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


    <div id="pokedex">
  <div id="left">
    <div id="logo"></div>
    <div id="bg_curve1_left"></div>
    <div id="bg_curve2_left"></div>
    <div id="curve1_left">
      <div id="buttonGlass">
        <div id="reflect"> </div>
      </div>
      <div id="miniButtonGlass1"></div>
      <div id="miniButtonGlass2"></div>
      <div id="miniButtonGlass3"></div>
    </div>
    <div id="curve2_left">
      <div id="junction">
        <div id="junction1"></div>
        <div id="junction2"></div>
      </div>
    </div>
    <div id="screen">
      <div id="topPicture">
        <div id="buttontopPicture1"></div>
        <div id="buttontopPicture2"></div>
      </div>
      <div id="picture">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/200653/psykokwak.gif" alt="psykokwak" height="170" />
      </div>
      <div id="buttonbottomPicture"></div>
      <div id="speakers">
        <div class="sp"></div>
        <div class="sp"></div>
        <div class="sp"></div>
        <div class="sp"></div>
      </div>
    </div>
    <div id="bigbluebutton"></div>
    <div id="barbutton1"></div>
    <div id="barbutton2"></div>
    <div id="cross">
      <div id="leftcross">
        <div id="leftT"></div>
      </div>
      <div id="topcross">
        <div id="upT"></div>
      </div>
      <div id="rightcross">
        <div id="rightT"></div>
      </div>
      <div id="midcross">
        <div id="midCircle"></div>
      </div>
      <div id="botcross">
        <div id="downT"></div>
      </div>
    </div>
  </div>
  <div id="right">
    <div id="stats">
      <strong>Name:</strong> Psyduck<br/>
      <strong>Type:</strong> Water<br/>
      <strong>Height:</strong> 2'072''<br/>
      <strong>Weight:</strong> 43.2 lbs.<br/><br/>
      <strong>The duck Pokemon</strong><br/>
      Uses mysterious powers to perform various attacks.
    </div>
    <div id="blueButtons1">
      <div class="blueButton"></div>
      <div class="blueButton"></div>
      <div class="blueButton"></div>
      <div class="blueButton"></div>
      <div class="blueButton"></div>
    </div>
    <div id="blueButtons2">
      <div class="blueButton"></div>
      <div class="blueButton"></div>
      <div class="blueButton"></div>
      <div class="blueButton"></div>
      <div class="blueButton"></div>
    </div>
    <div id="miniButtonGlass4"></div>
    <div id="miniButtonGlass5"></div>
    <div id="barbutton3"></div>
    <div id="barbutton4"></div>
    <div id="yellowBox1"></div>
    <div id="yellowBox2"></div>
    <div id="bg_curve1_right"></div>
    <div id="bg_curve2_right"></div>
    <div id="curve1_right"></div>
    <div id="curve2_right"></div>
  </div>
</div>
    
    // <div>
    //   <h1>Details</h1>

    //   <div>
    //     <h2>{detail.name}</h2>
    //     <img src={detail.image} alt="No se cargo la Imagen" />
    //   </div>

    //   <div>
    //       <p>{descripcion}</p>
    //   </div>

    //   <div>
    //     <h2>Diet type:</h2>
    //     <>{detail.dietTypes?.map
    //       (dietType => {
    //         return <li key={dietType.id}>{dietType}</li>
    //       } 
    //     )}</>
    //   </div>

    //   <div>
    //     <h2>Dish types:</h2>
    //     <>{detail.dishTypes?.map(dishTypes => {return <li key={dishTypes.id}>{dishTypes}</li>}) } 
        
    //     </>
    //   </div>

    //   <div>
    //     <h2> Healt score: </h2>
    //     <p>{detail.healthScore}</p>
    //   </div>
      
    //   <div>
    //     <h2>Steps:</h2>
    //       <ol>
    //         {steps?.map(step =>{
    //           return <li key={step.id}>{step}</li>
    //         }) }
    //       </ol>

    //   </div>

    //     <br/>
    //   <div>
    //     <Link
       
    //     to="/recipes">
    //       <button onClick={reset}
    //     >Back</button>
    //     </Link>

    //   </div>
      
    // </div>
  );
}