const { expect } = require("chai");
const uuid = require("uuid");
const ShipFactory = require("../Factories/ShipFactory.js");
const {Ship,User,Cargo} = require("../models");

describe("Ship tests", () => {
	before(async()=>{
		await Cargo.sync();
		await User.sync();
		await Ship.sync();
	});
	/*
	after(async()=>{
		await User.drop();
		await Cargo.drop();
		await Ship.drop();
	});
	*/
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
		it("should return the real damages taken", () => {
			//arrange
			const sut = Ship.EmptyShip();
			const damageDealt = 10;
			const realDamages = Math.floor(damageDealt*sut.hullFactor);
			//act
			//assert
			expect(sut.takeDamage(damageDealt)).to.equal(realDamages);
		});
		it("should throw because cant dealt negative damages", () => {
			//arrange
			const sut = Ship.EmptyShip();
			const damageDealt = -10;
			//act assert
			expect(function(){sut.takeDamage(damageDealt);}).to.throw();
		});
		it("should return the current hull points", () => {
			//arrange
			const sut = Ship.EmptyShip();
			const initialHull  =10;
			sut.hull = initialHull;
			const hullrepared = 20;
			//act
			//assert
			expect(sut.repair(hullrepared)).to.equal(hullrepared+initialHull);
		});
		it("should be max hull points", () => {
			//arrange
			const sut = Ship.EmptyShip();
			const hullfixed=Ship.HULLMAX*2;
			sut.fuel = 0;
			//act
			sut.repair(hullfixed);
			//assert
			expect(sut.hull).to.equal(Ship.HULLMAX);
		});
	});
	describe("Ship Can Move Tests", () => {
		it("can't move with fuel to 0", () => {
			//arrange
			const sut = Ship.EmptyShip();
			sut.fuel = 0;
			//act
			//assert
			expect(sut.canMove("","")).to.be.false;
		});
		it("can't move if landed", () => {
			//arrange
			const sut = Ship.EmptyShip();
			sut.location.situation="landed";
			//act
			//assert
			expect(
				sut.canMove("","")
			).to.be.false;
		});
		it("can't move to nothing", () => {
			//arrange
			const sut = Ship.EmptyShip();
			//act
			//assert
			expect(sut.canMove("","")).to.be.false;
		});
		it("can move to a starsystem", () => {
			//arrange
			const sut = Ship.EmptyShip();
			//act
			//assert
			expect(sut.canMove(uuid.v4(),"")).to.be.true;
		});
		it("can't move to the actual starsystem", () => {
			//arrange
			const sut = Ship.EmptyShip();
			const starSystemUUId = uuid.v4();
			sut.location.starsystem=starSystemUUId;
			//act
			//assert
			expect(sut.canMove(starSystemUUId,"")).to.be.false;
		});
		it("can't move to the actual planet", () => {
			//arrange
			const sut = Ship.EmptyShip();
			const starSystemUUId = uuid.v4();
			const planetUUId = uuid.v4();
			sut.location.starsystem=starSystemUUId;
			sut.location.planet=planetUUId;
			//act
			//assert
			expect(sut.canMove(starSystemUUId,planetUUId)).to.be.false;
		});
	});
	//todo : cargobay tests
});
