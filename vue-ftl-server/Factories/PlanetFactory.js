import { v4 as uuidv4 } from 'uuid';
import DBConnection from '../dal/DBConnection.js';
import { getRandomInt } from "../helpers/Random.js";
import Planet from "../models/Planet.js"
import PlanetType from '../models/PlanetType.js';
import StarSystem from "../models/StarSystem.js"

const ALPHABET = "abcdefghijklmnopkqrstuvwxyz"

export function GenerateRandomPlanet() {
  return GeneratePlanet({ planetesCount: 1 }, 1);
}

/**
 * 
 * @param {StarSystem} starSystem 
 * @param {Number} position 
 * @returns 
 */
export function GenerateRandomPlanetAt(starSystem,position) {
  DBConnection.Query(async () => {
    const planetTypes = await PlanetType.findAll();

    const a = planetTypes.length / starSystem.planetesCount;
    const idx = Math.floor(a * position) + getRandomInt(1);
    const planetType = planetTypes[idx];

    return GetPlanet(starSystem, position, planetType);
  })
}

/**
 * 
 * @param {StarSystem} starSystem 
 * @param {Number} position 
 * @param {PlanetType} planetType 
 * @returns 
 */
export function GetPlanet(starSystem, position, planetType) {
  //TODO check star system integrity
  const name = starSystem.name + ALPHABET[position];
  const radius = planetType.radius + (planetType.radius + Math.random() * 0.05);
  const minerals = Math.round(Math.random() * 100);

  const planet = Planet.build(
    {
      uuid: uuidv4(),
      name: name,
      color: planetType.baseColor,//TODO: should randomise
      orbit: position,
      radius: radius,
      minerals: minerals,
      planetTypeId: planetType.id,
      starSystemId: starSystem.id
    });
  return planet;
}

