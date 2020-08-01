'use strict';
var EventManager = require('../../events/EventManager'); 
//const dao = require('../../dal/dao');

import dao from '../../dal/dao'

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
exports.postEventAnswer= function(req, res) {
  //destination = req.body.destination;
  //in url : star system ?
  const eventuuid = req.body.eventuuid;
  const answerIdx = req.body.answerIdx;
  //check action existence ?
  /*
  {

  }
  
  */

  const event = dao.getEvent(eventuuid);

  
  //var eventUpdated= 


  res.json({event : eventUpdated, methode : req.method});
};
