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
import { ActiveUser,ActiveGalaxy,ActiveShip } from "../../dal/dao.js";

//ABSTRACT !!

export function NothingEvent(Useruuid)
{
  return new Nothing("nothing",Useruuid);
}
export function GenerateRandomEvent(Useruuid)
{
  const token = Random.getRandomIntInclusive(0,8);
  //const token = 8;
  switch (token) {
    case 0:
      return new Nothing("nothing",Useruuid);
    case 1:
      return new FloatingFuel("floating fuel",Useruuid);
    case 2:
      return new WormHole("wormhole",Useruuid);//set destination here ?
    case 3:
      return new AsteroidField("asteroid field",Useruuid);
    case 4:
      return new TreasureCache("treasure cache",Useruuid);
    case 5:
      return new AlienSchematics("alien schematics",Useruuid);
    case 6:
      return new FloatingCargo("floating cargo",Useruuid);
    case 7:
      //todo make event self autonomous...
      return new AlienAutomate("alien automate",Useruuid,{hasEnoughIron:ActiveShip.getCargoOf("Iron").quantitySum>=10});
    case 8:
      //todo make event self autonomous...
      return new RepairStation("repair station",Useruuid,{
        hasEnoughCredits:ActiveUser.credits>=100,
        hasADamagedShip:ActiveShip.hull<Ship.HULLMAX
      });
    default: 
      return new Nothing("nothing",Useruuid);
  }
}


export function ProcessAction(action,payload)
{
  switch (action) {
    case actions.DAMAGESHIP:
      ActiveShip.takeDamage(payload.damages);
      break;
    case actions.REPAIRSHIP:
      ActiveShip.repair(payload.repairPoints);
      break;
    case actions.REFUELSHIP:
      //TODO add security to avoid NaN or Null
      ActiveShip.fuel+=payload.amount;
      break;
    case actions.DRAINSHIPFUEL:
      ActiveShip.fuel-=payload.amount;
      break;
    case actions.SETEVENTSTATE:
      ActiveUser.activeEvent.currentStateIdx = payload.state
        break;
    case actions.CLOSEEVENT:
      //payload.eventuuid
      ActiveUser.activeEvent.isActive = false;
      break;
    case actions.GAINCREDITS:
      //payload.eventuuid
      ActiveUser.credits+=payload.amount;
      break;
    case actions.LOSECREDITS:
      //payload.eventuuid
      ActiveUser.credits-=payload.amount;
      break;
    case actions.WARPSHIPTORANDOMDESTINATION:
      const randomdestination = ActiveGalaxy.pickRandomStarSystem();
      ActiveShip.setLocationTo(randomdestination);
      break;
    case actions.INCREASEREACTOR:
      ActiveShip.fuelEfficiency= (ActiveShip.fuelEfficiency * (1+payload.factor)).toFixed(2);
      break;
    case actions.LOADCARGO:
      const cargo = payload.cargo;
      ActiveShip.loadCargo(cargo);
      break;
    case actions.UNLOADCARGO:
      const cargoType = payload.type;
      const quantity = payload.quantity;
      ActiveShip.unloadCargo(cargoType,quantity);
      //TODO : put event behind the drop ? => drop!=unload !
      break;
    default:
      console.log("lol wat r u trying ?");
      break;
  }
}

