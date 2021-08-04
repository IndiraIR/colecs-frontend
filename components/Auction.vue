<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="elements"
      :sort-by="['date']"
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
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.title"
                        label="Casa de subastas"
                        :rules="rules"
                        prepend-icon="*"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <!-- TODO: Add nice calendar picker -->
                      <v-text-field
                        v-model="editedItem.date"
                        label="Fecha"
                        persistent-hint
                        type="date"
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                        :rules="rules"
                        prepend-icon="*"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.time"
                        label="Hora"
                        persistent-hint
                        type="time"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.lotnumber"
                        label="Lote(s)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.linktoauction"
                        filled
                        name="linktoauction"
                        label="Enlace"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.artist"
                        label="Artista(s)"
                      ></v-text-field>
                      <v-select
                        v-if="artists"
                        v-model="editedItem.artistsId"
                        :items="artists"
                        :item-text="getName"
                        item-value="_id"
                        name="artist"
                        label="Artista(s)"
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
                  <v-row>
                    <v-col cols="12">
                      <div>
                        Casa de subastas: {{ editedItem.title }}
                        <v-divider class="mx-4" inset vertical></v-divider>
                        Fecha: {{ editedItem.date }}
                        <v-divider class="mx-4" inset vertical></v-divider>
                        Hora: {{ editedItem.time }} <br />
                        Lote(s) : {{ editedItem.lotnumber }}
                        <v-divider class="mx-4" inset vertical></v-divider>
                        Enlace : {{ editedItem.linktoauction }} <br />
                        Artista(s): {{ editedItem.artist }}
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
  },

  data: () => ({
    view: false,
    rules: [(value) => !!value || 'Required.'],
    search: '',
    catElement: 'SUBASTA',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Casa de subastas',
        value: 'title',
        align: 'left',
        class: 'primary  white--text',
      },
      {
        text: 'Fecha',
        value: 'date',
        align: 'left',
        class: 'primary  white--text',
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
      artistsId: [],
      title: '',
      date: '',
      time: '',
      lotnumber: '',
      linktoauction: '',
      artist: '',
    },
    defaultItem: {
      artistsId: [],
      title: '',
      date: '',
      time: '',
      lotnumber: '',
      linktoauction: '',
      artist: '',
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
    getName(item) {
      return `${item.name} ${item.surname}`
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
      await api.deleteAuction(this.editedItem)
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
      if (this.editedItem._id) {
        // Editando
        this.editedItem = Object.assign(
          this.elements[this.editedIndex],
          this.editedItem
        )
        await api.updateAuction(this.editedItem)
      } else {
        // Creando uno nuevo
        // this.editedItem = this.clearObjItem()
        await api.createAuction(this.editedItem)
      }
      this.close()
      this.$emit('callAPI')
    },
  },
}
</script>