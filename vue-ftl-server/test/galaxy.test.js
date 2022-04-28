const assert = require('assert');
const { expect } = require('chai');
const uuid = require('uuid');
const Galaxy = require('../models')["Galaxy"];

describe('Galaxy tests', () => {
    before(async()=>{
        await Galaxy.sync();
    })
    describe('Empty Galaxy Test', () => {
        let defaultGalaxy;
        //arrange
        beforeEach(async () => {
            defaultGalaxy = Galaxy.DefaultGalaxy();
        });

        afterEach(async () => {
            defaultGalaxy = null;
        })

        it('should have default info', () => {
            //act
            //assert
            expect(defaultGalaxy.uuid).to.be.not.null;
            expect(defaultGalaxy.starCount).to.equal(1);
            expect(defaultGalaxy.radius).to.equal(20);
            expect(defaultGalaxy.type).to.equal("round");
        });
    });
    describe('Basic stored Galaxy Test', () => {
        //arrange
        beforeEach(async () => {
            await Galaxy.create({
                id: 1,
                uuid: uuid.v4(),
                starCount: 50,
                radius:500,
                type:"elliptical",
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        })
        afterEach(async () => {
            await Galaxy.drop();
        })

        it('should have stored info', async () => {
            //act
            const sut = await Galaxy.findByPk(1);
            //assert
            expect(sut.uuid).to.be.not.null;
            expect(sut.starCount).to.equal(50);
            expect(sut.radius).to.equal(500);
            expect(sut.type).to.equal("elliptical");
        });
    });
    describe('Basic stored Galaxy Test', () => {
        //arrange
        beforeEach(async () => {
            await GalaxyFactory
        })
        afterEach(async () => {
            await Galaxy.drop();
        })

        it('should have stored info', async () => {
            //act
            const sut = await Galaxy.findByPk(1);
            //assert
            expect(sut.uuid).to.be.not.null;
            expect(sut.starCount).to.equal(50);
            expect(sut.radius).to.equal(500);
            expect(sut.type).to.equal("elliptical");
        });
    });
    //TODO : test add star system
});