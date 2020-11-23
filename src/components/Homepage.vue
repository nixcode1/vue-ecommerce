<template>
  <div id="scrolling-techniques-7">
      <div class="d-flex flex-row flex-wrap flex-shrink align-center">
        <v-card v-for="product in products" :key="product.id" class="mx-4 my-2 pa-2" height="400" max-width="250">
        <v-img :src="product.imageUrl" height="200px" contain></v-img>
        <v-card-title class="pa-md-6"> {{ product.name }} </v-card-title>
      </v-card>
      </div>
  </div>
</template>

<script>
import { db } from "../db/db.js";

export default {
  name: "Homepage",
  data() {
    return {
      products: [],
    };
  },
  created: async function () {
    let query = await db.collection("products").get();
    query.forEach((doc) => this.products.push(doc.data()));
  },
};
</script>

<style>
</style>