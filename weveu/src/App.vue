<template>
<!-- app作为全局的主组件，不知道有什么用。 -->
  <v-app>
    <!-- px0不知道是做什么，dark为应用的主题 -->
    <v-app-bar color="#de1c31" class="px-0" dark>
      <!-- grid模型 -->
      <v-row no-gutters>
        <!-- 利用md设定响应式比例 -->
        <v-col md="3" cols="1"> </v-col>
        <v-col md="6" cols="9" style="line-height: 2">
          <div class="d-flex justify-center higher">
            <span
              id="title"
              :style="{ fontSize: maintitle }"
              style="font-weight:800,line-height:2,text-align:center"
            >
              <!-- <v-icon size="20px">mdi-star-outline</v-icon> -->
              南京工业大学“小e行”<br />
              江苏青年红色寻迹党史学习实践团
            </span>
          </div>
        </v-col>
        <v-col md="3" cols="2">
          <div class="d-flex justify-end" style="fontsize: 10px">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#970214"
                  class="rounded-circle"
                  v-bind="attrs"
                  v-on="on"
                  width="3vw"
                  height="30px"
                  min-width="0"
                >
                  <i class="iconfont icon-douyin"></i>
                </v-btn>
              </template>
              <v-img src="douyin.png" width="200" height="200"></v-img>
            </v-tooltip>
            <div v-if="!this.$vuetify.breakpoint.xsOnly">&emsp;</div>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#970214"
                  class="rounded-circle"
                  v-bind="attrs"
                  v-on="on"
                  width="3vw"
                  height="auto"
                  min-width="0"
                >
                  <i class="iconfont icon-weibo"></i>
                </v-btn>
              </template>
              <v-img src="weibo.png" width="200" height="200"></v-img>
            </v-tooltip>
          </div>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <div id="flex">
        <!-- PC端的信息填写页面，只有检测到为电脑端才会弹出，应该做成组件的，但如果做成组件，就要用event通信将参数传出来了？ -->
        <v-dialog v-model="dialog" persistent max-width="600px">
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              id="coverbutton"
              v-bind="attrs"
              v-on="on"
              class="ml-3"
            >
              开始寻迹
            </v-btn>
          </template> -->
          <v-card>
            <v-card-title>
              <span class="text-h5">提交信息</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="Object.keys(updataInfo)"
                      label="就读城市"
                      v-model="userCity"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="currentUni"
                      label="院校名称"
                      required
                      v-model="userSchool"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="填写你的姓名信息"
                      required
                      v-model="userName"
                    ></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="填写你的手机联系方式"
                      required
                      v-model="userContact"
                    ></v-text-field>
                  </v-col> -->
                </v-row>
                <v-snackbar v-model="infoConfirm" :timeout="2000" centered>
                请填写具体信息。
              <template v-slot:action="{ attrs }">
                <v-btn
                  color="blue"
                  text
                  v-bind="attrs"
                  @click="infoConfirm = false"
                >
                  关闭
                </v-btn>
              </template>
            </v-snackbar>
              </v-container>
              <!-- <small>暂不支持港澳台地区院校</small> -->
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            取消
          </v-btn> -->
              <v-btn
                color="blue darken-1"
                text
                v-if="this.showpage"
                @click="registerInfo"
              >
                确定信息
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

