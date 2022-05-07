const { getRandomIntInclusive } = require("../helpers/Random.js");
const {Galaxy,StarSystem} = require("../models");
const StarSystemFactory = require("./StarSystemFactory.js");

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

  const newgalaxy = Galaxy.DefaultGalaxy();

  //TODO : switch beahavior here
  for (let i = 0; i < starCount; i++) {

    let angular = Math.random()*Math.PI*2;
    let radius = Math.random() * galaxyRadius;
    
    let x = Math.round(radius * Math.cos(angular));//Random.getRandomIntInclusive(-this.radius,this.radius);
    let y = Math.round(radius * Math.sin(angular));

    const starSystem = await StarSystemFactory.GenerateRandomStarSystem({x:x,y:y,z:0});
    newgalaxy.addStarSystem(starSystem);
    await starSystem.save();
  }
  await newgalaxy.save();
  return newgalaxy;
}

/**
 * Returns a random star system from the given the galaxy
 * @param {Galaxy} galaxy 
 * @returns {StarSystem}
 */
module.exports.GetRandomStarSystemOf = async function(galaxy)
{
  const starSystemsInThisGalaxy = await StarSystem.findAll({where:{galaxyId:galaxy.id}});
  if (starSystemsInThisGalaxy.count != galaxy.starCount) throw new Error("Constraint Violation : star system in galaxy must be the same count as galaxy.starCount");

  const index = getRandomIntInclusive(0,starSystemsInThisGalaxy.count-1);
  return starSystemsInThisGalaxy[index];
}