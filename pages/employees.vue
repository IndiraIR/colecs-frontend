<template>
<v-container>
    <v-row justify="center pb-0">
        <HeaderEmployees />
    </v-row>
    <v-row justify="space-around" class="mt-0 pt-0 mb-10">
    </v-row>
    <Employee :elements="elements" @callAPI="callAPI" />
     <Footer />
  </v-container>
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