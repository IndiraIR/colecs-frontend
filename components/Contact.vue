<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="elements"
      :sort-by="['name', 'surname', 'type']"
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
                      <v-file-input
                        label="Imagen"
                        type="file"
                        prepend-icon="mdi-camera"
                        accept=".jpeg,.jpg,.png,image/jpeg,image/png"
                        @change="saveFile"
                      ></v-file-input>
                    </v-col>
                    <v-col cols="12" xs="12" sm="5" md="5" lg="5">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nombre"
                        :rules="rules"
                        prepend-icon="*"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" xs="12" sm="5" md="5" lg="5">
                      <v-text-field
                        v-model="editedItem.surname"
                        label="Apellidos"
                        :rules="rules"
                        prepend-icon="*"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                      <v-text-field
                        v-model="editedItem.type"
                        label="Tipo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" xs="12" sm="12" md="2" lg="2">
                      <v-select
                        v-model="editedItem.country"
                        :items="countries"
                        color="primary"
                        label="País"
                        menu-props="auto"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" xs="12" sm="12" md="5" lg="5">
                      <v-text-field
                        v-model="editedItem.address"
                        label="Dirección"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" xs="12" sm="12" md="5" lg="5">
                      <v-text-field
                        v-model="editedItem.address2"
                        label="Dirección 2"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" xs="12" sm="12" md="4" lg="4">
                      <v-text-field
                        v-model="editedItem.email"
                        type="email"
                        label="Email"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" xs="12" sm="12" md="4" lg="4">
                      <v-text-field
                        v-model="editedItem.telephone"
                        label="Teléfono"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" xs="12" sm="12" md="4" lg="4">
                      <v-text-field
                        v-model="editedItem.telephone2"
                        label="Teléfono 2"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-textarea
                        v-model="editedItem.notes"
                        filled
                        name="notes"
                        label="Notas"
                      ></v-textarea>
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
            <v-dialog v-model="view" max-width="60%">
            <v-card>
              <v-card-title>
                <span class="text-h5">Ficha</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row align="end">
                    <v-col cols="12">
                      <v-img :src="editedItem.image"> </v-img>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <div>
                        Nombre: {{ editedItem.name }} {{editedItem.surname}} ({{ editedItem.type }}) <br />
                        
                        Pais: {{ editedItem.country }}
                        <v-divider class="mx-4" inset vertical></v-divider> Dirección:
                        {{ editedItem.address }} <br />
                        Email: {{ editedItem.email }}
                        <v-divider class="mx-4" inset vertical></v-divider>
                        Teléfono : {{ editedItem.telephone }}
                        <v-divider class="mx-4" inset vertical></v-divider>
                        
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="primary" text @click="view = false">
                  Cerrar
                </v-btn>
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
         <v-icon small class="ml-2" @click="viewItem(item)"> mdi-eye </v-icon>
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
    view: false,
    filename: null,
    select: {},
    rules: [(value) => !!value || 'Required.'],
    search: '',
    catElement: 'CONTACTOS',
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
        text: 'Tipo',
        value: 'type',
        align: 'left',
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
      telephone2: '',
      address: '',
      address2: '',
      country: '',
      notes: '',
      image: '',
      type: '',
    },
    defaultItem: {
      name: '',
      surname: '',
      email: '',
      telephone: '',
      telephone2: '',
      address: '',
      address2: '',
      country: '',
      notes: '',
      image: '',
      type: '',
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
      return this.editedIndex === -1 ? 'Nueva entrada ' : 'Editar '
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
    saveFile(e) {
      // console.log(e, 'HOLA')
      this.select = e
    },

    async selectFile(e) {
      const file = this.select
      /* Make sure file exists */
      if (!file) return null

      /* create a reader */
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(f)
        })

      /* Read data */
      const data = await readData(file)

      /* upload the converted data */
      const instance = await this.$cloudinary.upload(data, {
        folder: 'gallery',
        uploadPreset: 'present_pubs',
      })
      // console.log(instance.url, "DATOS GALLERY")
      return instance
    },

    editItem(item) {
      this.editedIndex = this.elements.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    viewItem(item) {
      this.editedIndex = this.elements.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.view = true
    },

    async deleteItem(item) {
      this.editedIndex = this.elements.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
      Object.assign(this.elements[this.editedIndex], this.editedItem)
      await api.deleteContact(this.editedItem)
    },

    deleteItemConfirm() {
      this.closeDelete()
      this.$emit('callAPI')
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
      if (Object.getOwnPropertyNames(this.select).length === 0) {
        const imgUrl = await this.selectFile()
        this.editedItem.image = imgUrl.url
      }

      if (this.editedItem._id) {
        // Editando
        this.editedItem = Object.assign(
          this.elements[this.editedIndex],
          this.editedItem
        )
        await api.updateContact(this.editedItem)
      } else {
        // Creando uno nuevo
        this.editedItem = this.clearObjItem()
        await api.createContact(this.editedItem)
      }
      this.close()
      this.$emit('callAPI')
    },
  },
}
</script>
