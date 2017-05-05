<template>
<div>
	<div class="usermessage">
		<div class="userinfo">
			<div class="usermessage-title">
				个人信息
			</div>
			<div class="userinfobox">
				<div class="useravatar">
					<img :src="art.avatar_url" alt="">
				</div>
				<div class="userbase">
					<p class="name">{{art.loginname}}</p>

					<span>积分：{{art.score}}</span>
					<span>注册时间：{{art.createday}}</span>
				</div>
			</div>
		</div>
		<div class="usertopics">
			<div class="usermessage-title">
				创建主题
			</div>
			<div class="usertopicsbox">
				<div class="topicsitem" v-for="item in recents">
					<router-link :to="{ name: 'self', params: { loginname : item.author.loginname }}" class="avatar">
						<img :src="item.author.avatar_url" alt="">
					</router-link>
					<div class="art-inf">
						<router-link :to="{ name: 'detail', params: { id : item.id}}" class="title">{{item.title}}</router-link>
						<span class="last-time">{{ getLastTime(item.last_reply_at) }}</span>
					</div>
				</div>
				<div class="nodata" v-if="!recents">
					<!-- <div class="nodating"></div> -->
					<h2>还没有创建主题</h2>
				</div>
			</div>
		</div>
		<div class="userreplies">
			<div class="usermessage-title">
				参与主题
			</div>
			<div class="userrepliesbox">
				<div class="userrepliesitem" v-for="item in replies">
					<router-link :to="{ name: 'self', params: { loginname : item.author.loginname }}" class="avatar">
						<img :src="item.author.avatar_url" alt="">
					</router-link>
					<div class="art-inf">
						<router-link :to="{ name: 'detail', params: { id : item.id}}" class="title">{{item.title}}</router-link>
						<span class="last-time">{{ getLastTime(item.last_reply_at) }}</span>
					</div>
				</div>
				<div class="nodata" v-if="!replies">
					<!-- <div class="nodating"></div> -->
					<h2>还没有参与主题</h2>
				</div>
			</div>
		</div>
		<div class="usercollection">
			<div class="usermessage-title">
				收藏主题
			</div>
			<div class="usercollectionbox">
				<div class="usercollectionitem" v-for="item in collections">
					<router-link :to="{ name: 'self', params: { loginname : item.author.loginname }}" class="avatar">
						<img :src="item.author.avatar_url" alt="">
					</router-link>
					<div class="art-inf">
						<router-link :to="{ name: 'detail', params: { id : item.id}}" class="title">{{item.title}}</router-link>
						<span class="last-time">{{ getLastTime(item.last_reply_at) }}</span>
					</div>
				</div>
				<div class="nodata" v-if="!collections">
					<!-- <div class="nodating"></div> -->
					<h2>还没有收藏主题</h2>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<style lang="scss">
@mixin basestyle{
	position: relative;
	padding: 10px;
	background-color:#fff;
	border-bottom:1px solid #e1e1e1;
	overflow:hidden;
	.avatar{
		display:block;
		float:left;
		width:2rem;
		height:2rem;
		img{
			width:100%;
			height:100%;
		}
	}
	.art-inf{
		position:relative;
		float:left;
		width:86%;
		height:2rem;
		line-height:2rem;
		margin-left:15px;
		.title{
				
			display:inline-block;
			overflow:hidden;
			width:80%;
			height:2rem;
			color:#000;
			font-size:1.2rem;
			line-height:2rem;
			white-space:nowrap;
			text-overflow: ellipsis;
			text-decoration:none;
		}
		.last-time{
			position:absolute;
			right:0;
			bottom:0;
			font-size:12px;
			padding:2px 4px;
		}
	}
}
.usermessage{
	overflow: hidden;
	margin: 0 5px;
	.userinfobox{
		padding: 10px 0;
		border: 2px solid #ccc;
		border-top:0;
		.useravatar{
			margin: 0 auto;
			img{
				display: block;
				width: 80px;
				height: 80px;
				margin: 0 auto;
				border-radius: 40px;
			}
		}
		.userbase{
			color: #333;
			text-align: center;
			.name{
				line-height: 40px;
				font-size: 22px;
			}
			span{
				margin-right: 20px;
				font-size: 16px;
			}
		}
	}
	.usermessage-title{
		margin-top:5px;
		border: 2px solid #ccc;
		border-radius: 8px 8px 0 0 ;
		background-color: #fff;
		padding: 10px;
		font-size: 16px;
		color: green;
		font-weight:600;
	}
	.usertopicsbox{
		border:2px solid #e1e1e1;
		border-top:0;
		.topicsitem{
			@include basestyle;
		}
	}
	.userreplies{
		.userrepliesbox{
			border:2px solid #e1e1e1;
			border-top:0;
			.userrepliesitem{
				@include basestyle;
			}
		}
	}
	.usercollection{
		.usercollectionbox{
			border:2px solid #e1e1e1;
			border-top:0;
			.usercollectionitem{
				@include basestyle;
			}
		}
	}
	.nodata{
		position:relative;
		text-align:center;
		padding:20px 0;
		h2{
			font-size:40px;
		}
	}
}

</style>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      art: {
        'loginname': '',
        'avatar_url': '',
        'createday': '',
        'score': ''
      },
      replies: [],
      collections: [],
      recents: []
    }
  },
  created: function () {
    this.getdata()
  },
  watch: {
    '$route': 'getdata'
  },
  compouted: {

  },
  methods: {
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
    getdata: function () {
      const username = this.$route.params.loginname
      // console.log(username)
      axios.get('https://cnodejs.org/api/v1/user/' + username).then((response) => {
        if (response.data.success) {
          // console.log(response)
          const datas = response.data
          this.art.loginname = datas.data.loginname
          this.art.avatar_url = datas.data.avatar_url
          this.art.createday = datas.data.create_at.substring(0, 10)
          this.art.score = datas.data.score
          this.replies = datas.data.recent_replies.length === 0 ? false : datas.data.recent_replies
          this.recents = datas.data.recent_topics.length === 0 ? false : datas.data.recent_topics
        }
      }, (e) => {
        console.log(e)
      })
      axios.get('https://cnodejs.org/api/v1/topic_collect/' + username).then((response) => {
        if (response.data.success) {
          this.collections = response.data.data.length === 0 ? false : response.data.data
        }
      }, (e) => {
        console.log(e)
      })
    }
  }
}
</script>
