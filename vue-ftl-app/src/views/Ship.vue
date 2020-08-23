<template>
  <div class="about">
    <h1>{{ship.name}}  : ship status</h1>
    <ul>
      <li>Fuel left  : {{Math.round(ship.fuel)}} | {{ship.fuelEfficiency}}</li>
      <li>Hull  : {{Math.round(ship.hull)}} | {{ship.hullFactor}}</li>
      <li v-if="currentStarSystem && !currentPlanet">Location : {{currentSituation}} {{currentStarSystem.name}}</li>
      <li v-else-if="currentStarSystem && currentPlanet">Location : {{currentSituation}} {{currentPlanet.name}}</li>
      <li v-else>Location : Unknown</li>
      <li>Position : {{ship.position.x}} : {{ship.position.y}}</li>
      
    </ul>
    <h2>Cargo Bay</h2>
    <div v-if="ship.cargoBay" class="cargoContainer">
        <div 
          v-for="cargo in ship.cargoBay" 
          :key="cargo.uuid" 
          class="cargo">
          <!--TODO : icons of cargo hooo yeah !-->
          {{cargo.quantity}}t of {{cargo.content}}
        </div>
    </div>
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
<style lang="scss" scoped>
.cargoContainer
{
  display: flex;
  justify-content:center;
}
.cargo
{
  background:rgb(180, 180, 180);
  padding:5px;
  margin:2px;
  border:black 1px solid;
}
</style>
