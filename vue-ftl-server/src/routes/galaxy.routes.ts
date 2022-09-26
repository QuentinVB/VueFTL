import {Router} from 'express';
import * as GalaxyController from '~/api/controllers/GalaxyController';

export const galaxyRoutes = Router();

galaxyRoutes.get('/',GalaxyController.getGalaxy);
galaxyRoutes.get('/:starsystemuuid',GalaxyController.getStarSystem);
galaxyRoutes.get('/:starsystemuuid/event',GalaxyController.getStarSystemEvent);
galaxyRoutes.post('/:starsystemuuid/:planetuuid/mine',GalaxyController.minePlanet);