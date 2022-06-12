// eslint-disable-next-line no-unused-vars
const assert = require("assert");
const { expect } = require("chai");
const uuid = require("uuid");
const {StellarType,StarSystem,Location} = require("../models");

describe("StarSystem tests", () => {
	before(async()=>{
		await StellarType.sync();
		await StarSystem.sync();
		await Location.sync();
	});
	describe("Empty StarSystem Test", () => {
		let defaultStarSystem;
		//arrange
		beforeEach(async () => {
			defaultStarSystem = StarSystem.DefaultStarSystem();
		});

		afterEach(async () => {
			defaultStarSystem = null;
		});

		it("should have default info", () => {
			//act
			//assert
			expect(defaultStarSystem.uuid).to.be.not.null;
			expect(defaultStarSystem.name).to.equal("sol");
			expect(defaultStarSystem.planetesCount).to.equal(0);
			expect(defaultStarSystem.position).to.eql( { x: 0, y: 0, z: 0 });
		});
	});
	describe("Basic stored StarSystem Test", () => {
		//arrange
		beforeEach(async () => {
			await StarSystem.create({
				id: 1,
				uuid: uuid.v4(),
				name: "AlphaCentauri",
				planetesCount:3,
				position:{ x: 1, y: 2, z: 3 },
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		});
		afterEach(async () => {
			await StarSystem.drop();
		});

		it("should have stored info", async () => {
			//act
			const sut = await StarSystem.findByPk(1);
			//assert
			expect(sut.uuid).to.be.not.null;
			expect(sut.name).to.equal("AlphaCentauri");
			expect(sut.planetesCount).to.equal(3);
			expect(sut.position).to.eql({ x: 1, y: 2, z: 3 });
		});
	});
	//TODO : test add star system
});