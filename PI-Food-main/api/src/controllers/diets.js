let { Router } = require('express');
const { Diet, Recipe } = require('../db.js');
const {carryDietTypesDb} = require('../services/diet.js');
const router = Router();


// CUANDO SE LLAMA A ESTE ENDPOINT, SE CARGA TODOS LOS DIETAS DE LA BASE DE DATOS
router.get('/', async (req, res) => {
  const recipe = await carryDietTypesDb()
  console.log(recipe);
  res.send(recipe); 
} );

  
module.exports = router;  