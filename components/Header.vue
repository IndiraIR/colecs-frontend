<template>
  <v-container fluid>
    <v-row
      justify="space-around"
      class="mb-2"
    >
    <v-col>
  <v-img
        contain
        class="colecsLogo"
        alt="Colecs Logo"
        height="65"
        width="85"
        src="/logo-colecs.png"
      > </v-img>
      </v-col>
      <v-col>
      <span class="group pa-2">
        <v-icon large>logout</v-icon>
      </span>
      </v-col>

    </v-row>

  </v-container>
</template>

<style>
.group {
  display: flex;
  flex: 1;
  justify-content: space-around;
}
</style>