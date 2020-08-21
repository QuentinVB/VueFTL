import Vue from 'vue'
import Vuex from 'vuex'

import ShipApiServices from '@/services/ShipApiServices';
import GalaxyApiServices from '@/services/GalaxyApiServices';
import PlayerApiServices from '@/services/PlayerApiServices';

//import * as types from '@/store/mutation-types.js';
import mutators from '@/store/mutations'
import actuators from '@/store/actions'

Vue.use(Vuex)


const storage = {
    state: {
      ship:ShipApiServices.EmptyShip,
      galaxy:GalaxyApiServices.EmptyGalaxy,
      player:PlayerApiServices.EmptyPlayer,
      //star system ?
      //planet ?
      event : null
    },
    //synchronous setter
    mutations: mutators,
    //asynchronous effectors
    actions: actuators,
    //TODO : getters should be lazy ?
    getters: {
      currentStarSystem (state) {


        if(!state.ship.location.starsystem) return null;

        const starSystemUUID = state.ship.location.starsystem;

        return state.galaxy.galaxyMap[starSystemUUID];
      },
      currentPlanet (state) {
        if(!state.ship.location.planet) return null;
        return state.galaxy.galaxyMap[state.ship.location.starsystem].planets.find(p=>p.uuid =state.ship.location.planet );
      },
      isLoaded (state) {
        if(state.ship.name == "") return false
        if(state.galaxy.starCount == 0) return false
        return true;
      }
    }
  }

const store = new Vuex.Store(storage)
export default store;

