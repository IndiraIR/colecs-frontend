<template>
  <v-container>
    <v-row justify="space-around">
      <v-col>
        <LogoColecs />
        <v-card width="500px" class="mt-7 ma-0 fondo">
          <v-card-title>
            Bienvenido <br />
            Introduce tus datos
          </v-card-title>
          <v-card-text>
            <v-form>
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
            <v-btn color="primary" nuxt @click="login"> Log In </v-btn>
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
