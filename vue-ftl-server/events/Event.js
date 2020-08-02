'use strict';
const Random = require("../helpers/Random");
const Uuid = require('uuid');



//ABSTRACT !!
class Event {
  
  
  constructor(name,starSystem,statesData) {
      this.name=name;
      this.currentStateIdx = 0  ;
      this.isActive = false;

      this.states = statesData;
      
      this.starSystem = starSystem;
      this.uuid = Uuid.v4();
    }
    ToObject()
    {
      return {
        name : this.name,
        isActive : this.isActive,
        uuid:this.uuid,
        starSystemUUID: this.starSystem.uuid,
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
      console.log("answer triggered "+ idx);

      
    }
  }


  
module.exports = Event;
