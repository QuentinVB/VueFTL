<template>
  <div class="mainscreen">
    <p>Captain on the bridge !</p>
    <GalaxyMap v-bind:galaxy="galaxy" v-on:onselectstarsystem="starSystemSelected"/>
    <h2>Actions</h2>
    <button v-if="wrapButtonVisible" v-on:click="moveShipToSelectedDestination">Move ship to destination</button>
  </div>
</template>

<script>
// @ is an alias to /src
import GalaxyMap from '@/components/GalaxyMap.vue'
import ShipApiService from '../services/ShipApiServices'
import GalaxyApiService from '../services/GalaxyApiServices'


export default {
  name: 'MainScreen',
  components: {
    GalaxyMap
  },
  data: function () {
    return {
      galaxy: GalaxyApiService.EmptyGalaxy,
      selectedDestination:undefined,
      errors: [],
    }
  },
  /*
  watch()
  {

  },*/
  mounted() {
    this.refreshGalaxy();
  },
  methods: {
    refreshShip() {
      ShipApiService.getShipAsync()
        .then(response => {
          this.ship = response.data.ship
          //console.log(this.skill)
        })
        .catch(err => {
          console.error(err)
        })
    },
    refreshGalaxy() {
      GalaxyApiService.getGalaxyAsync()
        .then(response => {
          this.galaxy = response.data.galaxy
          //console.log(this.skill)
        })
        .catch(err => {
          console.error(err)
        })
    },
    
    moveShipToSelectedDestination()
    {
      console.log("trying to move to " + this.selectedDestination.name);
      //request moving to the destination
      //check for
      ShipApiService.postMoveShipToAsync(this.selectedDestination.uuid)
        .then(response => {
          //check message status ?
          console.log(response.data.ship);
          //on valid : update the ship using vuex !
          //this.ship = response.data.ship
          console.log("moved to " + this.selectedDestination.name);

          //BAD : state should be changed using vuex (again)
          this.$router.push({ name: 'MainScreen',query: { mode: 'event' } });//{ name: 'user', params: { userId: '123' } }
        })
        .catch(err => {
          console.error(err)
        });

    },
    starSystemSelected(starSystem)
    {
      if(starSystem)
      {
        console.log("MainScreen here ! You selected "+starSystem.name);
        this.selectedDestination=starSystem;
        //this.$emit("onselectstarsystem", starSystem);

      }
      else
      {
        console.log("MainScreen here ! You deselected " +this.selectedDestination.name);
        this.selectedDestination = undefined;
        //this.$emit("onselectstarsystem");

      }
      
    },
  },
  computed:
  {
    wrapButtonVisible()
    {
      return true;
      //return this.selectedDestination != undefined && this.ship.location != this.selectedDestination.uuid ;
    },
    

  }
}
</script>
