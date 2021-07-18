<template>
  <v-container>
  <v-row justify="space-around" align="center" >
    <v-col justify="space-around" align="center">
        <LogoColecs />
        <v-card width="500px" class="fondo elevation-0 pt-7">
          <p>Introduce tus datos</p>
        <v-card-text>
          <v-form class="pt-2 mt-5">
              <v-text-field v-model="email" label="Email" />
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Contraseña"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                required
                @click:append="showPassword = !showPassword"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-flex justify-center>
            <v-btn 
            large
            color="primary" 
            nuxt 
            @click="login"> Entrar 
            </v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: 'guest',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    }
  },
  methods: {
    async login() {
      try {
        const data = await this.$auth.loginWith('local', {
          data: { email: this.email, password: this.password },
        })
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style scoped>
.fondo {
  background-color: #24282b;
}
</style>
