'use strict';
import { ActiveShip, ActiveGalaxy } from '../../dal/dao.js';

//GET
export function getShip(req, res) {
  res.json({ship : ActiveShip.toObject(), methode : req.method});
}

//GET
export function moveShipRandom(req, res) {
  //destination = req.body.destination;

  if(ActiveShip.canMove())
  {
    let rand=(Math.random()*2)-1;
    let range=1;
    ActiveShip.moveTo(
      {
        x:ActiveShip.position.x + rand*range,
        y:ActiveShip.position.y+ Math.sqrt(range*range - rand*rand)
      });
  }

  res.json({ship : ActiveShip.toObject(), methode : req.method});
}

//POST
export function moveShipTo(req, res) {
  //destination = req.body.destination;
  //should be a star system uuid ?
  var destination = req.body.destination;

  if(ActiveShip.canMove(destination))
  {    
    ActiveShip.moveTo(
        {
          x:destination.x,
          y:destination.y
        });
  }

  res.json({ship : ActiveShip.toObject(), methode : req.method});
}

//UPDATE
export function wrapShipTo(req, res) {
  //destination = req.body.destination;
  const starsystemUUID = req.body.starsystem;

  if(ActiveShip.canMove(starsystemUUID))
  {
    ActiveShip.wrapToSystem(ActiveGalaxy.galaxyMap[starsystemUUID]);
  }

  res.json({ship : ActiveShip.toObject(), methode : req.method});
}


//UPDATE
export function moveShipToPlanet(req, res) {
  //destination = req.body.destination;
  const starsystemUUID = req.body.starsystem;
  const planetdestinationUUID = req.body.planetdestination;

  if(ActiveShip.canMove(starsystemUUID,planetdestinationUUID))
  {
    ActiveShip.moveToPlanet(planetdestinationUUID);
  }

  res.json({ship : ActiveShip.toObject(), methode : req.method});
}


export function changeSituation(req, res) {
  //destination = req.body.destination;
  const situation = req.params.situation;
  let check = false;
  switch (situation) {
    case "orbit":
      ActiveShip.takeOffFromPlanet();
      check = true;
      break;
    case "land":
      ActiveShip.landOnPlanet();
      check = true;
      break;
    default:
      
      break;
  }
  
  if(check)
  {
    res.json({ship : ActiveShip.toObject(), methode : req.method});
  }
  else
  {
    res.status(400).send('bad request');
  }
}



