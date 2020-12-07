<template>
  <div class="orders">
    <h1>This is an about page</h1>
    <p>{{ count }}</p>
    <p>{{ num }}</p>
    <!-- <p>{{ selected }}</p> -->
    s
    <v-hover v-slot="{ hover }">
      <v-btn
        :class="{ 'on-hover': hover }"
        :text="hover ? true : false"
        @click="snackbar = !snackbar"
        >Button</v-btn
      >
    </v-hover>
    <v-snackbar :value="snackbar" absolute bottom color="primary" left text>
      Lorem ipsum dolor sit amet consectetur.
    </v-snackbar>
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="5"
      show-select
      class="elevation-1"
    >
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { db } from "../db/db";

export default {
  name: "About",
  data: () => ({
    snackbar: false,
    // fireOrders: [],
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
    ],
    orders: [],
  }),
  computed: {
    ...mapState(["count", "num"]),
  },
  methods: {
    async initialize() {
      db.collection("orders").onSnapshot((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          let order = {};
          order = doc.data();
          db.collection("users")
            .doc(order.user)
            .get()
            .then(function (doc) {
              order.user = doc.data();
            });
          order.id = doc.id;
          this.orders.push(order);
          // console.log(order);
        });
      });
    },
    increment() {
      this.$store.commit("increment", 5);
    },
  },
  created() {
    this.orders = [
      { utest: "test", id: "1OwyWCjoQV5lAlMKXyyh" },
      {
        items: [],
        address: null,
        totalPrice: 0,
        status: "pending",
        user: {
          id: "GFhwzS0nfsd5nwKZdWZ0HLb40J52",
          email: "drleviackerman@gmail.com",
          address: "University of Port Harcourt, Delta Park, Nigeria",
          phoneNo: "09283898348",
          name: null,
        },
        id: "38jPVR4WRjAV0uuvQIMB",
      },
      {
        user: {
          id: "GFhwzS0nfsd5nwKZdWZ0HLb40J52",
          email: "drleviackerman@gmail.com",
          address: "University of Port Harcourt, Delta Park, Nigeria",
          phoneNo: "09283898348",
          name: null,
        },
        items: [
          { quantity: 2, total: 900000, price: 450000, name: "Apple Mac 2019" },
          { name: "New Mac", total: 300000, price: 300000, quantity: 1 },
        ],
        address: null,
        totalPrice: 2100000,
        status: "pending",
        id: "8kSumg8w3A2RYpAqW2SO",
      },
      {
        user: {
          id: "GFhwzS0nfsd5nwKZdWZ0HLb40J52",
          email: "drleviackerman@gmail.com",
          address: "University of Port Harcourt, Delta Park, Nigeria",
          phoneNo: "09283898348",
          name: null,
        },
        totalPrice: 0,
        address: "University of Port Harcourt, Delta Park, Nigeria",
        status: "pending",
        phoneNo: "09283898348",
        items: [],
        id: "BmlevVj4tsBsERpGVl6K",
      },
      {
        totalPrice: 3689000,
        address: "test",
        items: [
          { total: 900000, quantity: 2, name: "Apple Mac 2019", price: 450000 },
          { quantity: 1, name: "Apple Mac", total: 40000, price: 40000 },
          { total: 9000, name: "Okay UUID", quantity: 3, price: 3000 },
        ],
        status: "pending",
        id: "JNe48Lmzx9dwAbv1reAr",
      },
      {
        address: null,
        user: {
          id: "GFhwzS0nfsd5nwKZdWZ0HLb40J52",
          email: "drleviackerman@gmail.com",
          address: "University of Port Harcourt, Delta Park, Nigeria",
          phoneNo: "09283898348",
          name: null,
        },
        items: [
          { price: 450000, quantity: 1, total: 450000, name: "Apple Mac 2019" },
          { name: "New Mac", quantity: 4, price: 300000, total: 1200000 },
        ],
        status: "pending",
        totalPrice: 2100000,
        id: "KoMPTTKehyf3D6QasydE",
      },
      {
        user: {
          name: null,
          id: "35nU5OsizLNFOs1tMy9lN1rWRS62",
          address: null,
          phoneNo: null,
          email: "preboyunique@gmail.com",
        },
        new: "this works",
        id: "avFJCS53J3Up9hNja95K",
      },
      {
        address: "University of Port Harcourt, Delta Park, Nigeria",
        totalPrice: 0,
        status: "pending",
        items: [],
        user: {
          id: "GFhwzS0nfsd5nwKZdWZ0HLb40J52",
          email: "drleviackerman@gmail.com",
          address: "University of Port Harcourt, Delta Park, Nigeria",
          phoneNo: "09283898348",
          name: null,
        },
        phoneNo: "09283898348",
        id: "iPL4MU0QMbHSHAGUseKf",
      },
      {
        items: [
          { quantity: 1, total: 450000, price: 450000, name: "Apple Mac 2019" },
        ],
        status: "pending",
        totalPrice: 450000,
        address: null,
        id: "irEAy0DOi3D02e1mZumo",
      },
      {
        umen: "works",
        user: {
          name: null,
          id: "35nU5OsizLNFOs1tMy9lN1rWRS62",
          address: null,
          phoneNo: null,
          email: "preboyunique@gmail.com",
        },
        id: "ircY0zc8hsoBjasTXKL1",
      },
      {
        user: {
          id: "GFhwzS0nfsd5nwKZdWZ0HLb40J52",
          email: "drleviackerman@gmail.com",
          address: "University of Port Harcourt, Delta Park, Nigeria",
          phoneNo: "09283898348",
          name: null,
        },
        address: "University of Port Harcourt, Delta Park, Nigeria",
        totalPrice: 0,
        phoneNo: "09283898348",
        items: [],
        status: "pending",
        id: "xda8JLmpVQUpWbXINl9c",
      },
      {
        user: {
          id: "GFhwzS0nfsd5nwKZdWZ0HLb40J52",
          email: "drleviackerman@gmail.com",
          address: "University of Port Harcourt, Delta Park, Nigeria",
          phoneNo: "09283898348",
          name: null,
        },
        status: "pending",
        totalPrice: 0,
        address: null,
        items: [],
        id: "xnfGfAuCuTCeb8454Vk5",
      },
      {
        items: [],
        status: "pending",
        user: {
          id: "GFhwzS0nfsd5nwKZdWZ0HLb40J52",
          email: "drleviackerman@gmail.com",
          address: "University of Port Harcourt, Delta Park, Nigeria",
          phoneNo: "09283898348",
          name: null,
        },
        totalPrice: 0,
        phoneNo: "09283898348",
        address: "University of Port Harcourt, Delta Park, Nigeria",
        id: "zHgE6bFS2oXhHjH8s0Wf",
      },
    ];
  },
};
</script>

<style lang="scss" scoped>
.v-btn.on-hover {
  color: white;
  background-color: green;
}
</style>