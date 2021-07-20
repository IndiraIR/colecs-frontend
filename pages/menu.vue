<template>
  <v-container>
    <v-row justify="center pb-0">
        <Header />
    </v-row>
    <v-row justify="space-around" class="mt-0 pt-0 mb-10">
      <h1 class="grey--text">Bienvenido {{ usuario }}</h1>
    </v-row>
    <v-row class="ma-8">
      <v-col cols="6" xs="6" sm="6" md="4" lg="3">
        <span class="group pa-2">
          <NuxtLink to="/artworks" style="text-decoration: none">
            <img class="icon" src="/artworksIcon.svg" />
            <p>OBRAS</p>
          </NuxtLink>
        </span>
      </v-col>
      <v-col cols="6" xs="6" sm="6" md="4" lg="3">
        <span class="group pa-2">
          <NuxtLink to="/artists" style="text-decoration: none">
            <img class="icon" src="/artistIcon.svg" />
            <p>ARTISTAS</p>
          </NuxtLink>
        </span>
      </v-col>
      <v-col cols="6" xs="6" sm="6" md="4" lg="3">
        <span class="group pa-2">
          <NuxtLink to="/documents" style="text-decoration: none">
            <img class="icon" src="/documentsIcon.svg" />
            <p>DOCUMENTOS</p>
          </NuxtLink>
        </span>
      </v-col>
      <v-col cols="6" xs="6" sm="6" md="4" lg="3">
        <span class="group pa-2">
          <NuxtLink to="/contacts" style="text-decoration: none">
            <img class="icon" src="/contactsIcon.svg" />
            <p>CONTACTOS</p>
          </NuxtLink>
        </span>
      </v-col>
      <v-col cols="6" xs="6" sm="6" md="4" lg="3">
        <span class="group pa-2">
          <NuxtLink to="/wishlist" style="text-decoration: none">
            <img class="icon" src="/wishlistIcon.svg" />
            <p>LISTA DE DESEOS</p>
          </NuxtLink>
        </span>
      </v-col>
      <v-col cols="6" xs="6" sm="6" md="4" lg="3">
        <span class="group pa-2">
          <NuxtLink to="/auctions" style="text-decoration: none">
            <img class="icon" src="/auctionsIcon.svg" />
            <p>SUBASTAS</p>
          </NuxtLink>
        </span>
      </v-col>
      <v-col cols="6" xs="6" sm="6" md="4" lg="3">
        <span class="group pa-2">
          <NuxtLink to="/employees" style="text-decoration: none">
            <img class="icon" src="/employeesIcon.svg" />
            <p>EMPLEADOS</p>
          </NuxtLink>
        </span>
      </v-col>
    </v-row>
    <Footer />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      usuario: '',
    }
  },
}
</script>

<style scoped>
.sizeUp {
  font-size: 120px;
}
.icon {
  height: 120px;
  width: 120px;
}
.themeColor {
  color: #24282b;
}
p {
  font-weight: bold;
}
</style>
