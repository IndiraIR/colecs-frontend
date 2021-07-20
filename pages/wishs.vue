<template>
  <v-card>
    <Wish
      :elements="elements"
      :artists="artists"
      :contacts="contacts"
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
    const allContacts = await api.getAllContacts()

    
    return { elements: allItems, artists: allArtists, contacts: allContacts }
  },

  methods: {
    async callAPI() {
      const allItems = await api.getAllWishs()
      const allContacts = await api.getAllContacts()
      const allArtists = await api.getAllArtists()

      this.elements = allItems
      this.contacts = allContacts
      this.artists = allArtists
    },

    
  },
}
</script>

