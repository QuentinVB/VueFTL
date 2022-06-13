//'use strict';
const { Model } = require("sequelize");
const {Situation, Reference} = require("../helpers/Naming.js");

module.exports = (sequelize, DataTypes) => {
	
	class Location extends Model {
		static associate(models) {
			// define association here
			Location.belongsTo(models["Ship"]);
			Location.belongsTo(models["Galaxy"]);
			Location.belongsTo(models["StarSystem"]);
			Location.belongsTo(models["Planet"]);
		}
		/**
		 * Generate an default location instance
		 * @static
		 * @returns {Location} a location object
		 */
		static DefaultLocation() {
			const location = Location.build({
				situation:Situation.STANDING,
			});
			return location;
		}
	}
	Location.init(
		{
			situation: { 
				type: DataTypes.STRING,
				validate:{
					isIn: [Object.keys(Situation)] //standing,orbiting,grounded
				}
			},
			orbit_semiMajorAxis:{
				type: DataTypes.FLOAT,
				defaultValue: 0,
			},
			orbit_semiMinorAxis:{
				type: DataTypes.FLOAT,
				defaultValue: 0,
			},
			orbit_trueAnomaly:{
				type: DataTypes.FLOAT,
				defaultValue: 0,
			},
			position_X: {
				type: DataTypes.FLOAT,
				defaultValue: 0,
			},
			position_Y: {
				type: DataTypes.FLOAT,
				defaultValue: 0,
			},
			position_Z: {
				type: DataTypes.FLOAT,
				defaultValue: 0,
			},
			//TODO : not DRY
			reference: {
				type: DataTypes.VIRTUAL,
				get() {
					const galaxyId = this.getDataValue("GalaxyId");
					if(galaxyId) return {reference : Reference.GALAXY, id : galaxyId};

					const starSystemId = this.getDataValue("StarSystemId");
					if(starSystemId) return {reference : Reference.STARSYSTEM, id : starSystemId};

					const planetId = this.getDataValue("PlanetId");
					if(planetId) return {reference : Reference.PLANET, id : planetId};
					
					return null;
				},
				//TODO : multiple redefinition and duplication ; should improve
				set(value) {
					if(!("reference" in value)) throw new Error("value should have a reference");
					if(!("id" in value) | !value.id ) throw new Error("value should have an id ");

					const fields = ["GalaxyId","StarSystemId","PlanetId"];
					fields.forEach(v=>this.setDataValue(v,null));
					
					let fieldToSetTheId = null;
					switch (value.reference) {
					case Reference.GALAXY:
						fieldToSetTheId = fields[0];
						break;
					case Reference.STARSYSTEM:
						fieldToSetTheId = fields[1];
						break;
					case Reference.PLANET:
						fieldToSetTheId = fields[2];
						break;
					default:
						break;
					}
					if(fieldToSetTheId) this.setDataValue(fieldToSetTheId,value.id);
				}
			},
			position: {
				type: DataTypes.VIRTUAL,
				get() {
					return { x: this.position_X, y: this.position_Y, z: this.position_Z };
				},
				set(value) {
					this.position_X = value.x;
					this.position_Y = value.y;
					this.position_Z = value.z;
				}
			},
			orbit: {
				type: DataTypes.VIRTUAL,
				get() {
					return { 
						semiMajorAxis: this.orbit_semiMajorAxis,
						semiMinorAxis: this.orbit_semiMinorAxis, 
						trueAnomaly: this.orbit_trueAnomaly 
					};
				},
				set(value) {
					this.orbit_semiMajorAxis =value.semiMajorAxis;
					this.orbit_semiMinorAxis =value.semiMinorAxis;
					this.orbit_trueAnomaly =value.trueAnomaly;
				}
			}
		},
		{
			sequelize
		}
	);
	return Location;
};
