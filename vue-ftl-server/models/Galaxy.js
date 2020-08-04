'use strict';

const StarSystem = require("./StarSystem");
const Random = require("../helpers/Random");
const EventManager = require("../events/EventManager");



class Galaxy {
    constructor(starCount) {
      this.starCount = starCount;
      this.radius = 20;
      this.galaxyMap = {};
    }

    ToObject()
    {
      let cleanMap ={}
      /*
      Object.entries(this.galaxyMap).map((v)=>{
        return v[1].ToObject()
      });
*/
      Object.entries(this.galaxyMap).forEach(starSystem => {
        //console.log(starSystem);
        cleanMap[starSystem[0]] = starSystem[1].ToObject();
      });

      return {
        starCount: this.starCount,
        radius: this.radius,
        galaxyMap : cleanMap
      }
    }

    pickRandomStarSystem()
    {
      if(Object.keys(this.galaxyMap).length == 0) throw "no star system in it !";
      return Object.values(this.galaxyMap)[Random.getRandomIntInclusive(0,Object.keys(this.galaxyMap).length-1)];
    }


    static EmptyGalaxy() {
      let starCount = 5;
      let galaxy = new Galaxy(starCount);

      for (let i = 0; i < starCount; i++) {
        const starSystem = StarSystem.generateRandomStarSystem(galaxy.radius);

        galaxy.galaxyMap[starSystem.uuid]=starSystem;
      }
      return galaxy;
    }

    

  
    
  }
module.exports = Galaxy;
