'use strict';
import Event from "./Event.js";
import {CLOSEEVENT} from "./EventActions.js";

//ABSTRACT !!
export default class Nothing extends Event{
  
  constructor(name,User,statesData) {
    //procecss state data before injection
   
    super(name, User)
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
  