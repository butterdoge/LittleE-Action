<template>
  <!-- <hello-world /> -->
  <div id="outbox">
    <div id="insidebox">
      <v-alert
      :width="alertlength"
      dense
      color="#ff9394"
      icon="mdi-firework"
      dismissible
    >
     小提示：视频后有答题环节哦～
    </v-alert>
      <transition name="scale-transition">
        <video width="auto" :height="videoHeight" controls v-show="show" :src="this.infoDetail.video" @ended="whenVideoEnd">
        <!-- <source :src="this.infoDetail.video" type="video/mp4" /> -->
      </video>
      </transition>
      
    </div>
    <div
      id="shower"
      class="rounded-circle"
      :style="{ width: ballwidth, height: ballwidth }"
    >
      <div id="title">
        <h2 :style="{ fontSize: h2size }">革命星火</h2>
        <p id="sub3">{{this.infoDetail.site}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Video",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showText() {
      var height=this.$vuetify.breakpoint.xsOnly ?1400 : 2500;
      if (window.pageYOffset > height && this.show == false) this.show = true;
    },
    whenVideoEnd(){
      this.$store.commit('changeStateTo1');
      this.$store.commit('changeQuizTo1');
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to, from, next);
    next();
    this.$store.commit("changeStateTo0");
    
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
    videoHeight() {
      return this.$vuetify.breakpoint.xsOnly ? "45%" : "70%";
    },
    alertlength() {
      return this.$vuetify.breakpoint.xsOnly ? "90%" : "50%";
    },
  },
};
</script>

<style scoped>
.box {
  width: 100%;
}
#outbox {
  width: 100%;
  margin: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-items: center;
  position: relative;
}
#insidebox {
  width: 100%;
  height: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#shower {
  background-color: #de1c31;
  border-style: solid;
  border-color: #e8d1b5;
  border-width: 12px;
  height: 13rem;
  width: 13rem;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  position: absolute;
  top: -15%;
  left: 50%;
  transform: translateX(-50%);
}
#title {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  color: #fbecde;
  position:relative;
  top:13px
}
h1 {
  text-align: center;
}
h2{
  text-align:center;
}
#sub3 {
  text-align: center;
  font-size: 1.1rem;
}
</style>