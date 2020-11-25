<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app>
        <!-- -->
      </v-navigation-drawer>

      <v-app-bar
        app
        color="#fcb69f"
        dark
        prominent
        shrink-on-scroll
        src="https://picsum.photos/1920/1080?random"
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          ></v-img>
        </template>

        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Title</v-toolbar-title>

        <v-spacer></v-spacer>

        <router-link to="/">
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </router-link>

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

          <v-container
            style="height: 1000px"
          ></v-container>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

|
      

<script>
export default {};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
