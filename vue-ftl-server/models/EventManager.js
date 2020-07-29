'use strict';
const Random = require("../helpers/Random");
const Nothing = require("../events/Nothing");



//ABSTRACT !!
class EventManager {
 
    static GenerateRandomEvent(starSystem)
    {
      switch (Random.getRandomIntInclusive(0,0)) {
        case 0:
          return new Nothing("nothing",starSystem,[]);
        default: 
          return new Nothing("nothing",starSystem,[]);
      }
    }
  }


  
module.exports = EventManager;
