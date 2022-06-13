"use strict";
const uuid = require("uuid");
//const { getRandomInt } = require("../helpers/Random");
const { Ship,Location } = require("../models");
const { Situation } = require("../helpers/Enum");

const ShipParameters = {
	name: "Von Braun",
	uuid : uuid.v4(),
	fuel : Ship.FUELMAX,
	hull: Ship.HULLMAX,
	fuelEfficiency : Ship.BASEFUELEFFICIENCY,
	hullFactor : Ship.BASEHULLFACTOR
};
const LocationParameters = 
{
	situation:Situation.STANDING,
	orbit_semiMajorAxis : 0,
	orbit_semiMinorAxis : 0,
	orbit_trueAnomaly : 0,
	position_X : 0,
	position_Y : 0,
	position_Z : 0,
};

/**
 * Build a Ship with randomized parameters
 * /!\ not persisted, you must save() it !
 * @returns {Ship}
 */
module.exports.GenerateRandomShip = function () {
	return this.BuildShip(ShipParameters);
};

/**
 * Build a Ship with the default parameters
 * /!\ not persisted, you must save() it !
 * @returns {Ship}
 */
module.exports.BuildDefaultShip = function () {
	return this.BuildShip(ShipParameters);
};

/**
 * Build a Ship  with the given parameters
 * /!\ not persisted, you must save it !
 * @param {ShipParameters} shipParameters the parameters to build the ship
 * @returns {Ship}
 */
module.exports.BuildShip = function (shipParameters) {
	const ship = Ship.build(shipParameters);
	return ship;
};

/**
 * Build and persist a Ship with the default parameters and location
 * @returns {Ship}
 */
module.exports.CreateDefaultShip = async function () {
	return await this.CreateShip(ShipParameters,LocationParameters);
};

/**
 * Build and persist a Ship at the given Location
 * @param {ShipParameters} shipParameters the parameters to build the ship
 * @param {LocationParameters} locationParameters the parameters of the location of the ship
 * @returns {Ship}
 */
module.exports.CreateShip = async function (shipParameters,locationParameters) {
	const ship = this.BuildShip(shipParameters);
	await ship.save();
	const location = await Location.create(locationParameters);
	await ship.setLocation(location);
	/*this.position = {x:0,y:0} ;
	this.location ={starsystem:"",planet:"",situation:"orbiting"};//uuid of starsystem
		ship.loadCargo(new Cargo("Iron",25));
	*/
	return ship;
};

/**
 * Persist a Ship at the given unsaved Location
 * @param {Ship} ship the ship to persist
 * @param {Location} locationthe location of the ship to persist
 * @returns {Ship}
 */
module.exports.PersistShip = async function (ship,location) {
	await ship.save();
	await location.save();
	await ship.setLocation(location);
	return ship;
};

