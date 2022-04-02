import express from 'express';
import BodyParser from 'body-parser';
const { urlencoded, json } = BodyParser;
import cors from 'cors';
import routes from './api/routes/Routes.js'; //importing route
import { InitModels } from './dal/dao.js';
import DBConnection, { sequelize } from './dal/DBConnection.js';

var app = express();
var port = process.env.PORT || 3000;

app.use(urlencoded({ extended: true }));
app.use(json());

//set up http header
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  next();
});

app.use(cors());

//init Sequelize
DBConnection.TestConnection()

//init DAO using sequelize
InitModels(sequelize);

//routes
routes(app); //register the route

//setup 404
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

//run server
app.listen(port);

console.log('FTL RESTful API server started on: ' + port);