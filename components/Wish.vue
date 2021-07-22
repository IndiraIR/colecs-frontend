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
                        ref="image"
                        label="Imagen"
                        type="file"
                        prepend-icon="mdi-camera"
                        accept="image/png, image/jpg, image/jpeg"
                      ></v-file-input>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="editedItem.artist"
                        :items="nameSurname"
                        color="primary"
                        label="Artista"
                        menu-props="auto"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.title"
                        label="Título"
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
                        v-model="editedItem.contact"
                        :items="nameContact"
                        color="primary"
                        label="Contacto"
                        menu-props="auto"
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
                <v-btn color="grey" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="primary" text @click="save">
                  Guardar
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
                <v-btn color="grey" text @click="closeDelete"
                  >Cancelar</v-btn
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
    search: '',
    nameSurname: [],
    nameContact: [],
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
    namesArtists() {
      this.artists.forEach((surname) => {
        this.nameSurname.push(`${surname.name} ${surname.surname}`)
      })

      this.contacts.forEach((surname) => {
        this.nameContact.push(`${surname.name} ${surname.surname}`)
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
      await api.deleteWish(this.editedItem)
      this.$emit('callAPI')
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
      if (this.editedItem._id) {
        // Editando
        this.editedItem = Object.assign(
          this.elements[this.editedIndex],
          this.editedItem
        )
        await api.updateWish(this.editedItem)
      } else {
        // Creando uno nuevo
        // this.elements.push(this.editedItem)
        const keys = Object.keys(this.editedItem)
        const body = {}
        keys.forEach((key) => {
          if (this.editedItem[key]) body[key] = this.editedItem[key]
        })
        await api.createWish(this.editedItem)
      }
      this.$emit('callAPI')
      this.close()
    },
  },
}
</script>