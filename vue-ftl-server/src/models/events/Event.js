'use strict';
import * as Uuid from 'uuid';
import * as EventManager from './EventManager.js'; 

//ABSTRACT !!
/**
 * @abstract
 */
export default class Event {
  constructor(name,User) {
      this.name=name;
      this.currentStateIdx = 0  ;
      this.isActive = true;

      this.states = [];
      
      this.User = User;
      this.uuid = Uuid.v4();
    }
    ToObject()
    {
      return {
        name : this.name,
        isActive : this.isActive,
        uuid:this.uuid,
        UserUUID: this.User.uuid,
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

