<template>
  <v-card>
    <Contact :elements="elements" @callAPI="callAPI" />
  </v-card>
</template>

<script >
import api from '../service'
export default {
  async asyncData() {
    const allItems = await api.getAllContacts()
      return { elements: allItems } 
  },

  methods : {
    async callAPI() {
      const allItems = await api.getAllContacts()
      this.elements= allItems 
    }
  }
  }
</script>
