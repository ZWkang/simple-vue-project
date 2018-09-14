<template>
	<div class="totop" v-show="showtop" @click="backtop">
    <img src="../assets/rocket.svg"/>
  </div>
</template>
<style lang="scss" scoped>
	.totop {
    animation: ColorChange 10s ease-in 2s infinite;
	  position: fixed;
	  width: 40px;
	  height: 40px;
	  right: 1rem;
	  bottom: 4rem;
	  z-index: 122;
    > img{
      width: 60px;
    }
  }
</style>
<script>
import debounce from '@/utils.js'
export default {
  data () {
    return {
      showtop: false,
      fun: null
    }
  },
  created: function () {
    this.fun = debounce(this.scrollEvent)
  },
  mounted: function () {
    window.addEventListener('scroll', this.fun, false)
  },
  methods: {
    backtop: function () {
      window.scroll(0, 0)
    },
    scrollEvent: function () {
      if (parseFloat(window.scrollY) > 150) {
        this.showtop = true
      } else {
        this.showtop = false
      }
    },
    destroyed: function () {
      window.removeEventListener('scroll', this.fun, false)
    }
  }
}
</script>
