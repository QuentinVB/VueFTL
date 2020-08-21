<template>
  <div class="about">
    <h1>Ship status</h1>
    <ul>
      <li>Name : {{ship.name}}</li>
      <li>Fuel left  : {{ship.fuel}} | {{ship.fuelEfficiency}}</li>
      <li>Hull  : {{ship.hull}} | {{ship.hullFactor}}</li>
      <li v-if="currentStarSystem && !currentPlanet">Location : {{currentSituation}} {{currentStarSystem.name}}</li>
      <li v-else-if="currentStarSystem && currentPlanet">Location : {{currentSituation}} {{currentPlanet.name}} in system {{currentStarSystem.name}}</li>
      <li v-else>Location : Unknown</li>
      <li>Position  : 
        <ul>
          <li>x : {{ship.position.x}}</li>
          <li>y : {{ship.position.y}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>

  export default {
  name: 'Ship',

  data: function () {
    return {
      errors: [],
    }
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
  },
  mounted() {
  },
  methods: {
    /*
    checkForm: function (e) {
      e.preventDefault();

      this.errors = [];


      if (this.message === null) {
        this.errors.push('Message is required.');
      } else 
      {
        MessagesApiService.putMessageAsync(this.message)
        .then(response => {
          this.message = response.data.message
          //console.log(this.skill)
        })
        .catch(err => {
          console.error(err)
        })
      }
    }*/
  }
}
/*
fetch(apiUrl + encodeURIComponent(this.name))
        .then(async res => {
          if (res.status === 204) {
            alert('OK');
          } else if (res.status === 400) {
            let errorResponse = await res.json();
            this.errors.push(errorResponse.error);
          }
        });

*/
</script>

