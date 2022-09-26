import {Router} from 'express';
import * as ShipController from '~/api/controllers/ShipController';

export const shipRoutes = Router();

shipRoutes.get('/',ShipController.getShip);
shipRoutes.get('/moverandom',ShipController.moveShipRandom);
shipRoutes.post('/moveto',ShipController.moveShipTo);
shipRoutes.put('/wrapto',ShipController.wrapShipTo);
shipRoutes.put('/movetoplanet',ShipController.moveShipToPlanet);
shipRoutes.put('/situation/:situation',ShipController.changeSituation);
