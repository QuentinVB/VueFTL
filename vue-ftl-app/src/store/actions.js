import * as types from '@/store/mutation-types.js';
import ShipApiServices from '@/services/ShipApiServices';
import GalaxyApiServices from '@/services/GalaxyApiServices';
import EventApiServices from '../services/EventApiServices';
import PlayerApiServices from '../services/PlayerApiServices';

//TODO : split actions
export default {
    RELOAD()
      {
        this.dispatch('refreshShip');
        this.dispatch('refreshGalaxy');
        this.dispatch('refreshPlayer');
      },
      refreshPlayer(ctx) {
        PlayerApiServices.getPlayerAsync()
          .then(response => {
              ctx.commit(types.UPDATEPLAYER,response.data.player);
            //console.log(this.skill)
            //if(this.mode == 'event') this.refreshEvent();
          })
          .catch(err => {
            console.error(err)
          })
      },
      refreshShip(ctx) {
        ShipApiServices.getShipAsync()
          .then(response => {
              ctx.commit(types.UPDATESHIP,response.data.ship);
            //console.log(this.skill)
            //if(this.mode == 'event') this.refreshEvent();
          })
          .catch(err => {
            console.error(err)
          })
      },
      refreshGalaxy(ctx) {
        GalaxyApiServices.getGalaxyAsync()
          .then(response => {
            //console.log(response.data.galaxy)
            ctx.commit(types.UPDATEGALAXY,response.data.galaxy);
          })
          .catch(err => {
            console.error(err)
          })
      },
      moveShipToSelectedDestination(ctx,starSystem)
      {
        console.log("trying to move to " + starSystem.name);
        //request moving to the destination
        //check for
        ShipApiServices.putWarpShipToAsync(starSystem.uuid)
          .then(response => {
            //check message status ?
            ctx.commit(types.UPDATESHIP,response.data.ship);
            console.log("moved to " + starSystem.name);
          })
          .then(() => {
            //TODO : set event status so the communicator will trigger
            ctx.dispatch('refreshEvent');

          })
          .catch(err => {
            console.error(err)
          });
      },
      travelShipToSelectedPlanet(ctx,planet)
      {
        console.log("trying to move to " + planet.name);
        //request moving to the destination
        //check for
        
        ShipApiServices.putMoveShipToPlanetAsync(planet.starSystem,planet.uuid)
          .then(response => {
            //check message status ?

            ctx.commit(types.UPDATESHIP,response.data.ship);
            //ctx.commit(types.REFUELSHIP,10);
            //console.log("moved to " + planet.name);
          })
          .catch(err => {
            console.error(err)
          });
        
      },
      //todo make it dynmaic
      landOnSelectedPlanet(ctx,planet)
      {
        console.log("trying to land on " + planet.name);
        ShipApiServices.putChangeShipSituationAsync("land")
        .then(response => {
          ctx.commit(types.UPDATESHIP,response.data.ship);
        })
        .catch(err => {
          console.error(err)
        });
      },
      takeOffSelectedPlanet(ctx,planet)
      {
        console.log("trying to takeoff from " + planet.name);
        ShipApiServices.putChangeShipSituationAsync("orbit")
        .then(response => {
          ctx.commit(types.UPDATESHIP,response.data.ship);
        })
        .catch(err => {
          console.error(err)
        });
      },
      mineSomeOre(ctx,planet)
      {
        if(ctx.getters.isLoaded)
        {
          GalaxyApiServices.postMinePlanetAsync(planet)
          .then(response => {

            const starSystemToUpdate = response.data.starSystem;
            //const fuelMined = response.data.fuelmined;
            //const loadedFuel = response.data.loadedFuel;
            const ship = response.data.ship;
            ctx.commit(types.UPDATESHIP,ship);
            //ctx.commit(types.REFUELSHIP,loadedFuel)
            ctx.commit(types.UPDATESTARSYSTEM,starSystemToUpdate)

            console.log("mined " + planet.name +"and refuel the ship to "+ship.fuel);
          })
          .catch(err => {
            console.error(err)
          });
          
        }
      },
      refreshEvent(ctx) {
        EventApiServices.getEventAsync(ctx.state.player.uuid)
        .then(response => {
          const returnedEvent = response.data.event;
          if(returnedEvent.isActive == false)
          {
            if(ctx.commit(types.RESOLVEEVENT));
          }
          else
          {
            ctx.commit(types.UPDATEEVENT,returnedEvent);
          }
        })
        .catch(err => {
          console.error(err)
        })
      },
      //TODO : should be a payload
      answerEvent(ctx,{playeruuid,idx}) 
      {
        //console.log("action level, event:" + eventuuid+ " idx:"+idx)
        EventApiServices.postEventAnswerAsync(playeruuid,idx)
        .then(response => {
          this.commit(types.UPDATEEVENT,response.data.event);
          this.dispatch('refreshShip');
          this.dispatch('refreshPlayer');
        })
        .catch(err => {
          console.error(err)
        })
      },
}