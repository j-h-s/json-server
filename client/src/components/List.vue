<template>
  <div>
    <h1>List of Local JSON Files</h1>
    <ul>
      <li v-for="file in list" v-bind:key="file.name">
        <a @click="open(file)">{{ file.name }}</a>
        <!-- <a href="file.path" target="_blank" @click="open(file)">{{ file.name }}</a> -->
        <!-- <a href="data:' + data + '" download="data.json" @click="open(file.name)">{{ file.name }}</a> -->
      </li>
    </ul>
    <button @click="show">
      Refresh
    </button>
    <div v-html="json"></div>
  </div>
</template>

<script>
import FileService from '@/services/FileService'

export default {
  data () {
    return {
      list: [],
      // data: null,
      json: null
    }
  },

  created () {
    this.show()
  },

  methods: {
    async show () {
      const response = await FileService.list()
      console.log(response.data)
      this.list = response.data
      this.json = null
    },

    async open (file) {
      const json = await FileService.open(file.name)
      console.log(json.data)
      // this.data = 'text/json;charset=utf-8' + encodeURIComponent(JSON.stringify(json.data))
      this.json = JSON.stringify(json.data, null, 2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
