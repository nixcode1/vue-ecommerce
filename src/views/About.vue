<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ count }}</p>
    <p>{{ num }}</p>
    <v-btn elevation="2" @click="snackbar = !snackbar"></v-btn>
    <v-snackbar
      :timeout="-1"
      :value="snackbar"
      absolute
      bottom
      color="primary"
      left
      text
    >
      Lorem ipsum dolor sit amet consectetur.
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "About",
  data: () => ({
    snackbar: false,
  }),
  computed: {
    ...mapState(["count", "num"]),
  },
  methods: {
    increment() {
      this.$store.commit("increment", 5);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>