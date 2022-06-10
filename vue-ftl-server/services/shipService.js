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
 * Unload a cargo of the specified type and quantity
 * @param {String} type the requested type of cargo
 * @param {Number} quantityrequested the requested quantity of cargo
 * @returns {(Cargo|Boolean)} the cargo unloaded or false
 */
module.exports.unloadCargo =  async function(ship, type, quantityRequested) {
	//if (quantityRequested > Cargo.MAXCARGOCAPACITY) throw "cant request a cargo with this quantity";
	//type should by a valid type ?
	let availableCargo = await Cargo.findAll({
		where: {ShipId : ship.id, content: type},
		order: [["quantity", "ASC"]]}
	);

	if(!availableCargo) return false; //or null ?

	const sum = availableCargo.reduce((p,c)=>p + c.quantity);

	if(sum < quantityRequested) return false;

	let quantityCollected = 0;
	let idx = 0;
	do {
		

		idx ++;
	} while (quantityCollected < quantityRequested && idx < availableCargo.length);

	//availableCargo.sort((a,b)=>a.quantity-b.quantity);


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
