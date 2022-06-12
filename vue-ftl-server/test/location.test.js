
const { expect } = require("chai");
const {Location,Ship,StarSystem,Planet,Galaxy} = require("../models");
const {Situation} = require("../helpers/Naming.js");

describe("Location tests", () => {
	before(async()=>{

		await Planet.sync();
		await Galaxy.sync();
		await StarSystem.sync();
		await Location.sync();
		await Ship.sync();
	});
	describe("Empty Location Test", () => {
		let emptyLocation;
		//arrange
		beforeEach(async () => {
			emptyLocation = Location.DefaultLocation();
		});

		afterEach(async () => {
			emptyLocation = null;
		});

		it("should have default info", () => {
			//act

			//assert
			expect(emptyLocation.situation).to.equal(Situation.STANDING);
		});
	});
	describe("Basic stored Location Test", () => {
		//arrange
		beforeEach(async () => {
			await Location.create({
				id: 1,
				situation: Situation.STANDING,
			});
		});
		afterEach(async () => {
			await Location.drop();
		});

		it("should return default stored info", async () => {
			//act
			const sut = await Location.findOne({ where: { id: 1 } });
			//assert
			expect(sut.situation).to.equal(Situation.STANDING);
			expect(sut.orbit_semiMajorAxis).to.equal(0);
			expect(sut.orbit_semiMinorAxis).to.equal(0);
			expect(sut.orbit_trueAnomaly).to.equal(0);
			expect(sut.position_X).to.equal(0);
			expect(sut.position_Y).to.equal(0);
			expect(sut.position_Z).to.equal(0);
			expect(sut.reference).to.be.null;
			expect(sut.position).to.eql( { x: 0, y: 0, z: 0 });
			expect(sut.orbit).to.eql( { semiMajorAxis: 0, semiMinorAxis: 0, trueAnomaly: 0 });
		});
	});
});