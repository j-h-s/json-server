<template>
  <div class="container">
    <h1 class="title">Input JSON</h1>
    <textarea
      class="input"
      type="input"
      name="input"
      v-model="input"
    >
    </textarea>

    <span class="submit">
      <button id="submit-btn" @click="submit">
        submit
      </button>
    </span>

    <span class="cancel">
      <router-link :to="{name: 'list'}">
        <button id="cancel-btn" @click="cancel">
          cancel
        </button>
      </router-link>
    </span>

    <div v-html="reply" />
  </div>
</template>

<script>
import InputService from '@/services/InputService'

export default {
  data () {
    return {
      input: '',
      reply: null
    }
  },

  methods: {
    async submit () {
      const response = await InputService.submit({
        input: this.input
      })
      console.log(response.data)
      this.reply = response.data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import '../assets/css/style.css'
</style>
