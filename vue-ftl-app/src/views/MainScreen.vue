<template>
  <div class="mainscreen">
    <p>Captain on the bridge !</p>
    <p v-if="currentStarSystem">Current system is {{currentStarSystem.name}}</p>
    <h2>Actions</h2>
    <button v-if="miningButtonVisible" v-on:click="mineSomeOre">Search for ore</button>
    <h2>Communications</h2>
    <p v-if="!event">Here lies the messages from strangers species</p>
    <p v-if="event"> <!--should be modal !-->
      {{event.state.message}}
      <ul>
        <li v-for="(option,index) in event.state.options" :key="index" v-on:click="selectEventOption(index)">{{option.message}}</li>
      </ul>
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
//import * as types from '@/store/mutation-types.js';


export default {
  name: 'MainScreen',
  props: {
    mode:  //event or nothing
    {
        type: String,
        default: null
    }
  },
  components: {
  },
  data: function () {
    return {
      errors: [],
    }
  },
  /*
  watch()
  {

  },*/
  mounted() {
    //if(this.mode == 'event') this.refreshEvent();
  },
  methods: {
    mineSomeOre()
    {
      this.$store.dispatch('mineSomeOre');
    },
    selectEventOption(idx)
    {
      console.log("clicked option "+idx +" on event:" + this.event.uuid);

      this.$store.dispatch('answerEvent',{eventuuid:this.event.uuid,idx:idx});
      //this.$store.commit(types.RESOLVEEVENT);
    }
  },
  computed:
  {
    miningButtonVisible()
    {
      return this.ship.location;
      //return this.selectedDestination != undefined && this.ship.location == this.selectedDestination.uuid ;
    },
    ship()
    {
      return this.$store.state.ship;
    },
    galaxy()
    {
      return this.$store.state.galaxy;
    },
    event()
    {
      return this.$store.state.event;
    },
    currentStarSystem()
    {
      return this.$store.getters.currentStarSystem;
    }
  }
}
</script>
