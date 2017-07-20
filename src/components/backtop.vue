<template>
	<div class="totop" v-show="showtop" @click="backtop"></div>
</template>
<style lang="scss">
	.totop {
    animation: ColorChange 10s ease-in 2s infinite;
	  position: fixed;
	  width: 40px;
	  height: 40px;
	  right: 15px;
	  bottom: 4rem;
	  background-color: red;
	  border-radius: 10px;
	  z-index: 122;
  }
  @keyframes ColorChange {
    0%{
      background-color: purple;
    }
    25%{
      background-color: yellow;
    }
    50%{
      background-color: orange;
    }
    75%{
      background-color: orange;
    }
    100%{
      background-color: purple;
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
