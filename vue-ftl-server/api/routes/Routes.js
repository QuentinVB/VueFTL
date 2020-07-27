'use strict';
module.exports = function(app) {

const testController = require('../controllers/TestController')
const galaxyController = require('../controllers/GalaxyController')
const shipController = require('../controllers/ShipController')



//Routes for testing
  app.route('/ping')
    .get((req, res)=> {
      res.json({ping : "pong", methode : req.method})}
      );
  app.route('/time')
    .get((req, res)=> {
      res.json({timestamp : (new Date(Date.now())).toLocaleString('fr-FR'), methode : req.method})}
      );
  app.route('/getstate')
  .get(testController.getstate);
  app.route('/updatemessage')
  .put(testController.updateMessage);

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
  app.route('/galaxy/:starsystemuuid/mine')
  .get(galaxyController.mineStarSystem);
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
