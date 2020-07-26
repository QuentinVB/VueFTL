'use strict';

const StarSystem = require("./StarSystem");
const Random = require("../../helpers/Random");



class Galaxy {
    constructor(starCount) {
      this.starCount = starCount;
      this.radius = 20;
      this.galaxyMap = {};
    }
    static EmptyGalaxy() {
      let starCount = 5;
      let galaxy = new Galaxy(starCount);

      for (let i = 0; i < starCount; i++) {
        const starSystem = Galaxy.generateRandomStarSystem(galaxy.radius);

        galaxy.galaxyMap[starSystem.uuid]=starSystem;
      }
      return galaxy;
    }

    static generateRandomStarSystem(galaxyRadius)
    {
      let angular = Math.random()*Math.PI*2;
      let radius = Math.random() * galaxyRadius;
      
      let x = Math.round(radius * Math.cos(angular));//Random.getRandomIntInclusive(-this.radius,this.radius);
      let y = Math.round(radius * Math.sin(angular));

      let starSystem = new StarSystem(StarSystem.getRandomName(),x,y);
      let type = StarSystem.getRandomType();
      starSystem.type= type.name;
      starSystem.color= type.color;
      //x= r Cos i
      //y= r Sin i
      //r=sqrt(x²+y²)
      //i = atan (y/x)
      return starSystem;
    }

  
    
  }
module.exports = Galaxy;
