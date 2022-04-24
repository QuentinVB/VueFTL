const { getRandomIntInclusive } =require( "../helpers/Random.js");

function EmptyGalaxy() {
        let starCount = 10;
        let radius = 50;
        let galaxy = new Galaxy(starCount,radius);
  
        for (let i = 0; i < starCount; i++) {
          const starSystem = StarSystem.generateRandomStarSystem(galaxy.radius);
  
          galaxy.galaxyMap[starSystem.uuid]=starSystem;
        }
        return galaxy;
      }