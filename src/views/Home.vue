<template>
  <div>
    <div class="d-flex flex-row flex-wrap">
      <v-card
        v-for="product in products"
        :key="product.id"
        class="mx-4 my-4 pa-3 d-flex flex-column align-center"
        max-height="500"
        max-width="300"
      >
        <v-img :src="product.imageUrl" max-height="100px" contain></v-img>
        <v-card-title>
          <div class="headerClass">{{ product.name }}</div>
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
.headerClass {
  white-space: nowrap;
  word-break: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}
</style>