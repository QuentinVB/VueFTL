<template>
  <div class="StarSystemMap">
    <div class="flexContainer">
      <div 
      v-for="planet in starsystem.planets" 
      :key="planet.name" 
      class="planetContainer"
      v-bind:class="[ 
        selectedPlanet && selectedPlanet.uuid == planet.uuid ? 'selected':'', 
       ]"
      @click="onSelectPlanet(planet)"
      >
        <div class="planet" v-bind:style="cssposition(planet)"></div>
        <div v-if="orbitingPlanet && orbitingPlanet.uuid ==  planet.uuid ">
          <svg width="33" height="33">
            <polygon points="0,0 33,17 0,33 10,17"
            style="fill:cyan;stroke:rgb(5, 165, 165);stroke-width:1;fill-rule:evenodd;" />
          </svg>
        </div>
        <div v-if="landedOnPlanet && landedOnPlanet.uuid ==  planet.uuid ">
          <svg width="33" height="33">
            <polygon points="0,0 33,17 0,33 10,17"
            style="fill:transparent;stroke:rgb(5, 165, 165);stroke-width:1;fill-rule:evenodd;" />
          </svg>
        </div>
        <p>{{planet.name}}</p>
        <p>{{planet.type}}</p>
        <p>Ore abbudancy : {{planet.minerals}}%</p>
        <p>Radius : {{(planet.radius).toFixed(2)}} Er</p>
        <p>Orbit : {{(planet.orbit).toFixed(2)}} UA</p>
      </div>
    </div>
  </div>
</template>
<script>
  //import GalaxyApiService from '../services/GalaxyApiServices'

  export default {
  name: 'StarSystemMap',
  props: {
    starsystem: Object,
    ship: Object,
  },
  data: function () {
    return {
      selectedPlanet: null,
    }
  },
  mounted() {
    console.log(this.starsystem);
  },
  methods: {
    onSelectPlanet(planet)
    {
      //console.log(planet)
      if(!this.selectedPlanet)
      {
        this.selectedPlanet = planet;
        //console.log("StarSystemMap here ! You selected " +this.selectedPlanet.name);
        this.$emit("onselectplanet", planet);

      }
      else if(this.selectedPlanet && planet.uuid != this.selectedPlanet.uuid)
      {
        this.selectedPlanet=planet;
        //console.log("StarSystemMap here ! You selected " +this.selectedPlanet.name);
        this.$emit("onselectplanet", planet);
      }
      else
      {
        //console.log("StarSystemMap here ! You deselected " +this.selectedPlanet.name);
        this.selectedPlanet = null;
        this.$emit("onselectplanet");
      }

    },
    cssposition(planet)
    {
      return { 
        //left: 50+starSystem.position.x +'%', 
        //top:50+starSystem.position.y+'%', 
        transform: "scale("+planet.radius/10+")",
        background: "rgb("+planet.color.r+","+planet.color.g+","+planet.color.b+")"}
    }
    
  },
  computed:
  {
    orbitingPlanet()
    {
      if(this.$store.getters.currentPlanet && this.$store.state.ship.location.situation == "orbiting") return this.$store.getters.currentPlanet
      return false;
    },
    landedOnPlanet()
    {
      if(this.$store.getters.currentPlanet && this.$store.state.ship.location.situation == "landed") return this.$store.getters.currentPlanet
      return false ;
    }
  }
}
// throw event : this.$emit("onselectimage", {}); // bubble up


</script>
<style lang="scss" scoped>
.StarSystemMap
{
  width: 100%;
  background: #061136;
  display: block;
  overflow: auto;
}
.flexContainer
{
  display: flex;
  align-items: center;
  width: auto;
}
$planetContainerMinWidth:150px;
.planetContainer
{
  min-width: $planetContainerMinWidth;
  height: 80%;
  border:1px turquoise solid;
  color:turquoise;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;

  padding: 10px;
  margin:0px 10px;
}
.planet
{
  width: $planetContainerMinWidth/2;
  height: $planetContainerMinWidth/2;
  padding: 10px;

  box-shadow: rgba(255, 255, 255, 0.692) 0 0 10px 2px;
  border-radius: $planetContainerMinWidth/2;
  margin-bottom: $planetContainerMinWidth*0.4;
}
.selected 
{
  background: rgb(31, 61, 117);
  box-shadow: cyan 0px 2px 10px;
}

$borderwidth:2px;
$animationduration:12s;
$scale:1.8;
.selected .planet::after
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
