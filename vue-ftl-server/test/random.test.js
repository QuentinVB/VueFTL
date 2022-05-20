/*global describe, beforeEach, afterEach, it*/
/*eslint no-undef: "error"*/

const { expect } = require("chai");
const Random = require("../helpers/Random.js");

describe("Random generator tests", () => {

	describe("GetRandomInt test", () => {
		//arrange
		let results=[];
		const iteration = 100;
		beforeEach(()=>{
			//act
			for (let i = 0; i < iteration; i++) {
				results[i]=Random.getRandomInt(iteration);
			}
		});
		afterEach(()=>{
			results =[];
		});
		it("average and count should be in range", () => {
			//assert
			expect(results.length).to.be.equal(iteration);
			expect(results.reduce((pv,cv)=> pv + cv)/results.length).to.within(40,60);
		});
		it("min value should be inbetween expected extremums", () => {
			//assert
			const minValue = results.reduce((pv,cv)=> pv > cv ? cv : pv);
			expect(minValue).to.be.greaterThanOrEqual(0);
			expect(minValue).to.be.lessThanOrEqual(iteration);
		});
		it("max value should be inbetween expected extremums", () => {
			//assert
			const maxValue = results.reduce((pv,cv)=> pv < cv ? cv : pv);
			expect(maxValue).to.be.greaterThanOrEqual(0);
			expect(maxValue).to.be.lessThanOrEqual(iteration);

		});
	});

	describe("GetRandomIntInclusive test", () => {
		//arrange
		let results=[];
		const iteration = 100;
		beforeEach(()=>{
			//act
			for (let i = 0; i < iteration; i++) {
				results[i]=Random.getRandomIntInclusive(0,iteration);
			}
		});
		afterEach(()=>{
			results =[];
		});
		it("average and count should be in range", () => {
			//assert
			expect(results.length).to.be.equal(iteration);
			expect(results.reduce((pv,cv)=> pv + cv)/results.length).to.within(40,60);
		});
		it("min value should be inbetween expected extremums", () => {
			//assert
			const minValue = results.reduce((pv,cv)=> pv > cv ? cv : pv);
			expect(minValue).to.be.greaterThanOrEqual(0);
			expect(minValue).to.be.lessThanOrEqual(iteration);
		});
		it("max value should be inbetween expected extremums", () => {
			//assert
			const maxValue = results.reduce((pv,cv)=> pv < cv ? cv : pv);
			expect(maxValue).to.be.greaterThanOrEqual(0);
			expect(maxValue).to.be.lessThanOrEqual(iteration);

		});
	});
});