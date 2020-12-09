<template>
  <div class="orders">
    <h1>This is an about page</h1>
    <p>{{ count }}</p>
    <p>{{ num }}</p>

    <v-hover v-slot="{ hover }">
      <v-btn :class="{ 'on-hover': hover }" :text="hover ? true : false"
        >Button</v-btn
      >
    </v-hover>
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="5"
      :expanded.sync="expanded"
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
import { mapState } from "vuex";
import { db } from "../db/db";

export default {
  name: "About",
  data: () => ({
    snack: false,
    isLoading: true,
    snackColor: "",
    snackText: "",
    expanded: [],
    // fireOrders: [],
    choices: ["Pending", "Completed"],
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
      { text: "Address", value: "address" },
      { text: "Status", value: "status" },
      { text: "Completed", value: "isCompleted" },
    ],
    subHeaders: [
      { text: "Name", value: "name" },
      { text: "Quantity", value: "quantity" },
      { text: "Price", value: "price" },
      { text: "Total", value: "total" },
    ],
    orders: [],
  }),
  computed: {
    ...mapState(["count", "num"]),
  },
  methods: {
    printS(e, item) {
      if (e) {
        this.updatedStatus(item);
      }
    },
    updatedStatus(item) {
      db.collection("orders")
        .doc(item.id)
        .update({
          isCompleted: true,
        })
        .then(function () {
          console.log("Document successfully updated!");
          item.isCompleted = true;
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },
    async initialize() {
      db.collection("orders").onSnapshot((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          let order = {};
          order = doc.data();
          order.id = doc.id;
          this.orders.push(order);
          console.log(order);
        });
      });
      this.isLoading = false;
    },
    increment() {
      this.$store.commit("increment", 5);
    },
    
  },
  created() {
    this.initialize();
    // this.orders = [
    //   {
    //     phoneNo: "09283898348",
    //     totalPrice: 903000,
    //     items: [
    //       { total: 450000, price: 450000, quantity: 1, name: "Apple Mac 2020" },
    //       { price: 3000, name: "Okay UUID", quantity: 1, total: 3000 },
    //     ],
    //     address: "University of Port Harcourt, Delta Park, Nigeria",
    //     isCompleted: false,
    //     user: {
    //       phoneNo: "09283898348",
    //       email: "drleviackerman@gmail.com",
    //       id: "GFhwzS0nfsd5nwKZdWZ0HLb40J52",
    //       name: null,
    //       address: "University of Port Harcourt, Delta Park, Nigeria",
    //     },
    //     id: "4WXdVIFXAipsIerXMR8u",
    //   },
    //   {
    //     totalPrice: 1200000,
    //     user: {
    //       id: "GFhwzS0nfsd5nwKZdWZ0HLb40J52",
    //       phoneNo: "09283898348",
    //       name: null,
    //       address: "University of Port Harcourt, Delta Park, Nigeria",
    //       email: "drleviackerman@gmail.com",
    //     },
    //     items: [
    //       { quantity: 1, total: 450000, price: 450000, name: "Apple Mac 2019" },
    //       { total: 300000, name: "New Mac", price: 300000, quantity: 1 },
    //     ],
    //     isCompleted: false,
    //     id: "YdJHoLCERbhoNOJrc1Gq",
    //   },
    //   {
    //     user: {
    //       phoneNo: "0900000000000",
    //       id: "GFhwzS0nfsd5nwKZdWZ0HLb40J52",
    //       email: "drleviackerman@gmail.com",
    //       address: "test",
    //       name: null,
    //     },
    //     isCompleted: false,
    //     items: [
    //       { total: 450000, price: 450000, name: "Apple Mac 2019", quantity: 1 },
    //       { price: 300000, name: "New Mac", quantity: 1, total: 300000 },
    //     ],
    //     totalPrice: 1200000,
    //     id: "pnjTwisE3G5WCbJcJnmc",
    //   },
    //   {
    //     items: [
    //       { price: 450000, quantity: 1, total: 450000, name: "Apple Mac 2019" },
    //       { name: "New Mac", quantity: 1, price: 300000, total: 300000 },
    //     ],
    //     phoneNo: "09283898348",
    //     isCompleted: false,
    //     address: "University of Port Harcourt, Delta Park, Nigeria",
    //     totalPrice: 1200000,
    //     user: {
    //       name: null,
    //       phoneNo: "09283898348",
    //       email: "drleviackerman@gmail.com",
    //       address: "University of Port Harcourt, Delta Park, Nigeria",
    //       id: "GFhwzS0nfsd5nwKZdWZ0HLb40J52",
    //     },
    //     id: "svsISLumHdC1fAesZvWf",
    //   },
    // ];
  },
};
</script>

<style lang="scss" scoped>
.v-btn.on-hover {
  color: white;
  background-color: green;
}
</style>