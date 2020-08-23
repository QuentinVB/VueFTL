'use strict';
const Random = require("../../helpers/Random");
import * as actions from './EventActions'
import Nothing from "./Nothing";
import FloatingFuel from "./FloatingFuel";
import AsteroidField from "./AsteroidField";
import WormHole from "./WormHole";
import TreasureCache from "./TreasureCache";
import AlienSchematics from "./AlienSchematics";
import FloatingCargo from "./FloatingCargo";
const dao = require('../../dal/dao');

//ABSTRACT !!

exports.Nothing = function(playeruuid)
{
  return new Nothing("nothing",playeruuid);
}
exports.GenerateRandomEvent = function (playeruuid)
{
  const token = Random.getRandomIntInclusive(0,6);
  //const token = 6;
  switch (token) {
    case 0:
      return new Nothing("nothing",playeruuid,[]);
    case 1:
      return new FloatingFuel("floating fuel",playeruuid,[]);
    case 2:
      return new WormHole("wormhole",playeruuid,[]);//set destination here ?
    case 3:
      return new AsteroidField("asteroid field",playeruuid,[]);
    case 4:
      return new TreasureCache("treasure cache",playeruuid,[]);
    case 5:
      return new AlienSchematics("alien schematics",playeruuid,[]);
    case 6:
      return new FloatingCargo("floating cargo",playeruuid,[]);
    default: 
      return new Nothing("nothing",playeruuid,[]);
  }
}
exports.ProcessAction = function (action,payload)
{
  switch (action) {
    case actions.DAMAGESHIP:
      dao.ActiveShip.takeDamage(payload.damages);
      break;
    case actions.REFUELSHIP:
      //TODO add security to avoid NaN or Null
      dao.ActiveShip.fuel+=payload.amount;
      break;
    case actions.DRAINSHIPFUEL:
      dao.ActiveShip.fuel-=payload.amount;
      break;
    case actions.SETEVENTSTATE:
      dao.ActivePlayer.activeEvent.currentStateIdx = payload.state
        break;
    case actions.CLOSEEVENT:
      //payload.eventuuid
      dao.ActivePlayer.activeEvent.isActive = false;
      break;
    case actions.GAINCREDITS:
      //payload.eventuuid
      dao.ActivePlayer.credits+=payload.amount;
      break;
    case actions.LOSECREDITS:
      //payload.eventuuid
      dao.ActivePlayer.credits-=payload.amount;
      break;
    case actions.WARPSHIPTORANDOMDESTINATION:
      const randomdestination = dao.ActiveGalaxy.pickRandomStarSystem();
      dao.ActiveShip.setLocationTo(randomdestination.uuid);
      break;
    case actions.INCREASEREACTOR:
      dao.ActiveShip.fuelEfficiency= (dao.ActiveShip.fuelEfficiency * (1+payload.factor)).toFixed(2);
      break;
    case actions.LOADCARGO:
      const cargo = payload.cargo;
      dao.ActiveShip.loadCargo(cargo);
      break;
    default:
      console.log("lol wat r u trying ?");
      break;
  }
}


    
//module.exports = EventManager;
