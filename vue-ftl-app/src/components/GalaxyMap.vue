<template>
  <div class="galaxy">
    <p>{{galaxy.starCount}}</p>
    <div class="starSystemList">
      <div v-for="starSystem in galaxy.galaxyMap" :key="starSystem.uuid" class="starSystem">
        <ul>
          <li>{{starSystem.type}} - {{starSystem.name}}</li>
          <li>Id : {{starSystem.uuid}}</li>
          <li>Position : {{starSystem.coordinates.x}}:{{starSystem.coordinates.y}}</li>
          <li>Minerals : {{starSystem.minerals}}</li>
        </ul>
        
      </div>
    </div>
  </div>
</template>
<script>
  //import ShipApiService from '../services/ShipApiServices'

  export default {
  name: 'GalaxyMap',
  props: {
    galaxy: Object
  },
  data: function () {
    return {
      errors: [],
    }
  },
  mounted() {
  },
  methods: {
    
  }
}

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
</style>
