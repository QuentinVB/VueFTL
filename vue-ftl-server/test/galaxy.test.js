const assert = require('assert');
const { expect } = require('chai');
const uuid = require('uuid');
const {Galaxy,StarSystem,StellarType} = require('../models');

describe('Galaxy tests', () => {
    before(async()=>{
        await Galaxy.sync();
        await StarSystem.sync();
        await StellarType.sync();
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
    describe('Stored Galaxy Test', () => {
        const starNames = [ "Sol","AlphaCentauri","Barnard Star"]
        //arrange
        before(async () => {
            
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
        })
        after(async () => {
            await Galaxy.drop();
            await StarSystem.drop();
        })

        it('should have stored info', async () => {
            //act
            const sut = await Galaxy.findByPk(1);
            //assert
            expect(sut.uuid).to.be.not.null;
            expect(sut.starCount).to.equal(3);
            expect(sut.radius).to.equal(500);
            expect(sut.type).to.equal("elliptical");
        });
        it('picking randomly a system should return a linked StarSystem', async () => {
            //act
            const sut = await Galaxy.findByPk(1);
            const starSystem = await sut.pickRandomStarSystem();
            //assert
            expect(starSystem.uuid).to.be.not.null;
            expect(starSystem.name).to.be.oneOf(starNames);
        });
    });
    //TODO : test add star system
});