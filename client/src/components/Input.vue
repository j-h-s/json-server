<template>
  <div>
    <h1>Input</h1>
    <textarea
      type="input"
      name="input"
      v-model="input"
    >
    </textarea>
    <br>
    <button @click="submit">
      Submit
    </button>
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
<style scoped>

</style>
