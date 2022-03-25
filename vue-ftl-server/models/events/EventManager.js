'use strict';
import * as Random from "../../helpers/Random.js";
import * as actions from './EventActions.js'
import Nothing from "./Nothing.js";
import FloatingFuel from "./FloatingFuel.js";
import AsteroidField from "./AsteroidField.js";
import WormHole from "./WormHole.js";
import TreasureCache from "./TreasureCache.js";
import AlienSchematics from "./AlienSchematics.js";
import FloatingCargo from "./FloatingCargo.js";
import AlienAutomate from './AlienAutomate.js';
import RepairStation from './RepairStation.js';
import Ship from '../Ship.js';
import * as dao from '../../dal/dao.js';

//ABSTRACT !!

export function NothingEvent(playeruuid)
{
  return new Nothing("nothing",playeruuid);
}
export function GenerateRandomEvent(playeruuid)
{
  const token = Random.getRandomIntInclusive(0,8);
  //const token = 8;
  switch (token) {
    case 0:
      return new Nothing("nothing",playeruuid);
    case 1:
      return new FloatingFuel("floating fuel",playeruuid);
    case 2:
      return new WormHole("wormhole",playeruuid);//set destination here ?
    case 3:
      return new AsteroidField("asteroid field",playeruuid);
    case 4:
      return new TreasureCache("treasure cache",playeruuid);
    case 5:
      return new AlienSchematics("alien schematics",playeruuid);
    case 6:
      return new FloatingCargo("floating cargo",playeruuid);
    case 7:
      //todo make event self autonomous...
      return new AlienAutomate("alien automate",playeruuid,{hasEnoughIron:dao.ActiveShip.getCargoOf("Iron").quantitySum>=10});
    case 8:
      //todo make event self autonomous...
      return new RepairStation("repair station",playeruuid,{
        hasEnoughCredits:dao.ActivePlayer.credits>=100,
        hasADamagedShip:dao.ActiveShip.hull<Ship.HULLMAX
      });
    default: 
      return new Nothing("nothing",playeruuid);
  }
}


export function ProcessAction(action,payload)
{
  switch (action) {
    case actions.DAMAGESHIP:
      dao.ActiveShip.takeDamage(payload.damages);
      break;
    case actions.REPAIRSHIP:
      dao.ActiveShip.repair(payload.repairPoints);
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
      dao.ActiveShip.setLocationTo(randomdestination);
      break;
    case actions.INCREASEREACTOR:
      dao.ActiveShip.fuelEfficiency= (dao.ActiveShip.fuelEfficiency * (1+payload.factor)).toFixed(2);
      break;
    case actions.LOADCARGO:
      const cargo = payload.cargo;
      dao.ActiveShip.loadCargo(cargo);
      break;
    case actions.UNLOADCARGO:
      const cargoType = payload.type;
      const quantity = payload.quantity;
      dao.ActiveShip.unloadCargo(cargoType,quantity);
      //TODO : put event behind the drop ? => drop!=unload !
      break;
    default:
      console.log("lol wat r u trying ?");
      break;
  }
}

