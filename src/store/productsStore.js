const productsStore = {
  namespaced: true,
  state: () => ({
    name: "Text",
    dialog: false,
    dialogDelete: false,
    deleteItem: {
      name: "",
      id: "",
    },
    products: [],
    editedIndex: -1,
    imgFile: null,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Price", value: "price" },
      { text: "Category", value: "category" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedItem: {
      id: "",
      name: "",
      price: 0,
      category: "",
      description: "",
      imageUrl: "",
    },
    defaultItem: {
      id: "",
      name: "",
      price: 0,
      category: "",
      description: "",
      imageUrl: "",
    },
  }),
  mutations: {
    increase(state) {
      // mutate state
      state.number++;
    },
  },
  actions: {},
  getters: {},
};

export default productsStore;
