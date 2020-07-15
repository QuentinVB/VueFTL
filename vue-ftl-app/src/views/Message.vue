<template>
  <div class="about">
    <h1>This is an message page</h1>
    <p>{{message}}</p>
    <form
        @submit="checkForm"
        method="post"
      >
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-foreach="error in errors">{{ error }}</li>
        </ul>
      </p>
      <input v-model="message" placeholder="modifiez-moi">
      <input type="submit" value="Submit" >
    </form>
  </div>
</template>
<script>
  import MessagesApiService from '../services/MessageApiServices'

  export default {
  name: 'Message',

  data: function () {
    return {
      message: null,
      errors: [],
    }
  },
  mounted() {
    this.refreshMessage();
  },
  methods: {
    refreshMessage() {
      MessagesApiService.getMessageAsync()
        .then(response => {
          this.message = response.data.message
          //console.log(this.skill)
        })
        .catch(err => {
          console.error(err)
        })
    },
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
    }
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

