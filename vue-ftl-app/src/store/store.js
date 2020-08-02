import Vue from 'vue'
import Vuex from 'vuex'

import ShipApiServices from '@/services/ShipApiServices';
import GalaxyApiServices from '@/services/GalaxyApiServices';
//import * as types from '@/store/mutation-types.js';
import mutators from '@/store/mutations'
import actuators from '@/store/actions'

Vue.use(Vuex)


const storage = {
    state: {
      ship:ShipApiServices.EmptyShip,
      galaxy:GalaxyApiServices.EmptyGalaxy,
      event : null
    },
    //synchronous setter
    mutations: mutators,
    //asynchronous effectors
    actions: actuators,
    getters: {
      currentStarSystem (state) {
        if(!state.ship.location) return null;
        const starSystemUUID = state.ship.location;
        return state.galaxy.galaxyMap[starSystemUUID];
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

