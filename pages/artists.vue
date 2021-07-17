<template>
  <v-card>
    <Artist :elements="elements" @callAPI="callAPI" />
  </v-card>
</template>

<script >
import api from '../service'
export default {
  async asyncData() {
    const allItems = await api.getAllArtists()
      return { elements: allItems } 
  },

  methods : {
    async callAPI() {
      const allItems = await api.getAllArtists()
      this.elements= allItems 
    }
  }
  }
</script>