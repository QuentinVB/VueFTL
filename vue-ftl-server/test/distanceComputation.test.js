const { expect } = require("chai");
const uuid = require("uuid");
const {User,Ship, StellarType, Cargo,Location,Galaxy,StarSystem,Planet,PlanetType} = require("../models");
const { Situation, Reference  } = require("../helpers/Enum.js");
const ComputeDistance = require("../helpers/ComputeDistance.js");

describe("Compute distance tests", () => {
	let milkyWay;
	let solSystem;
	let centauriSystem;
	let earth;
	let aurora;
	before(async()=>{
		await User.sync();
		await Cargo.sync();
		await Ship.sync();
		await Location.sync();
		await Galaxy.sync();
		await StarSystem.sync();
		await StellarType.sync();
		await Planet.sync();
		await PlanetType.sync();

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
		const planetType = await PlanetType.create({ 
			name: "Earth analog planet", 
			baseColor: "#18629e", 
			baseRadius: 1, 
			landable: true 
		});

		earth = await Planet.create({
			uuid: uuid.v4(),
			name: "earth",
			color: planetType.baseColor,
			orbit: 1.5,
			radius: 6.6,
			minerals: 100,
		});
		earth.setPlanetType(planetType);
		earth.setStarSystem(solSystem);
		
		centauriSystem = await StarSystem.create({
			id: 2,
			uuid: uuid.v4(),
			name:"AlphaCentauri",
			position:{x:2,y:5,z:7}
		});
		await milkyWay.addStarSystem(centauriSystem);

		aurora = await Planet.create({
			uuid: uuid.v4(),
			name: "aurora",
			color: planetType.baseColor,
			orbit: 0.4,
			radius: 5.1,
			minerals: 100,
		});
		aurora.setPlanetType(planetType);
		aurora.setStarSystem(centauriSystem);
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
		await PlanetType.drop();
	});
	
	//TODO : user link test

	describe("Distance computation tests", () => {
		//TODO : write all the 16 tests and situations according to ../helpers/trajectory.md
		//arrange
		let originLocation;
		let destinationLocation;
		//this.timeout(250000);
		
		afterEach(async () => {
			originLocation = null;
			destinationLocation = null;
		});

		it("should return distance between Galaxy position and another Galaxy position", async () => {
			//arrange
			originLocation = Location.build({
				reference:{reference:Reference.GALAXY,id:1},
				position:{ x:0, y:0, z: 0 }
			});
			destinationLocation = Location.build({
				reference:{reference:Reference.GALAXY,id:1},
				position:{ x:1, y:2, z: 3 }
			});
			//act
			const distance = await ComputeDistance(originLocation,destinationLocation);
			//assert
			expect(distance).to.be.closeTo(3.7416, 0.0001);
		});
		it("should return distance between StarSystem and another StarSystem", async () => {
			//arrange
			originLocation = Location.build({
				reference:{reference:Reference.STARSYSTEM,id:1},
				position:{ x:0, y:0, z: 0 }
			});
			destinationLocation = Location.build({
				reference:{reference:Reference.STARSYSTEM,id:1},
				position:{ x:1, y:2, z: 3 }
			});
			//act
			const distance = await ComputeDistance(originLocation,destinationLocation);
			//assert
			expect(distance).to.be.closeTo(3.7416, 0.0001);
		});
		it("should return distance between Planet and another Planet", async () => {
			//arrange
			originLocation = Location.build({
				reference:{reference:Reference.PLANET,id:1},
				position:{ x:0, y:0, z: 0 }
			});
			destinationLocation = Location.build({
				reference:{reference:Reference.PLANET,id:1},
				position:{ x:1, y:2, z: 3 }
			});
			//act
			const distance = await ComputeDistance(originLocation,destinationLocation);
			//assert
			expect(distance).to.be.closeTo(3.7416, 0.0001);
		});
		it("should return distance between Galaxy position and StarSystem", async () => {
			//arrange
			originLocation = Location.build({
				reference:{reference:Reference.GALAXY,id:1},
				position:{ x:0, y:0, z: 0 }
			});
			destinationLocation = StarSystem.build({
				uuid: uuid.v4(),
				name: "Barnard",
				position:{ x:2, y:2, z: 2 }
			});
			//act
			const distance = await ComputeDistance(originLocation,destinationLocation);
			//assert
			expect(distance).to.be.closeTo(3.4641, 0.0001);
		});
		it("should return the distance of the 2 parent starsystem when computing distance between 2 planets in a different system", async () => {
			//arrange
			
			//act
			const distance = await ComputeDistance(earth,aurora);
			//assert
			expect(distance).to.be.closeTo(7.28011, 0.0001);
		});

		it("should return the distance between 2 parent star system when computing distance between location in star system A and planet in statSystem B", async () => {
			//arrange
			originLocation = Location.build({
				reference:{reference:Reference.STARSYSTEM,id:1},
				position:{ x:0, y:0, z: 0 }
			});
			//act
			//TODO : the main factor is if starSystem is the same
			const distance = await ComputeDistance(originLocation,aurora);
			//assert
			expect(distance).to.be.closeTo(7.28011, 0.0001);
		});
	});
});
