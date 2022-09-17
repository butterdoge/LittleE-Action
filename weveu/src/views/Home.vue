<template>
  <!-- <hello-world /> -->
  <div id="box">
    <h3>一个空白展示页面</h3>
    <img src="https://iwiss.oss-cn-hangzhou.aliyuncs.com/pic/me.jpg" id="me" />
    <p style="padding:2rem">别的还没写，等待后续要求。</p>
  </div>
</template>

<script>
// import HelloWorld from '../components/HelloWorld'

// export default {
//   name: 'Home',

//   components: {
//     HelloWorld,
//   },
// }
</script>

<style scoped>
#me {
  width: 10rem;
  height: 10rem;
  border-radius: 30rem;
}
#box{
  display:flex;
  height:30rem;
  width:100%;
  flex-direction:column;
  justify-content: center;
  align-items:center;
  margin: auto;
}
</style>