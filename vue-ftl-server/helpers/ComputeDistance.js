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
module.exports = async function(originLocation,destination)
{
	if(!(destination instanceof Location) & !(destination instanceof StarSystem) & !(destination instanceof Planet)) throw new Error("Not reachable destination");
	
	//TODO : create local function checkForGalaxy, checkForStarSystem, checkForPlanet
	//TODO : refactor, its ugly af
	

	//origin : GalaxySpace ; Destination galaxySpace
	if(IsInGalaxySpace(originLocation) && IsInGalaxySpace(destination))
	{
		return EuclidianDistance(originLocation.position,destination.position);
	}

	//origin : StarSystemSpace ; Destination StarSystemSpace, unless both are planets not in the same starsystem
	if(IsInStarSystemSpace(originLocation) && IsInStarSystemSpace(destination))
	{
		let positionOrigin = originLocation.position;
		let positionDestination = destination.position;
		if(originLocation instanceof Planet && destination instanceof Planet ) {
			const originStarSystemId = originLocation.StarSystemId;
			const destinationStarSystemId = destination.StarSystemId;

			if(originStarSystemId !== destinationStarSystemId)
			{
				const originStarSystem = await StarSystem.findOne({where:{id:originStarSystemId}});
				positionOrigin = originStarSystem.position;
		
				const destinationStarSystem = await StarSystem.findOne({where:{id:destinationStarSystemId}});
				positionDestination = destinationStarSystem.position;
			}
			
		}
		return EuclidianDistance(positionOrigin,positionDestination);
	}

	//origin : StarSystemSpace ; Destination galaxySpace
	if(IsInStarSystemSpace(originLocation) && IsInGalaxySpace(destination))
	{
		let positionOrigin = null;

		//origin : starSystem => origin.position
		if( originLocation instanceof StarSystem) positionOrigin = originLocation.position;

		//origin : location within star system => starsystem.position
		else if(originLocation?.reference?.reference === Reference.STARSYSTEM)
		{
			const starSystem = await StarSystem.findOne({where:{id:originLocation?.reference?.id}});
			positionOrigin = starSystem.position;
		}

		//origin : planet orbit => starsystem holding planet position
		else if(originLocation?.reference?.reference === Reference.PLANET)
		{
			const planet = await Planet.findOne({where:{id:originLocation?.reference?.id}});
			const parentStarSystem = await StarSystem.findOne({where:{id:planet.StarSystemId}});
			positionOrigin = parentStarSystem.position;
		}
		//origin : planet => starsystem holding planet position
		else if(originLocation instanceof Planet ) {
			const parentStarSystemId = originLocation.StarSystemId;
			const parentStarSystem = await StarSystem.findOne({where:{id:parentStarSystemId}});
			positionOrigin = parentStarSystem.position;
		}
		else { throw new Error("Cant decide the right origin type");}

		return EuclidianDistance(positionOrigin,destination.position);
	}



	return 0;
};

function IsInGalaxySpace(locator)
{
	return (locator?.reference?.reference === Reference.GALAXY || locator instanceof StarSystem );
}

function IsInStarSystemSpace(locator)
{
	return (locator?.reference?.reference === Reference.STARSYSTEM || locator?.reference?.reference === Reference.PLANET || locator instanceof Planet );
}