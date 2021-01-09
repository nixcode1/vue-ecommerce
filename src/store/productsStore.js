import { db } from "../db/db.js";

const productsStore = {
  namespaced: true,
  state: () => ({
    products: []
  }),
  mutations: {
    setProducts(state, payload){
      state.products = payload
    }
  },
  actions: {
    initialize(context) {
      let data = [];
      db.collection("products").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
      });
      context.commit('setProducts', data);
    },
  },
  getters: {},
};

export default productsStore;
