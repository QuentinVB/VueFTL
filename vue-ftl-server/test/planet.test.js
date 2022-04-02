import assert from 'assert';
import {expect} from 'chai';
import { Sequelize } from 'sequelize';
import Planet from '../models/Planet.js';
import * as PlanetFactory from '../Factories/PlanetFactory.js';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory'
})
Planet.init(sequelize);
const fakeStarSystem = {id:1,name:"proxima",planetesCount:1};
const fakePlanetType = {id:1,name:'Earth analog planet',color:"#18629e",baseRadius:1,landable:true};

describe('Planet tests', () => {
    describe('Default Planet tests', () => {
        //arrange
        const sut = PlanetFactory.GetPlanet(fakeStarSystem,1,fakePlanetType);
        //asserts
        it('should have a uuid"', () => {
           expect(sut.uuid).to.be.not.null;
       });
        it('should have name equals to "proximaA"', () => {
            expect(sut.name).to.equal("proximaA");
        });
        it('should have color equals to base color', () => {
           expect(sut.color).to.equal("#18629e");
        });
        it('should have a redius inbetween values', () => {
            expect(sut.radius).to.above(1.0);
            expect(sut.radius).to.below(2.05);
        });
        it('should be linked to StarSystem', () => {
            expect(sut.starSystemId).to.equal(fakeStarSystem.id);
        });
        it('should be linked to PlanetType', () => {
            expect(sut.planetTypeId).to.equal(fakePlanetType.id);
        });
        //orbit
        //Minerals
    });
});