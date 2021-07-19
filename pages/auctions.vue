<template>
  <v-card>
    <Auction :elements="elements" @callAPI="callAPI" />
  </v-card>
</template>

<script >
import api from '../service'
export default {
  async asyncData() {
    const allItems = await api.getAllAuctions()
    return { elements: allItems }
  },

  methods: {
    async callAPI() {
      const allItems = await api.getAllAuctions()
      this.elements = allItems
    },
  },
}
</script>