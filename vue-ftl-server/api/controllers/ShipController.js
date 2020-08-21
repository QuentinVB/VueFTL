'use strict';
//var Game = require('../models/Game'); //created model loading here
//var Player = require('../models/PLayer'); //created model loading here
var Ship = require('../../models/Ship'); 
const dao = require('../../dal/dao')


//GET
exports.getShip = function(req, res) {
  res.json({ship : dao.ActiveShip.toObject(), methode : req.method});
};

//GET
exports.moveShipRandom= function(req, res) {
  //destination = req.body.destination;

  if(dao.ActiveShip.canMove())
  {
    let rand=(Math.random()*2)-1;
    let range=1;
    dao.ActiveShip.moveTo(
      {
        x:dao.ActiveShip.position.x + rand*range,
        y:dao.ActiveShip.position.y+ Math.sqrt(range*range - rand*rand)
      });
  }

  res.json({ship : dao.ActiveShip.toObject(), methode : req.method});
};

//POST
exports.moveShipTo= function(req, res) {
  //destination = req.body.destination;
  //should be a star system uuid ?
  var destination = req.body.destination;

  if(dao.ActiveShip.canMove(destination))
  {    
    dao.ActiveShip.moveTo(
        {
          x:destination.x,
          y:destination.y
        });
  }

  res.json({ship : dao.ActiveShip.toObject(), methode : req.method});
};

//UPDATE
exports.wrapShipTo= function(req, res) {
  //destination = req.body.destination;
  const starsystemUUID = req.body.starsystem;

  if(dao.ActiveShip.canMove(starsystemUUID))
  {
    dao.ActiveShip.wrapToSystem(starsystemUUID);
  }

  res.json({ship : dao.ActiveShip.toObject(), methode : req.method});
};


//UPDATE
exports.moveShipToPlanet= function(req, res) {
  //destination = req.body.destination;
  const starsystemUUID = req.body.starsystem;
  const planetdestinationUUID = req.body.planetdestination;

  if(dao.ActiveShip.canMove(starsystemUUID,planetdestinationUUID))
  {
    dao.ActiveShip.moveToPlanet(planetdestinationUUID);
  }

  res.json({ship : dao.ActiveShip.toObject(), methode : req.method});
};


exports.changeSituation= function(req, res) {
  //destination = req.body.destination;
  const situation = req.params.situation;
  let check = false;
  switch (situation) {
    case "orbit":
      dao.ActiveShip.takeOffFromPlanet();
      break;
    case "land":
      dao.ActiveShip.landOnPlanet();
      break;
    default:
      
      break;
  }
  
  if(check)
  {
    res.json({ship : dao.ActiveShip.toObject(), methode : req.method});
  }
  else
  {
    res.status(400).send('bad request');
  }
};



