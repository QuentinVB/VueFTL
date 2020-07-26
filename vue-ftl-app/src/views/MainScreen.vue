<template>
  <div class="mainscreen">
    <p>Captain on the bridge !</p>
    <Ship v-bind:ship="ship"/>
    <GalaxyMap v-bind:galaxy="galaxy"/>
    <button v-on:click="moveShipRandom">Move ship randomly</button>

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
      galaxy: GalaxyApiService.EmptyGalaxy(),
      errors: [],
    }
  },
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
    }
  }
}
</script>
