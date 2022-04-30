const { getRandomIntInclusive,getRandomInt } =require( "../helpers/Random.js");
const {GREEKALPHABET,NAMESOURCE} = require("../helpers/Naming.js")
const db = require("../models");
const StarSystem = db["StarSystem"];
const StellarType = db["StellarType"];

const MINPLANETORBIT = 0.2; //UA
const MAXPLANETORBIT = 30; //UA

module.exports.MINPLANETORBIT = MINPLANETORBIT;
module.exports.MAXPLANETORBIT = MAXPLANETORBIT;

/**
 * Return a proceduraly generated StarSystem Instance
 * @param {{x:Number,y:Number,z:Number}} starSystemPosition 
 * @returns {StarSystem} 
 */
 module.exports.GenerateRandomStarSystem = async function(starSystemPosition)
{
  const newStarSystem = StarSystem.DefaultStarSystem();
  newStarSystem.name = getRandomName()
  newStarSystem.position = starSystemPosition;

  const stellarType = await this.GetRandomStellarType();
  newStarSystem.AddStellarType(stellarType);

  //TODO : should store and randomize
  //newStarSystem.color= stellarType.color; 
  
  const planetCount = getRandomIntInclusive(1,10);
  newStarSystem.planetesCount = planetCount ;
  
  const a = MINPLANETORBIT;
  const b = Math.pow(MAXPLANETORBIT/MINPLANETORBIT, 1/planetCount);

  //TODO : generate planete later if marked noComplete ?
  /*
  for (let i = 0; i < planetCount; i++) {
    const planet = Planet.generateRandomPlanet(starSystem,i);
    let orbit = a * Math.pow(b,i);
    orbit += orbit*(Math.random()*0.5);
    planet.orbit = orbit;


    //compute planetposition
    
    starSystem.planets.push(planet)
  }*/
  

  //x= r Cos i
  //y= r Sin i
  //r=sqrt(x²+y²)
  //i = atan (y/x)
  return newStarSystem;
}

function getRandomName()
{
  //TODO : name from same sector have the same "constellation name" then different greek alphabet, and number
  return GREEKALPHABET[getRandomInt(0,GREEKALPHABET.length)]+" "+NAMESOURCE[getRandomInt(0,NAMESOURCE.length)]+"-"+getRandomIntInclusive(1,9);
}

module.exports.GetRandomStellarType = async function ()
{
  const count = await StellarType.count()
  const index = getRandomIntInclusive(1,count-1);
  return await StellarType.findByPk(index);
}

