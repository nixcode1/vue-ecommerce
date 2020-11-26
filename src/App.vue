ad<template>
  <div id="app">
    <v-app>
e      <v-navigation-drawer
        app
        v-model="drawer"
        :permanent="$vuetify.breakpoint.mdOnly"
        :temporary="$vuetify.breakpoint.smAndDown"
        hide-overlay
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item in drawerItems" :key="item.title" link>
            <router-link :to="{ path: '/' + item.title}">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            </router-link>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar color="green" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Title</v-toolbar-title>

        <v-spacer></v-spacer>

        
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

        <router-link to="/about">
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </router-link>
        <router-link to="/dashboard"
          ><v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn></router-link
        >
      </v-app-bar>

      <!-- Sizes your content based upon application components -->
      <v-main app>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <router-view></router-view>

          <v-container style="height: 1000px"></v-container>
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
        icon: "mdi-magnify",
      },
      {
        title: "Dashboard",
        icon: "mdi-magnify",
      },
      {
        title: "About",
        icon: "mdi-magnify",
      },
    ],
  }),
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

a {  text-decoration: none;}
}
</style>
