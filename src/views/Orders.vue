<template>
  <div class="orders">
    <v-hover v-slot="{ hover }">
      <v-btn :class="{ 'on-hover': hover }" :text="hover ? true : false"
        >Button</v-btn
      >
    </v-hover>
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="5"
      :loading="isLoading"
      loading-text="Loading.... Please wait"
      class="elevation-3"
      show-expand
    >
      <template v-slot:[`item.status`]="{ item }">
        <span>{{ item.isCompleted ? "Completed" : "Pending" }}</span>
      </template>
      <template v-slot:[`item.isCompleted`]="{ item }">
        <v-simple-checkbox
          :value="item.isCompleted"
          :ripple="false"
          @input="printS($event, item)"
        ></v-simple-checkbox>
      </template>
      <template v-slot:expanded-item="{ item }">
        <v-data-table :headers="subHeaders" :items="item.items"> </v-data-table>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import "firebase/app";
import "firebase/firestore";
// import { db } from "../db/db";

export default {
  name: "About",
  data: () => ({
    headers: [
      {
        text: "Order ID",
        align: "start",
        sortable: true,
        value: "id",
      },
      { text: "Items count", value: "items.length" },
      { text: "Total Price", value: "totalPrice" },
      { text: "Phone No", value: "user.phoneNo" },
      { text: "Address", value: "user.address" },
      { text: "Date", value: "date" },
      { text: "Status", value: "status" },
      { text: "Completed", value: "isCompleted" },
    ],
    subHeaders: [
      { text: "Name", value: "name" },
      { text: "Quantity", value: "quantity" },
      { text: "Price", value: "price" },
      { text: "Total", value: "total" },
    ],
  }),
  computed: {
    ...mapState("ordersStore", {
      orders: (state) => state.orders,
      isLoading: (state) => state.isLoading,
    }),
  },
  methods: {
    ...mapActions("ordersStore", ["initialize", "updatedStatus"]),
    printS(e, item) {
      if (e) {
        console.log(item);
        this.updatedStatus(item);
      }
    },

    increment() {
      this.$store.commit("increment", 5);
    },
  },
  created() {
    this.initialize();
  },
};
</script>

<style lang="scss" scoped>
.v-btn.on-hover {
  color: white;
  background-color: green;
}
</style>