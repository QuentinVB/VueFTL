'use strict';
const Random = require("../helpers/Random");
import Nothing from "../events/Nothing";
import FloatingFuel from "../events/FloatingFuel";



//ABSTRACT !!
class EventManager {
 
    static GenerateRandomEvent(starSystem)
    {
      //const token = Random.getRandomIntInclusive(0,1);
      const token = 1;
      switch (token) {
        case 0:
          return new Nothing("nothing",starSystem,[]);
        case 1:
          return new FloatingFuel("floating fuel",starSystem,[]);
        default: 
          return new Nothing("nothing",starSystem,[]);
      }
    }
    static ProcessAction(action,payload)
    {
      switch (action) {
        case actions.REFUELSHIP:
          dao.ActiveShip.fuel+=payload.amount;
          break;
        case actions.SETEVENTSTATE:
          dao.getEvent(payload.eventuuid).currentStateIdx = payload.state
            break;
        case actions.CLOSEEVENT:
          dao.getEvent(payload.eventuuid).isActive = false;
              break;
        default:
          break;
      }
    }
  }


  
module.exports = EventManager;