<!-- 地图，每个标签都是一个absolute布局，代码较丑。 -->
        <div id="mapbox">
          <v-row class="mx-4">
            <v-col cols="12" style="position: relative">
              <img
                id="map"
                src="https://iwisspicgo.oss-cn-shanghai.aliyuncs.com/%E7%BD%91%E7%AB%99%E5%9B%BE%E7%89%87/map81.png"
              />
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    class="mr-2"
                    id="changzhou"
                    :style="buttonstyle"
                    color="primary"
                    dark
                    @click="jump('changzhou')"
                  >
                    <!-- <v-icon :size="iconsize">mdi-map-marker-star </v-icon> -->
                    常州溧阳市
                  </v-chip>
                </template>
                <span>新四军江南指挥部宣告成立</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    class="mr-2"
                    :style="buttonstyle"
                    id="nanjing"
                    color="primary"
                    dark
                    @click="jump('nanjing')"
                  >
                    <!-- <v-icon :size="iconsize">mdi-map-marker-star </v-icon> -->
                    南京江宁区
                  </v-chip>
                </template>
                <span>消灭当地日伪，建成横山抗日游击根据地</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    class="mr-2"
                    id="nantong"
                    color="primary"
                    :style="buttonstyle"
                    dark
                    @click="jump('nantong')"
                  >
                    <!-- <v-icon :size="iconsize">mdi-map-marker-star </v-icon> -->
                    南通海安市
                  </v-chip>
                </template>
                <span>华中新四军八路军总指挥部成立</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    :style="buttonstyle"
                    class="mr-2"
                    id="huaian"
                    color="primary"
                    dark
                    @click="jump('huaian')"
                  >
                    <!-- <v-icon :size="iconsize">mdi-map-marker-star </v-icon> -->
                    淮安淮阴区
                  </v-chip>
                </template>
                <span>新四军“刘老庄连”</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    class="mr-2"
                    id="zhenjiang"
                    :style="buttonstyle"
                    color="primary"
                    dark
                    @click="jump('zhenjiang')"
                  >
                    <!-- <v-icon :size="iconsize">mdi-map-marker-star </v-icon> -->
                    镇江句容市
                  </v-chip>
                </template>
                <span>新四军挺进江南，取得韦岗战役胜利</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    class="mr-2"
                    id="wuxi"
                    color="primary"
                    :style="buttonstyle"
                    dark
                    @click="jump('wuxi')"
                  >
                    <!-- <v-icon :size="iconsize">mdi-map-marker-star </v-icon> -->
                    无锡新吴区
                  </v-chip>
                </template>
                <span>“江抗”东进，黄土塘首战胜利</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    class="mr-2"
                    id="taizhou"
                    color="primary"
                    :style="buttonstyle"
                    dark
                    @click="jump('taizhou')"
                  >
                    <!-- <v-icon :size="iconsize">mdi-map-marker-star </v-icon> -->
                    泰州泰兴市
                  </v-chip>
                </template>
                <span>取得黄桥战役胜利</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    class="mr-2"
                    id="yancheng"
                    :style="buttonstyle"
                    color="primary"
                    dark
                    @click="jump('yancheng')"
                  >
                    <!-- <v-icon :size="iconsize">mdi-map-marker-star </v-icon> -->
                    盐城亭湖区
                  </v-chip>
                </template>
                <span>重建新四军军部</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    class="mr-2"
                    id="yangzhougaoyou"
                    color="primary"
                    :style="buttonstyle"
                    dark
                    @click="jump('yangzhou')"
                  >
                    <!-- <v-icon :size="iconsize">mdi-map-marker-star </v-icon> -->
                    扬州高邮市
                  </v-chip>
                </template>
                <span>最后一战，高邮战役</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    class="mr-2"
                    id="xvzhou"
                    :style="buttonstyle"
                    color="primary"
                    dark
                    @click="jump('xvzhou')"
                  >
                    <!-- <v-icon :size="iconsize">mdi-map-marker-star </v-icon> -->
                    徐州睢宁县
                  </v-chip>
                </template>
                <span>睢宁战役</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    class="mr-2"
                    id="lianyungang"
                    color="primary"
                    :style="buttonstyle"
                    dark
                    @click="jump('lianyungang')"
                  >
                    <!-- <v-icon :size="iconsize">mdi-map-marker-star </v-icon> -->
                    连云港赣榆
                  </v-chip>
                </template>
                <span>小沙东海战</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    class="mr-2"
                    id="suqian"
                    color="primary"
                    :style="buttonstyle"
                    dark
                    @click="jump('suqian')"
                  >
                    <!-- <v-icon :size="iconsize">mdi-map-marker-star </v-icon> -->
                    宿迁泗洪县
                  </v-chip>
                </template>
                <span>血战朱家岗</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    class="mr-2"
                    id="suzhou"
                    color="primary"
                    dark
                    :style="buttonstyle"
                    @click="jump('suzhou')"
                  >
                    <!-- <v-icon :size="iconsize">mdi-map-marker-star </v-icon> -->
                    苏州吴中区
                  </v-chip>
                </template>
                <span>冲山之围</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </div>

        <!-- id的问题请忽略，原先对调了位置来满足甲方需求，此处为正文文本-->
        <div id="firstbox" position="relative">
          <router-view name="Info"></router-view>
        </div>

        <!-- 轮播图文本页面 -->
        <div id="thirdbox">
          <router-view name="Photo"></router-view>
        </div>

      <!-- 视频页面 -->
        <div
          id="secondbox"
          :style="{ height: videoBoxHeight }"
          v-if="!$store.getters.getQuizState"
        >
          <router-view name="Video"></router-view>
        </div>


      <!-- 答题页面，只有视频完成后才会实现渲染。 -->
        <div
          id="fourthbox"
          :style="{ height: quizBoxHeight }"
          v-if="$store.getters.getQuizState"
        >
          <router-view name="Quiz"></router-view>
        </div>
        
      </div>
    </v-main>
    <v-footer :padless="true">
      <v-card
        flat
        tile
        width="100%"
        class="lighten-1 text-center"
        color="#de1c31"
      >
        <v-card-text>
          <v-btn
            v-for="icon in items"
            :key="icon"
            target="_blank"
            :href="icon.web"
            class="mx-4"
            icon
          >
            <!-- <v-icon size="24px"  >
              {{ icon }}
            </v-icon> -->
            <i class="iconfont" :class="icon.icon" style="fontsize: 24px"></i>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text justify-center higher">
          南京工业大学“小e行”<br>
          江苏青年红色寻迹党史学习实践团
        </v-card-text>
      </v-card>
    </v-footer>
    <v-btn
      color="#be1f30"
      elevation="8"
      fab
      large
      fixed
      id="upthere"
      @click="$vuetify.goTo(10, {})"
      ><v-icon>mdi-arrow-up-bold</v-icon></v-btn
    >
    <div id="coverpage" v-if="this.$vuetify.breakpoint.xsOnly && this.showpage">
      <img
        id="coverpic"
        src="https://iwisspicgo.oss-cn-shanghai.aliyuncs.com/%E7%BD%91%E7%AB%99%E5%9B%BE%E7%89%87/%E5%B0%81%E9%9D%A2Ver1.3.png"
      />
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            id="coverbutton"
            v-bind="attrs"
            v-on="on"
            class="ml-3"
          >
            开始寻迹
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">用户信息</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="Object.keys(updataInfo)"
                    label="就读城市"
                    v-model="userCity"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="currentUni"
                    label="院校名称"
                    required
                    v-model="userSchool"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="填写你的姓名信息"
                    required
                    v-model="userName"
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="填写你的手机联系方式"
                    required
                    v-model="userContact"
                  ></v-text-field>
                </v-col> -->
              </v-row>
              <v-snackbar v-model="infoConfirm" :timeout="2000" centered>
                请填写具体信息。
              <template v-slot:action="{ attrs }">
                <v-btn
                  color="blue"
                  text
                  v-bind="attrs"
                  @click="infoConfirm = false"
                >
                  关闭
                </v-btn>
              </template>
            </v-snackbar>
            </v-container>
            <!-- <small>暂不支持港澳台地区院校</small> -->
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            取消
          </v-btn> -->
            <v-btn
              color="blue darken-1"
              text
              v-if="this.showpage"
              @click="registerInfo"
            >
              确定信息
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- new added 812 -->
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      infoConfirm:false,
      dialog: false,
      showpage: true,
      drawer: true,
      userCity: null,
      userSchool: null,
      userName: null,
      userContact: "默认联系方式",
      items: [
        {
          title: "微博",
          icon: "icon-weibo",
          web: "https://weibo.com/u/7640787809?is_hot=1",
        },
        {
          title: "抖音",
          icon: "icon-douyin",
          web: "https://www.douyin.com/user/MS4wLjABAAAA6s9S2lUSOUVUjX62wDv4Kye0eLkuQk3fxX3D1efJ6Kg3dR2R13hdIoVe8KInu7KW",
        },
        {
          title: "南工官网",
          icon: "icon-xuexiao",
          web: "http://www.njtech.edu.cn/",
        },
        {
          title: "问卷调查",
          icon: "icon-wenjuan",
          web: "https://www.wjx.cn/vm/erZkK8I.aspx",
        },
      ],
      icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"],
      mini: true,
    };
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to, from, next);

    next();
  },
  mounted() {
    this.$router.push("/city/zhenjiang");
    if(!this.$vuetify.breakpoint.xsOnly){
      this.dialog=true;
    }
  },
  methods: {
    registerInfo() {
      if(!(this.userCity&&this.userName&&this.userContact&&this.userSchool)){
        this.infoConfirm=true;
        console.log("用户没有填写信息。")
        return;
      }
      var payload = {
        school: this.userSchool,
        city: this.userCity,
        name: this.userName,
        contact: this.userContact,
      };
      this.$store.commit("changeUserInfor", payload);
      this.enter();
      this.dialog = false;
    },
    jump(cityname) {
      let link = "/city/" + cityname;
      this.$router.push(link);
      let distance = this.$vuetify.breakpoint.xsOnly ? 400 : 840;
      window.scroll({ top: distance, left: 0, behavior: "smooth" });
      return 1;
    },
    enter() {
      this.showpage = !this.showpage;
      window.scroll({ top: 0, left: 0, behavior: "auto" });
    },
  },
  computed: {
    // 表单需要的计算数据
    currentUni() {
      if (this.userCity != null) {
        return this.updataInfo[this.userCity];
      } else {
        return ["请选择当前城市"];
      }
    },
    updataInfo() {
      return this.$store.getters.getUpdata;
    },

    // 界面适配需要的计算数据。
    maintitle() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "0.9rem";
      }
      return "1.4rem";
    },
    buttonstyle() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return {
            position: "absolute",
            fontSize: "4px",
            width: "2.5rem",
            height: "0.8rem",
            zIndex: 3,
            paddingLeft: "1px",
            opacity: 0,
          };
      }
      return {
        position: "absolute",
        fontSize: "1.1rem",
        width: "7rem",
        height: "2rem",
        zIndex: 3,
        paddingLeft: "10px",
        opacity: 0,
      };
    },
    iconsize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 0;
      }
      return 16;
    },
    videoBoxHeight() {
      return this.$vuetify.breakpoint.xsOnly ? "30rem" : "50rem";
    },
    photoBoxHeight() {
      return this.$vuetify.breakpoint.xsOnly ? "47rem" : "55rem";
    },
    quizBoxHeight() {
      return this.$vuetify.breakpoint.xsOnly ? "55rem" : "60rem";
    },
  },
};
</script>

