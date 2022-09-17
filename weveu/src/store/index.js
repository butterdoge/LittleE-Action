import Vue from 'vue'
import Vuex from 'vuex'
import data from '../../public/data.json'
import data2 from '../../public/updata.json'
Vue.use(Vuex)

export default new Vuex.Store({
  // ...data存储的是各个城市的信息，userInfo存储的是全局用户信息，别的都是控制页面渲染的逻辑开关。
  state: 
  {
    videofinished:false,
    ...data,
    isQuizPage:false,
    updata:{...data2},
    userInfo:{
      school:null,
      city:null,
      name:null,
      contact:null,
    }
  },
  mutations: {
    // State是视频结束标志，Quiz是切换两个页面，用于v-if。
    changeStateTo0:(state)=>{
      state.videofinished=false;
    },
    changeStateTo1:(state)=>{
      state.videofinished=true;
    },
    changeQuizTo1:(state)=>{
      state.isQuizPage=true;
    },
    changeQuizTo0:(state)=>{
      state.isQuizPage=false;
    },
    // 修改全局存储的用户信息对象。
    changeUserInfor:(state,payload)=>{
      state.userInfo.school=payload.school;
      state.userInfo.city=payload.city;
      state.userInfo.name=payload.name;
      state.userInfo.contact=payload.contact;
    }
  },
  // 用来返回指定城市的信息细则。
  getters:{
    cityInfo:(state)=>(cityName)=>{
      return state[cityName];
    },
    getVideoState:(state)=>{
      return state.videofinished;
    },
    getQuizState:(state)=>{
      return state.isQuizPage;
    },
    getUpdata:(state)=>{
      return state.updata;
    },
    getUserInfo:(state)=>{
      return state.userInfo;
    }
  },
  actions: {
  },
  modules: {
  }
})
