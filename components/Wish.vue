<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="elements"
      :sort-by="['title']"
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
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-img :src="editedItem.image"> </v-img>
                      <v-file-input
                        label="Imagen"
                        type="file"
                        prepend-icon="mdi-camera"
                        accept="image/png, image/jpg, image/jpeg"
                        @change="saveFile"
                      ></v-file-input>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-if="artists"
                        v-model="editedItem.artitsId"
                        :items="artists"
                        :item-text="getName"
                        item-value="_id"
                        name="artist"
                        label="Artista(s)"
                        attach
                        chips
                        multiple
                      ></v-select>
                       <v-col cols="12" sm="8">
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
                    </v-col>
                  </v-row>
                  <v-row>
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
                        v-if="contacts"
                        v-model="editedItem.contactsId"
                        :items="contacts"
                        :item-text="getName"
                        item-value="_id"
                        name="contact"
                        label="Contacto(s)"
                        attach
                        chips
                        multiple
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <v-text-field
                        v-model="editedItem.link"
                        filled
                        name="link"
                        label="Enlace"
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
                        Autor: {{ editedItem.artists }} <br />
                        Titulo: {{ editedItem.title }}
                        <v-divider class="mx-4" inset vertical></v-divider> Año:
                        {{ editedItem.year }} <br />
                        Técnica: {{ editedItem.medium }}

                        <br />
                        Ancho: {{ editedItem.width
                        }}<v-divider class="mx-4" inset vertical></v-divider>
                        Alto: {{ editedItem.height }}
                        <v-divider class="mx-4" inset vertical></v-divider>
                        Profundidad:{{ editedItem.depth }}<br />
                        Contacto: {{ editedItem.contact }}
                        <v-divider class="mx-4" inset vertical></v-divider>
                        Enlace: {{ editedItem.link }}
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
    artists: {
      type: Array,
      default() {
        return []
      },
    },
    contacts: {
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
    nameSurname: [],

    catElement: 'WISH',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Images',
        align: 'left',
        sortable: false,
        value: 'image',
        class: 'primary  white--text',
      },
      {
        text: 'Title',
        align: 'left',
        value: 'title',
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
      contactsId: [],
      title: '',
      year: '',
      width: '',
      height: '',
      depth: '',
      image: '',
      artists: '',
      medium: '',
      contact: '',
      link: '',
    },
    defaultItem: {
      contactsId: [],
      title: '',
      year: '',
      width: '',
      height: '',
      depth: '',
      image: '',
      artists: '',
      medium: '',
      contact: '',
      link: '',
    },
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
    getName(item) {
      return `${item.name} ${item.surname}`
    },

    saveFile(e) {
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
      await api.deleteWish(this.editedItem)
    },

    deleteItemConfirm() {
      // this.elements.splice(this.editedIndex, 1)
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
      this.$emit('callAPI')
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
        await api.updateWish(this.editedItem)
      } else {
        // Creando uno nuevo
        // this.editedItem = this.clearObjItem()
        await api.createWish(this.editedItem)
      }
      this.close()
      this.$emit('callAPI')
    },
  },
}
</script>