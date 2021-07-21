<template>
<v-container>
    <v-row justify="center pb-0">
        <HeaderArtworks />
    </v-row>
    <v-row justify="space-around" class="mt-0 pt-0 mb-10">
    </v-row>
    <Artwork
      :elements="elements"
      :artists="artists"
      @callAPI="callAPI"
      @allArtists="allArtists"
    />
     <Footer />
  </v-container>
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
      const allArtists = await api.getAllArtists()
      this.elements = allItems
      this.artists = allArtists
    },

    
  },
}
</script>

