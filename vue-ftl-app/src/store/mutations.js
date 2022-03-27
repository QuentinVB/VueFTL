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
      [types.UPDATEUser] (state,updatedUser) {
        state.User=updatedUser;
      },
      [types.WARPSHIPTO] (state,starsystem) {
        state.ship.position = starsystem.position;
        state.ship.location.starsystem = starsystem.uuid;
      },
      [types.MOVESHIPTO] (state,starsystemUUID,planetUUID) {
        state.ship.location.starsystem = starsystemUUID;
        state.ship.location.planet = planetUUID;
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