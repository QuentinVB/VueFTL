//'use strict';

import Random from "../../helpers/Random"
import Event from "./Event";
import {GAINCREDITS,DAMAGESHIP,SETEVENTSTATE,CLOSEEVENT} from "./EventActions";


export default class TreasureCache extends Event{
  //TODO : inject fuel amount gained in state data
  constructor(name,player,statesData) {
    
    super(name, player)
    
    const threshold = 0.4;
    const stateOutcome = (Math.random()<threshold)?1:2;
    const damages = Random.getRandomInt(10)+1;

    this.states= [
        {
          message:"There is an abandoned space station which was once a pirates's den, lost in the asteroid field. Maybe there is still some valuables ?  ",
          options:[
            {
              message:"Venture cautiously the ship close to the flying rocks.",
              effects:[
                {action:GAINCREDITS,payload:{amount:1} },//inject state data here
                {action:SETEVENTSTATE,payload:{eventuuid:this.uuid,state:stateOutcome} }
              ]
            },
            {
              message:"Leave it.",
              effects:[
                {action:SETEVENTSTATE,payload:{eventuuid:this.uuid,state:3} }
              ]
            }
          ]
        },
        {
          message:"You successfully manoeuver across the floatings asteroids and dock your ship to the small station. A pirate's corpse, frozen in the void, lies near a chest full of gold ingots ! You are rich !",
          options:[{message:"Load the ingots onboard.",effects:[
            {action:GAINCREDITS,payload:{eventuuid:this.uuid,amount:100} },
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]}]
        },
        {
          message:'Fatalitas ! You avoided the biggest asteroids of the field when suddenly you came right into a "rain" of small gravel. Your ship\'s hull is damaged and the impact cause you to drift out of the field.',
          options:[{message:"Leave the asteroid field.",effects:[
            {action:DAMAGESHIP,payload:{damages:damages} },
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]}]
        },
        {
          message:"You left the station alone in the void of space...",
          options:[{message:"Continue.",effects:[
            {action:CLOSEEVENT,payload:{eventuuid:this.uuid} }
          ]}]
        }
      ]
    }
  }

  