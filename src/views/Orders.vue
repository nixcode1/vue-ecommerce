<template>
  <div class="orders">
    <h1>This is an about page</h1>
    <p>{{ count }}</p>
    <p>{{ num }}</p>
    <p>{{ orders }}</p>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import { db } from "../db/db";

export default {
  name: "About",
  data: () => ({
    snackbar: false,
    fireOrders: [],
    orders: [],
  }),
  computed: {
    ...mapState(["count", "num"]),
  },
  methods: {
    increment() {
      this.$store.commit("increment", 5);
    },
  },
  created: async function () {
    db.collection("orders").onSnapshot((querysnapshot) => {
      querysnapshot.forEach((doc) => {
        let order = {};
        order = doc.data();
        db.collection("users")
          .doc(order.user)
          .get()
          .then((doc) => (order.user = doc.data()));
        this.orders.push(order);
        console.log(order)
      });
    });
  },
  firestore: {
    fireOrders: db.collection("orders"),
  },
};
</script>

<style lang="scss" scoped>
.v-btn.on-hover {
  color: white;
  background-color: green;
}
</style>