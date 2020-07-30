import * as types from '@/store/mutation-types.js';
import ShipApiServices from '@/services/ShipApiServices';
import GalaxyApiServices from '@/services/GalaxyApiServices';

export default {
    RELOAD()
      {
        this.dispatch('refreshShip');
        this.dispatch('refreshGalaxy');
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
      mineSomeOre(ctx)
      {

        if(ctx.getters.isLoaded)
        {
          GalaxyApiServices.getMineStarSystemAsync(ctx.state.ship.location)
          .then(response => {

            const starSystemToUpdate = response.data.starSystem;
            const fuelMined = response.data.fuelmined;

            ctx.commit(types.REFUELSHIP,fuelMined)
            ctx.commit(types.UPDATESTARSYSTEM,starSystemToUpdate)

            console.log("mined " + ctx.state.ship.location+" and gained "+ fuelMined+" fuel");
          })
          .catch(err => {
            console.error(err)
          });
          
        }
      },
      refreshEvent(ctx) {
        GalaxyApiServices.getStarSystemEventAsync(ctx.state.ship.location)
        .then(response => {
          this.commit(types.UPDATEEVENT,response.data.event)
        })
        .catch(err => {
          console.error(err)
        })
      },
}