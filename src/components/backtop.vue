<template>
	<div class="totop" v-show="showtop" @click="backtop"></div>
</template>
<style lang="scss">
	.totop{
		position: fixed;
		width:40px;
		height: 40px;
		right: 15px;
		bottom:4rem;
		background-color: black;
		border-radius:20px;
        z-index:122;
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
    beforeDestroy: function () {
      window.removeEventListener('scroll', this.fun, false)
    }
  }
}
</script>
