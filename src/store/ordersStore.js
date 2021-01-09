import { db } from "../db/db";

const ordersStore = {
  namespaced: true,
  state: () => ({
    isLoading: true,
    expanded: [],
    orders: [],
  }),
  mutations: {
    increment(state) {
      // mutate state
      state.number++;
    },
    setOrders(state, payload) {
      state.orders = payload;
      state.isLoading = false;
    }
  },
  actions: {
    initialize(context) {
      let orders = [];
      // const options = {
      //   year: "numeric",
      //   month: "numeric",
      //   day: "numeric",
      //   hour: "numeric",
      //   minute: "numeric",
      // };
      db.collection("orders").onSnapshot((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          let order = {};
          order = doc.data();
          order.id = doc.id;
          order.date = doc
            .data()
            .date.toDate()
            .toLocaleString("en-US");
          console.log(doc.data());
          orders.push(order);
          // console.log(order);
        });
        context.commit('setOrders', orders);
        orders = [];
      });
    },
    updatedStatus(context, item) {
      db.collection("orders")
        .doc(item.id)
        .update({
          isCompleted: true,
        })
        .then(function () {
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
  },
  getters: {},
};

export default ordersStore;
