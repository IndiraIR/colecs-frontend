<template>
<v-container>
  <v-row justify="space-around" align="center" >
    <v-col>
      <LogoColecs />
      <v-card width="500px" class="mt-7 ma-0 fondo"> 
        <v-card-title>
          Bienvenido <br>
          Introduce tus datos
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Email" required />
            <v-text-field 
              :type="showPassword ? 'text' : 'password' "
              label="Contraseña"
              @click:append="showPassword = !showPassword"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye' "
              required 
              />
            </v-form>
        </v-card-text> 
        <v-card-actions>
          <v-btn 
          color="primary"
          nuxt
          @click="handleInput"
          >
          Log In
          </v-btn>
        </v-card-actions>
      </v-card> 
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import api from '../service'
export default {
  data() {
    return {
      name: "",
      password: "",
      showPassword: false
    };
  },
  methods: {
    handleInput() {
      api.authenticate(this.name, this.password)
      .then((res) => {
        localStorage.setItem("token", res.token)
        this.$router.push('menu')
      })
      .catch((err) => console.error(err));
    }
  },
};
</script>

<style scoped>
.fondo{
  background-color:#24282B;
}
</style>
