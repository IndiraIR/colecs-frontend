<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="elements"
      :sort-by="['author', 'status']"
      :disable-pagination="true"
      :footer-props="{ disablePagination: true, disableItemsPerPage: true }"
      :hide-default-footer="true"
      class="secondary"
    >
      <template v-slot:item.image="{ item }">
        <img
          :src="item.image"
          height="175"
          width="175"
          object-fit="contain"
          class="grey darken-4"
        />
      </template>
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
                        v-model="editedItem.author"
                        :items="nameSurname"
                        color="primary"
                        label="Artista"
                        menu-props="auto"
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
                    </v-col>
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
    artists: {
      type: Array,
      default() {
        return []
      },
    },
  },

  data: () => ({
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
        value: 'author',
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
      if (!file) return

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

    async deleteItem(item) {
      this.editedIndex = this.elements.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
      Object.assign(this.elements[this.editedIndex], this.editedItem)
      await api.deleteArtwork(this.editedItem)
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
      const imgUrl = await this.selectFile()

      if (this.editedItem._id) {
        // Editando

        this.editedItem = Object.assign(
          this.elements[this.editedIndex],
          this.editedItem
        )
        this.editedItem.image = imgUrl.url
        await api.updateArtwork(this.editedItem)
      } else {
        // Creando uno nuevo
        this.editedItem.image = imgUrl.url
        this.editedItem = this.clearObjItem()
        await api.createArtwork(this.editedItem)
      }
      this.$emit('callAPI')
      this.close()
    },
  },
}
</script>
