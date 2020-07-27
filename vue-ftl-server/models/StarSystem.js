'use strict';
const Random = require("../helpers/Random");
var hash = require('object-hash');
const Uuid = require('uuid');

const GREEKALPHABET=['Alpha','Beta','Gamma','Delta','Epsilon','Zeta','Eta','Theta','Iota','Kappa','Lambda','Mu','Nu','Xi','Omicron','Pi','Rho','Sigma','Tau','Upsilon','Phi','Chi','Psi','Omega']
const NAMESOURCE =['Andromeda','Antlia','Apus','Aquarius','Aquila','Ara','Aries','Auriga','Boötes','Caelum','Camelopardalis','Cancer','Canes Venatici','Canis Major','Canis Minor','Capricornus','Carina','Cassiopeia','Centaurus','Cepheus','Cetus','Chamaeleon','Circinus','Columba','Coma Berenices','Corona Australis','Corona Borealis','Corvus','Crater','Crux','Cygnus','Delphinus','Dorado','Draco','Equuleus','Eridanus','Fornax','Gemini','Grus','Hercules','Horologium','Hydra','Hydrus','Indus','Lacerta','Leo','Leo Minor','Lepus','Libra','Lupus','Lynx','Lyra','Mensa','Microscopium','Monoceros','Musca','Norma','Octans','Ophiuchus','Orion','Pavo','Pegasus','Perseus','Phoenix','Pictor','Pisces','Piscis Austrinus','Puppis','Pyxis','Reticulum','Sagitta','Sagittarius','Scorpius','Sculptor','Scutum','Serpens','Sextans','Taurus','Telescopium','Triangulum','Triangulum Australe','Tucana','Ursa Major','Ursa Minor','Vela','Virgo','Volans','Vulpecula']

const STELLARTYPES = [
    {name:'Brown Dwarf',color:{r:128,g:0,b:0}},
    {name:'Blue Super Giant',color:{r:0,g:100,b:255}},
    {name:'Red Giant',color:{r:255,g:20,b:0}},
    {name:'White Dwarf',color:{r:230,g:230,b:255}},
    {name:'Red Dwarf',color:{r:120,g:20,b:0}},
    {name:'Yellow Star',color:{r:255,g:200,b:0}},
    {name:'Blackhole',color:{r:0,g:0,b:0}},
    {name:'Neutron Star',color:{r:230,g:230,b:255}}]


class StarSystem {
    constructor(name,x,y) {
      this.name=name;
      this.type="";
      this.color={r:0,g:0,b:0};
      this.position = {x,y} ;
      this.minerals = Math.round(Math.random()*100);

      this.uuid = Uuid.v4();
    }
    static EmptyStarSystem() {
      let emptySystem= new StarSystem(this.getRandomName(),0,0);

      return emptySystem;
    }

    static getRandomName()
    {
      return NAMESOURCE[Random.getRandomIntInclusive(0,NAMESOURCE.length)]+" "+GREEKALPHABET[Random.getRandomIntInclusive(0,GREEKALPHABET.length)]+"-"+Random.getRandomIntInclusive(1,9);
    }

    static getRandomType()
    {
      return STELLARTYPES[Random.getRandomInt(STELLARTYPES.length)];
    }

    mineSystem()//TODO : add modificator ?
    {
      const oreRatio = this.minerals / 100;
      this.minerals -- ; //or more if modifier

      if(Math.random() <oreRatio)
      {
        
        return 1; //or more if modifier
      }
      return 0; //sry not sorry
    }
  }

  
module.exports = StarSystem;
