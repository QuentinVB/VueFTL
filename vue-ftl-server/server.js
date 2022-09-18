/*global process*/
/*eslint no-undef: "error"*/

const http = require("http"); 
const app = require("./app"); 
const errorHandler = require("./middleware/httpErrorHandler");
const httpPortNormalizer = require("./middleware/httpPortNormalizer");

//PORT
const port = httpPortNormalizer(process.env.PORT || 3000);
app.set("port", port);

const server = http.createServer(app);

//ERRORS
server.on("error", errorHandler(server,port)); 

server.on("listening", () => { 
	const address = server.address();
	const bind = typeof address === "string" ? "pipe " + address : "port " + port;
	console.log("Listening on " + bind);
});

//RUN
server.listen(port);