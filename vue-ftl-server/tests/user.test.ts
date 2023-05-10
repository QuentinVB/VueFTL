import "mocha";
import { expect } from "chai";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import sequelize from "../src/sequelize";
import {User} from "../src/models/User.model"

const saltRounds = 2;
const testPassword = "thisIsATestPassword";

describe("User tests", () => {
	before(async function(){
		return sequelize.sync({force: true});
	});
	
	describe("Stored User tests", () => {
		beforeEach(async () => {
			await User.sync();
			await User.create({
				id: 1,
				username: "John Doe",
				email: "john.doe@example.com",
				passwordHash: "",
				uuid: v4(),
				credits: User.STARTCREDITS,
			});
		});
        
		afterEach(async () => {
			await User.drop();
		});
		it("should have a value from DB", async () => {
			//const sut = await User.findOne({ where: { id: 1 }})
			const sut : any = await User.findByPk(1);
            
			expect(sut.uuid).to.be.not.null;
			expect(sut.username).to.equal("John Doe");
			expect(sut.email).to.equal("john.doe@example.com");
			expect(sut.credits).to.equal(User.STARTCREDITS);
		});
	});
	//TODO : will use auth library
	describe("User Password tests", async() => {
		//arrange
		const sut : any = await User.findByPk(1);

		//act
		sut.passwordHash = bcrypt.hashSync(testPassword, saltRounds);

		//asserts
		it("Hashed and stored password should match", () => {
			expect(bcrypt.compareSync(testPassword, sut.passwordHash)).to.be.true;
		});

	});
	
    describe('Credits tests', () => {
        it('Increment should add', async() => {
            //arrange
            const sut = await User.create();
            sut.credits = 50;
            //act 
            sut.credits++;
            //assert
            expect(sut.credits).to.equal(51);
        });
        it('should equal 0', async() => {
            //arrange
            const sut = await User.create();
            sut.credits = 50;
            //act 
            sut.credits -= 100;
            //assert
            expect(sut.credits).to.equal(0);
        });
    });
});