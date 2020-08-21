<template>
  <div class="galaxyMap">
      <div 
      v-for="starSystem in galaxy.galaxyMap" 
      :key="starSystem.uuid" 
      class="starSystem"
      v-bind:class="[ 
      selectedSystem.uuid == starSystem.uuid ? 'selected':'', 
      ship.location.starSystem == starSystem.uuid ? 'currentPosition':'', 

       ]"
      @click="onSelectStarSystem(starSystem)"
      v-bind:style="cssposition(starSystem)">
      <!--
      -->
    </div>
  </div>
</template>
<script>
  import GalaxyApiService from '../services/GalaxyApiServices'

  export default {
  name: 'GalaxyMap',
  props: {
    galaxy: Object,
    ship: Object
  },
  data: function () {
    return {
      selectedSystem: GalaxyApiService.EmptyStarSystem,
    }
  },
  mounted() {
  },
  methods: {
    onSelectStarSystem(starSystem)
    {
      if(starSystem.uuid != this.selectedSystem.uuid)
      {
        this.selectedSystem=starSystem;
        //console.log("GalaxyMap here ! You selected " +starSystem.name);
        this.$emit("onselectstarsystem", starSystem);

      }
      else
      {
        //console.log("GalaxyMap here ! You deselected " +starSystem.name);
        this.selectedSystem = GalaxyApiService.EmptyStarSystem;
        this.$emit("onselectstarsystem");

      }

    },
    cssposition(starSystem)
    {
      return { 
        left: 50+starSystem.position.x +'%', 
        top:50+starSystem.position.y+'%', 
        background: "rgb("+starSystem.color.r+","+starSystem.color.g+","+starSystem.color.b+")"}
    }
    
  }
}
// throw event : this.$emit("onselectimage", {}); // bubble up


</script>
<style lang="scss" scoped>

.starSystem
{
  width: 20px;
  height: 20px;
  position: absolute;
  box-shadow: rgba(255, 255, 255, 0.692) 0 0 10px 2px;
  border-radius: 10px;
}


$borderwidth:2px;
$animationduration:12s;
$scale:1.8;
.selected::after
{
  position:relative;
  display: block;
  top:-$borderwidth;
  left:-$borderwidth;

  width: 100%;
  height: 100%;
  
  transform: scale($scale);
  transform-origin: center center;


  content: " ";
  border: yellow $borderwidth dotted;
  border-radius: 50%;

  -webkit-animation: rotating $animationduration linear infinite;
  -moz-animation: rotating $animationduration linear infinite;
  -ms-animation: rotating $animationduration linear infinite;
  -o-animation: rotating $animationduration linear infinite;
  animation: rotating $animationduration linear infinite;
}
.currentPosition::after
{
  position:relative;
  display: block;
  top:-$borderwidth;
  left:-$borderwidth;

  width: 100%;
  height: 100%;
  
  transform: scale(1.5);
  transform-origin: center center;


  content: " ";
  border: turquoise $borderwidth dotted;
  border-radius: 50%;

}
.galaxyMap
{
  background: rgb(6, 17, 54);
  position: relative;
}

@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg) scale($scale);
    -o-transform: rotate(0deg) scale($scale);
    transform: rotate(0deg) scale($scale);
  }
  to {
    -webkit-transform: rotate(360deg) scale($scale);
    -o-transform: rotate(360deg) scale($scale);
    transform: rotate(360deg) scale($scale);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg) scale($scale);
    -moz-transform: rotate(0deg) scale($scale);
    -webkit-transform: rotate(0deg) scale($scale);
    -o-transform: rotate(0deg) scale($scale);
    transform: rotate(0deg) scale($scale);
  }
  to {
    -ms-transform: rotate(360deg) scale($scale);
    -moz-transform: rotate(360deg) scale($scale);
    -webkit-transform: rotate(360deg) scale($scale);
    -o-transform: rotate(360deg) scale($scale);
    transform: rotate(360deg) scale($scale);
  }
}
</style>
