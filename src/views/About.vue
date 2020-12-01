<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ count }}</p>
    <p>{{ num }}</p>
    <v-hover v-slot="{ hover }">
      <v-btn :class="{ 'on-hover': hover }" :text='hover? true: false' @click="snackbar = !snackbar"
        >Button</v-btn
      >
      
    </v-hover>
    <v-snackbar
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
.v-btn.on-hover{
  color: white;
  background-color: green;
  }
</style>