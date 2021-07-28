<template>
<v-container>
    <v-row justify="center pb-0">
        <HeaderArtists />
    </v-row>
    <v-row justify="space-around" class="mt-0 pt-0 mb-10">
    </v-row>
    <Artist :elements="elements" :customers="customers" @callAPI="callAPI" />
     <Footer />
  </v-container>
</template>

<script >
import api from '../service'
export default {
  async asyncData() {
    const allItems = await api.getAllArtists()
    const allContacts = await api.getAllContacts()
      return { elements: allItems, customers: allContacts } 
  },

  methods : {
    async callAPI() {
      const allItems = await api.getAllArtists()
      const allContacts = await api.getAllContacts()
      this.elements = allItems 
      this.customers = allContacts
    }
  }
  }
</script>