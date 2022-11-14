import { GET_RECIPES } from '../action/index.js';
import { GET_RECIPE_BY_ID } from '../action/index.js';
import { POST_RECIPE } from '../action/index.js';
import { GET_RECIPES_BY_NAME } from '../action/index.js';
import { ALPHABETICAL_SORT } from '../action/index.js';
import { ORDER_HEALT_SCORE } from '../action/index.js';
import { DIET_TYPE_FILTER } from '../action/index.js';
import { RESET } from '../action/index.js';
import { GET_RECIPES_MAYOR_70 } from '../action/index.js';
// import Recipes from '../component/recipes/Recipes.jsx';

const initialState = {
  recipes: [],
  allRecipes: [],
  dietTypes: [],
  recipeDetails: [],
  recipeFilter: []
}


export default function rootReducer(state = initialState, action) {
  switch (action.type) {
      case GET_RECIPES:
        if(state.recipes.length > 0 ){
          return{
            ...state,
          }
        } else {
          return {
            ...state,
            recipes: action.payload,
            allRecipes: action.payload
          }
        }

      case GET_RECIPE_BY_ID:
        return {
          ...state,
          recipeDetails: action.payload
        }

      case POST_RECIPE:
        return {
          ...state,
        }

      case GET_RECIPES_BY_NAME:
        return {
          ...state,
          recipes: action.payload,
          // recipeFilter: action.payload
        }

      case ALPHABETICAL_SORT:
        let sortedRecipesAlphabetical = [...state.recipes]       
        sortedRecipesAlphabetical = action.payload === 'A-Z' ?
        state.recipes.sort(function(a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          return 0;
        }) :
        state.recipes.sort(function(a, b) {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          return 0;
        });          
        return {

          ...state,
          recipes: sortedRecipesAlphabetical
        };

      case ORDER_HEALT_SCORE: 
      let sortedRecipesByScore = [...state.recipes] 
      sortedRecipesByScore = action.payload === 'Min' ?
      state.recipes.sort(function(a, b) {
        if (a.healthScore > b.healthScore) return 1;
        if (a.healthScore < b.healthScore) return -1;
        return 0;
      }) :
      state.recipes.sort(function(a, b) {
        if (a.healthScore < b.healthScore) return 1;
        if (a.healthScore > b.healthScore) return -1;
        return 0;
      });
      return {
        ...state,
        recipes: sortedRecipesByScore
      };

      case DIET_TYPE_FILTER:
        let filteredRecipes = [...state.recipes]
        let result = []

        if(action.payload.length === 0){
          return {
            ...state,
            recipes: state.allRecipes
          } 
        } else {
          for(let i = 0; i< action.payload.length; i++){
            result = filteredRecipes.filter(e=> e.dietTypes.includes(action.payload[i]))
  
          }
          return {
            ...state,
            recipes: result
          }
          
        }
      case GET_RECIPES_MAYOR_70:
        console.log(action.payload)
         return{

         }


      case RESET:
        if(action.payload === 'reset'){
        return {
          ...state,
          recipeDetails: [],
    
        } 
        } else {
          return {
            ...state,
            recipes: state.allRecipes
          }
        }
        

  
        
        default:
          return state;
        }

    }
  

