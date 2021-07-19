<template>
  <v-card>
    <Document :elements="elements" @callAPI="callAPI" />
  </v-card>
</template>

<script >
import api from '../service'
export default {
  async asyncData() {
    const allItems = await api.getAllDocuments()
    return { elements: allItems }
  },

  methods: {
    async callAPI() {
      const allItems = await api.getAllDocuments()
      this.elements = allItems
    },
  },
}
</script>