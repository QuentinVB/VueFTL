'use strict';

import galaxyController from '../controllers/GalaxyController.js';
import shipController from '../controllers/ShipController.js';
import eventController from '../controllers/EventController.js';
import playerController from '../controllers/PlayerController.js';

//Routes for testing

//TODO : use the right verb !!
export default function(app) {

  app.route('/ship')
  .get(shipController.getShip);
  app.route('/ship/moverandom')
  .get(shipController.moveShipRandom);
  app.route('/ship/moveto')
  .post(shipController.moveShipTo);
  app.route('/ship/wrapto')
  .put(shipController.wrapShipTo);
  app.route('/ship/movetoplanet')
  .put(shipController.moveShipToPlanet);
  app.route('/ship/situation/:situation')
  .put(shipController.changeSituation);


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
};
