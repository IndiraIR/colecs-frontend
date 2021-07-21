<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="elements"
      :sort-by="['surname', 'name']"
      class="secondary"
    >
      <template #top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="80%">
            <template #activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                AÑADIR
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <!-- TODO: Change form -->
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-img :src="editedItem.image"> </v-img>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.surname"
                        label="Surname"
                      ></v-text-field>
                    </v-col>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="editedItem.country"
                          :items="countries"
                          color="primary"
                          label="Country"
                          prepend-icon="mdi-map"
                          menu-props="auto"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="editedItem.email"
                          type="email"
                          label="Email"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.telephone"
                        label="Telephone"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.address"
                        label="Address"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="editedItem.type"
                        :items="typeEmployee"
                        color="primary"
                        label="Type"
                        prepend-icon="mdi-map"
                        menu-props="auto"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.password"
                        :type="showPassword ? 'text' : 'password'"
                        label="Contraseña"
                        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                         @click:append="showPassword = !showPassword"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey" text @click="close"> Cancelar </v-btn>
                <v-btn color="primary" text @click="save"> Guardar </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >¿Seguro que quiere eliminar?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="primary" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import api from '../service'
export default {
  props: {
    elements: {
      type: Array,
      default() {
        return []
      },
    },
  },

  data: () => ({
    password: 'Password',
    showPassword: false,
    search: '',
    catElement: 'EMPLEADOS',
    typeEmployee: ['Admin', 'Employee'],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Nombre',
        align: 'left',
        value: 'name',
        class: 'primary  white--text',
      },
      {
        text: 'Apellidos',
        align: 'left',
        value: 'surname',
        class: 'primary  white--text',
      },
      {
        text: '',
        value: 'actions',
        sortable: false,
        class: 'primary  white--text',
      },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      surname: '',
      email: '',
      telephone: '',
      street: '',
      city: '',
      postcode: '',
      country: '',
      type: 'Employee',
      password: '',
      image: '',
    },
    defaultItem: {
      name: '',
      surname: '',
      email: '',
      telephone: '',
      street: '',
      city: '',
      postcode: '',
      country: '',
      type: 'Employee',
      password: '123456',
      image: '',
    },
    countries: [
      'Afganistán',
      'Albania',
      'Alemania',
      'Andorra',
      'Angola',
      'Antigua y Barbuda',
      'Arabia Saudita',
      'Argelia',
      'Argentina',
      'Armenia',
      'Australia',
      'Austria',
      'Azerbaiyán',
      'Bahamas',
      'Bangladés',
      'Barbados',
      'Baréin',
      'Bélgica',
      'Belice',
      'Benín',
      'Bielorrusia',
      'Birmania',
      'Bolivia',
      'Bosnia y Herzegovina',
      'Botsuana',
      'Brasil',
      'Brunéi',
      'Bulgaria',
      'Burkina Faso',
      'Burundi',
      'Bután',
      'Cabo Verde',
      'Camboya',
      'Camerún',
      'Canadá',
      'Catar',
      'Chad',
      'Chile',
      'China',
      'Chipre',
      'Ciudad del Vaticano',
      'Colombia',
      'Comoras',
      'Corea del Norte',
      'Corea del Sur',
      'Costa de Marfil',
      'Costa Rica',
      'Croacia',
      'Cuba',
      'Dinamarca',
      'Dominica',
      'Ecuador',
      'Egipto',
      'El Salvador',
      'Emiratos Árabes Unidos',
      'Eritrea',
      'Eslovaquia',
      'Eslovenia',
      'España',
      'Estados Unidos',
      'Estonia',
      'Etiopía',
      'Filipinas',
      'Finlandia',
      'Fiyi',
      'Francia',
      'Gabón',
      'Gambia',
      'Georgia',
      'Ghana',
      'Granada',
      'Grecia',
      'Guatemala',
      'Guyana',
      'Guinea',
      'Guinea ecuatorial',
      'Guinea-Bisáu',
      'Haití',
      'Honduras',
      'Hungría',
      'India',
      'Indonesia',
      'Irak',
      'Irán',
      'Irlanda',
      'Islandia',
      'Islas Marshall',
      'Islas Salomón',
      'Israel',
      'Italia',
      'Jamaica',
      'Japón',
      'Jordania',
      'Kazajistán',
      'Kenia',
      'Kirguistán',
      'Kiribati',
      'Kuwait',
      'Laos',
      'Lesoto',
      'Letonia',
      'Líbano',
      'Liberia',
      'Libia',
      'Liechtenstein',
      'Lituania',
      'Luxemburgo',
      'Madagascar',
      'Malasia',
      'Malaui',
      'Maldivas',
      'Malí',
      'Malta',
      'Marruecos',
      'Mauricio',
      'Mauritania',
      'México',
      'Micronesia',
      'Moldavia',
      'Mónaco',
      'Mongolia',
      'Montenegro',
      'Mozambique',
      'Namibia',
      'Nauru',
      'Nepal',
      'Nicaragua',
      'Níger',
      'Nigeria',
      'Noruega',
      'Nueva Zelanda',
      'Omán',
      'Países Bajos',
      'Pakistán',
      'Palaos',
      'Panamá',
      'Papúa Nueva Guinea',
      'Paraguay',
      'Perú',
      'Polonia',
      'Portugal',
      'Reino Unido',
      'República Centroafricana',
      'República Checa',
      'República de Macedonia',
      'República del Congo',
      'República Democrática del Congo',
      'República Dominicana',
      'República Sudafricana',
      'Ruanda',
      'Rumanía',
      'Rusia',
      'Samoa',
      'San Cristóbal y Nieves',
      'San Marino',
      'San Vicente y las Granadinas',
      'Santa Lucía',
      'Santo Tomé y Príncipe',
      'Senegal',
      'Serbia',
      'Seychelles',
      'Sierra Leona',
      'Singapur',
      'Siria',
      'Somalia',
      'Sri Lanka',
      'Suazilandia',
      'Sudán',
      'Sudán del Sur',
      'Suecia',
      'Suiza',
      'Surinam',
      'Tailandia',
      'Tanzania',
      'Tayikistán',
      'Timor Oriental',
      'Togo',
      'Tonga',
      'Trinidad y Tobago',
      'Túnez',
      'Turkmenistán',
      'Turquía',
      'Tuvalu',
      'Ucrania',
      'Uganda',
      'Uruguay',
      'Uzbekistán',
      'Vanuatu',
      'Venezuela',
      'Vietnam',
      'Yemen',
      'Yibuti',
      'Zambia',
      'Zimbabue',
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New ' : 'Edit '
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.elements.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async deleteItem(item) {
      this.editedIndex = this.elements.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
      Object.assign(this.elements[this.editedIndex], this.editedItem)
      await api.deleteEmployee(this.editedItem)
      this.$emit('callAPI')
    },

    deleteItemConfirm() {
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    clearObjItem() {
      const keys = Object.keys(this.editedItem)
      const body = {}
      keys.forEach((key) => {
        if (this.editedItem[key] !== '') body[key] = this.editedItem[key]
      })
      return body
    },

    async save() {
      if (this.editedItem._id) {
        // Editando
        this.editedItem = Object.assign(
          this.elements[this.editedIndex],
          this.editedItem
        )
        await api.updateEmployee(this.editedItem)
      } else {
        // Creando uno nuevo
        this.editedItem = this.clearObjItem()
        await api.createEmployee(this.editedItem)
      }
      this.close()
      this.$emit('callAPI')
    },
  },
}
</script>