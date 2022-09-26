const { getRandomIntInclusive,getRandomInt } =require( "../helpers/Random.js");
const {GREEKALPHABET,NAMESOURCE} = require("../helpers/Naming.js");
const {StarSystem,StellarType}   =  require("../models");
const PlanetFactory = require("./PlanetFactory");

const MINPLANETORBIT = 0.2; //UA
const MAXPLANETORBIT = 30; //UA

module.exports.MINPLANETORBIT = MINPLANETORBIT;
module.exports.MAXPLANETORBIT = MAXPLANETORBIT;

/**
 * Return a procedurally generated StarSystem Instance without the planets
 * @param {{x:Number,y:Number,z:Number}} starSystemPosition 
 * @returns {StarSystem} 
 */
module.exports.GenerateRandomStarSystem = async function(starSystemPosition)
{
	const newStarSystem = StarSystem.DefaultStarSystem();
	newStarSystem.name = getRandomName();
	newStarSystem.position = starSystemPosition;

	const stellarType = await this.GetRandomStellarType();
	newStarSystem.AddStellarType(stellarType);

	//TODO : should store and randomize
	//newStarSystem.color= stellarType.color; 
  
	const planetCount = getRandomIntInclusive(1,10);
	newStarSystem.planetesCount = planetCount ;
  
	
	return newStarSystem;
};

/**
 * Add planets to the Starsystem
 * @param {StarSystem} starSystem 
 * @returns {StarSystem} 
 */
module.exports.PopulateStarSystemWithPlanets = async function(starSystem)
{
	const planetCount = starSystem.planetesCount;
	const a = MINPLANETORBIT;
	const b = Math.pow(MAXPLANETORBIT/MINPLANETORBIT, 1/planetCount);

	//const newPlanets = [];

	for (let i = 0; i < planetCount; i++) {

		let orbit = a * Math.pow(b,i);
		orbit += orbit*(Math.random()*0.5);

		const planet = PlanetFactory.GenerateRandomPlanetAt(starSystem,orbit);
		//newPlanets.push(planet);
		await planet.save();	
	}
	//x= r Cos i
	//y= r Sin i
	//r=sqrt(x²+y²)
	//i = atan (y/x)
};

function getRandomName()
{
	//TODO : name from same sector have the same "constellation name" then different greek alphabet, and number
	return GREEKALPHABET[getRandomInt(0,GREEKALPHABET.length)]+" "+NAMESOURCE[getRandomInt(0,NAMESOURCE.length)]+"-"+getRandomIntInclusive(1,9);
}

module.exports.GetRandomStellarType = async function ()
{
	const count = await StellarType.count();
	const index = getRandomIntInclusive(1,Math.max(1,count-1));
	console.log(index);
	return await StellarType.findByPk(index);
};

