import * as types from '@/store/mutation-types.js';

export default {
    [types.REFUELSHIP] (state,amount) {
        state.ship.fuel+=amount;
      },
      [types.DRAINSHIP] (state) {
        state.ship.fuel=0;
      },
      [types.UPDATESHIP] (state,updatedShip) {
        state.ship=updatedShip;
      },
      [types.MOVESHIP] (state,destination) {
        state.ship.position = destination.position;
        state.ship.location = destination.location;
      },
      [types.UPDATEGALAXY] (state,updatedGalaxy) {
        state.galaxy=updatedGalaxy;
      },
      [types.UPDATESTARSYSTEM] (state,updatedStarSystem) {
        //NOPE
        state.galaxy.galaxyMap[updatedStarSystem.uuid]=updatedStarSystem;
      },
      [types.UPDATEEVENT] (state,event) {
        state.event=event;
      },
      
      [types.RESOLVEEVENT] (state) {
        state.event=null;//yep
      },
}