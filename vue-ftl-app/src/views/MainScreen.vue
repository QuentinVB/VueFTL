<template>
  <div class="mainscreen">
    <p>Captain on the bridge !</p>
    <p v-if="currentStarSystem">Current system is {{currentStarSystem.name}}</p>
    <h2>Actions</h2>
    <h2>Communications</h2>
    <section class="com">
      <p v-if="!eventActive">Here lies the messages from stranger species</p>
      <p v-if="eventActive"> <!--should be modal !-->
        {{event.state.message}}
        <ul>
          <li v-for="(option,index) in event.state.options" :key="index" v-on:click="selectEventOption(index)" class="eventOption">{{option.message}}</li>
        </ul>
      </p>
    </section>
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
    selectEventOption(idx)
    {
      console.log("clicked option "+idx +" for event of player :" + this.player.uuid);

      this.$store.dispatch('answerEvent',{playeruuid:this.player.uuid,idx:idx});
      //this.$store.commit(types.RESOLVEEVENT);
    }
  },
  computed:
  {

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
    player()
    {
      return this.$store.state.player;
    },
    currentStarSystem()
    {
      return this.$store.getters.currentStarSystem;
    },
    eventActive()
    {
      //console.log(this.$store.state.event);
      //console.log(this.$store.state.event && this.$store.state.event.isActive);
      return this.$store.state.event && this.$store.state.event.isActive
    }
  }
}
</script>

<style lang="scss">
.eventOption
{
  text-decoration: underline;
  cursor: pointer;
}
.eventOption:hover
{
  font-weight: bolder;
}
.com
{
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  p
  {
    max-width: 15cm;
    text-align:left;
  }
}
</style>