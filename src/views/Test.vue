<template>
  <div>
    <p>{{ state.name }}</p>
    <p>{{ num }}</p>
    <p>text</p>
    <v-btn @click="increment">Press</v-btn>
    <v-btn @click="increase">Press</v-btn>
  </div>
</template>

<script>

export default {
  name: "Dashboard",
  data: () => ({}),
  computed: {
    state() {
      return this.$store.state.products
    }
  },
  methods: {
    increment() {
      console.log("Sent");
      this.$store.commit("increment");
    },
    increase() {
      console.log("Sent");
      this.$store.commit("increase");
    },
  },
};
</script>

<style scoped>
btn:hover {
  background-color: green;
  color: white;
}
</style>