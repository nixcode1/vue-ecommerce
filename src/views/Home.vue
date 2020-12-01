<template>
  <div>
    <div class="d-flex flex-row flex-wrap">
      <item-card v-for="item in products" v-bind:key="item.id" v-bind:product="item"/>
    </div>

  </div>
</template>
 
<script>
import { db } from "../db/db.js";
import ItemCard from '../components/ItemCard';

export default {
  name: "Homepage",
  components: {
    ItemCard
  },
  data() {
    return {
      products: [],
    };
  },
  created: async function () {
    let results = await db.collection("products").get();
    results.forEach((doc) => this.products.push(doc.data()));
  },
};
</script>

<style scoped>

</style>