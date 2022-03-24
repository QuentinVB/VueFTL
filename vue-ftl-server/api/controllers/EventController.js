'use strict';
import { Nothing, GenerateRandomEvent } from '../../models/events/EventManager.js'; 
import { ActivePlayer, getCurrentStarSystem } from '../../dal/dao.js';

export function getActiveEvent(req, res) {
  const uuid = req.params.playeruuid;

  let event = ActivePlayer.activeEvent //dao.getEvent(uuid).ToObject();
  
  const currentStarSystem = getCurrentStarSystem(ActivePlayer.uuid);
  console.log("current date : "+Date.now()+", resetDate : "+currentStarSystem.eventResetDate+", is cooling down : "+currentStarSystem.isCoolingDown);
  
  if(currentStarSystem.isCoolingDown)
  {
    event = Nothing(ActivePlayer.uuid);
  }
  if(!event || !event.isActive)
  {
    event = GenerateRandomEvent(ActivePlayer.uuid);
    ActivePlayer.activeEvent = event;
    currentStarSystem.resetCoolDown();
  }
  
  res.json({event : event.ToObject(), methode : req.method});
  
}


//POST
export function postEventAnswer(req, res) {
//destination = req.body.destination;
//in url : star system ?
  const playeruuid = req.params.playeruuid;
  const answerIdx = req.params.answeridx;
  const event = ActivePlayer.activeEvent;

  event.triggerAnswer(answerIdx);

  res.json({event : event.ToObject(), methode : req.method});
}
