"use strict";
const uuid = require("uuid");
//const { getRandomInt } = require("../helpers/Random");
const { Ship } = require("../models");

/**
 * 
 * @returns {Ship}
 */
module.exports.GenerateRandomShip = function () {
	return this.GenerateShip("Von Braun");
};

/**
 * 
 * @returns {Ship}
 */
module.exports.GetDefaultShip = function () {
	return this.GenerateShip("Von Braun");
};


/**
 * Generate a Ship 
 * /!\ not persisted, you must save it !
 * @param {String} name the name of the ship
 * @returns {Ship}
 */
module.exports.GenerateShip = function (name) {

	const ship = Ship.build({
		name: name,
		uuid: uuid.v4(),
		fuel: Ship.FUELMAX,
		hull: Ship.HULLMAX,
		fuelEfficiency:Ship.BASEFUELEFFICIENCY,//20%
		hullFactor: Ship.BASEHULLFACTOR
	});
		/*this.position = {x:0,y:0} ;
  this.location ={starsystem:"",planet:"",situation:"orbiting"};//uuid of starsystem

 
	ship.loadCargo(new Cargo("Iron",25));
*/

	return ship;
};

