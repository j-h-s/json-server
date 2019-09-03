<template>
  <div>
    <h1>Test</h1>
    <input
      type="message"
      name="message"
      v-model="message"
      />
    <br>
    <button @click="test">
      Test
    </button>
  </div>
</template>

<script>
import TestService from '@/services/TestService'
export default {
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async test () {
      const response = await TestService.test({
        message: this.message
      })
      console.log(response.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
