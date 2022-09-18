/*global __dirname*/
const express = require("express"); // Importation du framework Express utilisé pour la création d'application node.js
const { urlencoded, json }  =require( "body-parser");
const path = require("path");
const helmet = require("helmet"); 
const rateLimit = require("express-rate-limit"); 
const xssClean = require("xss-clean");
const cors = require("cors"); 
const routes  =require( "./api/routes/Routes.js"); //importing route

require("dotenv").config(); 

const app = express(); // Importation de l'application Express sur le serveur

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

//set up http header for CORS
//TODO : redudant form Helmet ?
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*"); //SECURME : acces from all origin, only in dev
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH"); 
	next();
});

//init DAO using sequelize
//InitModels(sequelize);

//register the route
routes(app); 
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;