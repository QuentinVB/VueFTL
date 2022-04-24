const { getRandomIntInclusive } =require( "../helpers/Random.js");
const db = require("../models");
const Galaxy = db["Galaxy"];
const StarSystem = db["StarSystem"];

/**
 * 
 * @param {Number} starCount 
 * @param {Number} radius 
 * @param {Galaxy.GalaxyType} galaxyType 
 * @returns {Galaxy} 
 */
module.exports.GenerateGalaxy = async function(starCount=10,radius=50,galaxyType=Galaxy.GalaxyType.Round)
{
  if(starCount<1) throw new Error("starCount cant be lower than 1");
  if(radius<1) throw new Error("radius cant be lower than 1");
  if(!Galaxy.GalaxyType.hasOwnProperty(galaxyType)) throw new Error("Galaxy type unknown");

  let newgalaxy = Galaxy.DefaultGalaxy();

  //TODO : switch beahavior here
  for (let i = 0; i < starCount; i++) {
    const starSystem = StarSystem.generateRandomStarSystem(newgalaxy.radius);
    newgalaxy.addStarSystem(starSystem);
  }
  return newgalaxy;
}