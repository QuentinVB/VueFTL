<template>
  <div class="mainscreen">
    <p>Captain on the bridge !</p>
    <Ship v-bind:ship="ship"/>
    <GalaxyMap v-bind:galaxy="galaxy" v-on:onselectstarsystem="starSystemSelected"/>
    <button v-on:click="moveShipRandom">Move ship randomly</button>
    <button v-if="selectedDestination" v-on:click="moveShipToSelectedDestination">Move ship to destination</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Ship from '@/components/Ship.vue'
import GalaxyMap from '@/components/GalaxyMap.vue'
import ShipApiService from '../services/ShipApiServices'
import GalaxyApiService from '../services/GalaxyApiServices'


export default {
  name: 'MainScreen',
  components: {
    Ship,
    GalaxyMap
  },
  data: function () {
    return {
      ship: ShipApiService.EmptyShip(),
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
    this.refreshShip();
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
    moveShipRandom()
    {
      ShipApiService.getMoveShipAsync()
        .then(response => {
          this.ship = response.data.ship
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
      ShipApiService.postMoveShipToAsync(this.selectedDestination.coordinates)
        .then(response => {
          //check message status ?

          //on valid : update the ship
          this.ship = response.data.ship
          console.log("moved to " + this.selectedDestination.name);
        })
        .catch(err => {
          console.error(err)
        })

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
      
    }
  }
}
</script>