<style>
/* #fbecde米黄色 */
* {
  font-family: KaiTi;
}

#coverbutton {
  position: absolute;
  top: 62%;
  left: 30%;
  z-index: 9;
  color: #e8d1b5;
  font-size: 1.4rem;
  font-weight: 700;
}
#coverpic {
  width: 100%;
  height: 110%;
}
#coverpage {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 5;
}
#upthere {
  top: 80%;
  left: 5%;
}
.v-chip {
  padding: 0 4px;
}
.v-main {
  background-color: #f7de98;
}
#out {
  max-width: 100%;
}
#title {
  font-size: 1.4rem;
  text-align: center;
}
.higher {
  line-height: 1.4rem;
}
#mainbody {
  width: 80%;
  height: 45rem;
  margin: auto;
}
#flex {
  display: flex;
  flex-direction: column;
  width: 100%;
}
#map {
  width: 100%;
  aspect-ratio: 1.8/1;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  border-radius: 0rem;
  margin: auto;
}
#mapbox {
  width: 80%;
  margin: auto;
  display: flex;
  min-width: 100%;
  margin-bottom: 2rem;
  margin-top: 2rem;
}
.iconfont {
  font-size: 18px;
}
#firstbox {
  height: 54rem;
  background-color: #de1c31;
}
#thirdbox {
  /* height: 55rem; 为了灵活布局注释掉 */
  margin-top: 5rem;
  margin-bottom: 4rem;
  background-color: #f7de98;
}
#secondbox {
  background-color: #e8d1b5;
}
#fourthbox {
  background-color: #e8d1b5;
}
#firstbox,
#secondbox,
#thirdbox {
  width: 100%;
}

