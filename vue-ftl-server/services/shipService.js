"use strict";
const {Ship, User, Cargo} = require("../models");

//Cargo manangement
/**
 * Try to load cargo into the cargo bay of the ship
 * @param {Ship} targetShip ship that will recieve the cargo
 * @param {Cargo} cargo cargo to load 
 * @return {boolean} true if the loading succeded, else false
 */
module.exports.LoadCargo = async function (targetShip,cargoToLoad) {
	//load cargos localy
	const cargos = await Cargo.findAll({where:{ShipId:targetShip.id}}) ?? [];
	const cargoNotFull = cargos.find(c => c.content === cargoToLoad.content && c.quantity < Cargo.MAXCARGOCAPACITY);

	//TODO : case if maximum capacity is reached , it return false
	if (cargoNotFull) {
		const remainingStorage = Cargo.MAXCARGOCAPACITY - cargoNotFull.quantity;
		if (remainingStorage >= cargoToLoad.quantity) {
			cargoNotFull.quantity += cargoToLoad.quantity;
		}
		else {
			cargoToLoad.quantity = cargoToLoad.quantity - remainingStorage;
			cargoNotFull.quantity = cargoNotFull.quantity + remainingStorage;
			await targetShip.addCargo(cargoToLoad);
		}
	}
	else {
		await targetShip.addCargo(cargoToLoad);
	}
	return true;
};

/**
 * Unload a cargo of the specified type and quantity
 * @param {String} type the requested type of cargo
 * @param {Number} quantityrequested the requested quantity of cargo
 * @returns {(Cargo|Boolean)} the cargo unloaded or false
 */
module.exports.unloadCargo =  async function(ship, type, quantityRequested) {
	if (quantityRequested > Cargo.MAXCARGOCAPACITY) throw "cant request a cargo with this quantity";
	let { cargosWithRequiredContent, quantitySum } = this.getCargoOf(type);

	if (quantityRequested > quantitySum || cargosWithRequiredContent.length === 0) return false;

	cargosWithRequiredContent.sort((a, b) => a.quantity - b.quantity);

	let quantityToSubstract = 0;
	for (let i = cargosWithRequiredContent.length - 1; i >= 0; i--) {
		const cargo = cargosWithRequiredContent[i];
		if (cargo.quantity - quantityRequested > 0) {
			cargo.quantity -= quantityRequested;
			break;
		}
		else {
			quantityToSubstract = quantityRequested - cargo.quantity;
			cargosWithRequiredContent.pop();
		}
	}

	return new Cargo(type, quantityRequested);
};

//Location will be managed hier
