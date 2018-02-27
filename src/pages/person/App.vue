<template>
  <div id="person">
   个人页面
   
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Person',
  created(){
    console.log(axios)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
