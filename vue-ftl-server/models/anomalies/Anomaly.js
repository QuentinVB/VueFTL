'use strict';
import { v4 } from 'uuid';
import { ProcessAction } from './EventManager'; 

//ABSTRACT !!
export default class Anomaly {
  constructor(name,planet,effectData) {
      this.name=name;
      this.uuid = v4();
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
        ProcessAction(effect.action,effect.payload);
      }

    }
  }
