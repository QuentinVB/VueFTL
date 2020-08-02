'use strict';
const Random = require("../helpers/Random");
import Nothing from "../events/Nothing";
import FloatingFuel from "../events/FloatingFuel";
import * as actions from './EventActions'
import WormHole from "./WormHole";
const dao = require('../dal/dao');

//ABSTRACT !!

  exports.GenerateRandomEvent = function (starSystem)
    {
      const token = Random.getRandomIntInclusive(0,2);
      //const token = 2;
      switch (token) {
        case 0:
          return new Nothing("nothing",starSystem,[]);
        case 1:
          return new FloatingFuel("floating fuel",starSystem,[]);
        case 2:
          return new WormHole("wormhole",starSystem,[]);//set destination here ?
        default: 
          return new Nothing("nothing",starSystem,[]);
      }
    }
    exports.ProcessAction = function (action,payload)
    {
      switch (action) {
        case actions.REFUELSHIP:
          dao.ActiveShip.fuel+=payload.amount;
          break;
        case actions.DRAINSHIPFUEL:
          dao.ActiveShip.fuel-=payload.amount;
          break;
        case actions.SETEVENTSTATE:
          dao.getEvent(payload.eventuuid).currentStateIdx = payload.state
            break;
        case actions.CLOSEEVENT:
          dao.getEvent(payload.eventuuid).isActive = false;
          break;
        case actions.WARPSHIPTORANDOMDESTINATION:
          const randomdestination = dao.ActiveGalaxy.pickRandomStarSystem();
          dao.ActiveShip.setLocationTo(randomdestination.uuid);
          break;
        default:
          console.log("lol wat r u trying ?");
          break;
      }
    }
    

  
//module.exports = EventManager;
