<template>
  <v-card>
    <v-container fluid>
      <v-row align="center">
        <v-col cols="12" sm="6">
          <v-select
            v-if="elements"
            v-model="value"
            :items="elements"
            :item-text="getName"
            item-value="_id"
            name="element"
            label="Contactos"
            attach
            chips
            multiple
          
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6"> 
          <samp @click="viewVar">OK</samp>
        </v-col>
        
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    elements: [
      { _id: 'ORWQWEWW1234', name: 'Indira', surname: 'IR' },
      { _id: 'ORWQWEWW1231', name: 'Iván', surname: 'Ramón' },
    ],
    items: [
      { name: 'foo' },
      { name: 'bar' },
      { name: 'fizz' },
      { name: 'buzz' },
    ],
    value: [],
  }),
  methods: {
    getName(item) {
      return `${item.name} ${item.surname}`
    },
    viewVar(){
      console.log(this.value)
    }
  },
}
</script>