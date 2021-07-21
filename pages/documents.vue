<template>
  <v-container>
    <v-row justify="center pb-0">
      <HeaderDocuments />
    </v-row>
    <v-row justify="space-around" class="mt-0 pt-0 mb-10"> </v-row>
    <Document 
    :elements="elements"
    :clients="clients"
    :artworks="artworks"
    @callAPI="callAPI" />
    <Footer />
  </v-container>
</template>
 
<script >
import api from '../service'
export default {
  async asyncData() {
    const allItems = await api.getAllDocuments()
    const allClients = await api.getAllContacts()
    const allArtworks = await api.getAllArtworks()
    return { elements: allItems, clients: allClients, artworks: allArtworks }
  },

  methods: {
    async callAPI() {
      const allItems = await api.getAllDocuments()
      this.elements = allItems
      const allClients = await api.getAllContacts()
      this.clients = allClients
      const allArtworks = await api.getAllArtworks()
      this.artworks = allArtworks
    },

 
  },
}
</script>