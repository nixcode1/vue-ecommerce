<template>
  <div class="px-14 py-5">
    <v-img :src="imageUrl" max-height="150px" contain></v-img>
    <v-card max-width="100%">
      <v-text-field
        filled
        v-model="product.name"
        label="Name"
        style="width: 60%, margin: 20px" />
      <v-text-field
        filled
        v-model="product.description"
        label="Description"
        style="width: 60%, margin: 20px" />
      <v-text-field
        type="number"
        filled
        v-model="product.price"
        label="Price"
        style="width: 60%, margin: 20px" />
      <v-text-field
        filled
        v-model="product.category"
        label="Category"
        style="width: 60%, margin: 20px" />
      <v-file-input
        v-model="imgFile"
        solo
        chips
        label="Select Image File..."
        accept="image/*"
      ></v-file-input>
      <v-img :src="imgFile" max-height="150px" contain></v-img
    ></v-card>
    <v-btn @click="uploadFile">Add Product</v-btn>
    <v-snackbar v-model="snackbar">
      {{ `${product.name} has been added!` }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { db } from "../db/db.js";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";
import "firebase/storage";

export default {
  name: "Dashboard",
  data() {
    return {
      rating: null,
      products: [],
      users: [],
      product: {
        name: "",
        description: "",
        price: 0,
        category: "",
      },
      imageUrl: null,
      imgFile: null,
      snackbar: false,
    };
  },
  methods: {
    printDocs() {
      console.log(this.imgFile.name);
    },

    async addUser() {
      db.collection("users").add({ name: "User" });
    },

    async addProduct() {
      const id = uuidv4();
      db.collection("products")
        .add({
          id: id,
          ...this.product,
          imageUrl: this.imageUrl,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.snackbar = true;
          this.product = {
            name: "",
            description: "",
            price: 0,
            category: "",
          };
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
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
            this.imageUrl = downloadURL;
            this.addProduct();
          });
        }
      );
    },
  },
  //   created: async function () {
  //     // let newDocs = [];
  //     let query = await db.collection("products").get();
  //     query.forEach((doc) => this.documents.push(doc.data()));
  //   },
  // firestore: {
  //   products: db.collection("products"),
  //   users: db.collection("users")
  // },
};
</script>

<style scoped>
btn:hover {
  background-color: green;
  color: white;
}
</style>