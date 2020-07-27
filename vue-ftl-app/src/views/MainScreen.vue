<template>
  <div class="mainscreen">
    <p>Captain on the bridge !</p>
    <Ship v-bind:ship="ship"/>
    <GalaxyMap v-bind:galaxy="galaxy" v-on:onselectstarsystem="starSystemSelected"/>
    <h2>Actions</h2>
    <button v-on:click="moveShipRandom">Move ship randomly</button>
    <button v-if="wrapButtonVisible" v-on:click="moveShipToSelectedDestination">Move ship to destination</button>
    <button v-if="miningButtonVisible" v-on:click="mineSomeOre">Search for ore</button>
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
      ship: ShipApiService.EmptyShip,
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
      ShipApiService.postMoveShipToAsync(this.selectedDestination.uuid)
        .then(response => {
          //check message status ?

          //on valid : update the ship
          this.ship = response.data.ship
          console.log("moved to " + this.selectedDestination.name);
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
    mineSomeOre()
    {
      if(this.selectedDestination != undefined && this.ship.location == this.selectedDestination.uuid)
      {
        GalaxyApiService.getMineStarSystemAsync(this.selectedDestination.uuid)
        .then(response => {
          //check message status ?

          //on valid : update the ship
          const starSystemToUpdate = response.data.starSystem;
          const fuelMined = response.data.fuelmined;
          this.galaxy.galaxyMap[starSystemToUpdate.uuid]=starSystemToUpdate;

          this.ship.fuel += fuelMined;


          console.log("mined " + this.selectedDestination.name+" and gained "+ fuelMined+" fuel");
        })
        .catch(err => {
          console.error(err)
        });
        
      }
    }
  },
  computed:
  {
    wrapButtonVisible()
    {
      return this.selectedDestination != undefined && this.ship.location != this.selectedDestination.uuid ;
    },
    miningButtonVisible()
    {
      return this.selectedDestination != undefined && this.ship.location == this.selectedDestination.uuid ;
    }

  }
}
</script>
