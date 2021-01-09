import Vue from "vue";
import Vuex from "vuex";
import ordersStore from "./ordersStore";
import productStore from './productsStore'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ordersStore,
    productStore
  },
});
