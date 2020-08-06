<template>
  <div class="StarSystemInfo">
    <ul>
      <li>{{selectedSystem.type}} - {{selectedSystem.name}}</li>
      <li>Id : {{selectedSystem.uuid}}</li>
      <li>Position : {{selectedSystem.position.x}}:{{selectedSystem.position.y}}</li>
      <li>Planets : {{selectedSystem.planets.length}}</li>
    </ul>
  </div>
</template>
<script>

  export default {
  name: 'StarSystemInfo',
  props: {
    selectedSystem: Object
  },
  data: function () {
    return {
    }
  },
  mounted() {
  },
  methods: {
    
  }
}
// throw event : this.$emit("onselectimage", {}); // bubble up


</script>
<style lang="scss" scoped>

</style>
