'use strict';
import { getRandomIntInclusive, getRandomInt } from "../helpers/Random.js";
import Planet from "./Planet";
import { v4 as Uuidv4 } from 'uuid';

const GREEKALPHABET=['Alpha','Beta','Gamma','Delta','Epsilon','Zeta','Eta','Theta','Iota','Kappa','Lambda','Mu','Nu','Xi','Omicron','Pi','Rho','Sigma','Tau','Upsilon','Phi','Chi','Psi','Omega']
const NAMESOURCE =['Andromeda','Antlia','Apus','Aquarius','Aquila','Ara','Aries','Auriga','Boötes','Caelum','Camelopardalis','Cancer','Canes Venatici','Canis Major','Canis Minor','Capricornus','Carina','Cassiopeia','Centaurus','Cepheus','Cetus','Chamaeleon','Circinus','Columba','Coma Berenices','Corona Australis','Corona Borealis','Corvus','Crater','Crux','Cygnus','Delphinus','Dorado','Draco','Equuleus','Eridanus','Fornax','Gemini','Grus','Hercules','Horologium','Hydra','Hydrus','Indus','Lacerta','Leo','Leo Minor','Lepus','Libra','Lupus','Lynx','Lyra','Mensa','Microscopium','Monoceros','Musca','Norma','Octans','Ophiuchus','Orion','Pavo','Pegasus','Perseus','Phoenix','Pictor','Pisces','Piscis Austrinus','Puppis','Pyxis','Reticulum','Sagitta','Sagittarius','Scorpius','Sculptor','Scutum','Serpens','Sextans','Taurus','Telescopium','Triangulum','Triangulum Australe','Tucana','Ursa Major','Ursa Minor','Vela','Virgo','Volans','Vulpecula']

const STELLARTYPES = [
    {name:'RoguePlanet',color:{r:128,g:0,b:0}},
    {name:'Brown Dwarf',color:{r:128,g:0,b:0}},
    {name:'Blue Super Giant',color:{r:0,g:100,b:255}},
    {name:'Binary Star',color:{r:255,g:20,b:0}},
    {name:'Red Giant',color:{r:255,g:20,b:0}},
    {name:'Red Super Giant',color:{r:255,g:20,b:0}},
    {name:'White Dwarf',color:{r:230,g:230,b:255}},
    {name:'Red Dwarf',color:{r:120,g:20,b:0}},
    {name:'Yellow Dwarf',color:{r:255,g:200,b:0}},
    {name:'Blackhole',color:{r:0,g:0,b:0}},
    {name:'Neutron Star',color:{r:230,g:230,b:255}},
  ]


class StarSystem {
    COOLDOWN = 120;//seconds

    static MINPLANETORBIT = 0.2; //UA
    static MAXPLANETORBIT = 30; //UA

    constructor(name,x,y) {
      this.name=name;
      this.type="";
      this.color={r:0,g:0,b:0};
      this.position = {x,y};


      this.planetesCount = getRandomIntInclusive(1,10);
      this.planets = []


      this.anomaly="";

      this.eventResetDate = Date.now();

      this.uuid = Uuidv4();
    }

    get isCoolingDown()
    {
      return this.eventResetDate > Date.now();
    }

    resetCoolDown()
    {
      this.eventResetDate = new Date(Date.now()+this.COOLDOWN*1000)
    }
    
    ToObject()
    {
      let planetList =[];
      this.planets.forEach(planet => {
        planetList.push(planet.ToObject());
      });

      //TODO : Add cooldown ?
      return {
        name:this.name,
        type:this.type,
        color:this.color,
        position :this.position,
        anomaly :this.anomaly ,
        uuid:this.uuid,
        planets:planetList
      }
    }
    static generateRandomStarSystem(galaxyRadius)
    {
      let angular = Math.random()*Math.PI*2;
      let radius = Math.random() * galaxyRadius;
      
      let x = Math.round(radius * Math.cos(angular));//Random.getRandomIntInclusive(-this.radius,this.radius);
      let y = Math.round(radius * Math.sin(angular));

      let starSystem = new StarSystem(this.getRandomName(),x,y);

      let type = this.getRandomType();

      starSystem.type= type.name;
      starSystem.color= type.color;

      const planetCount = starSystem.planetesCount;
      const a = StarSystem.MINPLANETORBIT;
      const b = Math.pow(StarSystem.MAXPLANETORBIT/StarSystem.MINPLANETORBIT, 1/planetCount);

      for (let i = 0; i < planetCount; i++) {
        const planet = Planet.generateRandomPlanet(starSystem,i);
        let orbit = a * Math.pow(b,i);
        orbit += orbit*(Math.random()*0.5);
        planet.orbit = orbit;


        //compute planetposition
        
        starSystem.planets.push(planet)
      }
      

      //x= r Cos i
      //y= r Sin i
      //r=sqrt(x²+y²)
      //i = atan (y/x)
      return starSystem;
    }
    getPlanet(planetuuid)
    {
      for(const planet of this.planets)
      {
          if(planet.uuid == planetuuid) return planet;
      }
      return undefined;
    }
    static EmptyStarSystem() {
      let emptySystem= new StarSystem(this.getRandomName(),0,0);

      return emptySystem;
    }

    static getRandomName()
    {
      //TODO : name from same sector have the same "constellation name" then different greek alphabet, and number
      return GREEKALPHABET[getRandomInt(0,GREEKALPHABET.length)]+" "+NAMESOURCE[getRandomInt(0,NAMESOURCE.length)]+"-"+getRandomIntInclusive(1,9);
    }

    static getRandomType()
    {
      return STELLARTYPES[getRandomInt(STELLARTYPES.length)];
    }

   
  }

  
export default StarSystem;
