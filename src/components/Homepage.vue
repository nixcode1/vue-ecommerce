<template>
  <div id="scrolling-techniques-7" class="mx-0">
    <div class="d-flex flex-row flex-wrap flex-shrink justify-space-around mx-0">
      <v-card
        v-for="product in products"
        :key="product.id"
        class="mx-4 my-2 pa-2"
        max-height="150"
        max-width="150"
      >
        <v-img :src="product.imageUrl" max-height="50px" contain></v-img>
        <v-card-title>
          <div>{{ product.name }}</div>
        </v-card-title>
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

<style scoped>


</style>