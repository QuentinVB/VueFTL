'use strict';
const Random = require("../helpers/Random");
//var hash = require('object-hash');
const Uuid = require('uuid');

//https://fr.wikipedia.org/wiki/Planète
const PLANETTYPES = [
    {name:'Silicat planet',color:{r:148,g:131,b:102},radius:0.3},
    {name:'Venusian',color:{r:235,g:218,b:143},radius:0.8}, 
    {name:'Earth analog planet',color:{r:24,g:98,b:158},radius:1},
    {name:'Super-Earth',color:{r:12,g:144,b:196},radius:1.5},
    {name:'Desert planet',color:{r:207,g:99,b:4},radius:0.5}, 
    {name:'Ocean planet',color:{r:10,g:10,b:161},radius:3}, 
    {name:'Gaz Giant',color:{r:237,g:210,b:164},radius:10}, 
    {name:'Neptunian',color:{r:0,g:166,b:255},radius:4}, 
    {name:'Dwarf Planet',color:{r:168,g:162,b:151},radius:0.1},

  ]
const ALPHABET ="abcdefghijklmnopkqrstuvwxyz"
//chthonnienne ? = metallic hydrogen source o_o

class Planet {

    constructor(name,starSystem) {
      this.name=name;
      this.starSystem=starSystem;

      this.type="";
      this.color={r:0,g:0,b:0};
      this.orbit = 0; //{apoapsis, periapsis};
      this.radius = 0; 

      //moons ?
      //this.planetes = Random.getRandomIntInclusive(1,10);

      this.minerals = Math.round(Math.random()*100);

      this.anomaly="";

      this.uuid = Uuid.v4();
    }

    
    ToObject()
    {
      //TODO : Add cooldown ?
      return {
        name:this.name,
        starSystem:this.starSystem.uuid,
        type:this.type,
        color:this.color,
        orbit :this.orbit,
        radius :this.radius,
        minerals:this.minerals,
        anomaly :this.anomaly ,
        uuid:this.uuid
      }
    }
    static generateRandomPlanet(starSystem,position)
    {
      //orbit will be set by star system
      /*
      const lastOrbitRadius = starSystem.planets[starSystem.length-1];
      let orbit = 0;
      if(!lastOrbitRadius)
      {
        orbit = 
      }*/
      const type = this.getRandomType(position,starSystem.planetesCount);


      const radius = type.radius+ (type.radius+Math.random()*0.05);
      
      let planet = new Planet(starSystem.name+ALPHABET[position],starSystem);


      planet.type= type.name;
      planet.color= type.color;
      planet.radius= radius;

      return planet;
    }
    //should be named based on star system
    static getRandomName()
    {
      return "unamed planet";
      //return NAMESOURCE[Random.getRandomIntInclusive(0,NAMESOURCE.length)]+" "+GREEKALPHABET[Random.getRandomIntInclusive(0,GREEKALPHABET.length)]+"-"+Random.getRandomIntInclusive(1,9);
    }

    static getRandomType(position, count)
    {
      const a = PLANETTYPES.length / count;
      const idx = Math.floor(a*position) + Random.getRandomInt(1);
      //Random.getRandomInt(PLANETTYPES.length)
      return PLANETTYPES[idx];
    }

    minePlanet(efficiency=1)//TODO : add modificator ?
    {
      const oreRatio = this.minerals / 100;
      this.minerals -- ; //or more if modifier

      if(Math.random() <oreRatio)
      {
        
        return Math.floor(10*efficiency); //or more if modifier
      }
      return 0; //sry not sorry
    }
  }

  
module.exports = Planet;
