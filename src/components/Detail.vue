<template>
    
    <div>
      <v-loading :isLoading="!loading"></v-loading>
	<div class="detailbox" v-show="loading">
		<div class="detailtitle">
			<h2>{{ art.title }}
				<span class="collection">{{ collection.title }}</span>
			</h2>
						
			<div class="detailinfo">
				<span>发布于{{ getLastTime(art.create_at)}}</span>
				<span>作者{{art.author}}</span>
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
                          <router-link :to="'/self/' + item.author.loginname">
                          <img :src="item.author.avatar_url" alt="">
                          <span>{{ item.author.loginname}}</span>
                          </router-link>

						<span class="re-time">{{index+1}}楼 {{getLastTime(item.create_at)}}</span>
						<div class="replyhandle">
							<em class="upbtn" :class="{'isup':item.is_uped}">{{is_up(item.is_uped)}}</em>
							<em class="deletebtn" v-if="loginname === item.author.loginname" >删</em>
							<em class="replybtn">回</em>
						</div>
					</div>
					<div class="repliescon">
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
				background-color: #08bd01;
				font-size: 12px;
				border-radius: 2px;
				padding: 3px 5px;
				float:right;
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
				}

			}
			.repliescon{
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
      collection: {
        'is': false,
        'title': '收藏'
      }
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
    countdays: function (number) {
    },
    docollection: function () {
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
    }, (e) => {
      console.log(e)
    })
    // axios.get('')
    this.loginname = this.$store.getters.loginstate.loginname
  },
  computed: {
    isLogin: function () {
      this.$store.getters
    }
  }
}
</script>
