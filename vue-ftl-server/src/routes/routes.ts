'use strict';

import express from 'express';
import path from 'path';

import { shipRoutes } from './ship.routes.js';
import { userRoutes } from './user.routes.js';
import { galaxyRoutes } from './galaxy.routes.js';
import { eventRoutes } from './event.routes.js';

export default function(app:express.Express) {

  app.use('/ship', shipRoutes);
  app.use('/galaxy', galaxyRoutes);
  app.use('/user', userRoutes);
  //TODO : auth routes
  app.use('/event', eventRoutes);

  //TODO : Routes for testing

  //LOCAL & ASSETS
  app.use("/images", express.static(path.join(__dirname, "images")));

};
