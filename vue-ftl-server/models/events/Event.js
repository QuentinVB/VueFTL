'use strict';
const Random = require("../../helpers/Random");
const Uuid = require('uuid');
const EventManager = require('./EventManager'); 


//ABSTRACT !!
/**
 * @abstract
 */
class Event {
  constructor(name,player) {
      this.name=name;
      this.currentStateIdx = 0  ;
      this.isActive = true;

      this.states = [];
      
      this.player = player;
      this.uuid = Uuid.v4();
    }
    ToObject()
    {
      return {
        name : this.name,
        isActive : this.isActive,
        uuid:this.uuid,
        playerUUID: this.player.uuid,
        state:  this.states[this.currentStateIdx]
      }
    }
    get currentState()
    {
      if(this.states)
      {
        //TODO : cleanup state from result
        return this.states[this.currentStateIdx];
      }
      throw "no states !";
    }

    triggerAnswer(idx)
    {
      //console.log("answer triggered "+ idx);
      //TODO ADD SAFETY

      const currentState = this.states[this.currentStateIdx];

      if(0>idx || idx>= currentState.options.length) throw "idx should be inbetween";

      const selectedOption = currentState.options[idx];

      for (const effect of selectedOption.effects) {
        EventManager.ProcessAction(effect.action,effect.payload);
      }

    }
  }


  
module.exports = Event;
