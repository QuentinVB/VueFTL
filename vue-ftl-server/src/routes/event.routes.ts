import {Router} from 'express';
import * as EventController from '~/api/controllers/EventController';

export const eventRoutes = Router();

eventRoutes.get('/',EventController.getActiveEvent);
eventRoutes.post('/:Eventuuid/answer/:answeridx',EventController.postEventAnswer);
