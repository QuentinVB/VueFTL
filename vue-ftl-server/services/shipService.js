"use strict";
const {Cargo} = require("../models");

//Cargo manangement
/**
 * Try to load cargo into the cargo bay of the ship
 * @param {Ship} targetShip ship that will recieve the cargo
 * @param {Cargo} cargoToLoad cargo to load 
 * @return {boolean} true if the loading succeded, else false
 */
module.exports.LoadCargo = async function (targetShip,cargoToLoad) {
	const cargos = await Cargo.findAll({where:{ShipId:targetShip.id}}) ?? [];
	let cargoToLoadQuantity = cargoToLoad.quantity;

	//TODO : case if maximum capacity is reached , it return false
	if (cargos) {
		for (const cargo of cargos) {
			// if free space, store in and substract the cargoToLoad, save next
			const remainingStorage = Cargo.MAXCARGOCAPACITY - cargo.quantity;
			const delta = cargoToLoadQuantity - remainingStorage;
			
			if(remainingStorage > 0 )
			{
				cargo.quantity += remainingStorage;
				cargoToLoadQuantity = delta;
				await cargo.save();		
			}
		}
	}
	if(cargoToLoadQuantity > 0)
	{
		cargoToLoad.quantity = cargoToLoadQuantity;
		await cargoToLoad.save();
		await targetShip.addCargo(cargoToLoad);
	}
	return true;
};

/**
 * Get the quantity of the specified type from the given ship
 * @param {Ship} targetShip ship that will be checked
 * @param {String} requestedType the requested type of cargo
 * @returns {(Number)} the quantity available
 */
module.exports.getQuantity =  async function(targetShip, requestedType) {
	let availableCargo = await Cargo.findAll({
		where: {ShipId : targetShip.id, content: requestedType},
		order: [["quantity", "ASC"]]}
	);

	if(!availableCargo) return 0; //or null ?

	return availableCargo.reduce((p,c)=>p + c.quantity,0);
};

/**
 * Unload a cargo of the specified type and quantity
 * @param {Ship} targetShip ship that will recieve the cargo
 * @param {String} type the requested type of cargo
 * @param {Number} quantityRequested the requested quantity of cargo
 * @returns {(Number|Boolean)} the quantity unloaded or false
 */
module.exports.unloadCargo =  async function(targetShip, type, quantityRequested) {
	if (quantityRequested <=0) throw "cant request a cargo with negative quantity";
	//type should by a valid type ?
	let availableCargo = await Cargo.findAll({
		where: {ShipId : targetShip.id, content: type},
		order: [["quantity", "ASC"]]}
	);
	const initialQuantityRequested = quantityRequested;
	if(!availableCargo) return false; //or null ?

	const sum = availableCargo.reduce((p,c)=>p + c.quantity,0);

	if(sum < quantityRequested) return false;

	let quantityCollected = 0;
	let idx = 0;
	do {
		const checkedCargo = availableCargo[idx];
		if (checkedCargo.quantity - quantityRequested > 0) {
			quantityCollected += quantityRequested;
			await checkedCargo.increment({quantity: -quantityRequested});
			break;
		}
		else {
			quantityCollected += checkedCargo.quantity;
			quantityRequested -=  checkedCargo.quantity;
			await checkedCargo.destroy();
		}

		idx ++;
	} while (quantityCollected < initialQuantityRequested && idx < availableCargo.length);

	return quantityCollected;
};

//Location will be managed here

//a location is defined by :

/*
A referentiel
-the galaxy itself
-a star system
-a planet

A position
- an orbit with a radii and anomaly
- an absolute coordinate x,y,z

A situation
Landed, Flying
*/

