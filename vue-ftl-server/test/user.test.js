import {expect} from 'chai';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

/*
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory'
})
sequelize.authenticate();
User.init(sequelize);
*/
const saltRounds = 2;
const testPassword = "thisIsATestPassword";

describe('User tests', () => {
    describe('Empty User tests', () => {
        //asserts
        it('should have a uuid"', () => {
           expect(sut.uuid).to.be.not.null;
       });
        it('should equal "John Doe"', () => {
            expect(sut.username).to.equal("John Doe");
        });
        it('should equal "john.doe@example.com"', () => {
           expect(sut.email).to.equal("john.doe@example.com");
       });
        it('should equal 500', () => {
            expect(sut.credits).to.equal(User.STARTCREDITS);
        });
    });
    //TODO : will use auth library
    describe('User Password tests', () => {
        //arrange
        sut.passwordHash = bcrypt.hashSync(testPassword, saltRounds);
        
        //asserts
        it('Hashed and stored password should match', () => {
            expect(bcrypt.compareSync(testPassword, sut.passwordHash)).to.be.true;
        });
       
    });
    /*
    describe('Credits tests', () => {
        it('Increment should add', () => {
            //arrange
            const sut = User.EmptyUser();
            sut.credits = 50;
            //act 
            sut.credits++;
            //assert
            expect(sut.credits).to.equal(51);
        });
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
    */
});