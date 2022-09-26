/*global process*/
/*eslint no-undef: "error"*/

import http from "http"; 
import app from "./app"; 
import sequelize from './sequelize';
import errorHandler from "./middleware/httpErrorHandler";
import httpPortNormalizer from "./middleware/httpPortNormalizer";
import  dotenv from 'dotenv'
dotenv.config(); 

//PORT
const port = httpPortNormalizer(process.env.PORT || 3000);
app.set("port", port);

(async () => {
	//ORM
	await sequelize.sync({force: true});
  
	const server = http.createServer(app);
	//ERRORS
	server.on("error", errorHandler(server,port)); 

	//SERVER
	server.on("listening", () => { 
		const address = server.address();
		const bind = typeof address === "string" ? "pipe " + address : "port " + port;
		console.log(`Server running on ${bind}`);
	});

	//RUN
	server.listen(port);
})();
  