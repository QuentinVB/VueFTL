'use strict';
var EventManager = require('../../events/EventManager'); 
//const dao = require('../../dal/dao');
const dao = require('../../dal/dao');
const { default: Nothing } = require('../../events/Nothing');



exports.getActiveEvent = function(req, res) {
  const uuid = req.params.playeruuid;

  let event = dao.ActivePlayer.activeEvent //dao.getEvent(uuid).ToObject();
  
  const currentStarSystem = dao.getCurrentStarSystem(dao.ActivePlayer.uuid);
  console.log("current date : "+Date.now()+", resetDate : "+currentStarSystem.eventResetDate+", is cooling down : "+currentStarSystem.isCoolingDown);
  
  if(currentStarSystem.isCoolingDown)
  {
    event = EventManager.Nothing(dao.ActivePlayer.uuid);
  }
  if(!event || !event.isActive)
  {
    event = EventManager.GenerateRandomEvent(dao.ActivePlayer.uuid);
    dao.ActivePlayer.activeEvent = event;
    currentStarSystem.resetCoolDown();
  }
  
  res.json({event : event.ToObject(), methode : req.method});
  
};


//POST
exports.postEventAnswer= function(req, res) {
//destination = req.body.destination;
//in url : star system ?
  const playeruuid = req.params.playeruuid;
  const answerIdx = req.params.answeridx;
  const event = dao.ActivePlayer.activeEvent;

  event.triggerAnswer(answerIdx);

  res.json({event : event.ToObject(), methode : req.method});
};
