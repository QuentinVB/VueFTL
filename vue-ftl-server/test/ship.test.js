const { expect } = require("chai");
const uuid = require("uuid");
const ShipFactory = require("../Factories/ShipFactory.js");
const ShipService  = require("../services/shipService.js");
const {Ship, User, Cargo} = require("../models");

describe("Ship tests", () => {
	before(async()=>{
		await Cargo.sync();
		await User.sync();
		await Ship.sync();
	});
	
	after(async()=>{
		await User.drop();
		await Cargo.drop();
		await Ship.drop();
	});
	
	describe("Empty Ship Tests", () => {
		//arrange
		let defaultShip;
		beforeEach(async () => {
			defaultShip = ShipFactory.GetDefaultShip();
		});

		afterEach(async () => {
			defaultShip = null;
		});
        
		//act
		it("should have default info", () => {
			//assert
			expect(defaultShip.name).to.equal("Von Braun");
			expect(defaultShip.fuel).to.equal(Ship.FUELMAX);
			expect(defaultShip.hull).to.equal(Ship.HULLMAX);
		});
	});
	describe("Ship Fuel Tests", () => {
		//arrange
		let defaultShip;
		beforeEach(async () => {
			defaultShip = ShipFactory.GetDefaultShip();
		});

		afterEach(async () => {
			defaultShip = null;
		});

		it("should return the default consumed fuel value", async() => {
			//act
			const consumed = Ship.FUELCONSUMPTION*(1-defaultShip.fuelEfficiency);
			//assert
			expect(defaultShip.consumeFuel()).to.equal(consumed);
			await defaultShip.save();
		});

		it("should consume 0 when no fuel", () => {
			//act
			defaultShip.fuel = 0;
			//assert
			expect(defaultShip.consumeFuel()).to.be.equal(0);
		});

		//TODO : test with the increasing cargo and mass

		it("should refuel to 50 units", () => {
			//arrange
			const fuelfixed=50;
			defaultShip.fuel = 0;
			//act
			defaultShip.refuel(fuelfixed);
			//assert
			expect(defaultShip.fuel).to.equal(fuelfixed);
		});

		it("should refuel to max fuel", () => {
			//arrange
			const fuelfixed=Ship.FUELMAX*2;
			defaultShip.fuel = 0;
			//act
			defaultShip.refuel(fuelfixed);
			//assert
			expect(defaultShip.fuel).to.equal(Ship.FUELMAX);
		});

		it("should throw because cant refuel negative value", () => {
			//arrange
			const fuelfixed=-200;
			//act assert
			expect(function(){defaultShip.refuel(fuelfixed);}).to.throw();
		});
	});
	describe("Ship Hull Tests", () => {
		//arrange
		let defaultShip;
		beforeEach(async () => {
			defaultShip = ShipFactory.GetDefaultShip();
		});

		afterEach(async () => {
			defaultShip = null;
		});

		it("should return the real damages taken", () => {
			//arrange
			const damageDealt = 10;
			const realDamages = Math.floor(damageDealt*defaultShip.hullFactor);
			//act
			//assert
			expect(defaultShip.takeDamage(damageDealt)).to.equal(realDamages);
		});
		it("should throw because cant dealt negative damages", () => {
			//arrange
			const damageDealt = -10;
			//act assert
			expect(function(){defaultShip.takeDamage(damageDealt);}).to.throw();
		});
		it("should return the current hull points when repaired", () => {
			//arrange
			const initialHull =10;
			const hullrepared = 20;
			defaultShip.hull = initialHull;
			//act
			//assert
			expect(defaultShip.repair(hullrepared)).to.equal(hullrepared+initialHull);
			expect(defaultShip.hull).to.equal(hullrepared+initialHull);
		});
		it("should be max hull points when repaired more than the max hull", () => {
			//arrange
			const hullfixed=Ship.HULLMAX*2;
			defaultShip.hull = 0;
			//act
			defaultShip.repair(hullfixed);
			//assert
			expect(defaultShip.hull).to.equal(Ship.HULLMAX);
		});
	});
	describe("Cargo loading/unloading Tests", function() {
		//this.timeout(250000);
		//arrange
		let defaultShip;
		let simpleCargo;
		let secondaryCargo;
		let thirdCargo;
		beforeEach(async () => {
			defaultShip = ShipFactory.GetDefaultShip();
			defaultShip = await defaultShip.save();
			simpleCargo = await Cargo.create({
				uuid: uuid.v4(),
				content: "Hydrogen",
				quantity: 25,
			});
			secondaryCargo = await Cargo.create({
				uuid: uuid.v4(),
				content: "Hydrogen",
				quantity: 20,
			});
			thirdCargo = await Cargo.create({
				uuid: uuid.v4(),
				content: "Hydrogen",
				quantity: 15,
			});
		});

		afterEach(async () => {
			await Cargo.destroy({
				truncate: true
			});
			await Ship.destroy({
				truncate: true
			});
		});

		it("should load a basic cargo", async() => {
			//arrange
			//act
			await ShipService.LoadCargo(defaultShip, simpleCargo);
			//assert
			const shipFromDB = await Ship.findOne({ where: { id: defaultShip.id }, include: Cargo  });
			expect(shipFromDB.Cargos.length).to.equal(1);

			const cargoFromDB = shipFromDB.Cargos[0];
			expect(cargoFromDB.uuid).to.be.not.null;
			expect(cargoFromDB.content).to.equal("Hydrogen");
			expect(cargoFromDB.quantity).to.equal(25);
		});
		it("should load cargo with excedent", async() => {
			//arrange
			await ShipService.LoadCargo(defaultShip, simpleCargo);
			await ShipService.LoadCargo(defaultShip, secondaryCargo);

			//act
			await ShipService.LoadCargo(defaultShip, thirdCargo);

			//assert
			const shipFromDB = await Ship.findOne({ where: { id: defaultShip.id }, include: Cargo  });
			expect(shipFromDB.Cargos.length).to.equal(3);

			const arrayOfQuantity = shipFromDB.Cargos.map(v=>v.quantity);
			expect(arrayOfQuantity).to.have.members([25, 25, 10]);
		});
	});
	//TODO : user link test
	describe("Ship Can Move Tests", () => {
		//arrange
		let defaultShip;
		beforeEach(async () => {
			defaultShip = ShipFactory.GetDefaultShip();
		});

		afterEach(async () => {
			defaultShip = null;
		});
		it("can't move with fuel to 0", () => {
			//arrange
			defaultShip.fuel = 0;
			//act
			//assert
			expect(defaultShip.canMove("","")).to.be.false;
		});
		it("can't move if landed", () => {
			//arrange
			defaultShip.location.situation="landed";
			//act
			//assert
			expect(
				defaultShip.canMove("","")
			).to.be.false;
		});
		it("can't move to nothing", () => {
			//arrange
			//act
			//assert
			expect(defaultShip.canMove("","")).to.be.false;
		});
		it("can move to a starsystem", () => {
			//arrange
			//act
			//assert
			expect(defaultShip.canMove(uuid.v4(),"")).to.be.true;
		});
		it("can't move to the actual starsystem", () => {
			//arrange
			const starSystemUUId = uuid.v4();
			defaultShip.location.starsystem=starSystemUUId;
			//act
			//assert
			expect(defaultShip.canMove(starSystemUUId,"")).to.be.false;
		});
		it("can't move to the actual planet", () => {
			//arrange
			const starSystemUUId = uuid.v4();
			const planetUUId = uuid.v4();
			defaultShip.location.starsystem=starSystemUUId;
			defaultShip.location.planet=planetUUId;
			//act
			//assert
			expect(defaultShip.canMove(starSystemUUId,planetUUId)).to.be.false;
		});
	});
	//todo : cargobay tests
});
