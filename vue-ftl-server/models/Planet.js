'use strict';
const uuid = require('uuid');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Planet extends Model {

    static associate(models) {
      Planet.belongsTo(models["StarSystem"]);
      Planet.belongsTo(models["PlanetType"]);
    }

    ToObject() {
      //TODO : Add cooldown ?
      return {
        name: this.name,
        starSystem: this.starSystem.uuid,
        color: this.color,
        orbit: this.orbit,
        radius: this.radius,
        minerals: this.minerals,
        anomaly: this.anomaly,
        landable: this.landable,
        uuid: this.uuid
      }
    }
    minePlanet(efficiency = 1)//TODO : add modificator ?
    {
      const oreRatio = this.minerals / 100;
      this.minerals--; //or more if modifier

      if (Math.random() < oreRatio) {

        return Math.floor(10 * efficiency); //or more if modifier
      }
      return 0; //sry not sorry
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
}
