'use strict';
const uuid = require('uuid');
const DBConnection = require('../dal/DBConnection.js');
const { getRandomInt } = require("../helpers/Random");
const db = require("../models");
const Planet = db["Planet"];
const PlanetType = db["PlanetType"];
const StarSystem = db["StarSystem"];
const { ALPHABET } = require('../helpers/Naming')

module.exports.GenerateRandomPlanet = function () {
  return GeneratePlanet({ planetesCount: 1 }, 1);
}

/**
 * 
 * @param {StarSystem} starSystem 
 * @param {Number} position 
 * @returns 
 */
module.exports.GenerateRandomPlanetAt = function (starSystem, position) {
  DBConnection.Query(async () => {
    const planetTypes = await PlanetType.findAll();

    const a = planetTypes.length / starSystem.planetesCount;
    const idx = Math.floor(a * position) + getRandomInt(1);
    const planetType = planetTypes[idx];

    return await GeneratePlanet(starSystem, position, planetType);
  })
}

/**
 * 
 * @param {StarSystem} starSystem 
 * @param {Number} position 
 * @param {PlanetType} planetType 
 * @returns 
 */
module.exports.GeneratePlanet = async function (starSystem, position, planetType) {
  //TODO check star system integrity
  const name = `${starSystem.name}-${ALPHABET[position - 1]}`;
  const radius = planetType.baseRadius + (planetType.baseRadius + Math.random() * 0.05);
  const minerals = Math.round(Math.random() * 100);

  const planet = await Planet.create(
    {
      uuid: uuid.v4(),
      name: name,
      color: planetType.baseColor,//TODO: should randomize using Color package
      orbit: position,
      radius: radius,
      minerals: minerals,
    });
  await planet.setPlanetType(planetType);
  return planet;
}

