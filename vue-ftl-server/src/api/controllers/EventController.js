'use strict';
import * as EventManager from '../../models/events/EventManager.js'; 
import {ActiveUser} from '../../dal/dao.js';

export function getActiveEvent(req, res) {
  const uuid = req.params.Useruuid;

  let event = ActiveUser.activeEvent //dao.getEvent(uuid).ToObject();
  
  const currentStarSystem = getCurrentStarSystem(ActiveUser.uuid);
  console.log("current date : "+Date.now()+", resetDate : "+currentStarSystem.eventResetDate+", is cooling down : "+currentStarSystem.isCoolingDown);
  
  if(currentStarSystem.isCoolingDown)
  {
    event = NothingEvent(ActiveUser.uuid);
  }
  if(!event || !event.isActive)
  {
    event = GenerateRandomEvent(ActiveUser.uuid);
    ActiveUser.activeEvent = event;
    currentStarSystem.resetCoolDown();
  }
  
  res.json({event : event.ToObject(), methode : req.method});
  
}


//POST
export function postEventAnswer(req, res) {
//destination = req.body.destination;
//in url : star system ?
  const Useruuid = req.params.Useruuid;
  const answerIdx = req.params.answeridx;
  const event = ActiveUser.activeEvent;

  event.triggerAnswer(answerIdx);

  res.json({event : event.ToObject(), methode : req.method});
}
