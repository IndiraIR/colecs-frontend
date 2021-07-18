<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <Header />
      </v-col>
    </v-row>
    <v-row justify="space-around" class="mt-0 pt-0 mb-10">
      <h1 class="grey--text">Bienvenido {{ usuario }}</h1>
    </v-row>
    <v-row class="ma-8">
      <v-col cols="6" xs="6" sm="6" md="4" lg="3">
        <span class="group pa-2" @click="artists">
          <img class="icon"  src="/artworksIcon.svg" />
        </span>
        <span class="group pa-2">
          <p>OBRAS</p>
        </span>
      </v-col>
      <v-col cols="6" xs="6" sm="6" md="4" lg="3">
        <span class="group pa-2" @click="artists">
          <img class="icon"  src="/artistIcon.svg" />
        </span>
        <span class="group pa-2">
          <p>ARTISTAS</p>
        </span>
      </v-col>  
      <v-col cols="6" xs="6" sm="6" md="4" lg="3">
        <span class="group pa-2" @click="artists">
          <img class="icon"  src="/documentsIcon.svg" />
        </span>
        <span class="group pa-2">
          <p>DOCUMENTOS</p>
        </span>
      </v-col>
      <v-col cols="6" xs="6" sm="6" md="4" lg="3">
        <span class="group pa-2" @click="artists">
          <img class="icon"  src="/contactsIcon.svg" />
        </span>
        <span class="group pa-2">
          <p>CONTACTOS</p>
        </span>
      </v-col>
      <v-col cols="6" xs="6" sm="6" md="4" lg="3">
        <span class="group pa-2" @click="artists">
          <img class="icon"  src="/wishlistIcon.svg" />
        </span>
        <span class="group pa-2">
          <p>WISHLIST</p>
        </span>
      </v-col>
      <v-col cols="6" xs="6" sm="6" md="4" lg="3">
        <span class="group pa-2" @click="artists">
          <img class="icon"  src="/auctionsIcon.svg" />
        </span>
        <span class="group pa-2">
          <p>SUBASTAS</p>
        </span>
      </v-col>
      <v-col cols="6" xs="6" sm="6" md="4" lg="3">
        <span class="group pa-2" @click="artists">
          <img class="icon"  src="/employeesIcon.svg" />
        </span>
        <span class="group pa-2">
          <p>EMPLEADOS</p>
        </span>
      </v-col>
    </v-row>
    <Footer />
  </v-container>
</template>

<style scoped>
.sizeUp {
  font-size: 120px;
}
.icon {
  height: 120px;
  width: 120px;
}
.themeColor{
  color: #24282b;
}
p{
  font-weight:bold;
}
</style>