'use strict';
const uuid = require('uuid');
const { Model } = require("sequelize");

const GalaxyType ={
  Round:"round",
  Elliptical:"elliptical",
}

module.exports = (sequelize, DataTypes) => {
  class Galaxy extends Model {
    static associate(models) {
      // define association here
      Galaxy.hasMany(models["StarSystem"]);
    }

    pickRandomStarSystem() {
      if (Object.keys(this.galaxyMap).length == 0) throw "no star system in it !";
      return Object.values(this.galaxyMap)[getRandomIntInclusive(0, Object.keys(this.galaxyMap).length - 1)];
    }

    /**
     * Generate a default Galaxy instance
     * @static
     * @returns {Galaxy} a galaxy object
     */
    static DefaultGalaxy() {
      const galaxy = Galaxy.build({
        uuid: uuid.v4(),
      });
      return galaxy;
    }

    static GalaxyType = GalaxyType;
  }

  Galaxy.init(
    {
      uuid: {
        type: DataTypes.STRING,//uuid
        allowNull: false,
      },
      starCount: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      radius: {
        type: DataTypes.INTEGER,
        defaultValue: 20,
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: "round",
      },
    },
    {
      sequelize,
      tableName: 'Galaxies'
    }
  );

  return Galaxy;
}