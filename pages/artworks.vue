<template>
  <v-card>
    <Artwork
      :elements="elements"
      :artists="artists"
      @callAPI="callAPI"
      @allArtists="allArtists"
    />
  </v-card>
</template>

<script>
import api from '../service'
export default {
  async asyncData() {
    const allItems = await api.getAllArtworks()
    const allArtists = await api.getAllArtists()
    return { elements: allItems, artists: allArtists }
  },

  methods: {
    async callAPI() {
      const allItems = await api.getAllArtworks()
      this.elements = allItems
    },

   
  },
}
</script>

