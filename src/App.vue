<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app expand-on-hover v-model="drawer" class="d-flex d.none">
        <v-list dense>
          <v-list-item v-for="item in drawerItems" :key="item.title" link>
            <router-link :to="{ path: '/' + item.title }">
              <v-container class="d-flex px-0 mx-0">
                <v-list-item-icon class="">
                  <v-icon color="green">{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-container>
            </router-link>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar color="green" app dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-spacer></v-spacer>

        <v-toolbar-title>TechPlug</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-cart</v-icon>
          <p style="color: orange">{{ count }}</p>
        </v-btn>
      </v-app-bar>

      <!-- Sizes your content based upon application components -->
      <v-main app>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <transition name="slide-fade">
            <router-view></router-view>
          </transition>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

|
      

<script>
export default {
  data: () => ({
    drawer: false,
    drawerItems: [
      {
        title: "Home",
        icon: "mdi-home",
        link: '/home'
      },
      {
        title: "Products",
        icon: "mdi-desktop-mac-dashboard",
        link: '/Products'

      },
      {
        title: "Orders",
        icon: "mdi-information",
        link: "/orders"
      },
      {
        title: "Test",
        icon: "mdi-information",
        link: '/test'
      }
    ],
  }),
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
    count() {
      return this.$store.state.count;
    },
  },
  methods: {
    print() {
      console.log("clicked")
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Source Pro", Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  a {
    text-decoration: none;
    color: green;
    font-size: 20;
  }
}
</style>
