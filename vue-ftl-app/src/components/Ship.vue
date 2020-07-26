<template>
  <div class="ship">
    <h1>Ship status</h1>
    <ul>
      <li>Name : {{ship.name}}</li>
      <li>Fuel left  : {{ship.fuel}}</li>
      <li>Position  : 
        <ul>
          <li>x : {{ship.coordinate.x}}</li>
          <li>y : {{ship.coordinate.y}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
  //import ShipApiService from '../services/ShipApiServices'

  export default {
  name: 'Ship',
  props: {
    ship: Object
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

