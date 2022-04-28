'use strict';
const { Model } = require("sequelize");
const { getRandomIntInclusive, getRandomInt } = require("../helpers/Random.js");
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class StarSystem extends Model {
    //COOLDOWN = 120;//seconds
    //this.eventResetDate = Date.now();

    static associate(models) {
      // define association here
      StarSystem.hasMany(models["Planet"]);
      StarSystem.belongsTo(models["Galaxy"]);
      StarSystem.belongsTo(models["StellarType"]);
    }

    
    /**
     * Generate a default StarSystem instance
     * @static
     * @returns {StarSystem} a starSystem object
     */
     static DefaultStarSystem() {
      const starSystem = StarSystem.build({
        uuid: uuid.v4(),
        name:"sol"
      });
      return starSystem;
    }


    get isCoolingDown() {
      return this.eventResetDate > Date.now();
    }

    resetCoolDown() {
      this.eventResetDate = new Date(Date.now() + this.COOLDOWN * 1000)
    }

    ToObject() {
      let planetList = [];
      this.planets.forEach(planet => {
        planetList.push(planet.ToObject());
      });

      //TODO : Add cooldown ?
      return {
        name: this.name,
        type: this.type,
        color: this.color,
        position: this.position,
        anomaly: this.anomaly,
        uuid: this.uuid,
        planets: planetList
      }
    }

    getPlanet(planetuuid) {
      for (const planet of this.planets) {
        if (planet.uuid == planetuuid) return planet;
      }
      return undefined;
    }

  }
  StarSystem.init({
    uuid: {
      type: DataTypes.STRING,//uuid
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    planetesCount: {
      type: DataTypes.INTEGER,
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
    }
  }, { sequelize });
  
  return StarSystem;
}

