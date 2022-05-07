const assert = require('assert');
const { expect } = require('chai');
const uuid = require('uuid');
const {PlanetType} = require('../models');

describe('PlanetType tests', () => {
    before(async()=>{
        await PlanetType.sync();
    })
    describe('Empty PlanetType Test', () => {
        let defaultPlanetType;
        //arrange
        beforeEach(async () => {
            defaultPlanetType = PlanetType.DefaultPlanetType();
        });

        afterEach(async () => {
            defaultPlanetType = null;
        })

        it('should have default info', () => {
            //act
            //assert
            expect(defaultPlanetType.name).to.equal("Silicate");
            expect(defaultPlanetType.baseColor).to.equal("#000000");
            expect(defaultPlanetType.colorRGB).to.eql([0,0,0]);
            expect(defaultPlanetType.baseRadius).to.equal(0);
            expect(defaultPlanetType.landable).to.equal(true);
        });
    });
    describe('Basic stored PlanetType Test', () => {
        //arrange
        beforeEach(async () => {
            await PlanetType.create({
                id: 1,
                name: "Super-Earth",
                colorRGB: [12,44,196],
                baseRadius:1.5,
                landable:true,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        })
        afterEach(async () => {
            await PlanetType.drop();
        })

        it('should have stored info', async () => {
            //act
            const sut = await PlanetType.findByPk(1);
            //assert
            expect(sut.name).to.equal("Super-Earth");
            expect(sut.baseColor.toLowerCase()).to.equal("#0c2cc4");
            expect(sut.colorRGB).to.eql([12,44,196]);
            expect(sut.baseRadius).to.equal(1.5);
            expect(sut.landable).to.be.true;
        });
    });
    /*
    describe('Random PlanetType test', () => {
        it('should have an entropy higher than 0.8', () => {
            //arrange
            let n = 100;
            let valid = 0;
            let setOfPlanetTypes = new Set();
            for (let i = 0; i < n; i++) {
                //act
                const PlanetType = PlanetType.GetRandomPlanetType();
                valid += setOfPlanetTypes.add(PlanetType) ? 1 : 0;
            }
            //assert
            expect(valid / n).to.greaterThan(0.8);
        });

    });*/
});