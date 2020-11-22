<template>
  <div>
    <ul id="array-rendering">
      <li v-for="product in products" :key="product.id">
        {{ product.name }}
        {{ product.price }}
      </li>
    </ul>
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