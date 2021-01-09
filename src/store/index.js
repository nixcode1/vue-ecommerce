import Vue from "vue";
import Vuex from "vuex";
import ordersStore from "./ordersStore";
import productsStore from './productsStore'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ordersStore,
    productsStore
  },
});
