const assert = require('assert');
const { expect } = require('chai');
const uuid = require('uuid');
const {StellarType} = require('../models');
const StarSystemFactory = require('../Factories/StarSystemFactory.js');


describe('StellarType tests', function() {

    describe('Empty StellarType Test', function() {
        before(async()=>{
            await StellarType.sync();
        })
        let defaultStellarType;
        //arrange
        beforeEach(async function() {
            defaultStellarType = StellarType.DefaultStellarType();
        });

        afterEach(async function() {
            defaultStellarType = null;
        })

        it('should have default info', function() {
            //act
            //assert
            expect(defaultStellarType.name).to.equal("Blackhole");
            expect(defaultStellarType.baseColor).to.equal("#000000");
            expect(defaultStellarType.colorRGB).to.eql([0,0,0]);
            expect(defaultStellarType.baseRadius).to.equal(0);
        });
    });
    describe('Basic stored StellarType Test', function() {
        //arrange
        beforeEach(async function() {
            await StellarType.create({
                id: 1,
                name: "Blackhole",
                colorRGB: [0,0,0],
                baseRadius:0.1,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        })
        afterEach(async function() {
            await StellarType.destroy({where:{id:1}});
        })

        it('should have stored info', async function() {
            //act
            const sut = await StellarType.findByPk(1);
            //assert
            expect(sut.name).to.equal("Blackhole");
            expect(sut.baseColor.toLowerCase()).to.equal("#000000");
            expect(sut.colorRGB).to.eql([0,0,0]);
            expect(sut.baseRadius).to.equal(0.1);
        });
    });
    describe('StellarType from Factory Methods tests', function() {
        this.timeout(5000);
        before(async function(){
            await StellarType.sync();
        })
        const stellarArray =[
            {
                name: "Blackhole",
                colorRGB: [0,0,0],
                baseRadius:0.1
            },
            {
                name:'White Dwarf',
                color:[230,230,255],
                baseRadius:0.2
            },
            {
                name:'Blue Super Giant',
                color:[0,100,255],
                baseRadius:3
            }
        ];
        //arrange
        beforeEach(async function() {
            await StellarType.bulkCreate(stellarArray);
        })
        afterEach(async function() {
            await StellarType.drop();
        });
        it('should return a valid stellar Type', async function() { 
            //act
            const stellarCount = await StellarType.count();
            const stellarType = await StarSystemFactory.GetRandomStellarType();

            //assert
            expect(stellarCount).to.be.equal(3);
            expect(stellarType.name).to.be.oneOf(stellarArray.map(i=>i.name));
            expect(stellarType.baseColor).to.be.not.null;
            expect(stellarType.colorRGB).to.be.not.null;
            expect(stellarType.baseRadius).to.be.oneOf(stellarArray.map(i=>i.baseRadius));
        });
    });
});