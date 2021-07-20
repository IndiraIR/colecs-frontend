<template>
  <v-card>
    <Wish
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
    const allItems = await api.getAllWishs()
    const allArtists = await api.getAllArtists()
    return { elements: allItems, artists: allArtists }
  },

  methods: {
    async callAPI() {
      const allItems = await api.getAllWishs()
      this.elements = allItems
    },

    async allArtists() {
      const allArtists = await api.getAllArtists()
      this.artists = allArtists
    },
  },
}
</script>

