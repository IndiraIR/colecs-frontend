<template>
  <v-container>
    <v-row justify="center pb-0">
      <HeaderWishlists />
    </v-row>
    <v-row justify="space-around" class="mt-0 pt-0 mb-10"> </v-row>
    <Wish
      :elements="elements"
      :artists="artists"
      :contacts="contacts"
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
