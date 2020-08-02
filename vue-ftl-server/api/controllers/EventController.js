'use strict';
var EventManager = require('../../events/EventManager'); 
//const dao = require('../../dal/dao');
const dao = require('../../dal/dao');

exports.getEvent = function(req, res) {
  const uuid = req.params.eventuuid;

  const event = dao.getEvent(uuid).ToObject();

  if(!event)
  {
    res.status(404).send('event not found');
  }
  else
  {
    res.json({event : event, methode : req.method});
  }
};


//POST
exports.getEventAnswer= function(req, res) {
//destination = req.body.destination;
//in url : star system ?
  const eventuuid = req.params.eventuuid;
  const answerIdx = req.params.answeridx;
  const event = dao.getEvent(eventuuid);

  event.triggerAnswer(answerIdx);

  res.json({event : event.ToObject(), methode : req.method});
};
