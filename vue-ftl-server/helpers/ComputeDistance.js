const { Reference } = require("./enum");
const {Location,StarSystem,Planet} = require("../models");

function EuclidianDistance(p1,p2)
{
	return Math.sqrt(
		((p2.x - p1.x)*(p2.x - p1.x))
		+ ((p2.y - p1.y)*(p2.y - p1.y))
		+ ((p2.z - p1.z)*(p2.z - p1.z))
	);
}

/**
 * 
 * @param {Location} originLocation 
 * @param  {(Location|StarSystem|Planet)} destination 
 * @returns 
 */
module.exports = function(originLocation,destination)
{
	if(!(destination instanceof Location) & !(destination instanceof StarSystem) & !(destination instanceof Planet)) throw new Error("Not reachable destination");
	
	//TODO : create local function checkForGalaxy, checkForStarSystem, checkForPlanet
	//TODO : refactor, its ugly af
	//Galaxy position to Galaxy position
	if( originLocation?.reference?.reference === Reference.GALAXY && destination?.reference?.reference === Reference.GALAXY)
	{
		return EuclidianDistance(originLocation.position,destination.position);
	}
	//StarSystem to StarSystem
	else if((originLocation?.reference?.reference === Reference.STARSYSTEM || originLocation instanceof StarSystem)
	&& (destination?.reference?.reference === Reference.STARSYSTEM || destination instanceof StarSystem))
	{
		return EuclidianDistance(originLocation.position,destination.position);
	}
	//Planet to Planet
	else if((originLocation?.reference?.reference === Reference.PLANET || originLocation instanceof Planet)
	&& (destination?.reference?.reference === Reference.PLANET || destination instanceof Planet))
	{
		return EuclidianDistance(originLocation.position,destination.position);
	}

	//Galaxy position to StarSystem
	else if( originLocation?.reference?.reference === Reference.GALAXY 
		&&  (destination?.reference?.reference === Reference.STARSYSTEM || destination instanceof StarSystem))
	{
		return EuclidianDistance(originLocation.position,destination.position);
	}

	//StarSystem to Galaxy position
	else if( (originLocation?.reference?.reference === Reference.STARSYSTEM || originLocation instanceof StarSystem)
		&& destination?.reference?.reference === Reference.GALAXY )
	{
		return EuclidianDistance(originLocation.position,destination.position);
	}

	return 0;
};