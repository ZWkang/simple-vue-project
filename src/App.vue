<template>
  <div id="app">
  	<v-header></v-header>
    	<router-view></router-view>
	<v-top></v-top>
  </div>
</template>

<script>
import header from '@/components/Headers'
import backtop from '@/components/backtop'
export default {
  name: 'app',
  components: {
    'v-header': header,
    'v-top': backtop
  }
}
</script>

<style>
@import url('./assets/reset.css');
#app {
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
