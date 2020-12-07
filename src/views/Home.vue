<template>
  <div>
    <div class="d-flex flex-row flex-wrap">
      <item-card
        v-for="item in products"
        v-bind:key="item.id"
        v-bind:product="item"
      />
    </div>
  </div>
</template>
 
<script>
// import { db } from "../db/db.js";
import ItemCard from "../components/ItemCard";

export default {
  name: "Homepage",
  components: {
    ItemCard,
  },
  data() {
    return {
      products: [
        {
          category: "new",
          description: "The newest mac in town",
          name: "Apple Mac 2019",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/stundent-shop.appspot.com/o/images%2Fmac.jpg?alt=media&token=615b58ff-8ddc-4bf2-b33b-b60e600a230a",
          price: 450000,
          id: "9d02458b-cbd8-472e-b93a-6760d3855ee2",
        },
        {
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/stundent-shop.appspot.com/o/images%2FProbook_640.jpg?alt=media&token=7107311a-592e-4b55-8243-e39a56377923",
          description: "test",
          category: "new",
          price: 300000,
          id: "f90e5358-098e-4fc5-a302-ffe8f1c5da2e",
          name: "New Mac",
        },
        {
          description: "A 2020 ac",
          price: 40000,
          name: "Apple Mac",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/stundent-shop.appspot.com/o/images%2FProbook_640.jpg?alt=media&token=5982ad3e-ea2c-4fae-8a62-5dd31d52d429",
          id: "fc41f6d7-c59e-4210-8173-36838de9261d",
          category: "new",
        },
        {
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/stundent-shop.appspot.com/o/images%2FProbook_640.jpg?alt=media&token=6d5e8ad8-853e-418b-abb1-5024b48cbf9b",
          description: "test",
          price: 3000,
          name: "Okay UUID",
          id: "5e1b4791-a506-4b68-9fe8-19273fd3e937",
          category: "new",
        },
        {
          category: "new",
          name: "Apple Mac 2020",
          price: 450000,
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/stundent-shop.appspot.com/o/images%2Fmac.jpg?alt=media&token=61f8ac43-605f-4339-a8e2-15863f61398d",
          description: "The newest mac in town",
          id: "c4351d15-eefc-4382-8661-eb94b0885452",
        },
      ],
    };
  },
  // created: async function () {
  //   let results = await db.collection("products").get();
  //   results.forEach((doc) => this.products.push(doc.data()));
  // },
};
</script>

<style scoped>
</style>