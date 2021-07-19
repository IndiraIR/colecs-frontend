<template>
  <v-container fluid>
    <v-row>
      <v-col align="left">
        <NuxtLink to="/menu">
          <img
            contain
            alt="Colecs Logo"
            height="85"
            width="85"
            src="/logo-colecs.png"
          />
        </NuxtLink>
      </v-col>
      <v-col align="right">
        <img class="icon group pa-2" @click="logout" src="/logoutIcon.svg" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.logout()
    },
  },
}
</script>
<style>
.group {
  display: flex;
  flex: 1;
  justify-content: space-around;
}
</style>