#nanjing {
  left: 34%;
  top: 70%;
}
#changzhou {
  left: 49%;
  top: 73%;
  /* transition: height 0.5s; */
}
#nantong {
  left: 59%;
  top: 67%;
}
#zhenjiang {
  left: 44%;
  top: 66%;
}
#wuxi {
  left: 54%;
  top: 79%;
}
#yangzhoujiangdu {
  left: 46rem;
  top: 28rem;
}
#taizhou {
  left: 50%;
  top: 57%;
}

#yancheng {
  left: 51%;
  top: 41%;
}
#xvzhou {
  left: 19%;
  top: 19%;
}
#huaian {
  left: 39%;
  top: 37%;
}

#yangzhougaoyou {
  left: 41%;
  top: 60%;
}

#lianyungang {
  left: 40%;
  top: 11%;
}

#suqian {
  left: 30%;
  top: 27%;
}
#suzhou {
  left: 56%;
  top: 87%;
}

/* #yangzhougaoyou,
#huaian,
#yancheng,
#taizhou,
#yangzhoujiangdu,
#wuxi,
#zhenjiang,
#nantong,
#changzhou,
#xvzhou,
#suqian,
#nanjing,
#lianyungang {
  position: absolute;
  font-size: 0.7rem;
  width: 6rem;
  height: 1.5rem;
  z-index: 3;
} */
</style>
