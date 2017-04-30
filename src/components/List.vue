<template>
  <div>
    <div class="artlist"> 
             <router-link v-for="item in artcleList" :to="{name:'detail',params:{id:item.id}}" :key="item.id" class="linkbtn">
      <div class="artlistCon" >
        <router-link :to="'/self/' + item.author.loginname">
        <div class="avatar">
          <img :src="item.author.avatar_url" alt="">
        </div>
        </router-link>
        <div class="art-inf">
          <em :class="{good : item.good, top : item.top}">
            {{gettab(item.tab, item.good, item.top)}}
          </em>
          <a class="title">{{item.title}}</a>
          <span class="rp-count">{{item.reply_count}}/{{item.visit_count}}</span>
          <span class="last-time">{{ getLastTime(item.create_at)}}</span>
        </div>
      </div>
<!--      <div class="loadingbox" v-show="showLoading">
        <div class="loading">loading........</div>
      </div> -->
              
            </router-link>
            <v-loading :isLoading="!scroll" :styles="stylea"></v-loading>
    </div>
    <v-top></v-top>
  </div>
</template>
<style lang="scss">
.artlist{
  overflow: hidden;
  margin: 0 auto;
  .linkbtn{
    display:block;
  }
  .artlistCon{
    box-sizing:border-box;
    overflow:hidden;
    width: 100%;
    display: inline-block;
    width: 100%;
    padding: 10px;
    background: #fff;
    border: 1px solid #e1e1e1;
    position:relative;
    .avatar{
      display: inline-block;
      position: absolute;
      left: 10px;
      top: 10px;
      width: 2rem;
      height: 2rem;
      z-index: 5;
      img{
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .art-inf{
      .title{
        font-weight:600;
      }
      position: relative;
      width: 80%;
      height: 100%;
      padding-left: 2.5rem;
      a{
        display: inline-block;
        overflow: hidden;
        width: 80%;
        height: 1.2rem;
        font-size: 1rem;
        line-height: 1.2rem;
        white-space: nowrap;
        text-overflow:ellipsis;
      }
      span,em{
        display: inline-block;
      }
      em{
        vertical-align:top;
        padding:4px 4px;
        background: #e5e5e5;
        border-radius: 3px;
        color: #999;
        font-size: 0.8rem;
      }
      .good,.top{
        background: #80bd01;
        color: #fff;
      }
      .rp-count{
        vertical-align:left;
        margin-left: 12%;
        font-size: 13px;
        padding: 2px 4px;
      }
      .last-time{
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 13px;
        padding: 2px 0px;
      }
    }
  }
  .loadingbox{
    position:relative;
    width1:100%;
    height:40px;
    .loading{
      width:100%;
      text-align:center;
    }
  }
}
</style>
<script>
import axios from 'axios'
import loading from '@/components/loading'
import debounce from '../utils.js'
import backtop from '@/components/backtop'
export default {
  data () {
    return {
      Index: 0,
      scroll: false,
      searchKey: {
        'page': 1,
        'limit': 20
      },
      stylea: {
        'width': '40px',
        'height': '40px'
      },
      artcleList: [],
      unfun: null
    }
  },
  components: {
    'v-loading': loading,
    'v-top': backtop
  },
  mounted: function () {
    this.unfun = debounce(this.scrollAction, 1000)
    console.log('123')
    this.getList()
    window.addEventListener('scroll', this.unfun, false)
  },
  watch: {
    '$route': 'getList'
  },
  methods: {
    fixrouter: function (str) {
      const artlist = ['all', 'ask', 'share', 'job', 'good']
      if (!(artlist.find((value) => { return value === str }))) {
        str = 'all'
      }
      return str
    },
    getList: function () {
      this.scroll = false
      this.searchKey.tab = this.fixrouter(this.$route.params.artcle) || 'all'
      let requestdata = this.searchKey
      axios.get('https://cnodejs.org/api/v1/topics', {
        params: requestdata
      }).then((response) => {
        this.artcleList = response.data['data']
        this.scroll = true
        this.showLoading = false
      }, (err) => {
        console.log(err)
      })
    },
    bulidsss: function (str) {
      console.log(str)
      return str
    },
    gettab: function (tab, good, top) {
      let str = ''
      if (top) {
        str = '置顶'
      } else if (good) {
        str = '精华'
      } else {
        switch (tab) {
          case 'share':
            str = '分享'
            break
          case 'ask' :
            str = '问答'
            break
          case 'job' :
            str = '招聘'
            break
          default :
            str = '全部'
            break
        }
      }
      return str
    },
    getLastTime: function (creatTime) {
      let oldtime = new Date(creatTime)
      let newtime = (new Date() - oldtime) / 1000
      let month = Math.floor(newtime / 3600 / 24 / 30)
      let day = Math.floor(newtime / 3600 / 24)
      let hours = Math.floor(newtime / 3600)
      let mins = Math.floor(newtime / 60)
      let str = ''
      if (hours === 0) {
        if (mins <= 3) {
          str = '刚刚'
        } else {
          str = mins + '分钟前'
        }
      } else if (day === 0) {
        str = hours + '小时前'
      } else if (month === 0) {
        str = day + '天前'
      } else {
        str = month + '月前'
      }
      return str
    },
    scrollAction: function () {
      if (this.scroll) {
        let totalheight = parseFloat(window.innerHeight) + parseFloat(window.scrollY)
        if (document.body.clientHeight <= totalheight + 10) {
          this.scroll = false
          this.searchKey.limit += 20
          this.showLoading = true
          setTimeout(() => {
            this.getList()
          }, 2000)
        }
      }
    }
  },
  beforeDestory: function () {
    window.removeEventListener('scroll', this.unfun, false)
  }
}
</script>
