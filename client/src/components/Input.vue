<template>
  <div class="container">
    <h1 class="title">Input JSON</h1>

    <h2 v-if="message" class="message">
      {{ this.message }}
    </h2>

    <form id="json" @submit="validate">
      <textarea
        class="input"
        type="input"
        name="input"
        v-model="input"
      >
      </textarea>

      <div class="name">
        <label for="name-in">File name:</label>
        <input id="name-in" type="text" name="name-in" v-model="name">
      </div>

      <span class="submit">
        <button id="submit-btn" type="submit" value="submit">
          submit
        </button>
      </span>

      <span class="cancel">
        <router-link :to="{name: 'list'}">
          <button id="cancel-btn">
            cancel
          </button>
        </router-link>
      </span>
    </form>

  </div>
</template>

<script>
import InputService from '@/services/InputService'

export default {
  data () {
    return {
      input: '',
      name: '',
      message: null
    }
  },

  methods: {
    async submit () {
      const response = await InputService.submit({
        input: this.input,
        name: this.name
      })
      console.log(response.data)
      this.message = response.data.message
    },

    validate (form) {
      form.preventDefault()

      if (!this.input) {
        this.message = 'Please input some JSON in the area below.'
        return
      }

      if (!this.validateJson(this.input)) {
        this.message = 'Invalid JSON detected. Please only use valid JSON.'
        return
      }

      if (!this.name) {
        this.message = 'Please supply a name for your file.'
        return
      }

      this.validateName(this.name)
      this.submit()
    },

    validateJson (string) {
      try {
        const obj = JSON.parse(string)
        if (obj && typeof obj === 'object') {
          return true
        }
      } catch (e) {
        return false
      }
    },

    validateName (string) {
      if (!string.endsWith('.json')) {
        this.name = string + '.json'
        console.log(this.name)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import '../assets/css/style.css'
</style>
