import assert from 'assert';
import {expect} from 'chai';

import Ship from '../models/Ship';

describe('Ship tests', () => {
    describe('Empty Ship Test', () => {
        //arrange
        //act
        const sut = Ship.EmptyShip();

        it('name should equal Von Braun', () => {
            //assert
            expect(sut.name).to.equal("Von Braun");
        });
        it('fuel should equal fuel max', () => {
            //assert
            expect(sut.fuel).to.equal(Ship.FUELMAX);
        });
        it('hull should equal max hull', () => {
            //assert
            expect(sut.hull).to.equal(Ship.HULLMAX);
        });
    });
    
});