const { expect } = require("chai");
const uuid = require("uuid");
const ShipFactory = require("../Factories/ShipFactory.js");
const ShipService  = require("../services/shipService.js");
const {User,Ship, StellarType, Cargo,Location,Galaxy,StarSystem,Planet} = require("../models");
const { Situation, Reference } = require("../helpers/Naming.js");

describe("Ship Movement tests", () => {
	let milkyWay;
	let solSystem;
	before(async()=>{
		await User.sync();
		await Cargo.sync();
		await Ship.sync();
		await Location.sync();
		await Galaxy.sync();
		await StarSystem.sync();
		await StellarType.sync();
		await Planet.sync();

		milkyWay = await Galaxy.create({
			id: 1,
			uuid: uuid.v4(),
			starCount: 2,
			radius:500,
			type:"elliptical",
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		solSystem =await StarSystem.create({
			id: 1,
			uuid: uuid.v4(),
			name: "Sol",
			position:{x:1,y:1,z:1}
		});
		await milkyWay.addStarSystem(solSystem);
		await milkyWay.addStarSystem(await StarSystem.create({
			id: 2,
			uuid: uuid.v4(),
			name:"AlphaCentauri",
			position:{x:2,y:5,z:7}
		}));
	});
	
	after(async()=>{
		await User.drop();
		await Cargo.drop();
		await Ship.drop();
		await Location.drop();
		await Galaxy.drop();
		await StarSystem.drop();
		await StellarType.drop();
		await Planet.drop();
	});
	
	//TODO : user link test
	describe("Ship location test", () => {
		//arrange
		let defaultShip;

		beforeEach(async () => {
			defaultShip = await ShipFactory.CreateDefaultShip();
		});
		afterEach(async () => {
			await Ship.destroy({
				truncate: true
			});
			await Location.destroy({
				truncate: true
			});
		});
		it("should have location associated", async () => {
			//arrange
			//act
			const shipFromDB = await Ship.findOne({ where: { id: defaultShip.id }, include: Location  });
			//assert
			expect(shipFromDB.Location).to.be.not.null;
		});

		it("should have right location info when set to a location", async () => {
			//arrange
			//act
			await ShipService.setLocationTo(defaultShip,milkyWay);
			//assert
			const shipFromDB = await Ship.findOne({ where: { id: defaultShip.id }, include: Location  });
			expect(shipFromDB.Location).to.be.not.null;
			expect(shipFromDB.Location.situation).to.be.equal(Situation.STANDING);
			expect(shipFromDB.Location.position).to.eql( { x: 0, y: 0, z: 0 });
			expect(shipFromDB.Location.reference).to.eql( { reference: Reference.GALAXY, id:1 });
		});

		it("should change location when set to another location", async () => {
			//arrange
			await ShipService.setLocationTo(defaultShip,milkyWay);
			//act
			await ShipService.setLocationTo(defaultShip,solSystem);
			//assert
			const shipFromDB = await Ship.findOne({ where: { id: defaultShip.id }, include: Location  });
			expect(shipFromDB.Location).to.be.not.null;
			expect(shipFromDB.Location.situation).to.be.equal(Situation.STANDING);
			expect(shipFromDB.Location.GalaxyId).to.be.equal(null);
			expect(shipFromDB.Location.StarSystemId).to.be.equal(1);
			expect(shipFromDB.Location.PlanetId).to.be.equal(null);
			expect(shipFromDB.Location.position).to.eql( { x: 0, y: 0, z: 0 });
			expect(shipFromDB.Location.reference).to.eql( { reference: Reference.STARSYSTEM, id:1 });
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
