'use strict';
module.exports = function(app) {

//const testController = require('../controllers/TestController')
const galaxyController = require('../controllers/GalaxyController')
const shipController = require('../controllers/ShipController')
const eventController = require('../controllers/EventController')
const playerController = require('../controllers/PlayerController')



//Routes for testing

//TODO : use the right verb !!

  app.route('/ship')
  .get(shipController.getShip);
  app.route('/ship/moverandom')
  .get(shipController.moveShipRandom);
  app.route('/ship/moveto')
  .post(shipController.moveShipTo);
  app.route('/ship/wrapto')
  .post(shipController.wrapShipTo);

  app.route('/galaxy')
  .get(galaxyController.getGalaxy);
  app.route('/galaxy/:starsystemuuid')
  .get(galaxyController.getStarSystem);
  app.route('/galaxy/:starsystemuuid/event')
  .get(galaxyController.getStarSystemEvent);
  /*app.route('/galaxy/:starsystemuuid/mine')
  .get(galaxyController.mineStarSystem);*/
  app.route('/galaxy/:starsystemuuid/:planetuuid/mine')
  .post(galaxyController.minePlanet);

  app.route('/event/:playeruuid')
  .get(eventController.getActiveEvent);
  app.route('/event/:playeruuid/answer/:answeridx')
  .post(eventController.postEventAnswer);

  app.route('/player')
  .get(playerController.getPlayer);
  app.route('/player')
  .put(playerController.updatePlayer);
//real routes

  /*join a new game, 
  passing username in parameter, 
  create a new game state if not exist, else join an existing one 
  then return the game state.*/
  /*
  app.route('/new/:username')
    .post(gamecontroller.joinNewGame);

  /*get the current game state, 
  passing game id in parameter 
  app.route('/:gameid')
    .get(gamecontroller.getgame);

  /*post the clicked edge, 
  passing game id, username and edge id in parameter 
  app.route('/:gameid/:username/:edgeid')
    .post(gamecontroller.playTurn);*/
};
