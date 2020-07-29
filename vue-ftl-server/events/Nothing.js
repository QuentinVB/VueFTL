'use strict';
const Random = require("../helpers/Random");
const Event = require("./Event");



//ABSTRACT !!
class Nothing extends Event{
  
  constructor(name,starSystem,statesData) {
    //procecss state data before injection
    let states= [
      {message:"Il n'y a rien ici",options:[{message:"Continuer.",effects:[]}]}
    ]
    super(name, starSystem,states)
    }
  }

  
module.exports = Nothing;
