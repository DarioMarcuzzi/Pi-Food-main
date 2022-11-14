// import { LOCAL_HOST } from "./index";
import { GET_RECIPES, GET_RECIPE_BY_ID,GET_RECIPES_BY_NAME, ALPHABETICAL_SORT,ORDER_HEALT_SCORE,DIET_TYPE_FILTER,RESET,GET_RECIPES_MAYOR_70 } from "../action/index.js";
import axios from "axios";


export function  getAllRecipes() {
    return  async function(dispatch) {
      await axios.get(`http://localhost:3001/recipes`)   
      .then((response) => {
      return dispatch({type: GET_RECIPES, payload: response.data})
      }).catch((error) => {
      console.log(error)
  }
  )
}};

export function getRecipeById(id) {
    return function(dispatch) {
      axios.get(`http://localhost:3001/recipes/${id}`)   
      .then((response) => {
      return dispatch({type: GET_RECIPE_BY_ID, payload: response.data})
      }).catch((error) => {
      console.log(error)
  }
  )
}};

export function postRecipe(newRecipe){
  return async function() {
      try {
      
        const response = await axios.post("http://localhost:3001/recipes/create", newRecipe)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
  }
}


// export function  getRecipeByName(name){
//   return async function(dispatch) {
//     try{
//       const response = await axios.get(`http://localhost:3001/recipes?name=${name}`)
//       return dispatch({type: GET_RECIPES_BY_NAME, payload: response.data})
//     }catch(error){
//       console.log(error)
//     }

//   }
// }

export function getRecipeByName(name){
 return function(dispatch) {
   axios.get(`http://localhost:3001/recipes?name=${name}`)
    .then((response) => {
    return dispatch({type: GET_RECIPES_BY_NAME, payload: response.data})
    }).catch((error) => {
    console.log(error)})}}






export function alphabetialSort(payload){
  return {
    type: ALPHABETICAL_SORT,
    payload
  }
} 

export function orderHealtScore(payload){
  return {
    type: ORDER_HEALT_SCORE,
    payload
  }
}
export function actionFilterDietTypes(payload) {
  return {
      type: DIET_TYPE_FILTER,
      payload
  }


};

export function reset (payload) {
  return {
    type: RESET,
    payload:{}
  }
}

export function getAllRecipesMayor70 (payload){
  return {
    type: GET_RECIPES_MAYOR_70,
    payload
  }
}


