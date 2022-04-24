const assert = require('assert');
const { expect } = require('chai');
const db = require('../models');
const PlanetFactory = require('../Factories/PlanetFactory.js');
const PlanetType = db["PlanetType"];

const fakeStarSystem = { id: 1, name: "proxima", planetesCount: 1 };
const fakePlanetType = PlanetType.create({ id: 1, name: 'Earth analog planet', baseColor: "#18629e", baseRadius: 1, landable: true });

describe('Planet tests', () => {
    describe('Default Planet tests', () => {
        let sut;
        before(async () => {
            //arrange
            sut = await PlanetFactory.GeneratePlanet(fakeStarSystem, 1, fakePlanetType);
        });
        //asserts
        it('should have a uuid', () => {
            expect(sut.uuid).to.be.not.null;
        });
        it('should have name equals to "proxima-a"', () => {
            expect(sut.name).to.equal("proxima-a");
        });
        it('should have color equals to base color', () => {
            expect(sut.color).to.equal("#18629e");
        });
        it('should have a redius inbetween values', () => {
            expect(sut.radius).to.above(1.0);
            expect(sut.radius).to.below(2.05);
        });
        it('should be linked to StarSystem', () => {
            expect(sut.StarSystemId).to.equal(fakeStarSystem.id);
        });
        it('should be linked to PlanetType', () => {
            expect(sut.PlanetTypeId).to.equal(fakePlanetType.id);
        });
        it('should have a mineral deposit inbetween values', () => {
            expect(sut.minerals).to.above(0);
            expect(sut.minerals).to.below(100);
        });

        //orbit

    });
});