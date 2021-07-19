<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="elements"
      :sort-by="['documenttype', 'date']"
      :sort-desc="[false, false]"
      multi-sort
      :items-per-page="10"
      class="elevation-5"
    >
      <template #top align="center">
        <v-toolbar flat>
          <v-toolbar-title color="primay">{{ catElement }}</v-toolbar-title>
          <v-divider class="mx-5" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template #activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New {{ catElement }}
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
                        label="Type document"
                        prepend-icon="mdi-map"
                        menu-props="auto"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.documentNo"
                        label="DocumentNo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.title"
                        label="Title"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <!-- TODO: Add nice calendar picker -->
                      <v-text-field
                        v-model="editedItem.date"
                        label="Date"
                        hint="YYYY-DD-MM format"
                        persistent-hint
                        type="date"
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                        prepend-icon="mdi-calendar"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.datebought"
                        label="Date Bought"
                        hint="YYYY-DD-MM format"
                        persistent-hint
                        type="date"
                        prepend-icon="mdi-calendar"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.pricebought"
                        label="Price Bought"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.currencybought"
                        label="Currency Bought"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-file-input
                        v-model="editedItem.namefile"
                        show-size
                        label="File input"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click.once="close">
                  Cancel
                </v-btn>
                <v-btn color="primary darken-1" text @click.once="save">
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
                <v-btn color="blue darken-1" text @click.once="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue darken-1"
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

      <template #no-data>
        <v-btn color="primary" @click.once="initialize"> Reset </v-btn>
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
    catElement: 'DOCUMENT',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Title',
        align: 'left',
        value: 'title',
        class: 'primary  white--text',
      },
      {
        text: 'Type document',
        value: 'documenttype',
        align: 'left',
        class: 'primary  white--text',
      },
      {
        text: 'Date',
        value: 'date',
        align: 'left',
        class: 'primary  white--text',
      },

      {
        text: 'Actions',
        value: 'actions',
        sortable: false,
        align: 'left',
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