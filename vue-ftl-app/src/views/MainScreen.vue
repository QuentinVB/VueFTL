<template>
  <div class="mainscreen">
    <p>Captain on the bridge !</p>
    <h2>Actions</h2>
    <button v-if="miningButtonVisible" v-on:click="mineSomeOre">Search for ore</button>
    <h2>Communications</h2>
    <p>Here lies the messages from strangers species</p>
    <p v-if="mode == 'event'"> <!--should be modal !-->
      {{event.state.message}}
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import ShipApiService from '@/services/ShipApiServices'
import GalaxyApiService from '@/services/GalaxyApiServices'
import EventApiServices from '@/services/EventApiServices'


export default {
  name: 'MainScreen',
  props: {
    mode:  //event or nothing
    {
        type: String,
        default: null
    }
  },
  components: {
  },
  data: function () {
    return {
      event: EventApiServices.EmptyEvent,
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
    console.log(this.mode);
    //if(this.mode == 'event') this.refreshEvent();
  },
  methods: {
    refreshShip() {
      ShipApiService.getShipAsync()
        .then(response => {
          this.ship = response.data.ship
          //console.log(this.skill)
          if(this.mode == 'event') this.refreshEvent();
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
    refreshEvent() {
      
      GalaxyApiService.getStarSystemEventAsync(this.ship.location)
      .then(response => {
        console.log(response.data.event);
        this.event = response.data.event
        //console.log(this.skill)
      })
      .catch(err => {
        console.error(err)
      })
    },
    
    mineSomeOre()
    {
      //if(this.selectedDestination != undefined && this.ship.location == this.selectedDestination.uuid)
      if(this.ship.location)
      {
        GalaxyApiService.getMineStarSystemAsync(this.ship.location)
        .then(response => {
          //check message status ?

          //on valid : update the ship
          const starSystemToUpdate = response.data.starSystem;
          const fuelMined = response.data.fuelmined;
          this.galaxy.galaxyMap[starSystemToUpdate.uuid]=starSystemToUpdate;
          this.ship.fuel += fuelMined;
          console.log("mined " + this.ship.location+" and gained "+ fuelMined+" fuel");
        })
        .catch(err => {
          console.error(err)
        });
        
      }
    }
  },
  computed:
  {
    miningButtonVisible()
    {
      return this.ship.location;
      //return this.selectedDestination != undefined && this.ship.location == this.selectedDestination.uuid ;
    }

  }
}
</script>
