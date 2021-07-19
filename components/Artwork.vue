<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="elements"
      :sort-by="['stockNo']"
      :sort-desc="[false]"
      multi-sort
      class="elevation-5"
    >
      <template #top>
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

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-img :src="editedItem.image"> </v-img>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.year"
                        label="Year"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.stockNo"
                        label="Stock No"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.title"
                        label="Title"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-select
                        v-model="editedItem.artistId"
                        :items="artists"
                        color="primary"
                        label="Author"
                        prepend-icon="mdi-map"
                        menu-props="auto"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.medium"
                        label="Medium"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="editedItem.location"
                        :items="locations"
                        color="primary"
                        label="Location"
                        prepend-icon="mdi-map"
                        menu-props="auto"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="editedItem.width"
                        label="Width"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="editedItem.height"
                        label="Height"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="editedItem.depth"
                        label="Depth"
                        type="number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="editedItem.condition"
                        :items="conditions"
                        color="primary"
                        label="Condition"
                        prepend-icon="mdi-map"
                        menu-props="auto"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="editedItem.status"
                        :items="status"
                        color="primary"
                        label="Status"
                        prepend-icon="mdi-map"
                        menu-props="auto"
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="editedItem.type"
                        :items="types"
                        color="primary"
                        label="Type"
                        prepend-icon="mdi-map"
                        menu-props="auto"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.priceoffered"
                        label="Price offered"
                        type="number"
                        step="any"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.currencyoffered"
                        label="Currency"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.pricebought"
                        label="Price bought"
                        type="number"
                        step="any"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.currencybought"
                        label="Currency"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.datesold"
                        label="Date sold"
                        hint="YYYY-DD-MM format"
                        persistent-hint
                        type="date"
                        prepend-icon="mdi-calendar"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-checkbox
                        v-model="editedItem.publish"
                        label="Publish"
                        color="primary"
                        hide-details
                      ></v-checkbox>
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
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
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
    search: '',
    locations: ['On Display', 'Storage', 'On Loan', 'Owner'],
    conditions: ['Excellent', 'Good', 'Fair', 'Damaged'],
    status: ['Available', 'On Hold', 'Sold'],
    types: [
      'Painting',
      'Sculpture',
      'Video',
      'Mixed',
      'Installation',
      'Work on paper',
    ],

    catElement: 'ARTWORK',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Stock No',
        align: 'left',
        value: 'stockNo',
        class: 'primary  white--text',
      },
{
        text: 'Title',
        align: 'left',
        value: 'title',
        class: 'primary  white--text',
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false,
        class: 'primary  white--text',
      },
    ],
    editedIndex: -1,
    editedItem: {
      artistId: [],
      title: '',
      year: '',
      stockNo: '',
      medium: '',
      location: 'Storage',
      width: 0,
      height: 0,
      depth: 0,
      condition: 'Good',
      status: 'Available',
      type: 'Installation',
      image: '',
      priceoffered: 0,
      currencyoffered: 'EUR',
      pricebought: 0,
      currencybought: 'EUR',
      datebought: '0000-00-00',
      currencysold: 'EUR',
      datesold: '0000-00-00',
      publish: true,
    },
    defaultItem: {
      artistId: [],
      title: '',
      year: '',
      stockNo: '',
      medium: '',
      location: 'Storage',
      width: 0,
      height: 0,
      depth: 0,
      condition: 'Good',
      status: 'Available',
      type: 'Installation',
      image: '',
      priceoffered: 0,
      currencyoffered: 'EUR',
      pricebought: 0,
      currencybought: 'EUR',
      datebought: '0000-00-00',
      currencysold: 'EUR',
      datesold: '0000-00-00',
      publish: true,
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
      if (this.editedItem._id) {
        // Editando
        this.editedItem = Object.assign(
          this.elements[this.editedIndex],
          this.editedItem
        )
        await api.updateArtwork(this.editedItem)
      } else {
        // Creando uno nuevo
        // this.elements.push(this.editedItem)
        const keys = Object.keys(this.editedItem)
        const body = {}
        keys.forEach((key) => {
          if (this.editedItem[key]) body[key] = this.editedItem[key]
        })
        await api.createArtwork(this.editedItem)
      }
      this.$emit('callAPI')
      this.close()
    },
  },
}
</script>