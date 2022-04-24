const express  =require( 'express');
const { urlencoded, json }  =require( 'body-parser');
const cors  =require( 'cors');
const routes  =require( './api/routes/Routes.js'); //importing route
const { InitModels }  =require( './dal/dao.js');
const {DBConnection, sequelize }  =require( './dal/DBConnection.js');


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

//InitModels(sequelize);

//routes
routes(app); //register the route

//setup 404
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

//run server
app.listen(port);

console.log('FTL RESTful API server started on: ' + port);