<template>
  <div class="about">
    <h1>Player status</h1>
    <ul>
      <li>Name : {{player.username}}</li>
      <li>Credits : {{player.credits}} </li>
      <li v-if="player.ship">ShipUUID : {{player.ship}}</li>
    </ul>
  </div>
</template>
<script>

  export default {
  name: 'Player',

  data: function () {
    return {
      errors: [],
    }
  },
  computed:
  {
    player()
    {
      return this.$store.state.player;
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

