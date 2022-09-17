<template>
  <!-- <hello-world /> -->
  <div id="flexbox">
    <div id="textbox" transition="slide-x-transition">
      <transition name="scroll-x-transition" :duration="4500">
        <h1 :style="{ fontSize: titlesize }" v-show="show">
          {{ this.infoDetail.title }}
        </h1>
      </transition>
      <transition name="scroll-x-transition" :duration="4500">
        <p v-show="show" id="mainword" :style="{ fontSize: fontsize }" v-html="this.infoDetail.text" style="text-indent: 0em">
          <!-- {{ this.infoDetail.text }} -->
        </p>
      </transition>
    </div>
    <div
      id="shower"
      class="rounded-circle"
      :style="{ width: ballsize, height: ballsize, top: top }"
    >
      <div id="title">
        <h2 :style="{ fontSize: h2size }">{{ this.infoDetail.name }}</h2>
        <p id="sub1" :style="{ fontSize: headsize }">"小e行"江苏青年<br>红色寻迹实践团</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Word",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showText() {
      var height=this.$vuetify.breakpoint.xsOnly ? 300 : 750;
      if (window.pageYOffset > height && this.show == false) this.show = true;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.showText);
    this.show = false;
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to, from, next);
    next();
    this.show = false;
  },
  computed: {
    infoDetail() {
      return this.$store.getters.cityInfo(this.$route.params.cityname);
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
    titlesize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "1.4rem";
        case "md":
          return "2.8rem";
      }
      return "2.8rem";
    },
    

    ballsize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "10rem";
      }
      return "13rem";
    },
    headsize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "1.1rem";
      }
      return "1.2rem";
    },
    top() {
      return this.$vuetify.breakpoint.xsOnly ? "-3px" : "-3px";
    },
    h2size() {
      return this.$vuetify.breakpoint.xsOnly ? "1.3em" : "1.5em";
    },
  },
};
</script>

<style scoped>
.box {
  width: 100%;
}
#flexbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
}

#textbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60%;
  width: 80%;
  margin: auto;
}
h2,
h1 {
  color: #f7de98;
  text-align: center;
}
p {
  font-weight: 520;
  color: #f7de98;
}
#mainword {
  text-indent: 3rem;
  margin-top: 30px;
}
#shower {
  background-color: #de1c31;
  border-style: solid;
  border-color: #f7de98;
  border-width: 9px;
  max-height: 13rem;
  max-width: 13rem;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  position: absolute;
}
#title {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  color:#fbecde;
}
#sub1 {
  text-align: center;
}
</style>