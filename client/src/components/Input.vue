<template>
  <div class="container">
    <h1 class="title">Input JSON</h1>

    <h2 v-if="message" class="message">
      {{ this.message }}
    </h2>

    <form id="json" @submit="validate">
      <textarea class="input" type="input" name="input" v-model="input">
      </textarea>

      <div class="name">
        <label id="label" for="name-input">File name: </label>
        <input id="name-input" type="text" name="name-input" v-model="name">
      </div>

      <span class="submit">
        <button id="submit-btn" type="submit" value="submit">
          submit
        </button>
      </span>

      <span class="cancel">
        <router-link :to="{ name: 'list' }">
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

      this.message = response.data.message

      if (response.data.code === 201) {
        this.input = ''
        this.name = ''
      }
    },

    validate (form) {
      form.preventDefault()

      if (!this.input) {
        this.message = 'Please input some JSON in the area below.'
        return
      }

      if (!this.validateJson(this.input)) {
        this.message = 'Invalid input. Please use only valid JSON.'
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
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../assets/styles/input.scss'
</style>
