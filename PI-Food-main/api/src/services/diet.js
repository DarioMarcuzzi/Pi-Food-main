const { Diet } = require('../db.js');

const dietTypesDb = [
  'gluten free', 
  'ketogenic',
  'vegetarian',
  'lacto vegetarian',
  'ovo vegetarian',
  'lacto ovo vegetarian',
  'vegan',
  'pescetarian',
  'paleolithic',
  'primal',
  'low fodmap',
  'whole 30',
  'dairy free'
  ]; 

// CARGA TODAS LAS DIETAS EN LA BASE DE DATOS
const carryDietTypesDb = async ()=>{

  const infoDietDb = await Diet.findAll();

  if(infoDietDb.length === 0) {

    for(let i = 0; i < dietTypesDb.length; i++){
      const diet = await Diet.findOrCreate({
        where: {name: dietTypesDb[i]}
      });
    }
  return await Diet.findAll();
    
  }
   
  return infoDietDb; 
}


module.exports={
  carryDietTypesDb
}