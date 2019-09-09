<template>
  <div class="container">
    <h1 class="title">Available Files</h1>
    <table class="list">
      <tr v-if="isEmpty(list)">
        <td colspan=2>
          <h2 id="empty">No files were found</h2>
        </td>
      </tr>

      <tr v-for="file in list" v-bind:key="file.name">
        <td id="name">{{ file.name }}</td>
        <td id="show">
          <button v-if="json.name === file.name" id="show-btn" @click="hide">hide</button>
          <button v-else id="show-btn" @click="show(file)">show</button>
        </td>
      </tr>
    </table>

    <div class="upload">
      <router-link :to="{name: 'upload'}">
        <button id="upload-btn">upload a new file</button>
      </router-link>
    </div>

    <div v-if="!isEmpty(json)" class="json">
      <h2 id="name">
        <button id="download-btn" @click="download(json)">
          download {{ json.name }}
        </button>
      </h2>
      <pre id="body">{{ json.body }}</pre>
    </div>
  </div>
</template>

<script>
import FileService from '@/services/FileService'

export default {
  data () {
    return {
      list: [],
      json: {},
      cache: []
    }
  },

  created () {
    this.fresh()
  },

  methods: {
    async fresh () {
      const response = await FileService.list()
      console.log(response.data)
      this.list = response.data
      this.json = {}
    },

    async show (file) {
      let json = {}

      if (this.isCached(file)) {
        json = await this.cache.filter(data => {
          return data.name === file.name
        })
        this.json = json[0]
        return
      }

      json = await FileService.open(file.name)
      this.json = json.data
      this.cache.push(this.json)
    },

    hide () {
      this.json = {}
    },

    download (file) {
      let e = document.createElement('a')
      e.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(file.body))
      e.setAttribute('download', file.name)
      e.style.display = 'none'
      document.body.appendChild(e)
      e.click()
      document.body.removeChild(e)
    },

    isEmpty (obj) {
      return Object.keys(obj).length === 0
    },

    isCached (obj) {
      return this.cache.some(data => data.name === obj.name)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import '../assets/css/style.css'
</style>
