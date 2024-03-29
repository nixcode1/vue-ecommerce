<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="products"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar>
          <v-toolbar-title>PRODUCTS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Product name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.description"
                        label="Product description"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model.number="editedItem.price"
                        label="Price"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.category"
                        label="Category"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-file-input
                        v-model="imgFile"
                        label="Image"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> {{ editedItem.id? "Update" : "Save"}} </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete "{{
                  deleteItem.name
                }}"?</v-card-title
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
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteProduct(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { db } from "../db/db.js";
import  { mapState, mapActions } from 'vuex';
import firebase from "firebase/app";
import "firebase/storage";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    deleteItem: {
      name: "",
      id: "",
    },
    editedIndex: -1,
    imgFile: null,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Price", value: "price" },
      { text: "Category", value: "category" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedItem: {
      id: "",
      name: "",
      price: 0,
      category: "",
      description: "",
      imageUrl: "",
    },
    defaultItem: {
      id: "",
      name: "",
      price: 0,
      category: "",
      description: "",
      imageUrl: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapState('productsStore', {
      products: state => state.products
    })
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions('productsStore',[
      'initialize'
    ]),
    updateProduct(product) {
      db.collection("products")
        .doc(product.id)
        .update({ ...product })
        .then(() => console.log("Document updated"))
        .catch((error) => console.log("Error" + error));
      console.log(product);
      this.close();
    },
    async addProduct(product) {
      let docRef = db.collection("products").doc();
      console.log("ID" + docRef.id);
      product.id = docRef.id;
      docRef
        .set({
          ...product,
          createdAt: firebase.firestore.Timestamp.now(),
          properties: {
            gpu_class: 1,
            cpu_class: 1,
            storage: "HDD",
          },
        })
        .then(function () {
          console.log("Document successfully written!");
        })

        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    },
    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteProduct(item) {
      // this.editedIndex = this.products.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      this.deleteItem = item;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      db.collection("products")
        .doc(this.deleteItem.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          this.closeDelete();
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        this.updateProduct(this.editedItem);
      } else {
        console.log(this.editedItem);
        await this.uploadFile();
      }
    },
    async uploadFile() {
      console.log(this.imgFile.name);
      var storage = firebase.storage();

      // Create a storage reference from our storage service
      var storageRef = storage.ref();

      var metadata = {
        contentType: "image/jpeg",
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef
        .child("images/" + this.imgFile.name)
        .put(this.imgFile, metadata);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
            default:
              console.log("Error");
              break;
          }
        },
        function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
            default:
              console.log("Error");
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            this.editedItem.imageUrl = downloadURL;
            this.addProduct(this.editedItem);
            this.close();
            this.imgFile = null;
            this.editItem = this.defaultItem;
          });
        }
      );
    },
  },
};
</script>

<style>
</style>