<template>
  <v-app>
    <v-main>
      <homepage/>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
// import Dashboard from './components/Dashboard';
import Homepage from './components/Homepage.vue';

export default {
  name: "App",

  components: {
    // Dashboard,
    Homepage,
  },

  data: () => ({
    //
  }),
};
</script>
