import assert from 'assert';
import {expect} from 'chai';

import User from '../models/User.js';

describe('User tests', () => {
    describe('Empty User Test', () => {
        //arrange
        const sut = User.EmptyUser();

        it('should equal "John Doe"', () => {
             //act
            //assert
            expect(sut.username).to.equal("John Doe");
        });
        it('should equal 500', () => {
             //act
            //assert
            expect(sut.credits).to.equal(User.STARTCREDITS);
        });
    });
    describe('Falsy credits tests', () => {
        it('should equal 0', () => {
            //arrange
            const sut = User.EmptyUser();
            sut.credits = 50;
            //act 
            sut.credits -= 100;
            //assert
            expect(sut.credits).to.equal(0);
        });
    });
});