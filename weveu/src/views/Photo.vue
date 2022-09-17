<template>
  <!-- <hello-world /> -->
  <div id="outbox2">
    <v-carousel
      :height="flowheight"
      :hide-delimiter-background="true"
      :hide-delimiters="true"
      interval="2000"
      :cycle="true"
    >
      <v-carousel-item
        v-for="(item, i) in this.infoDetail.img"
        :key="i"
        :src="item.src"
      >
      </v-carousel-item>
    </v-carousel>
    <div id="anotherbox">
      <div id="insidebox">
        <transition name="scale-transition">
          <h2 v-show="show">{{ this.infoDetail.title2 }}</h2>
        </transition>
        <transition name="scale-transition">
            <p
              v-show="show"
              :style="{ fontSize: fontsize }"
              v-html="this.infoDetail.text2"
            ></p>
        </transition>
        <transition name="scale-transition">
            <p
              v-show="show & this.$route.params.cityname!='shijunyuan'"
              :style="{ fontSize: fontsize }"
              id="note"
            >
              (图文来自网络)
            </p>
        </transition>
      </div>
    </div>
    <div
      id="shower"
      class="rounded-circle"
      :style="{ width: ballwidth, height: ballwidth, top: topposition }"
    >
      <div id="title">
        <h2 :style="{ fontSize: h2size }">文化铸魂</h2>
        <p id="subtit">{{ this.infoDetail.title2 }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Photo",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showText() {
      var height = this.$vuetify.breakpoint.xsOnly ? 1000 : 1600;
      if (window.pageYOffset > height && this.show == false) this.show = true;
    },
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to, from, next);
    next();
    this.show = false;
  },
  mounted() {
    window.addEventListener("scroll", this.showText);
    this.show = false;
  },
  computed: {
    infoDetail() {
      return this.$store.getters.cityInfo(this.$route.params.cityname);
    },
    ballwidth() {
      return this.$vuetify.breakpoint.xsOnly ? "10rem" : "13rem";
    },
    h2size() {
      return this.$vuetify.breakpoint.xsOnly ? "1.3em" : "1.5em";
    },
    flowheight() {
      return this.$vuetify.breakpoint.xsOnly ? "40vh" : "70vh";
    },
    topposition() {
      return this.$vuetify.breakpoint.xsOnly ? "-27%" : "-25%";
    },
    fontsize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "0.8rem";
        case "md":
          return "1.2rem";
      }
      return "1.2rem";
    },
    
  },
};
</script>

<style scoped>
.box {
  width: 100%;
}
#note{
  text-align: right;
}
#outbox2 {
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  height: 100%;
}
#shower {
  color: #ffcdd2;
  background-color: #de1c31;
  border-style: solid;
  border-color: #f7de98;
  border-width: 12px;
  width: 15rem;
  /* 我改了啥？ */
  max-width: 200px;
  max-height: 200px;
  height: 15rem;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
#title {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  color: #fbecde;
  position: relative;
  top: 10px;
}
#anotherbox {
  width: 80%;
  margin: auto;
  /* height: 15rem;为了灵活布局注释掉 */
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: flex-end;
}
#subtit {
  text-align: center;
  font-size: 1.1rem;
}
#insidebox {
  margin-top: 50px;
  margin-bottom: 50px;
}
#insidebox > p {
  color: #880212;
  margin-top: 15px;
}
#insidebox > h2 {
  color: #880212;
}
</style>