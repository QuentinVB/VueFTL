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
      moveShipToSelectedDestination(ctx,destination)
      {
        console.log("trying to move to " + destination.name);
        //request moving to the destination
        //check for
        ShipApiServices.postMoveShipToAsync(destination.uuid)
          .then(response => {
            //check message status ?
            ctx.commit(types.UPDATESHIP,response.data.ship);
            console.log("moved to " + destination.name);
          })
          .then(() => {
            //TODO : set event status so the communicator will trigger
            ctx.dispatch('refreshEvent');

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
            const fuelMined = response.data.fuelmined;

            ctx.commit(types.REFUELSHIP,fuelMined)
            ctx.commit(types.UPDATESTARSYSTEM,starSystemToUpdate)

            console.log("mined " + planet.name +" and gained "+ fuelMined+" fuel");
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