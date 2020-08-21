'use strict';
const Random = require("../../helpers/Random");
const Uuid = require('uuid');
const EventManager = require('./EventManager'); 


//ABSTRACT !!
class Anomaly {
  constructor(name,planet,effectData) {
      this.name=name;
      this.uuid = Uuid.v4();
      this.effects = effectData;
      this.planet = planet;
    }
    ToObject()
    {
      return {
        name : this.name,
        isActive : this.isActive,
        uuid:this.uuid,
        planet: this.planet.uuid,
        effects:  this.effects
      }
    }
    
    triggerEffects(player)
    {
      for (const effect of this.effects) {
        EventManager.ProcessAction(effect.action,effect.payload);
      }

    }
  }


  
module.exports = Anomaly;
