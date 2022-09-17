<template>
  <div id="outbox">
    <v-row id="showboth" justify="space-between">
      <v-col cols="3">
        <v-card
          height="100%"
          width="300"
          class="mx-auto rounded-circle"
          color="#f77275"
          id="leftCard"
        >
          <v-navigation-drawer permanent color="#f77275" width="100%" >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{this.infoDetail.name}}市信息
                </v-list-item-title>
                <v-list-item-subtitle>{{this.infoDetail.site}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
              <v-list-item v-for="item in items" :key="item.title" @click="jumpto(item.guide)" link>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-col>
      <v-col cols="9">
        <!-- <v-card width="100%" height="100%"  color="rgba(0,0,0,0)"> -->
          <router-view />
        <!-- </v-card> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "CityInformation",
  data() {
    return {
      items: [
        { title: "红色相册", icon: "mdi-view-dashboard" ,guide:"photo"},
        { title: "红军故事", icon: "mdi-image",guide:"story" },
        { title: "精彩视频", icon: "mdi-help-box",guide:"video" },
      ],
      right: null,
    };
  },
  methods: {
    jumpto(index) {
      var link2="/city/"+this.$route.params.cityname+"/"+index;
      this.$router.push(link2);
    },
  },
  computed: {
    infoDetail(){
      return this.$store.getters.cityInfo(this.$route.params.cityname)
    }
  },
};
</script>

<style >
#test {
  width: 100%;
  height: 100%;
  margin: auto;
  border-radius: 10rem;
  align-items: center;
  display: flex;
  justify-content: center;
}
#outbox {
  width: 100%;
  height: 100%;
}
#showboth {
  height: 100%;
}
#leftCard {
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
}
</style>