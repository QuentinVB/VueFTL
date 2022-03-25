'use strict';

import * as GalaxyController from '../controllers/GalaxyController.js';
import * as ShipController from '../controllers/ShipController.js';
import * as EventController from '../controllers/EventController.js';
import * as PlayerController from '../controllers/PlayerController.js';

//Routes for testing

//TODO : use the right verb !!
export default function(app) {

  app.route('/ship')
  .get(ShipController.getShip);
  app.route('/ship/moverandom')
  .get(ShipController.moveShipRandom);
  app.route('/ship/moveto')
  .post(ShipController.moveShipTo);
  app.route('/ship/wrapto')
  .put(ShipController.wrapShipTo);
  app.route('/ship/movetoplanet')
  .put(ShipController.moveShipToPlanet);
  app.route('/ship/situation/:situation')
  .put(ShipController.changeSituation);


  app.route('/galaxy')
  .get(GalaxyController.getGalaxy);
  app.route('/galaxy/:starsystemuuid')
  .get(GalaxyController.getStarSystem);
  app.route('/galaxy/:starsystemuuid/event')
  .get(GalaxyController.getStarSystemEvent);
  /*app.route('/galaxy/:starsystemuuid/mine')
  .get(GalaxyController.mineStarSystem);*/
  app.route('/galaxy/:starsystemuuid/:planetuuid/mine')
  .post(GalaxyController.minePlanet);

  app.route('/event/:playeruuid')
  .get(EventController.getActiveEvent);
  app.route('/event/:playeruuid/answer/:answeridx')
  .post(EventController.postEventAnswer);

  app.route('/player')
  .get(PlayerController.getPlayer);
  app.route('/player')
  .put(PlayerController.updatePlayer);
};
