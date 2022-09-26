/*global process*/
// Gestion des erreurs avec errorHandler

module.exports = function(server,port)
{
	return error => {
		if (error.syscall !== "listen") {
			throw error;
		}
		const address = server.address();
		const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
		switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges.");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use.");
			process.exit(1);
			break;
		default:
			throw error;
		}
	};
};