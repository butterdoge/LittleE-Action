<template>
  <!-- <hello-world /> -->
  <div id="box" class="pt-14">
    <v-stepper v-model="e1" width="85%" color="#be1f30" elevation="10">
      <!-- 答题的头部进度条 -->
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1"> 第一题 </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2"> 第二题 </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3" :complete="e1 > 3"> 第三题 </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step step="4" :complete="e1 > 4"> 第四题 </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step step="5" :complete="e1 > 5"> 第五题 </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step step="6"> 总结 </v-stepper-step>
      </v-stepper-header>

      <!-- 答题正文内容，内部是卡片形式 -->
      <v-stepper-items>
        <v-stepper-content v-for="n in 4" :step="n" :key="n">
          <v-chip class="time" color="primary" :style="timelocation">当前用时:{{counter}}秒</v-chip>
          <v-card class="mb-12" color="#fbecde" height="400px">
            <v-card-title>第{{ n }}题题目：</v-card-title>
            <v-card-text>
              {{ infoDetail.quiz[n - 1].quizContent }}
            </v-card-text>
            <v-radio-group v-model="choose[n - 1]" column class="px-4">
              <v-radio
                :label="infoDetail.quiz[n - 1].choiceA"
                color="red darken-3"
                value="A"
              ></v-radio>

              <v-radio
                :label="infoDetail.quiz[n - 1].choiceB"
                color="indigo darken-3"
                value="B"
              ></v-radio>
              <v-radio
                :label="infoDetail.quiz[n - 1].choiceC"
                color="orange darken-3"
                value="C"
              ></v-radio>
              <v-radio
                :label="infoDetail.quiz[n - 1].choiceD"
                value="D"
              ></v-radio>
            </v-radio-group>

            <v-snackbar v-model="snackbar" :timeout="2000" centered>
              {{ returnValue }}

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="blue"
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
                >
                  关闭
                </v-btn>
              </template>
            </v-snackbar>
          </v-card>

          <v-btn color="primary" @click="nextQuiz"> 提交答案 </v-btn>

          <!-- <v-btn text> Cancel </v-btn> -->
        </v-stepper-content>

        <v-stepper-content step="5">
          <v-chip class="time" color="primary" :style="timelocation">当前用时:{{counter}}秒</v-chip>
          <v-card class="mb-12" color="#fbecde" height="400px">
            <v-card-title>第5题题目：</v-card-title>
            <v-card-text>
              {{ infoDetail.quiz[4].quizContent }}
            </v-card-text>
            <v-radio-group v-model="choose[4]" column class="px-4">
              <v-radio
                :label="infoDetail.quiz[4].choiceA"
                color="red darken-3"
                value="A"
              ></v-radio>

              <v-radio
                :label="infoDetail.quiz[4].choiceB"
                color="indigo darken-3"
                value="B"
              ></v-radio>
              <v-radio
                :label="infoDetail.quiz[4].choiceC"
                color="orange darken-3"
                value="C"
              ></v-radio>
              <v-radio
                :label="infoDetail.quiz[4].choiceD"
                value="D"
              ></v-radio>
            </v-radio-group>

            <v-snackbar v-model="snackbar" :timeout="2000" centered>
              {{ returnValue }}

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="blue"
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
                >
                  关闭
                </v-btn>
              </template>
            </v-snackbar>
          </v-card>

          <v-btn color="primary" @click="submit"> 提交答案 </v-btn>

          <!-- <v-btn text> Cancel </v-btn> -->
        </v-stepper-content>

        <v-stepper-content step="6">
          <v-card class="mb-12" color="#fbecde" height="400px" style="overflow:auto">
            <v-card-title>我的学习成绩单</v-card-title>
            <v-card-subtitle>注意，请完成所有城市答题后再一同提交！</v-card-subtitle>
            <v-card-text >
              恭喜你完成了本次学习。 <br />
              当前界面答题总共用时{{this.counter}}秒，
              已完成的学习情况如下:<br /><br/><br/>
              <!-- 在当前{{ infoDetail.name }}板块的学习中，你答对了{{
                answer_right
              }}道题。<br /> -->

              <div v-for="(value, name) in grade" :key="value" >
                {{ chineseName(name) }}：你答对了{{ value.score }}/5题,用时{{value.time}}秒。
              </div>
              <v-snackbar v-model="submitBar" :timeout="2000" centered>
                答卷提交成功。
              <template v-slot:action="{ attrs }">
                <v-btn
                  color="blue"
                  text
                  v-bind="attrs"
                  @click="submitBar = false"
                >
                  关闭
                </v-btn>
              </template>
            </v-snackbar>
            </v-card-text>
          </v-card>

          <v-btn color="primary" @click="$vuetify.goTo(10, {})"> 返回寻迹 </v-btn>
          <v-btn color="primary" @click="sendupdata" class="ml-3"> 提交成绩</v-btn>
