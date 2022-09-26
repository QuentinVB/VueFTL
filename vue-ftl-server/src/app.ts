/*global __dirname*/
import express from 'express';
//import * as bodyParser from 'body-parser';

/*
import helmet from "helmet"; 
import rateLimit from "express-rate-limit"; 
import xssClean from "xss-clean";
import cors from "cors";
*/

import routes from "./routes/Routes.js"; //importing route

require("dotenv").config(); 

const app = express(); 

/*
// DDOS limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,    // 15 minutes
	max: 250                     // 250 requêtes maximum par IP
});
app.use(limiter);

app.use(helmet.crossOriginEmbedderPolicy());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(xssClean());
app.use(cors());
*/

//set up http header for CORS
//TODO : redudant from Helmet ?
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*"); //SECURME : acces from all origin, only in dev
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH"); 
	next();
});

//register the routes
routes(app); 

export default app;