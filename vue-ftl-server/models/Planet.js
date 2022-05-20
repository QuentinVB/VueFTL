"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Planet extends Model {

		static associate(models) {
			Planet.belongsTo(models["StarSystem"]);
			Planet.belongsTo(models["PlanetType"]);
		}

		/**
     * Mine this planet, retreive some ore and update planet mineralsQuantity
     * @param {Number} efficiency 
     * @returns a certain quantity of ore
     */
		async MinePlanet(extractionEfficiency = 1)//TODO : add modificator ?
		{
			if(this.minerals <= 0) return 0;

			const BASEEXTRACTION = 5;
			const oreExtracted =  Math.floor(1+ (extractionEfficiency*BASEEXTRACTION*Math.random()));
			this.minerals--;
			await this.decrement("minerals");

			return oreExtracted;
		}
	}

	Planet.init(
		{
			uuid: {
				type: DataTypes.STRING,//uuid
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			color: {
				type: DataTypes.STRING,
				defaultValue: "#000000",
			},
			orbit: {
				type: DataTypes.FLOAT,
				defaultValue: 0,
			},
			radius: {
				type: DataTypes.FLOAT,
				defaultValue: 0,
			},
			minerals: {
				type: DataTypes.FLOAT,
				defaultValue: 0,
			},
		},
		{
			sequelize
		}
	);

	return Planet;
};
