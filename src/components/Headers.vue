<template>

  <div class="header">
    <span class="header-icon" v-if="!backbtn" v-on:click="changeshow">♥</span>
    <span class="header-icon" v-if="backbtn" v-on:click="goback">←</span>
    <h4>{{ title }}</h4>
    <v-slide v-bind:show="showmenu"></v-slide>
    <div class="slide-mask" v-if="showmenu" v-on:click.stop.prevent="changeshow"></div>
    <span class="header-message-tips" v-if="tipsnumber"></span>
  </div>

</template>

<style lang="scss" scoped>
.header {
  border-bottom: 2px solid #e1e1e1;
  width: 100%;
  height: 3rem;
  z-index: 111;
  .header-icon {
    font-size: 2rem;
    z-index: 10;
    position: absolute;
    margin: 5px 10px;
    top: 0;
    left: 0;
  }
  .header-message-tips {
    font-size: 2rem;
    z-index: 10;
    position: absolute;
    margin: 5px 10px;
    top: 0;
    right: 0;
  }
  h4 {
    text-align: center;
    font-size: 2rem;
    line-height: 2.5rem;
  }
  .slide-mask {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 98;
    width: 100%;
    height: 100%;
    background-color: rgba(221, 240, 237, 0.5);
  }
  .show-mask {
    display: block;
  }
}

</style>
<script>
import Slide from '@/components/slide'
export default {
  data () {
    return {
      showmenu: false,
      tipsnumber: 0
    }
  },
  computed: {
    isLogined: function () {
      return this.$store.getters.getLoginState
    },
    title: function () {
      if (this.$route.name === 'list') {
        // console.log(this.$route.params.artcle)
        const artcles = this.$route.params.artcle
        if (artcles === 'all') {
          return '全部'
        } else if (artcles === 'ask') {
          return '问答'
        } else if (artcles === 'share') {
          return '分享'
        } else if (artcles === 'good') {
          return '精华'
        } else if (artcles === 'job') {
          return '招聘'
        } else {
          return 'cnodejs'
        }
      } else {
        return 'cnodejs'
      }
    },
    backbtn: function () {
      // console.log(this.$route.name)
      const rname = this.$route.name
      if (rname !== 'list' && rname !== 'lists' && this.$route.name !== 'login' && this.$route.name !== 'home') {
        return true
      }
      return false
    }
  },
  mounted: function () {
  },
  components: {
    'v-slide': Slide
  },
  methods: {
    changeshow: function () {
      if (this.showmenu) {
        this.showmenu = false
      } else {
        this.showmenu = true
      }
    },
    goback: function () {
      this.$router.go(-1)
    }
  }
}
</script>
