<template>
  <v-card>
    <Employee :elements="elements" @callAPI="callAPI" />
  </v-card>
</template>

<script >
import api from '../service'
export default {
  async asyncData() {
    const allItems = await api.getAllEmployees()
      return { elements: allItems } 
  },

  methods : {
    async callAPI() {
      const allItems = await api.getAllEmployees()
      this.elements= allItems 
    }
  }
  }
</script>