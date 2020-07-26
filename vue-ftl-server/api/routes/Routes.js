'use strict';
module.exports = function(app) {
  var gamecontroller = require('../controllers/Controller');

  var testController = require('../controllers/TestController')
  var galaxyController = require('../controllers/GalaxyController')

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
  .get(testController.getShip);

  app.route('/ship/moverandom')
  .get(testController.moveShipRandom);

  app.route('/galaxy')
  .get(galaxyController.getGalaxy);
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
