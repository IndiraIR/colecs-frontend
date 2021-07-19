<template>
<v-container>
      <v-row justify="center pb-0">
        <HeaderContacts />
    </v-row>
    <v-row justify="space-around" class="mt-0 pt-0 mb-10">
      </v-row>
    <Contact :elements="elements" @callAPI="callAPI" />
 <Footer />
</v-container>
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
