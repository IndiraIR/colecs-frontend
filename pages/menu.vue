<template>
<v-container>
  <v-row justify="center">
    <v-col>
      <Header />
    </v-col>
  </v-row>
  <v-row justify="space-around">
    <h3>Bienvenido {{usuario}}</h3>
  </v-row>
  <v-row>
    <v-col>
      <span class="group pa-2">
        <v-icon class="sizeUp">crop_original</v-icon>
      </span>
    </v-col>
    <v-spacer></v-spacer>
    <v-col>
      <span class="group pa-2">
        <img
        class="icon"
        src="/artistIcon.svg"
        >
      </span>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <span class="group pa-2">
        <v-icon class="sizeUp">folder_open</v-icon>
      </span>
    </v-col>
        <v-spacer></v-spacer>
    <v-col>
      <span class="group pa-2">
        <v-icon class="sizeUp">supervised_user_circle</v-icon>
      </span>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <span class="group pa-2">
        <v-icon class="sizeUp">favorite</v-icon>
      </span>
    </v-col>
        <v-spacer></v-spacer>
    <v-col>
      <span class="group pa-2">
        <v-icon class="sizeUp">gavel</v-icon>
      </span>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <span class="group pa-2">
        <v-icon class="sizeUp">how_to_reg</v-icon>
      </span>
    </v-col>
  </v-row>
  <Footer />
</v-container>
</template>

<style scoped>
.sizeUp{
  font-size: 120px;
}
.icon{
  height: 120px;
  width: 120px;
}
</style>