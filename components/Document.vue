<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="elements"
      :sort-by="['documenttype', 'date']"
      :sort-desc="[false, true]"
      :disable-pagination="true"
      :footer-props="{ disablePagination: true, disableItemsPerPage: true }"
      :hide-default-footer="true"
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
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                @click="namesClient"
              >
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
                      <v-select
                        v-model="editedItem.documenttype"
                        :items="typeDoc"
                        color="primary"
                        label="Tipo de documento"
                        menu-props="auto"
                        :rules="rules"
                        prepend-icon="*"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.documentNo"
                        label="Número de documento"
                        :rules="rules"
                        prepend-icon="*"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.title"
                        label="Título"
                        :rules="rules"
                        prepend-icon="*"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <!-- TODO: Add nice calendar picker -->

                      <v-menu
                        v-model="date"
                        :close-on-content-click="true"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Fecha de emisión"
                            prepend-icon="mdi-calendar"
                            :value="editedItem.date"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          @input="menu2 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.datebought"
                        label="Fecha de transacción"
                        persistent-hint
                        type="date"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-file-input
                        v-model="editedItem.namefile"
                        type="file"
                        accept=".jpeg,.jpg,.png,image/jpeg,image/png"
                        show-size
                        label="Adjuntar archivo"
                        @change="saveFile"
                      >
                      </v-file-input>
                      <div v-if="editedItem.namefile.length > 0">
                        <a href="#" @click.prevent="conditions = true"
                          >Documento</a
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.pricebought"
                        label="Total"
                        step="any"
                        append-icon="mdi-currency-eur"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-if="clients"
                        v-model="editedItem.contactId"
                        :items="clients"
                        :item-text="getName"
                        item-value="_id"
                        name="client"
                        label="Cliente(s)"
                        attach
                        chips
                        multiple
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-select
                        v-if="artworks"
                        v-model="editedItem.artworkId"
                        :items="artworks"
                        :item-text="getTitle"
                        item-value="_id"
                        name="artwork"
                        label="Obra de arte(s)"
                        attach
                        chips
                        multiple
                      ></v-select>
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
                        Titulo: {{ editedItem.title }} <br />
                        Tipo:{{ editedItem.documenttype }} <br />
                        Numero: {{ editedItem.documentNo }} <br />
                        Cliente: {{ editedItem.client }} <br />
                        Obra: {{ editedItem.artwork }} <br />
                        Fecha de emisión : {{ editedItem.date }}
                        <br />
                        Fecha de transacción: {{ editedItem.datebought }} <br />
                        Precio: {{ editedItem.pricebought }} <br />
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
          <v-dialog v-model="conditions" width="70%">
            <v-card>
              <v-card-title class="text-h6"> DOCUMENTO </v-card-title>
              <v-img :src="editedItem.namefile"> </v-img>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="blue" @click="conditions = false">
                  Cerrar
                </v-btn>
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
    clients: {
      type: Array,
      default() {
        return []
      },
    },
    artworks: {
      type: Array,
      default() {
        return []
      },
    },
  },

  data: () => ({
    activePicker: null,
    date: null,
    menu: false,
    view: false,
    conditions: false,
    filename: null,
    select: {},
    rules: [(value) => !!value || 'Required.'],
    nameSurname: [],
    artsTitle: [],
    typeDoc: ['Factura', 'Préstamo', 'Certificado de Autenticidad', 'Contrato'],
    search: '',
    catElement: 'DOCUMENTOS',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Título',
        align: 'left',
        value: 'title',
        class: 'primary  white--text',
      },
      {
        text: 'Tipo',
        value: 'documenttype',
        align: 'left',
        class: 'primary  white--text',
      },
      {
        text: 'Fecha',
        value: 'date',
        align: 'left',
        class: 'primary white--text',
      },
      {
        text: '',
        value: 'actions',
        sortable: false,
        align: 'right',
        class: 'primary  white--text',
      },
    ],
    editedIndex: -1,
    editedItem: {
      documentNo: '',
      title: '',
      documenttype: '',
      date: '',
      pricebought: 0,
      currencybought: 'EUR',
      datebought: '',
      namefile: '',
      artworkId: [],
      contactId: [],
      client: '',
      artwork: '',
    },
    defaultItem: {
      documentNo: '',
      title: '',
      documenttype: '',
      date: '',
      pricebought: 0,
      currencybought: 'EUR',
      datebought: '',
      namefile: '',
      artworkId: [],
      contactId: [],
      client: '',
      artwork: '',
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

    getName(item) {
      return `${item.name} ${item.surname}`
    },

    getTitle(item) {
      return `${item.title}`
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

    namesClient() {
      this.clients.forEach((elem) => {
        this.nameSurname.push(`${elem.name} ${elem.surname}`)
      })
      this.artworks.forEach((elem) => {
        this.artsTitle.push(`${elem.title}`)
      })
    },

    editItem(item) {
      this.namesClient()
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
      await api.deleteDocument(this.editedItem)
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
        if (
          this.editedItem[key] !== '' ||
          this.editedItem[key].length !== 0 ||
          this.editedItem[key].length !== 0
        ) {
          body[key] = this.editedItem[key]
        }

        // if (this.editedItem[key] !== '') body[key] = this.editedItem[key]
      })
      return body
    },

    async save() {
      console.log(this.editedItem.date)
      if (Object.getOwnPropertyNames(this.select).length === 0) {
        const imgUrl = await this.selectFile()
        this.editedItem.namefile = imgUrl.url
      }

      if (this.editedItem._id) {
        // Editando
        this.editedItem = Object.assign(
          this.elements[this.editedIndex],
          this.editedItem
        )

        await api.updateDocument(this.editedItem)
      } else {
        // Creando uno nuevo
        // this.editedItem = this.clearObjItem()
        await api.createDocument(this.editedItem)
      }
      this.close()
      this.$emit('callAPI')
    },
  },
}
</script>