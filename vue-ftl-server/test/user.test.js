const { expect } = require("chai");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const database = require("../models");
const User = database["User"];

const saltRounds = 2;
const testPassword = "thisIsATestPassword";

describe("User tests", () => {
	describe("Stored User tests", () => {
		beforeEach(async () => {
			await User.sync();
			await User.create({
				id: 1,
				username: "John Doe",
				email: "john.doe@example.com",
				passwordHash: "",
				uuid: uuid.v4(),
				credits: User.STARTCREDITS,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		});
        
		afterEach(async () => {
			await User.drop();
		});
		it("should have a value from DB", async () => {
			//const sut = await User.findOne({ where: { id: 1 }})
			const sut = await User.findByPk(1);
            
			expect(sut.uuid).to.be.not.null;
			expect(sut.username).to.equal("John Doe");
			expect(sut.email).to.equal("john.doe@example.com");
			expect(sut.credits).to.equal(User.STARTCREDITS);
		});
	});
	//TODO : will use auth library
	describe("User Password tests", () => {
		//arrange
		const sut = User.findByPk(1);

		//act
		sut.passwordHash = bcrypt.hashSync(testPassword, saltRounds);

		//asserts
		it("Hashed and stored password should match", () => {
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