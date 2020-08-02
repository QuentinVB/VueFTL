<template>
  <div class="galaxy">
    <h1>Galaxy Map</h1>
    <div class="starSystemList">
      <div 
        v-for="starSystem in galaxy.galaxyMap" 
        :key="starSystem.uuid" 
        class="starSystem"
        v-bind:class="[ selectedSystem.uuid == starSystem.uuid ? 'selected':'' ]"
        @click="onSelectStarSystem(starSystem)">
        <ul>
          <li>{{starSystem.type}} - {{starSystem.name}}</li>
          <li>Id : {{starSystem.uuid}}</li>
          <li>Position : {{starSystem.position.x}}:{{starSystem.position.y}}</li>
          <li>Minerals : {{starSystem.minerals}}</li>
        </ul>
        
      </div>
    </div>
  </div>
</template>
<script>
  import GalaxyApiService from '../services/GalaxyApiServices'

  export default {
  name: 'GalaxyMap',
  props: {
    galaxy: Object
  },
  data: function () {
    return {
      errors: [],
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

    }
    
  }
}
// throw event : this.$emit("onselectimage", {}); // bubble up


</script>
<style lang="scss" scoped>
.starSystemList
{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border: 1px solid black;
}
.starSystem
{
  text-align: left;
  border: 1px solid black;

}
.selected
{
  background: blueviolet;
}
</style>
