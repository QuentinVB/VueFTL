const assert = require('assert');
const { expect } = require('chai');
const uuid = require('uuid');
const PlanetFactory = require('../Factories/PlanetFactory.js');
const {Galaxy,Planet,PlanetType,StarSystem,StellarType} = require('../models');


const fakeStarSystem = StarSystem.build({ id: 1, uuid: uuid.v4(), name: "proxima", planetesCount: 1 });
const fakePlanetType = PlanetType.build({ id: 1, name: 'Earth analog planet', baseColor: "#18629e", baseRadius: 1, landable: true });

describe('Planet tests', () => {
    before(async()=>{
        await Galaxy.sync();
        await StellarType.sync();
        await PlanetType.sync();
        await Planet.sync();
        await StarSystem.sync();
    })
    describe('Instance Planet Test', () => {
        let defaultPlanet;
        //arrange
        beforeEach(async () => {
            defaultPlanet = PlanetFactory.GeneratePlanet(fakeStarSystem, 1, fakePlanetType);
        });

        afterEach(async () => {
            defaultPlanet = null;
        })

        it('should have default info', () => {
            //act
            //assert
            expect(defaultPlanet.uuid).to.be.not.null;
            expect(defaultPlanet.name).to.equal("proxima-a");
            expect(defaultPlanet.color).to.equal("#18629e");
            expect(defaultPlanet.radius).to.above(1.0);
            expect(defaultPlanet.radius).to.below(2.05);
            expect(defaultPlanet.PlanetTypeId).to.equal(fakePlanetType.id);
            expect(defaultPlanet.StarSystemId).to.equal(fakeStarSystem.id);
            expect(defaultPlanet.minerals).to.above(0);
            expect(defaultPlanet.minerals).to.below(100);
        });
    });
    describe('Mine planet test', () => {
        let defaultPlanet;
        //arrange
        beforeEach(async () => {
            defaultPlanet = PlanetFactory.GeneratePlanet(fakeStarSystem, 1, fakePlanetType);
        });

        afterEach(async () => {
            defaultPlanet = null;
        })

        it('mining should return a value', async() => {
            //arrange
            defaultPlanet.minerals = 50;
            //act
            const valueMined = await defaultPlanet.MinePlanet(1);
            //assert
            expect(valueMined).to.be.greaterThan(0);
            expect(defaultPlanet.minerals).to.be.equal(49);
        });

        it('mining empty planet should return 0', async() => {
             //arrange
             defaultPlanet.minerals = 0;
            //act
            const valueMined = await defaultPlanet.MinePlanet(1);
            //assert
            expect(valueMined).to.be.equal(0);
            expect(defaultPlanet.minerals).to.be.equal(0);
        });
    });
    describe('Basic stored Planet Test', () => {
        //arrange
        beforeEach(async () => {
            await fakePlanetType.save();
            await fakeStarSystem.save();
            
            const planet = PlanetFactory.GeneratePlanet(fakeStarSystem, 1, fakePlanetType);
            await planet.save();
        });

        
        afterEach(async () => {
            await Planet.drop();
            await PlanetType.drop();
            await StarSystem.drop();
        });

        it('should have stored info', async() => {
            //act
            const sut = await Planet.findOne({where:{name:"proxima-a"}});
            const count = await Planet.count();
            //assert
            expect(count).to.equal(1);
            expect(sut.uuid).to.be.not.null;
            expect(sut.name).to.equal("proxima-a");
            expect(sut.color.toLowerCase()).to.be.equal("#18629e");
            expect(sut.radius).to.be.above(1.0);
            expect(sut.radius).to.be.below(2.05);
            expect(sut.StarSystemId).to.be.equal(fakeStarSystem.id);
            expect(sut.PlanetTypeId).to.be.equal(fakePlanetType.id);
            expect(sut.minerals).to.be.above(0);
            expect(sut.minerals).to.be.below(100);
        });
    });
});