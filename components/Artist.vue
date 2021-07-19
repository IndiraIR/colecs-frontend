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


              <v-card-text>
                <v-container>
                  <v-row align="end">
                    <v-col cols="12" xs="12" sm="2" md="2" lg="2">
                      <v-img :src="editedItem.image"> </v-img>
                    </v-col>
                    <v-col  cols="12" xs="12" sm="5" md="5" lg="5">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nombre"
                      ></v-text-field>
                      </v-col>
                      <v-col  cols="12" xs="12" sm="5" md="5" lg="5">
                      <v-text-field
                        v-model="editedItem.surname"
                        label="Apellidos"
                      ></v-text-field>
                      </v-col>
                  </v-row>
                  <v-row>
                    <v-spacer></v-spacer>
                      <v-col cols="12" xs="12" sm="5" md="5" lg="5">
                      <!-- TODO: Add nice calendar picker -->
                      <v-text-field
                        v-model="editedItem.dateofbirth"
                        label="Fecha de nacimiento"
                        persistent-hint
                        type="date"
                      ></v-text-field>
                      </v-col>
                      <v-col cols="12" xs="12" sm="5" md="5" lg="5">
                      <v-text-field
                        v-model="editedItem.dateofdeath"
                        label="Fecha de defunción"
                        persistent-hint
                        type="date"
                      ></v-text-field>
                    </v-col>
                      <v-col cols="12" xs="12" sm="4" md="4" lg="4">
                      <v-select
                        v-model="editedItem.country"
                        :items="countries"
                        color="primary"
                        label="País"
                        menu-props="auto"
                      ></v-select>
                    </v-col>

                      <v-col cols="12" xs="12" sm="8" md="8" lg="8">
                      <v-text-field
                        v-model="editedItem.address"
                        label="Dirección"
                      ></v-text-field>
                    </v-col>
                      <v-col cols="12" xs="12" sm="4" md="4" lg="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                      <v-col cols="12" xs="12" sm="4" md="4" lg="4">
                      <v-text-field
                        v-model="editedItem.telephone"
                        label="Teléfono"
                      ></v-text-field>
                    </v-col>
                      <v-col cols="12" xs="12" sm="4" md="4" lg="4">
                      <v-text-field
                        v-model="editedItem.website"
                        label="Página web"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.tags"
                        label="Etiquetas"
                        hint="Por ejemplo: movimientos artísticos, temáticas recurrentes, colores predominantes, ... "
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey" text @click.once="close">
                  Cancel
                </v-btn>
                <v-btn color="primary" text @click.once="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey" text @click="closeDelete"
                  >Cancel</v-btn
                >
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
    search: '',
    catElement: 'ARTISTAS',
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
        align: 'right',
        value: 'actions',
        sortable: false,
        class: 'primary  white--text',
      },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      surname: '',
      country: '',
      dateofbirth: '',
      dateofdeath: '',
      address: '',
      website: '',
      email: '',
      telephone: '',
      image: '',
      tags: '',
    },
    defaultItem: {
      name: '',
      surname: '',
      country: '',
      dateofbirth: '',
      dateofdeath: '',
      address: '',
      website: '',
      email: '',
      telephone: '',
      image: '',
      tags: '',
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
      return this.editedIndex === -1 ? 'Nueva entrada' : 'Editar'
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
      await api.deleteArtist(this.editedItem)
      this.$emit('callAPI')
    },

    deleteItemConfirm() {
      // this.elements.splice(this.editedIndex, 1)
      this.$emit('callAPI')
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
        this.$emit('callAPI')
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
        await api.updateArtist(this.editedItem)
      } else {
        // Creando uno nuevo
        // this.elements.push(this.editedItem)
        const keys = Object.keys(this.editedItem)
        const body = {}
        keys.forEach((key) => {
          if (this.editedItem[key]) body[key] = this.editedItem[key]
        })
        await api.createArtist(this.editedItem)
      }
      this.$emit('callAPI')
      this.close()
    },
  },
}
</script>

<style scoped>
.customize{
  width: 800px;
}
</style>