<template>
  <div>
    <v-container >
      <v-card
      class="mx-4 my-4 pa-3 d-flex flex-column align-center"
      max-height="500"
      max-width="300"
    >
      <v-img :src="product.imageUrl" max-height="150px" contain></v-img>
      <v-card-title class="headerClass">
        {{ product.name }}
      </v-card-title>
    </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["product"],
};
</script>

<style>
.headerClass {
  white-space: nowrap;
  word-break: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}
</style>