<template>
  <v-card>
    <v-dialog v-model="dialog" max-width="70%">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>

      <v-spacer></v-spacer>
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          class="mb-2"
          v-bind="attrs"
          v-on="on"
          @click="namesArtists"
        >
          AÑADIR
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4">
                <v-img :src="editedItem.image"> </v-img>

                <v-file-input
                  label="Imagen"
                  type="file"
                  prepend-icon="mdi-camera"
                  accept=".jpeg,.jpg,.png,image/jpeg,image/png"
                  @change="saveFile"
                ></v-file-input>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.stockNo"
                  label="Referencia"
                ></v-text-field>
                <v-select
                  v-if="artists"
                  v-model="editedItem.artistId"
                  :items="artists"
                  :item-text="getName"
                  item-value="_id"
                  name="artist"
                  label="Autor(s)"
                  attach
                  chips
                  multiple
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="editedItem.title"
                  label="Título"
                  :rules="rules"
                  prepend-icon="*"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="editedItem.year"
                  label="Año"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="8">
                <v-text-field
                  v-model="editedItem.medium"
                  label="Técnica"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="editedItem.width"
                  label="Largo"
                  type="number"
                  suffix="cms"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="editedItem.height"
                  label="Alto"
                  type="number"
                  suffix="cms"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="editedItem.depth"
                  label="Ancho"
                  type="number"
                  suffix="cms"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="editedItem.location"
                  :items="locations"
                  color="primary"
                  label="Ubicación"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="editedItem.condition"
                  :items="conditions"
                  color="primary"
                  label="Condición"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="editedItem.status"
                  :items="status"
                  color="primary"
                  label="Disponibilidad"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="3">
                <v-text-field
                  v-model="editedItem.priceoffered"
                  label="Precio de venta"
                  type="number"
                  step="any"
                  append-icon="mdi-currency-eur"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="3">
                <v-text-field
                  v-model="editedItem.pricebought"
                  label="Comprado por"
                  type="number"
                  step="any"
                  append-icon="mdi-currency-eur"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field
                  v-model="editedItem.datesold"
                  label="Fecha de compra"
                  persistent-hint
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field
                  v-model="editedItem.soldfor"
                  label="Vendido por"
                  type="number"
                  step="any"
                  append-icon="mdi-currency-eur"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field
                  v-model="editedItem.datebought"
                  label="Fecha de venta"
                  persistent-hint
                  type="date"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="8">
                <v-textarea
                  v-model="editedItem.notes"
                  filled
                  name="notes"
                  label="Notas"
                ></v-textarea>
              </v-col>
              <v-col>
                <v-checkbox
                  v-model="editedItem.publish"
                  label="Publicar obra"
                  color="primary"
                  hide-details
                ></v-checkbox>
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
                  Referencia: {{ editedItem.stockNo }} <br />
                  Autor: {{ editedItem.author }} <br />
                  Titulo: {{ editedItem.title }}
                  <v-divider class="mx-4" inset vertical></v-divider> Año:
                  {{ editedItem.year }} <br />
                  Técnica: {{ editedItem.medium }}
                  <v-divider class="mx-4" inset vertical></v-divider>
                  Ubicación : {{ editedItem.location }}
                  <v-divider class="mx-4" inset vertical></v-divider>
                  Condición : {{ editedItem.condition }} <br />
                  Ancho: {{ editedItem.width
                  }}<v-divider class="mx-4" inset vertical></v-divider>
                  Alto:
                  {{ editedItem.height }}
                  <v-divider class="mx-4" inset vertical></v-divider>
                  Profundidad:{{ editedItem.depth
                  }}<v-divider class="mx-4" inset vertical></v-divider>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" text @click="view = false"> Cerrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col v-for="item in elements" :key="item._id" cols="12" sm="6" md="4" >
        <v-card outlined class="mx-auto">
          <v-img class="white--text align-end" height="200px" :src="item.image">
            <v-card-title>{{ item.title }}</v-card-title>
          </v-img>
          <v-card-actions>
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            <v-icon small class="ml-2" @click="viewItem(item)">
              mdi-eye
            </v-icon>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
    artists: {
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
    locations: ['Triana', 'Gáldar', 'Prestada', 'Propietario'],
    conditions: ['Excelente', 'Buena', 'Revisar', 'Dañada'],
    status: ['Disponible', 'Reservada', 'Vendida'],
    nameSurname: [],
    catElement: 'ARTWORK',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Obra',
        align: 'left',
        sortable: false,
        value: 'image',
        class: 'primary  white--text',
      },
      {
        text: 'Artista',
        align: 'left',
        value: 'artistId',
        class: 'primary  white--text',
      },
      {
        text: 'Disponibilidad',
        align: 'left',
        value: 'status',
        class: 'primary  white--text',
      },
      {
        text: '',
        value: 'actions',
        align: 'right',
        sortable: false,
        class: 'primary  white--text',
      },
    ],
    editedIndex: -1,
    editedItem: {
      artistId: [],
      author: '',
      title: '',
      year: '',
      stockNo: '',
      medium: '',
      location: 'Gáldar',
      width: 0,
      height: 0,
      depth: 0,
      condition: 'Buena',
      status: 'Disponible',
      type: 'Installation',
      image: '',
      priceoffered: 0,
      currencyoffered: 'EUR',
      pricebought: 0,
      currencybought: 'EUR',
      datebought: '',
      currencysold: 'EUR',
      datesold: '',
      publish: true,
      soldfor: 0,
      notes: '',
    },
    defaultItem: {
      artistId: [],
      author: '',
      title: '',
      year: '',
      stockNo: '',
      medium: '',
      location: 'Gáldar',
      width: 0,
      height: 0,
      depth: 0,
      condition: 'Buena',
      status: 'Disponible',
      type: 'Installation',
      image: '',
      priceoffered: 0,
      currencyoffered: 'EUR',
      pricebought: 0,
      currencybought: 'EUR',
      datebought: '',
      currencysold: 'EUR',
      datesold: '',
      publish: true,
      soldfor: 0,
      notes: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nueva entrada ' : 'Editar '
    },
    selectName() {
      return this.elements.artistId.map((artist) => {
        return `${artist.name} ${artist.surname}`
      })
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

    getName(item) {
      return `${item.name} ${item.surname}`
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

    namesArtists() {
      this.artists.forEach((surname) => {
        this.nameSurname.push(`${surname.name} ${surname.surname}`)
      })
    },

    editItem(item) {
      this.namesArtists()
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
      await api.deleteArtwork(this.editedItem)
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
        await api.updateArtwork(this.editedItem)
      } else {
        // Creando uno nuevo
        this.editedItem = this.clearObjItem()
        await api.createArtwork(this.editedItem)
      }
      this.close()
      this.$emit('callAPI')
    },
  },
}
</script>
