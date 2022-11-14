let { Router } = require('express');
const { Diet, Recipe } = require('../db.js');
const { getAllRecipes , getRecipesApiById, getRecipesDbById } = require ('../services/recipes.js');



const router = Router();
//ME TRAE TODAS LAS RECETAS DE LA BASE DE DATOS Y DE LA API
router.get('/', async (req, res) => { 
  const { name } = req.query;
  const recipes = await getAllRecipes()
  if(name){
    const recipesByName = recipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()))
      if(recipesByName.length > 0){
      res.send(recipesByName);
      }
      else{res.status(400).send('No se encontro la receta');}
  }

  else {
    
    res.json(recipes);
  }
   
} );


//ME TRAE TODAS LAS RECETAS POR ID DE LA BASE DE DATOS Y DE LA API
router.get('/:id', async(req, res) =>{
  const { id } = req.params;
  try{
    //PREGUNTAMOS SI EL ID TIENE MAS DE 12 CARACTERES (SI ES ASI ES UN ID DE LA DB)
    if (id.length > 12){
      const recipe = await getRecipesDbById(id);
      console.log(recipe)
      res.send(recipe);
      //  A dataDB LE A
  }
  else {
//BUSCAMOS EN LA API
   const apiRecipesById = await getRecipesApiById(id)
    res.json(apiRecipesById);
}

}catch(error){
console.log(error);
}
})

router.post('/create', async (req, res) => {
  const { name, image, dietTypes, summary, healthScore, steps } = req.body;
  
  if(!name || !summary){
    return res.status(400).send('El nombre de la receta, y la explicacion no deben ser nulos');
  }
  try{
    const newRecipe = await Recipe.create({
      name,
      image,
      summary,
      dietTypes, 
      healthScore,
      steps 
    });
    let dietsDB = await Diet.findAll({ where: { name: dietTypes } });
    newRecipe.addDiets(dietsDB);
    res.status(200).send('Receta creada');
  }catch(error){
    console.log(error);
  }
  
  
} );

// router.put('/:id', async (req, res) => {
//   try{
//     const { id } = req.params;
//     const { name, image, dietTypes, summary, healthScore, steps } = req.body;
//     const recipe = await Recipe.findByPk(id);
//     if(!recipe){
//       return res.status(400).send('No se encontro la receta');
//     }
//     recipe.name = name;
//     recipe.image = image;
//     recipe.summary = summary;
//     recipe.healthScore = healthScore;
//     recipe.steps = steps;
//     await recipe.save();
//     let dietsDB = await Diet.findAll({ where: { name: dietTypes } });
//     recipe.addDiets(dietsDB);
//     res.status(200).send('Receta actualizada');
  

//   }
//   catch(error){
//     console.log(error);
//   }
// } );






module.exports = router;