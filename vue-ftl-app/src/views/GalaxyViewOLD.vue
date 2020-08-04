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


export default {
  name: 'MainScreen',
  components: {
    GalaxyMap
  },
  data: function () {
    return {
      selectedDestination:undefined,
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
    moveShipToSelectedDestination()
    {
      this.$store.dispatch('moveShipToSelectedDestination',this.selectedDestination);
      this.$router.push({ name: 'MainScreen' });//{ name: 'user', params: { userId: '123' } }
      //this.$router.push({ name: 'MainScreen',query: { mode: 'event' } });//{ name: 'user', params: { userId: '123' } }
    },
    starSystemSelected(starSystem)
    {
      if(starSystem)
      {
        //console.log("MainScreen here ! You selected "+starSystem.name);
        this.selectedDestination=starSystem;
        //this.$emit("onselectstarsystem", starSystem);

      }
      else
      {
        //console.log("MainScreen here ! You deselected " +this.selectedDestination.name);
        this.selectedDestination = undefined;
        //this.$emit("onselectstarsystem");

      }
      
    },
  },
  computed:
  {
    wrapButtonVisible()
    {
      return this.selectedDestination != undefined && this.$store.state.ship.location != this.selectedDestination.uuid ;
    },
    ship()
    {
      return this.$store.state.ship;
    },
    galaxy()
    {
      return this.$store.state.galaxy;
    }

  }
}
</script>
