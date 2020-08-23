<template>
  <div class="miniShip">
    <div v-if="currentStarSystem && !currentPlanet" class="shipInfo wideInfo">Location : {{currentSituation}} {{currentStarSystem.name}}</div>
    <div v-else-if="currentStarSystem && currentPlanet" class="shipInfo wideInfo">Location : {{currentSituation}} {{currentPlanet.name}}</div>
    <div v-else class="shipInfo wideInfo">Location : Unknown</div>
    <div class="shipInfoContainer">
      <div class="shipInfo">Fuel : {{fuel}} | {{ship.fuelEfficiency}}</div>
      <div class="shipInfo">Hull : {{ship.hull}} | {{ship.hullFactor}}</div>
    </div>
    <!--TODO : Add credits ?-->
    
  </div>
</template>
<script>
  //import ShipApiService from '../services/ShipApiServices'

  export default {
  name: 'MiniShip',
  data: function () {
    return {
      errors: [],
    }
  },
  mounted() {
  },
  methods: {
    
  },
  computed:
  {
    ship()
    {
      return this.$store.state.ship;
    },
    currentStarSystem()
    {
      return this.$store.getters.currentStarSystem;
    },
    currentSituation()
    {
      return this.$store.state.ship.location.situation;
    },
    currentPlanet()
    {
      return this.$store.getters.currentPlanet;
    },
    fuel()
    {
      return Math.round(this.ship.fuel);
    }
  },
}
</script>
<style lang="scss" scoped>
.shipInfoContainer
{
  display: flex;
  justify-content:center;
  align-items:stretch;
}
.shipInfo
{
  color:white;
  background:rgb(56, 56, 56);
  padding:5px;
  border:cadetblue 1px solid;
}

</style>