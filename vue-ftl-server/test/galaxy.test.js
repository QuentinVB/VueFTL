
const chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const uuid = require("uuid");
const {Galaxy,StarSystem,StellarType} = require("../models");
const GalaxyFactory = require("../factories/GalaxyFactory.js");

describe("Galaxy tests", function() {
	before(async function(){
		await Galaxy.sync();
		await StarSystem.sync();
		await StellarType.sync();
	});
	describe("Empty Galaxy Test", function() {
		let defaultGalaxy;
		//arrange
		beforeEach(async function() {
			defaultGalaxy = Galaxy.DefaultGalaxy();
		});

		afterEach(async function() {
			defaultGalaxy = null;
		});

		it("should have default info", function() {
			//act
			//assert
			expect(defaultGalaxy.uuid).to.be.not.null;
			expect(defaultGalaxy.starCount).to.equal(1);
			expect(defaultGalaxy.radius).to.equal(20);
			expect(defaultGalaxy.type).to.equal("round");
		});
	});
	describe("Stored Galaxy Test", function() {
		const starNames = [ "Sol","AlphaCentauri","Barnard Star"];
		//arrange
		before(async function() {
			const createdGalaxy = await Galaxy.create({
				id: 1,
				uuid: uuid.v4(),
				starCount: 3,
				radius:500,
				type:"elliptical",
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			await createdGalaxy.addStarSystem(await StarSystem.create({
				id: 1,
				uuid: uuid.v4(),
				name:starNames[0],
			}));
			await createdGalaxy.addStarSystem(await StarSystem.create({
				id: 2,
				uuid: uuid.v4(),
				name: starNames[1],
			}));
			await createdGalaxy.addStarSystem(await StarSystem.create({
				id: 3,
				uuid: uuid.v4(),
				name: starNames[2],
			}));
		});
		after(async function() {
			await Galaxy.destroy({truncate: true});
			await StarSystem.destroy({truncate: true});
		});

		it("should have stored info", async function() {
			//act
			const sut = await Galaxy.findByPk(1);
			//assert
			expect(sut.uuid).to.be.not.null;
			expect(sut.starCount).to.equal(3);
			expect(sut.radius).to.equal(500);
			expect(sut.type).to.equal("elliptical");
		});
		it("picking randomly a system should return a linked StarSystem", async function() {
			//act
			const sut = await Galaxy.findByPk(1);
			const starSystem = await GalaxyFactory.GetRandomStarSystemOf(sut);

			//assert
			expect(starSystem.uuid).to.be.not.null;
			expect(starSystem.name).to.be.oneOf(starNames);
		});
		it("falsy Galaxy starCount Should throw error", async function() {
			//arrange
			const falsyGalaxy = await Galaxy.create({
				id: 2,
				uuid: uuid.v4(),
				starCount: 3,
				radius:500,
				type:"elliptical",
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			//act
			const action =  async ()=> {
				await GalaxyFactory.GetRandomStarSystemOf(falsyGalaxy);
			};
			//assert
			await expect(action()).to.be.rejectedWith(Error);
		});
	});
	//TODO : test add star system
});