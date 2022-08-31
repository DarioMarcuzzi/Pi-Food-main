// importar dotenv para leer variables de entorno
require('dotenv').config();

const axios = require('axios');
const { Diet , Recipe } = require('../db.js')

const { API_KEY } = process.env;


// HACEMOS LOS SERVICIOS DE LOS CONTROLADORES
//1)  INTENTAR TRAER TODAS LAS RECETAS DE LA API 
//3)  QUEDARME CON LOS DATOS QUE NECESITAMOS ( ID, NOMBRE, IMAGEN, DIETAS , RESUMEN DEL PLATO, HEALTH SCORE, PASO A PASO,)

const getApiInfo = async () => {
  try{
  const apiUrl =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
  
  const apiInfo = await apiUrl.data.results.map(e => {
      return {
          id: e.id,
          name: e.title,
          image: e.image,
          dietTypes: e.diets,
          summary: e.summary,
          healthScore: e.healthScore,
          dishTypes: e.dishTypes,
          steps: e.analyzedInstructions[0]?.steps.map(e => {
              return {
                  number: e.number,
                  step: e.step
              }
          })
      }
  })
  return apiInfo;

} 
catch(error){
  console.log(error);
}
};



// TRAER TODAS LAS RECETAS DE LA BASE DE DATOS
// INCLUIR LAS DIETAS
const getDbInfo = async () => {
  try{
  const recipesDbInfo = await Recipe.findAll({
    include : {
      model: Diet,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  });
  const a = recipesDbInfo.map(e => {
    return {
      id: e.id,
      name: e.name,
      summary: e.summary,
      score: e.score,
      healthScore: e.healthScore,
      image: e.image,
      steps: e.steps.split('|'),
      dietTypes: e.diets?.map(diet => diet.name)
    }

  })

  return a;
}
catch(error){
  console.log(error);
}
};


//BUSCAR POR ID DE LA BASE DE DATOS
const getRecipesDbById = async (id) => {
  const dataDB = await 
  
  Recipe.findByPk(id,{
      include : {
        model: Diet,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    })
    if(dataDB){
      console.log(dataDB.dataValues);
        const obj = { 
                id: dataDB.id,
                name: dataDB.name,
                summary: dataDB.summary,
                score: dataDB.score,
                healthScore: dataDB.healthScore,
                image: dataDB.image,
                steps: dataDB.steps,
                dietTypes: dataDB.diets?.map(diet => diet.name)
                }
      return(obj);
    }
  }
  
  
  //BUSCAR POR ID EN LA API
  const getRecipesApiById = async (id) => {
    try{
      let RecipesApiById =  await axios.get (`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
      if(RecipesApiById){
        let RecipeDetails = {
                        id: RecipesApiById.data.id,
                        name: RecipesApiById.data.title,
                        image: RecipesApiById.data.image,
                        dishTypes: RecipesApiById.data.dishTypes,
                        dietTypes: RecipesApiById.data.diets,
                        summary: RecipesApiById.data.summary,
                        healthScore: RecipesApiById.data.healthScore,
                        steps: RecipesApiById.data.analyzedInstructions[0]?.steps.map(e => {
                            return {
                                number: e.number,
                                step: e.step
                                  }
                              })
                            }
        return RecipeDetails;
      }
    
    }
    catch(error){
      console.log(error);
    }
    }


// JUNTAR TODAS LAS FUNCIONES EN UN SOLO CONTROLADOR
const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoDbApi = apiInfo.concat(dbInfo);
  
  return infoDbApi;
}



  module.exports = {
    getAllRecipes,
    getRecipesApiById,
    getRecipesDbById
  }