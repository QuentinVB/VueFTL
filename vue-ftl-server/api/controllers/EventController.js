'use strict';
var EventManager = require('../../events/EventManager'); 
//const dao = require('../../dal/dao');
const dao = require('../../dal/dao');
const { default: Nothing } = require('../../events/Nothing');



exports.getActiveEvent = function(req, res) {
  const uuid = req.params.playeruuid;

  let event = dao.ActivePlayer.activeEvent //dao.getEvent(uuid).ToObject();

  if(!event || !event.isActive)
  {
    event = EventManager.GenerateRandomEvent(dao.ActivePlayer.uuid);
    dao.ActivePlayer.activeEvent = event;
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
