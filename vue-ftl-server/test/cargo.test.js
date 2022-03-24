import assert from 'assert';
import {expect} from 'chai';

import Cargo from '../models/Cargo';

describe('Cargo tests', () => {
    describe('Empty Cargo Test', () => {
        //arrange
        //act
        const sut = Cargo.EmptyCargo();

        it('should equal Vaccum', () => {
            //assert
            expect(sut.content).to.equal("Vaccum");
        });
        it('should equal 0', () => {
            //assert
            expect(sut.quantity).to.equal(0);
        });
    });
    describe('Falsy quantity tests', () => {
        it('should throw', () => {
            //arrange
            const sut = Cargo.EmptyCargo();
            //act assert
            expect(
                function(){
                    sut.quantity-=50;
                }
                ).to.throw();
        });
        it('should equal 25', () => {
            //arrange
            const sut = Cargo.EmptyCargo();
            //act 
            sut.quantity+=30;
            //assert
            expect(sut.quantity).to.equal(Cargo.MAXCARGOCAPACITY);
        });
    });
    describe('Random Cargo test', () => {
        it('should have an entropy higher than 0.8', () => {
            //arrange
            let n = 100;
            let valid = 0;
            let setOfCargos = new Set();
            for (let i = 0; i < n; i++) {
            //act
                const cargo = Cargo.GetRandomCargo();
                valid+= setOfCargos.add(cargo)?1:0;
            }
            //assert
            expect(valid/n).to.greaterThan(0.8);
        });

    });
});