/*global describe, beforeEach, afterEach, before, it*/
/*eslint no-undef: "error"*/

const { expect } = require("chai");
const uuid = require("uuid");
const {Cargo,Ship} = require("../models");

describe("Cargo tests", () => {
	before(async()=>{
		await Cargo.sync();
		await Ship.sync();
	});
	describe("Empty Cargo Test", () => {
		let emptyCargo;
		//arrange
		beforeEach(async () => {
			emptyCargo = Cargo.DefaultCargo();
		});

		afterEach(async () => {
			emptyCargo = null;
		});

		it("should have default info", () => {
			//act

			//assert
			expect(emptyCargo.uuid).to.be.not.null;
			expect(emptyCargo.content).to.equal("Vaccum");
			expect(emptyCargo.quantity).to.equal(0);
		});
	});
	describe("Basic stored Cargo Test", () => {
		//arrange
		beforeEach(async () => {
			await Cargo.create({
				id: 1,
				uuid: uuid.v4(),
				content: "Hydrogen",
				quantity: 20,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		});
		afterEach(async () => {
			await Cargo.drop();
		});

		it("should have stored info", async () => {
			//act
			const sut = await Cargo.findOne({ where: { id: 1 } });
			//assert
			expect(sut.uuid).to.be.not.null;
			expect(sut.content).to.equal("Hydrogen");
			expect(sut.quantity).to.equal(20);
		});
	});
	describe("Falsy quantity tests", () => {
		let sut;
		//arrange
		beforeEach(async () => {
			sut = Cargo.DefaultCargo();
		});

		afterEach(async () => {
			sut = null;
		});
		it("setting negative quantity should throw", () => {
			expect(sut.quantity).to.equal(0);
			//act assert
			expect(
				function () {
					sut.quantity = -50;
				}
			).to.throw();
		});
		it("setting overload quantity should throw", () => {
			expect(sut.quantity).to.equal(0);
			//act assert
			expect(
				function () {
					sut.quantity = 50;
				}
			).to.throw();
		});
		it("should equal 20", () => {
			//act 
			sut.quantity = 20;
			//assert
			expect(sut.quantity).to.equal(20);
		});
	});
	describe("Fill quantity tests", () => {
		let sut;
		//arrange
		beforeEach(async () => {
			sut = Cargo.DefaultCargo();
			sut.quantity = 10;
		});

		afterEach(async () => {
			sut = null;
		});
		it("Fill with 10 should return 0", () => {
			//act
			const rest = sut.fill(10);
			//assert
			expect(rest).to.equal(0);
			expect(sut.quantity).to.equal(20);
		});
		it("Fill with more than max should return max value", () => {
			//act
			const rest = sut.fill(20);
			//assert
			expect(rest).to.equal(5);
			expect(sut.quantity).to.equal(Cargo.MAXCARGOCAPACITY);
		});
		it("filling negative quantity should throw", () => {
			//act assert
			expect(
				function () {
					sut.fill(-20);
				}
			).to.throw();
		});
	});
	describe("Drain quantity tests", () => {
		let sut;
		//arrange
		beforeEach(async () => {
			sut = Cargo.DefaultCargo();
			sut.quantity = 10;
		});

		afterEach(async () => {
			sut = null;
		});
		it("Drain 10 should return 0", () => {
			//act
			const rest = sut.tryDrain(10);
			//assert
			expect(rest).to.equal(0);
			expect(sut.quantity).to.equal(0);
		});
		it("Drain more than stored should return the diff", () => {
			//act
			const rest = sut.tryDrain(20);
			//assert
			expect(rest).to.equal(-10);
			expect(sut.quantity).to.equal(0);
		});
		it("draining negative quantity should throw", () => {
			//act assert
			expect(
				function () {
					sut.tryDrain(-20);
				}
			).to.throw();
		});
	});
	describe("Random Cargo test", () => {
		it("should have an entropy higher than 0.8", () => {
			//arrange
			let n = 100;
			let valid = 0;
			let setOfCargos = new Set();
			for (let i = 0; i < n; i++) {
				//act
				const cargo = Cargo.GetRandomCargo();
				valid += setOfCargos.add(cargo) ? 1 : 0;
			}
			//assert
			expect(valid / n).to.greaterThan(0.8);
		});

	});
});