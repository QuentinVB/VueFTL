"use strict";
const uuid = require("uuid");
const { getRandomInt } = require("../helpers/Random.js");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	/** Class representing a cargo container, with its content*/
	class Cargo extends Model {

		static MAXCARGOCAPACITY = 25;
		static CARGOTYPES = ["Hydrogen", "Helium", "Iron", "Silicon", "Thorium", "Hafnium", "Platinum", "Tungsten", "Carbon", "Oxygen", "Cobalt", "Copper", "Gold"];
		/*
	Ezo ? DarkMatter ? Anti-matter ?
	*/
		static associate(models) {
			Cargo.belongsTo(models["Ship"]);
		}

		/**
		 * 
		 * @param {Number} value 
		 * @returns 
		 */
		fill(value) {
			if (value <= 0) throw new Error("can't fill with a negative value");
			let _quantity = this.getDataValue("quantity");
			const valueF = parseFloat(value);

			const sum = _quantity + valueF;

			if (sum >= Cargo.MAXCARGOCAPACITY) {
				this.setDataValue("quantity", Cargo.MAXCARGOCAPACITY);
				//TODO : protect against floating point decimals
				return sum - Cargo.MAXCARGOCAPACITY;
			}
			this.setDataValue("quantity", sum);
			return 0;
		}

		/**
		 * 
		 * @param {Number} value 
		 * @returns 
		 */
		tryDrain(value) {
			if (value <= 0) throw new Error("can't drain with a negative value");
			let _quantity = this.getDataValue("quantity");
			const valueF = parseFloat(value);

			const diff = _quantity - valueF;

			if (diff >= 0) {
				this.setDataValue("quantity", diff);
				return 0;
			}

			this.setDataValue("quantity", 0);
			//TODO : protect against floating point decimals
			return diff;
		}

		/**
		 * Generate a random cargo container instance
		 * @static
		 * @returns {Cargo} a cargo object
		 */
		static GetRandomCargo() {
			//TODO : should call the factory
			const cargo = Cargo.build({
				uuid: uuid.v4(),
				content: Cargo.CARGOTYPES[getRandomInt(Cargo.CARGOTYPES.length)],
				quantity: getRandomInt(Cargo.MAXCARGOCAPACITY) + 1
			});
			return cargo;
		}

		/**
		 * Generate an empty cargo container instance
		 * @static
		 * @returns {Cargo} a cargo object
		 */
		static DefaultCargo() {
			const cargo = Cargo.build({
				content: "Vaccum",
				uuid: uuid.v4(),
			});
			return cargo;
		}
	}

	Cargo.init({
		uuid: {
			type: DataTypes.STRING,//uuid
			allowNull: false,
		},
		content: {
			type: DataTypes.STRING,
			//TODO : define Getter and setter
		},
		quantity: {
			type: DataTypes.FLOAT,
			defaultValue: 0,
			//TODO : define Getter and setter
			set(value) {
				let _quantity = this.getDataValue("quantity");
				const valueF = parseFloat(value);
				if (_quantity + valueF > Cargo.MAXCARGOCAPACITY) throw new Error("can't set over maximum quantity");
				if (_quantity + valueF < 0) throw new Error("can't set to a negative quantity");
				this.setDataValue("quantity", valueF <= 0 ? 0 : valueF);
			}
		},
	}, { sequelize });

	return Cargo;
};

