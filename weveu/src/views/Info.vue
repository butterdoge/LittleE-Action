<template>
  <!-- <hello-world /> -->
  <div>
    <v-row>
      <v-col v-for="n in 4" :key="n" cols="3.5">
        <!-- 为什么这边不可以由this，在外部就可以有this？ -->
        <card-show :Cardpayload="payload"></card-show>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Card from "@/components/Card";
export default {
  name: "Photo",
  components: {
    "card-show": Card,
  },
  data() {
    return {
      example: {
        title: "测试图片",
        img: "https://iwisspicgo.oss-cn-shanghai.aliyuncs.com/img/47BC2C9B4E9199583DB28F0FFEC302B8.JPG",
        info: "测试性的文本，采菊东篱下，悠然见南山",
      },
    };
  },
  computed: {
    infoDetail() {
      return this.$store.getters.cityInfo(this.$route.params.cityname);
    },
    payload() {
      return {
        title: "测试图片",
        img: "https://iwisspicgo.oss-cn-shanghai.aliyuncs.com/img/47BC2C9B4E9199583DB28F0FFEC302B8.JPG",
        info: "测试性的文本，采菊东篱下，悠然见南山",
      };
    },
  },
};
</script>

<style scoped>
.box {
  width: 100%;
}
</style>