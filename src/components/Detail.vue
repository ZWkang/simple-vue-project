<template>
    
    <div>
      <v-loading :isLoading="!loading"></v-loading>
	<div class="detailbox" v-show="loading">
		<div class="detailtitle">
			<h2>{{ art.title }}
				<span class="collection" @click="is_collection">{{ collection.title }}</span>
			</h2>
						
			<div class="detailinfo">
				<span>发布于{{ getLastTime(art.create_at)}}</span>
				<span><router-link :to="{ name: 'self', params: {loginname: art.author}}">作者{{art.author}}</router-link></span>
				<span>{{art.visitcount}}次浏览</span>
				<span>{{art.replycount}}次回复</span>
			</div>
		</div>
		<div class="detailcontent" v-html="art.contens">
		</div>
			<div class="detailreplies">
			<div class="repliescount">共有<span>{{ this.art.replycount}}</span>条回复</div>
			<ul>
				<li v-for="(item,index) in art.reply">
					<div class="author_content">
                          <router-link :to="{ name: 'self', params: {loginname: item.author.loginname}}">
                          <img :src="item.author.avatar_url" alt="">
                          <span>{{ item.author.loginname}}</span>
                          </router-link>

						<span class="re-time">{{index+1}}楼 {{getLastTime(item.create_at)}}</span>
						<div class="replyhandle">
							<em class="upbtn"  @click="likeclick(item.id, index)" :class="{'islike':item.is_uped}">{{is_up(item.is_uped)}}</em>
							<em class="deletebtn" v-if="loginname === item.author.loginname" >删</em>
							<em class="replybtn">回</em>
						</div>
					</div>
					<div class="replies">
						<div class="repliescontent" v-html="item.content">
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
  </div>
