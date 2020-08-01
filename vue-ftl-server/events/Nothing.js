'use strict';
const Random = require("../helpers/Random");
const Event = require("./Event");



//ABSTRACT !!
class Nothing extends Event{
  
  constructor(name,starSystem,statesData) {
    //procecss state data before injection
    let states= [
      {message:"Nothing to see here",options:[{message:"Continue.",effects:[]}]}
    ]
    super(name, starSystem,states)
    }
  }
//add random "nothing to see" text generator ?
  
module.exports = Nothing;
