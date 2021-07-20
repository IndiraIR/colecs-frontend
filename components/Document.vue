<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="elements"
      :sort-by="['title', 'documenttype', 'documentNo']"
      :sort-desc="[false, false]"
      :disable-pagination="true"
      :footer-props="{ disablePagination: true, disableItemsPerPage : true }"
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
                      <v-select
                        v-model="editedItem.documenttype"
                        :items="typeDoc"
                        color="primary"
                        label="Tipo de documento"
                        menu-props="auto"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.documentNo"
                        label="Número de documento"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.title"
                        label="Título"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <!-- TODO: Add nice calendar picker -->
                      <v-text-field
                        v-model="editedItem.date"
                        label="Fecha de emisión"
                        persistent-hint
                        type="date"
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                      ></v-text-field>
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
                      <v-text-field
                        v-model="editedItem.pricebought"
                        label="Total"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.currencybought"
                        label="Divisa"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-file-input
                        v-model="editedItem.namefile"
                        show-size
                        label="Adjuntar archivo"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey" text @click.once="close">
                  Cancelar
                </v-btn>
                <v-btn color="primary" text @click.once="save">
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
                <v-btn color="grey" text @click.once="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn
                  color="primary"
                  text
                  @click.once="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click.once="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click.once="deleteItem(item)"> mdi-delete </v-icon>
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
    typeDoc: ['Invoice', 'Loan', 'Certificate of Authenticity', 'Contract'],
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
        text: 'Número',
        value: 'documentNo',
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

        console.log(body)
        // if (this.editedItem[key] !== '') body[key] = this.editedItem[key]
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
        await api.updateDocument(this.editedItem)
      } else {
        // Creando uno nuevo
        this.editedItem = this.clearObjItem()
        await api.createDocument(this.editedItem)
      }
      this.close()
      this.$emit('callAPI')
    },
  },
}
</script>