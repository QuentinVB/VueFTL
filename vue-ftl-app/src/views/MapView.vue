<template>
  <div class="mainscreen">
    
    <div class="mapView">
      <GalaxyMap v-if="mapMode=='galaxy'" v-bind:galaxy="galaxy" v-bind:ship="ship" v-on:onselectstarsystem="starSystemSelected"/>
      <StarSystemMap v-if="currentStarSystem && mapMode=='starsystem'" v-bind:starsystem="currentStarSystem" v-bind:ship="ship" v-on:onselectplanet="planetSelected"/>
      <div class="mapSideBar">
        <h2>Star System Infos</h2>
        
        <StarSystemInfo v-bind:selectedSystem="activeStarSystem" />
        <h2>Actions</h2>
        <button v-if="wrapButtonVisible" v-on:click="warpShipToSelectedDestination">Move ship to destination</button>
        <button v-if="miningButtonVisible" v-on:click="mineSomeOre">Search for ore</button>
        <button v-if="travelToPlanetButtonVisible" v-on:click="travelShipToSelectedPlanet">Travel to {{selectedPlanet.name}}</button>
        <button v-if="landOnPlanetButtonVisible" v-on:click="landOnSelectedPlanet">Land on {{selectedPlanet.name}}</button>
        <button v-if="takeOffPlanetButtonVisible" v-on:click="takeOffSelectedPlanet">Take off planet {{selectedPlanet.name}}</button>
        <h2>Map mode</h2>
        <ul>
          <li><router-link to="/map/galaxy">Galaxy view</router-link></li>
          <li v-if="currentStarSystem"><router-link to="/map/starsystem">Local System view</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GalaxyMap from '@/components/GalaxyMap.vue'
import StarSystemMap from '@/components/StarSystemMap.vue'
import StarSystemInfo from '@/components/StarSystemInfo.vue'
import GalaxyApiService from '../services/GalaxyApiServices'

export default {
  name: 'MapView',
  components: {
    GalaxyMap,
    StarSystemMap,
    StarSystemInfo
  },
  props: {
    mode: String,
  },
  data: function () {
    return {
      selectedDestination:GalaxyApiService.EmptyStarSystem,
      selectedPlanet:null,
      errors: [],
    }
  },
  /*
  watch()
  {

  },*/
  mounted() {
    
  },
  methods: {
    warpShipToSelectedDestination()
    {
      this.$store.dispatch('moveShipToSelectedDestination',this.selectedDestination);
      this.$router.push({ name: 'MainScreen' });//{ name: 'user', params: { userId: '123' } }
      //this.$router.push({ name: 'MainScreen',query: { mode: 'event' } });//{ name: 'user', params: { userId: '123' } }
    },
    travelShipToSelectedPlanet()
    {
      this.$store.dispatch('travelShipToSelectedPlanet',this.selectedPlanet);
    },
    landOnSelectedPlanet()
    {
      this.$store.dispatch('landOnSelectedPlanet',this.selectedPlanet);
    },
    takeOffSelectedPlanet()
    {
      this.$store.dispatch('takeOffSelectedPlanet',this.selectedPlanet);
    },
    mineSomeOre()
    {
      //TODO add safety 
      this.$store.dispatch('mineSomeOre', this.selectedPlanet);
    },
    planetSelected(planet)
    {
      //console.log(planet);
      this.selectedPlanet = planet ?? null;
    },
    starSystemSelected(starSystem)
    {
      this.selectedDestination=starSystem ?? null;
    },
  },
  computed:
  {
    wrapButtonVisible()
    {
      return this.selectedDestination && this.selectedDestination.uuid != "" &&  this.$store.state.ship.location != this.selectedDestination.uuid ;
    },
    miningButtonVisible()
    {
      if(this.mapMode=='starsystem' && this.currentPlanet && this.selectedPlanet)
      {
        return this.currentPlanet.uuid == this.selectedPlanet.uuid;
      }
      return false;
    },
    travelToPlanetButtonVisible()
    {
      if(this.mapMode=='starsystem' && this.selectedPlanet)
      {
        return this.selectedPlanet != this.currentPlanet && this.currentSituation != "landed";
      }
      return false;
    },
    landOnPlanetButtonVisible()
    {
      if(this.mapMode=='starsystem' && this.selectedPlanet )
      {
        return this.selectedPlanet == this.currentPlanet && this.currentSituation == "orbiting";
      }
      return false;
    },
    takeOffPlanetButtonVisible()
    {
      if(this.mapMode=='starsystem' && this.selectedPlanet )
      {
        return this.selectedPlanet == this.currentPlanet && this.currentSituation == "landed";
      }
      return false;
    },
    ship()
    {
      return this.$store.state.ship;
    },
    galaxy()
    {
      return this.$store.state.galaxy;
    },
    mapMode()
    {
      if(this.mode) return this.mode;
      if(this.currentStarSystem) return 'starsystem';
      return 'galaxy';
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
    activeStarSystem()
    {
      if(this.mapMode=='starsystem') return this.currentStarSystem;
      if(this.selectedDestination && this.mapMode=='galaxy') return this.selectedDestination;
      return GalaxyApiService.EmptyStarSystem;
    }
  }
}
</script>
<style lang="scss" scoped>
$ratio: 80%;
.mapView
{
  display: flex;
  width: 100%;
  height: 80vh;
}
.galaxyMap,.StarSystemMap
{
  width: $ratio;
  height: 100%;
  background: rgb(6, 17, 54);
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
.mapSideBar
{
  width: 100-$ratio;
}

</style>