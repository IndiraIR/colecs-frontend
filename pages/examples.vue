<template>
  <v-row>
    
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker without buttons"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
    </v-col>
 
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
    }),
  }
</script>