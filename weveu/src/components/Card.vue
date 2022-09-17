<template>
  <v-card  class="mx-auto my-0" max-width="374" elevation="8">
    <v-img
      height="250"
      :src="this.Cardpayload.img"
    ></v-img>

    <v-card-title>{{this.Cardpayload.title}}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <div class="grey--text ms-4">4.5 (413)</div>
      </v-row>

      <div>
        {{this.Cardpayload.info}}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

  </v-card>
</template>

<script>
export default {
  name: "Card",
  props:['Cardpayload'],
  data: () => ({}),
};
</script>
