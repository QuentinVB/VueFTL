'use strict';
import Event from "./Event.js";
import {CLOSEEVENT} from "./EventActions.js";

//ABSTRACT !!
export default class Nothing extends Event{
  
  constructor(name,player,statesData) {
    //procecss state data before injection
   
    super(name, player)
    this.states= [
      {
        message:"Nothing to see here",
        options:[
          {message:"Continue.",
          effects:[
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]
        }]
      }
    ];
    }
  }
//add random "nothing to see" text generator ?
  