</template>
<style lang="scss">
.detailbox{
	padding: 10px 10px;
	border-radius: 10px;
	background: #fff;
	border:1px solid #ccc;
	margin: 0 2px;
    overflow:hidden;
	.detailtitle{
        margin-bottom:5px;
        padding: 5px 0px;
		h2{
			font-size: 20px;
			font-weight: 700;
             margin-left:6px;
			.collection{
                  cursor:pointer;
				display: inline-block;
				background-color: #00b0f0;
				font-size: 12px;
				border-radius: 2px;
				padding: 3px 5px;
				float:right;
                  box-shadow:1px 1px #000;
			}
		}
		.detailinfo{
			display: flex;
			margin-top:10px;
			span{
				flex:1;
				display:block;
				font-size:12px;
				color: #aaa;
				text-align:center;
				text-overflow:hidden;
			}
             span:nth-child(4n+2),span:nth-child(4n+1){
                flex:2;
             }
             span:nth-child(4n+2){
              a{
                color:#aaa;
                text-decoration:none;
              }
              
             }
		}
	}
	.detailcontent{
         width: 100%;
		margin:0 0px;
		border-top:1px #000 solid;
		font-size: 15px;
		line-height: 23px;
         padding: 10px 0;
         border-bottom: 1px #000 solid;
         h1{
          font-size: 32px;
          margin: 10px 0;
         }
         blockquote{
          font-weight:700;
         }
         h2{
          font-size: 26px;
          margin: 10px 0;
          font-weight:700;
         }
         p{
          font-size:15px;
          line-height:1.7rem;
         }
         img{
          width:100%;
          margin:0 auto;
          height: auto;
         }
         table{
          padding: 0;
          border-spacing: 0;
          border-collapse: collapse;
          max-width: 100%;
          word-wrap:break-word;
          thead{
            max-width: 100%;
          }
          tbody{
            max-width: 100%;
            display: table-row-group;
            vertical-align: middle;
            border-color: inherit;
          }
          tr{
            max-width: 100%;
            margin:0 ;
            padding:0;
            background-color:#fff;
            border-top: 1px solid #ccc;
            th{
              border: 1px solid #ccc;
              text-align: left;
              margin: 0;
              padding: 6px 13px;
            }
            td{
              border: 1px solid #ccc;
              text-align: left;
              margin: 0;
              padding: 6px 13px;
            }
          }
         }
	}
	.detailreplies{
		width: 100%;
		margin-botton: 20px;
         .repliescount{
            font-size: 20px;
            padding: 15px 0;
         }
		li{
			padding:10px;
			border-top:1px solid #f0f0f0;
			.author_content{
				overflow: hidden;
				position : relative;
                  margin-top:10px;
				img,span {
					float : left;
					display:inline-block;
				}
                  .re-time{
                    color: #08c;
                    font-size:14px;
                  }
				span{
					margin-left: 10px;
					line-height: 2rem;
				}
				img{
					width: 30px;
					height: 30px;
				}
				.replyhandle {
					position: absolute;
					right: 0;
					top: 3px;
                      
					em{
                          cursor: pointer;
						padding: 3px;
						color: #fff;
                          font-size:14px;
                          line-height:16px;
						border-radius: 2px;
					}
					.upbtn{
						background-color: #A1AFC9;
					}
					.deletebtn{
						background-color: #DD4F43;
					}
					.replybtn{
						background-color: #FFCE42;
					}
                      .isup{
                        background-color:#08bd01;
                      }
                      .islike{
                        background-color: #EB3F2F;
                      }
				}

			}
			.replies{
				margin-top: 10px;
                  img{
                    width:100%;
                    height:auto;
                  }
				.repliescontent{
					background-color: #f0f0f0;
					padding: 6px 5px;
					border-radius: 8px;
                      position:relative;
                      font-size:14px;
                      line-height:1.5rem;
                      letter-spacing:2px;
                      font-weight:700;
                      word-wrap:break-word;
                      &:after{
                        border-width:0.5rem;
                        border-style: solid;
                        border-color: transparent transparent #f1f1f1 transparent;
                        content:' ';
                        position: absolute;
                        top:-1rem;
                        left:0.3rem;
                      }
				}
			}
		}
	}
}
</style>
<script>
import axios from 'axios'
import loadings from '@/components/loading'
export default {
  data () {
    return {
      loading: false,
      art: {
        title: 'ZWkang',
        author: 'ZWkang',
        replycount: '5',
        visitcount: '',
        content: '',
        reply: [],
        flag: false,
        contens: '',
        loginname: '',
        create_at: null
      },
      topid: '',
      collection: {
        'is': false,
        'title': '收藏'
      },
      replies: [],
      loginname: ''
    }
  },
  components: {
    'v-loading': loadings
  },
  props: {
    title: String
  },
  methods: {
    is_up: function (bool) {
      if (bool) {
        return '已赞'
      }
      return '赞'
    },
    likeclick: function (replyid, index) {
      if (this.isLogin) {
        const param = {
          'accesstoken': this.$store.getters.loginstate.accesstoken
        }
        axios.post('https://cnodejs.org/api/v1/reply/' + replyid + '/ups', param).then((response) => {
          const rpdata = response.data
          if (rpdata.action === 'up') {
            this.art.reply[index].is_uped = true
          } else {
            this.art.reply[index].is_uped = false
          }
        }, (e) => {
          console.log(e)
        })
      }
    },
    is_collection: function () {
      if (this.isLogin) {
        if (!this.collection.is) {
          const param = {
            'accesstoken': this.$store.getters.loginstate.accesstoken,
            'topic_id': this.topid
          }
          // console.log(param)
          axios.post('https://cnodejs.org/api/v1/topic_collect/collect', param).then((response) => {
            this.collection.is = true
            this.collection.title = '已收藏'
          }, (e) => {
            console.log(e)
          })
        } else {
          const param = {
            'accesstoken': this.$store.getters.loginstate.accesstoken,
            'topic_id': this.topid
          }
          axios.post('https://cnodejs.org/api/v1/topic_collect/de_collect', param).then((response) => {
            this.collection.is = false
            this.collection.title = '收藏'
          }, (e) => {
            console.log(e)
          })
        }
      }
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
    }
  },
  mounted: function () {
    const topic = this.$route.params.id
    axios.get('https://cnodejs.org/api/v1/topic/' + topic + '?accesstoken=' + this.$store.getters.loginstate.accesstoken).then((response) => {
      const data = response.data.data
      this.art.contens = data.content
      this.art.title = data.title
      this.art.visitcount = data.visit_count
      this.art.replycount = data.reply_count
      this.art.reply = data.replies
      this.art.replycount = data.replies.length
      this.art.author = data.author.loginname
      this.art.create_at = data.create_at
      this.loading = !this.loading
      this.topid = this.$route.params.id
    }, (e) => {
      console.log(e)
    })
    this.loginname = this.$store.getters.loginstate.loginname
    if (this.isLogin) {
      axios.get('https://cnodejs.org/api/v1/topic_collect/' + this.loginname).then((response) => {
        const cdata = response.data
        for (let i of cdata.data) {
          if (i['id'] === topic) {
            this.collection.is = true
            this.collection.title = '已收藏'
          }
        }
      }, (e) => {
        console.log(e)
      })
    }
  },
  computed: {
    isLogin: function () {
      return this.$store.getters.getLoginState
    }
  }
}
</script>
