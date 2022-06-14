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
	

	//origin : GalaxySpace ; Destination galaxySpace
	if(IsInGalaxySpace(originLocation) && IsInGalaxySpace(destination))
	{
		return EuclidianDistance(originLocation.position,destination.position);
	}

	//origin : StarSystemSpace ; Destination StarSystemSpace
	if(IsInStarSystemSpace(originLocation) && IsInStarSystemSpace(destination))
	{
		return EuclidianDistance(originLocation.position,destination.position);
	}

	//origin : StarSystemSpace ; Destination galaxySpace
	if(IsInStarSystemSpace(originLocation) && IsInGalaxySpace(destination))
	{
		let position = null;
		//origin : starSystem => origin.position
		if( originLocation instanceof StarSystem) position = originLocation.position;

		//origin : location within star system => starsystem.position

		//origin : planet orbit => starsystem holding planet position

		//origin : planet => starsystem holding planet position
		else if(locator instanceof Planet) {

		}
		else { throw new Error("Cant decide the right origin type");}

	}



	return 0;
};

function IsInGalaxySpace(locator)
{
	return (locator?.reference?.reference === Reference.GALAXY|| locator instanceof StarSystem );
}

function IsInStarSystemSpace(locator)
{
	return (locator?.reference?.reference === Reference.STARSYSTEM || locator?.reference?.reference === Reference.PLANET || locator instanceof Planet );
}