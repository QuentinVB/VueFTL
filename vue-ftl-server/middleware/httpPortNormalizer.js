// Renvoi d'un port valide avec normalizePort
module.exports = val => {
	const port = parseInt(val, 10);
  
	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
};
  