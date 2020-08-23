<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/ship">Ship</router-link> |
      <router-link to="/player">Player</router-link> |
      <!-- user profile -->
      <router-link to="/map">Navigation</router-link>
      <MiniShip/>
    </div>
    <router-view/>
  </div>
</template>
<script>
import MiniShip from '@/components/MiniShip.vue'

export default {
  name: 'MainScreen',
  components: {
    MiniShip,
  },
  data: function () {
    return {
      errors: [],
    }
  },
  
  computed:
  {
    
  },
  mounted() {
    if(!this.$store.getters.isLoaded)
    {
      console.log("force full reload");
      this.$store.dispatch('RELOAD')
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
html
{
  background: rgb(149, 160, 170);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.miniShip
{
  position:fixed;
  top:0;
  right:0;
  
}
</style>

