//'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Ship extends Model {
		static HULLMAX = 100;
		static FUELMAX = 100;
		static FUELCONSUMPTION = 5;
		static BASEFUELEFFICIENCY = 0.2;
		static BASEHULLFACTOR = 0.9;

		static associate(models) {
			// define association here
			Ship.belongsTo(models["User"]);
			Ship.hasMany(models["Cargo"]);
			Ship.hasOne(models["Location"]);
		}

		//FUEL MANAGEMENT
		/**
		 * Consume the fuel of the ship, according the the fuel consumption and efficiency
		 * @returns {Number} the consumed fuel, else 0
		 */
		consumeFuel() {
			//TODO : the more cargo aboard, the more the fuel consumption !
			if (this.fuel <= 0) return 0;
			let consumedFuel = Ship.FUELCONSUMPTION * (1 - this.fuelEfficiency);
			this.fuel = (this.fuel - consumedFuel).toFixed(1);
			return consumedFuel;
		}
		/**
		 * Refuel the ship with the specified amount of fuel
		 * @param {Number} amount amount of fuel to load into the ship
		 */
		refuel(amount) {
			if (amount <= 0) throw "cant refill an negative amount !";
			this.fuel = Math.min(this.fuel + amount, Ship.FUELMAX);
		}

		//HULL MANAGEMENT
		/**
		 * inflict damages to the ship
		 * @param {Number} damages 
		 * @returns 
		 */
		takeDamage(damages) {
			if (damages <= 0) throw "cant make negative or null damage amount !";
			const realDamages = Math.floor(damages * this.hullFactor);
			this.hull -= (realDamages).toFixed(1);
			//TODO : if hull <0 : ship is destroyed, gameover !!!
			return realDamages;
		}
		/**
		 * Repair the ship with the specified amount of points
		 * @param {Number} amount amount of point to restore
		 */
		repair(amount) {
			if (amount <= 0) throw "cant repair a negative amount !";
			this.hull = Math.min(this.hull + amount, Ship.HULLMAX);
			return this.hull;
		}

		//LOCATION MANAGEMENT
		/**
		 * move the ship to the designated coordinate and consume fuel
		 * @param {{x:number,y:number}} coordinate 
		 * @return {boolean} true if the ship moved, else false
		 */
		moveTo(coordinate) {
			if (!this.consumeFuel()) return false;
			//TODO check for realistic coordinates
			this.position.x = coordinate.x;
			this.position.y = coordinate.y;
			return true;
		}

		wrapToSystem(starSystem) {
			this.consumeFuel();
			return this.setLocationTo(starSystem);
		}
		moveToPlanet(planetUUID) {
			this.consumeFuel();
			this.location.planet = planetUUID;
			this.location.situation = "orbiting";
			return true;
		}
		landOnPlanet() {
			if (this.location.situation === "orbiting" && this.location.planet) {
				//take damage ?
				this.location.situation = "landed";
				return true;
			}
			return false;
		}

		takeOffFromPlanet() {
			if (this.location.situation === "landed" && this.location.planet) {
				this.consumeFuel();
				this.location.situation = "orbiting";
				return true;
			}
			return false;
		}

		/**
		 * Check if the ship can move
		 * @param {string=} starsystemUUID 
		 * @param {string=} planetUUID 
		 */
		canMove(starsystemUUID, planetUUID) {
			//TODO : BEWAAARG, clean up cascading condition ?
			//TODO : damaged reactor will be here ;)
			if (this.fuel <= 0) return false;
			if (this.location.situation === "landed") return false;
			/*
	  if(destination.position)
	  {
		if(destination.x == this.position.x)
		{
		  if(destination.y == this.position.y) return false;
		}
	  }*/

			if (starsystemUUID && !planetUUID) {
				if (starsystemUUID == this.location.starsystem) return false;
			}
			if (starsystemUUID && planetUUID) {
				if (planetUUID == this.location.planet) return false;
			}

			return true;
		}

		//COMMON METHODS
		toObject() {
			//TODO ADD STATE MESSAGE ?

			let cargoList = [];
			this.cargoBay.forEach(cargo => {
				cargoList.push(cargo.ToObject());
			});

			return {
				name: this.name,
				position: this.position,
				location: this.location,
				fuel: this.fuel,
				hull: this.hull,
				fuelEfficiency: this.fuelEfficiency,
				hullFactor: this.hullFactor,
				cargoBay: cargoList
			};
		}
	}
	Ship.init(
		{
			name: { type: DataTypes.STRING },
			uuid: { type: DataTypes.STRING, allowNull: false }, //uuid
			fuel: { type: DataTypes.FLOAT, defaultValue: Ship.FUELMAX },
			fuelEfficiency: { type: DataTypes.FLOAT, defaultValue: Ship.BASEFUELEFFICIENCY },//TODO should be const
			hull: { type: DataTypes.FLOAT, defaultValue: Ship.HULLMAX },
			hullFactor: { type: DataTypes.FLOAT, defaultValue: Ship.BASEHULLFACTOR},//TODO should be const
		},
		{
			sequelize
		}
	);
	return Ship;
};
