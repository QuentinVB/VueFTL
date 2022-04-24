
/*
import assert from 'assert';
import {expect} from 'chai';
import { Sequelize } from 'sequelize';
import * as Uuid from 'uuid';
import Ship from '../models/Ship.js';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory'
})
sequelize.authenticate();
Ship.init(sequelize);

describe('Ship tests', () => {
    describe('Empty Ship Tests', () => {
        //arrange
        
        //act
        const sut = Ship.EmptyShip();

        it('name should be equal to "Von Braun"', () => {
            //assert
            expect(sut.name).to.equal("Von Braun");
        });
        it('fuel should be equal to fuel max', () => {
            //assert
            expect(sut.fuel).to.equal(Ship.FUELMAX);
        });
        it('hull should be equal to max hull', () => {
            //assert
            expect(sut.hull).to.equal(Ship.HULLMAX);
        });
    });
    describe('Ship Fuel Tests', () => {
       
        it('should return the consumed fuel', () => {
             //arrange
            const sut = Ship.EmptyShip();
            //act
            const consumed = Ship.FUELCONSUMPTION*(1-sut.fuelEfficiency);
            //assert
            expect(sut.consumeFuel()).to.equal(consumed);
        });

        it('should return false', () => {
            //arrange
           const sut = Ship.EmptyShip();
           sut.fuel = 0;
           //act
           //assert
           expect(sut.consumeFuel()).to.be.false;
       });

       //TODO : test with the increasing cargo and mass

       it('should be 50', () => {
            //arrange
            const sut = Ship.EmptyShip();
            const fuelfixed=50;
            sut.fuel = 0;
            //act
            sut.refuel(fuelfixed);
            //assert
            expect(sut.fuel).to.equal(fuelfixed);
        });

        it('should be max fuel', () => {
            //arrange
            const sut = Ship.EmptyShip();
            const fuelfixed=Ship.FUELMAX*2;
            sut.fuel = 0;
            //act
            sut.refuel(fuelfixed);
            //assert
            expect(sut.fuel).to.equal(Ship.FUELMAX);
        });

        it('should throw because cant refuel negative value', () => {
            //arrange
            const sut = Ship.EmptyShip();
            const fuelfixed=-200;
            //act assert
            expect(function(){sut.refuel(fuelfixed);}).to.throw();
        });
    });
    describe('Ship Hull Tests', () => {
        it('should return the real damages taken', () => {
             //arrange
            const sut = Ship.EmptyShip();
            const damageDealt = 10;
            const realDamages = Math.floor(damageDealt*sut.hullFactor)
            //act
            //assert
            expect(sut.takeDamage(damageDealt)).to.equal(realDamages);
        });
        it('should throw because cant dealt negative damages', () => {
            //arrange
            const sut = Ship.EmptyShip();
            const damageDealt = -10
            //act assert
            expect(function(){sut.takeDamage(damageDealt);}).to.throw();
        });
        it('should return the current hull points', () => {
            //arrange
           const sut = Ship.EmptyShip();
           const initialHull  =10;
           sut.hull = initialHull;
           const hullrepared = 20;
           //act
           //assert
           expect(sut.repair(hullrepared)).to.equal(hullrepared+initialHull);
       });
       it('should be max hull points', () => {
        //arrange
        const sut = Ship.EmptyShip();
        const hullfixed=Ship.HULLMAX*2;
        sut.fuel = 0;
        //act
        sut.repair(hullfixed);
        //assert
        expect(sut.hull).to.equal(Ship.HULLMAX);
   });
    });
    describe('Ship Can Move Tests', () => {
        it('can\'t move with fuel to 0', () => {
            //arrange
            const sut = Ship.EmptyShip();
            sut.fuel = 0
            //act
            //assert
            expect(sut.canMove("","")).to.be.false;
        });
        it('can\'t move if landed', () => {
            //arrange
            const sut = Ship.EmptyShip();
            sut.location.situation="landed";
            //act
            //assert
            expect(
                sut.canMove("","")
                ).to.be.false;
        });
        it('can\'t move to nothing', () => {
            //arrange
            const sut = Ship.EmptyShip();
            //act
            //assert
            expect(sut.canMove("","")).to.be.false;
         });
        it('can move to a starsystem', () => {
           //arrange
           const sut = Ship.EmptyShip();
           //act
           //assert
           expect(sut.canMove(Uuid.v4(),"")).to.be.true;
        });
        it('can\'t move to the actual starsystem', () => {
            //arrange
            const sut = Ship.EmptyShip();
            const starSystemUUId = Uuid.v4();
            sut.location.starsystem=starSystemUUId;
            //act
            //assert
            expect(sut.canMove(starSystemUUId,"")).to.be.false;
         });
         it('can\'t move to the actual planet', () => {
            //arrange
            const sut = Ship.EmptyShip();
            const starSystemUUId = Uuid.v4();
            const planetUUId = Uuid.v4();
            sut.location.starsystem=starSystemUUId;
            sut.location.planet=planetUUId;
            //act
            //assert
            expect(sut.canMove(starSystemUUId,planetUUId)).to.be.false;
         });
    });
    //todo : cargobay tests
});

*/