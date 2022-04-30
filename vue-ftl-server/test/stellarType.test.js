const assert = require('assert');
const { expect } = require('chai');
const uuid = require('uuid');
const StarSystemFactory = require('../Factories/StarSystemFactory.js');
const StellarType = require('../models')["StellarType"];

describe('StellarType tests', () => {
    before(async()=>{
        await StellarType.sync();
    })
    describe('Empty StellarType Test', () => {
        let defaultStellarType;
        //arrange
        beforeEach(async () => {
            defaultStellarType = StellarType.DefaultStellarType();
        });

        afterEach(async () => {
            defaultStellarType = null;
        })

        it('should have default info', () => {
            //act
            //assert
            expect(defaultStellarType.name).to.equal("Blackhole");
            expect(defaultStellarType.baseColor).to.equal("#000000");
            expect(defaultStellarType.colorRGB).to.eql([0,0,0]);
            expect(defaultStellarType.baseRadius).to.equal(0);
        });
    });
    describe('Basic stored StellarType Test', () => {
        //arrange
        beforeEach(async () => {
            await StellarType.create({
                id: 1,
                name: "Blackhole",
                colorRGB: [0,0,0],
                baseRadius:0.1,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        })
        afterEach(async () => {
            await StellarType.drop();
        })

        it('should have stored info', async () => {
            //act
            const sut = await StellarType.findByPk(1);
            //assert
            expect(sut.name).to.equal("Blackhole");
            expect(sut.baseColor.toLowerCase()).to.equal("#000000");
            expect(sut.colorRGB).to.eql([0,0,0]);
            expect(sut.baseRadius).to.equal(0.1);
        });
    });
    describe('StellarType from Factory Methods tests', () => {
        before(async()=>{
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
        beforeEach(async () => {
            await StellarType.bulkCreate(stellarArray);
        })
        afterEach(async () => {
            await StellarType.drop();
        })
        it('should return a valid stellar Type', async() => {
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