<!-- 提交部分 -->

          <!-- <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          class="ml-3"
        >
          提交成绩单
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">提交信息</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
             
              

              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="Object.keys(updataInfo)"
                  label="就读城市"
                  v-model="userCity"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="currentUni"
                  label="院校名称"
                  required
                  v-model="userSchool"
                ></v-select>
              </v-col>

               <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="填写你的姓名信息"
                  required
                  v-model="userName"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>暂不支持港澳台地区院校</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            取消
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="sendupdata"
          >
            上传
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

          <!-- <v-btn text> Cancel </v-btn> -->
        </v-stepper-content>
        <!-- 
        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>

          <v-btn text> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 1"> Continue </v-btn>

          <v-btn text> Cancel </v-btn>
        </v-stepper-content> -->
      </v-stepper-items>
    </v-stepper>
    <div
      id="shower"
      class="rounded-circle"
      :style="{ width: ballsize, height: ballsize, top: top }"
    >
      <div id="title">
        <h2 :style="{ fontSize: h2size }">智慧答题</h2>
        <p id="subtit" :style="{ fontSize: headsize }">你知道吗？</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "Quiz",
  data() {
    return {
      e1: 1,
      quiz1: 1,
      choose: [0, 0, 0, 0, 0],
      answer_right: 0,
      snackbar: false,
      submitBar:false,
      dialog: false,
      grade: {
        // shijunyuan: 0,
        // suqian: 0,
        // changzhou: 0,
        // taizhou: 0,
        // zhenjiang: 0,
        // lianyungang: 0,
        // suzhou: 0,
        // wuxi: 0,
        // yangzhou: 0,
        // huaian: 0,
        // yancheng: 0,
        // nantong: 0,
        // nanjing: 0,
        // xvzhou:0
      },
      countFlag:0,
      counter:0,
      userCity:null,
      userSchool:null,
      userName:null,
      // map:new Map(["shijunyuan",'时钧园'])
    };
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to, from, next);
    localStorage.setItem('grade',JSON.stringify(this.grade))
    next();
    this.e1 = 1;
    this.choose = [0, 0, 0, 0, 0];
    // this.grade[from.params.cityname] = this.answer_right; 跳转时不需要修改成绩，而是改为submit触发
    this.answer_right = 0;
    this.$store.commit("changeQuizTo0")
    this.counter=0;
  },
  methods: {
    // 该方法负责收集网页内数据提交到服务器。
    sendupdata(){
      // 用户的信息存储在全局的store内部。
      var info=this.$store.getters.getUserInfo;
      var data={
        city:info.city,
        school:info.school,
        name:info.name,
        contact:info.contact,
        score:this.allScore,
        time:this.alltime,
        amount:this.amount,     
      };
      console.log('发送出去的信息如下：');
      console.log(data);
      //  axios.post("http://45.82.79.207:3000/api/insert",qs.stringify(data)).then(()=>{
      axios.post("http://45.82.79.207:3000/api/insert",qs.stringify(data)).then(()=>{
        console.log('nothing happened');
      });
      // this.dialog=false;
      this.submitBar=true;
    },
    nextQuiz() {
      if (this.choose[this.e1 - 1] == 0) {
        // alert("请选择答案。");
        this.snackbar = true;
      }
      else if(this.$store.getters.getVideoState==false){
        this.snackbar=true;
      }
      else {
        if (
          this.choose[this.e1 - 1] == this.infoDetail.quiz[this.e1 - 1].answer
        ) {
          //   alert("恭喜你答对了。");
          this.answer_right++;
          this.snackbar = true;
          setTimeout(this.nexte1, 2000);
        } else {
          //   alert(
          //     `错误，本题的答案是${this.infoDetail.quiz[this.e1 - 1].answer}`
          //   );
          this.snackbar = true;
          setTimeout(this.nexte1, 2000);
        }
      }
    },
    nexte1() {
      this.e1++;
    },
    chineseName(en) {
      let map1 = new Map([
        ["shijunyuan", "时钧园"],
        ["wuxi", "无锡"],
        ["lianyungang", "连云港"],
        ["taizhou", "泰州"],
        ["zhenjiang", "镇江"],
        ["nanjing", "南京"],
        ["changzhou", "常州"],
        ["suzhou", "苏州"],
        ["yangzhou", "扬州"],
        ["nantong", "南通"],
        ["yancheng", "盐城"],
        ["huaian", "淮安"],
        ["shijunyuan", "时钧园"],
        ["xvzhou","徐州"],
        ["suqian","宿迁"]
      ]);
      return map1.get(en);
    },
    onceAgain() {
      this.e1 = 1;
      this.answer_right = 0;
      this.counter=0;
      this.countFlag=setInterval(() => {
      this.counter++
    }, 1000)
    },
    submit(){
      if (this.choose[this.e1 - 1] == 0) {
        this.snackbar = true;
        // 没有选择任何选项则触发
      } else {
        if (
          this.choose[this.e1 - 1] == this.infoDetail.quiz[this.e1 - 1].answer
        ) {
          this.answer_right++;
          this.snackbar = true;
          // 回答正确，进入最后页
          // this.grade[this.$route.params.cityname] = this.answer_right;
          this.grade[this.$route.params.cityname] = {score:this.answer_right,time:this.counter}
          setTimeout(this.nexte1, 2000);
          clearInterval(this.countFlag);
        } else {
          // 回答错误，进入最后页
          this.snackbar = true;
          // this.grade[this.$route.params.cityname] = this.answer_right;
           this.grade[this.$route.params.cityname] = {score:this.answer_right,time:this.counter}
          // 修改全局的成绩单。
          setTimeout(this.nexte1, 2000);
          clearInterval(this.countFlag);
        }
      }
    },
  },
  computed: {
    alltime(){
      var time=0;
      for (let city in this.grade){
        time+=this.grade[city].time;
      }
      return time;
    },
    allScore(){
      var score=0;
      for (let city in this.grade){
        score+=this.grade[city].score;
      }
      return score;
    },
    amount(){
      var amount=0
       for (let city in this.grade){
        amount+=5;
        console.log(`这是一条无用信息${city}`)
      }
      return amount;
    },
    currentUni(){
      if(this.userCity!=null){
        return this.updataInfo[this.userCity];
      }
      else{
        return ['请选择当前城市'];
      }
    },
    updataInfo() {
      return this.$store.getters.getUpdata;
    },


    // 以下全都是动态css样式。
    infoDetail() {
      return this.$store.getters.cityInfo(this.$route.params.cityname);
    },
    ballsize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "10rem";
      }
      return "13rem";
    },
    h2size() {
      return this.$vuetify.breakpoint.xsOnly ? "1.3em" : "1.5em";
    },
    headsize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "1rem";
      }
      return "1.2rem";
    },
    top() {
      return this.$vuetify.breakpoint.xsOnly ? "-50px" : "-60px";
    },
    timelocation(){
      if(this.$vuetify.breakpoint.xsOnly){
        return{
          left:'56%',
          top:'8%',
          fontSize:'1rem',
          width: '6.8rem',
  /* font-size:1.2rem; */
          height: '1.8rem'
        }
      }
      else{
        return{
        left:'85%',
        top:'8%',
        fontSize:'1.2rem',
        width: '9rem',
  /* font-size:1.2rem; */
        height: '1.8rem'
      }
      }
      
    },
    returnValue() {
      if(this.$store.getters.getVideoState==false){
        return "请先看完视频再完成答题~"
      }
      if (this.e1 == 6) {
        return "结束";
      }
      if (this.choose[this.e1 - 1] == 0) {
        return "请选择答案。";
      } else {
        if (
          this.choose[this.e1 - 1] == this.infoDetail.quiz[this.e1 - 1].answer
        ) {
          return "恭喜你答对了。";
        } else {
          return `错误，本题的答案是${
            this.infoDetail.quiz[this.e1 - 1].answer
          }`;
        }
      }
    },
  },
  mounted() {
    this.counter=0;
    this.countFlag=setInterval(() => {
      this.counter++
    }, 1000)
    this.grade=(localStorage.getItem('grade')?JSON.parse(localStorage.getItem('grade')):{});
  }
};
</script>

<style scoped>
.time{
  position: absolute;
  width: 8.5rem;
  /* font-size:1.2rem; */
  height: 1.8rem;
  z-index: 5;
  /* left:45%;
  top:8%; */
}
#subtit {
  text-align: center;
  font-size: 1.1rem;
}
#box {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: auto;
}
.v-stepper__header {
  background-color: #de1c31;
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
  top: -10%;
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
h2,
h1 {
  color: #fbecde;
  text-align: center;
}
.v-card__text{
  font-size:1.1rem;
}
</style>