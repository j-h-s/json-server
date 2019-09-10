<template>
  <div class="container">
    <h1 class="title">Available Files</h1>

    <table class="list">
      <!-- if list is empty -->
      <tr v-if="isEmpty(list)">
        <td colspan=2>
          <h2 id="empty">No files were found</h2>
        </td>
      </tr>

      <!-- file list -->
      <tr v-for="file in list" :key="file.name">
        <td id="name">{{ file.name }}</td>
        <td id="show">
          <button v-if="json.name === file.name" id="show-btn" @click="hide">hide</button>
          <button v-else id="show-btn" @click="show(file)">show</button>
        </td>
      </tr>
    </table>

    <!-- upload button -->
    <div class="upload">
      <router-link :to="{ name: 'upload' }">
        <button id="upload-btn">upload a new file</button>
      </router-link>
    </div>

    <!-- display file -->
    <div v-if="!isEmpty(json)" class="json">
      <div id="name">
        <button id="download-btn" @click="download(json)">
          download {{ json.name }}
        </button>
      </div>
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
    // refresh the file list
    async fresh () {
      const response = await FileService.list()
      this.list = response.data
      this.json = {}
    },

    // display a file
    async show (file) {
      if (!this.isCached(file)) {
        const json = await FileService.open(file.name)
        this.cache.push(json.data)
      }

      this.json = this.cache.filter(data => {
        return data.name === file.name
      })[0]
    },

    // hide a file if open
    hide () {
      this.json = {}
    },

    // allow user to download file
    download (file) {
      let e = document.createElement('a')
      e.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(file.body))
      e.setAttribute('download', file.name)
      e.style.display = 'none'
      document.body.appendChild(e)
      e.click()
      document.body.removeChild(e)
    },

    // check if list is empty
    isEmpty (obj) {
      return Object.keys(obj).length === 0
    },

    // check if file has already been loaded
    isCached (obj) {
      return this.cache.some(data => data.name === obj.name)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../assets/styles/list.scss'
</style>
