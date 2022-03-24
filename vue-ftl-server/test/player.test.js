import assert from 'assert';
import {expect} from 'chai';

import Player from '../models/Player.js';

describe('Player tests', () => {
    describe('Empty Player Test', () => {
        //arrange
        const sut = Player.EmptyPlayer();

        it('should equal "John Doe"', () => {
             //act
            //assert
            expect(sut.username).to.equal("John Doe");
        });
        it('should equal 500', () => {
             //act
            //assert
            expect(sut.credits).to.equal(Player.STARTCREDITS);
        });
    });
    describe('Falsy credits tests', () => {
        it('should equal 0', () => {
            //arrange
            const sut = Player.EmptyPlayer();
            sut.credits = 50;
            //act 
            sut.credits -= 100;
            //assert
            expect(sut.credits).to.equal(0);
        });
    });
});