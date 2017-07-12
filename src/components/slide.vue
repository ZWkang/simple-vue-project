<template>

	<div class="slide">
		<div class="slide-item" :class="{'show-menu':show}">
			<router-link :to="{name: 'self', params: {loginname: loginname}}">
				<div class="user-info" v-show="loginstate">
					<img :src="userinfo.avatar_url" alt="">
				</div>
			</router-link>
			<div class="base" v-show="loginstate">
				<router-link :to="{name: 'self', params: {loginname: loginname}}">
					<p>{{userinfo.loginname}}</p>
				</router-link>
				<div class="baseinfo">
					<!-- <span>积分：{{userinfo}}</span> -->
					<!-- <span>2017年4月30日</span> -->
				</div>
			</div>
			<router-link :to="{name: 'login'}" class="gologin">
				<h2 v-if="!loginstate">登录</h2>
			</router-link>
	
			<ul>
				<li>
					<router-link :to="{name: 'list', params: {artcle: 'all'}}">全部</router-link>
				</li>
				<li>
					<router-link :to="{name: 'list', params: {artcle: 'good'}}">精华</router-link>
				</li>
				<li>
					<router-link :to="{name: 'list', params: {artcle: 'ask'}}">回答</router-link>
				</li>
				<li>
					<router-link :to="{name: 'list', params: {artcle: 'job'}}">招聘</router-link>
				</li>
				<li>
					<router-link :to="{name: 'list', params: {artcle: 'share'}}">分享</router-link>
				</li>
				<li v-if="loginstate">
					<router-link :to="{name: 'post'}">发布</router-link>
				</li>
				<li style="color:#555555">消息</li>
				<li v-if="loginstate" @click="logout">登出</li>
				<li>
					<router-link :to="{name: 'about'}">关于</router-link>
				</li>
			</ul>
		</div>
	</div>

</template>
<style lang="scss">
.slide{
	.slide-item{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		visibility: visible;
		width: 40%;
		border-radius:10px;
		border-bottom-left-radius: 0;
		border-top-left-radius: 0;
		background-color: #99CCFF;
		z-index:1001;
		transition:all 0.5s linear;
		transform :translateX(-100%);
		.user-info{
			overflow:hidden;
			width:100%;
			height: auto;
			text-align:center;
			margin:20px auto;
			img{
				max-width:80px;
				height:auto;
				margin: 0 auto;
				text-align:center;
				border-radius:40px;
			}

		}
		> .gologin{
				display:block;
				font-size:32px;
				text-align:center;
				margin:60px 0;
				text-decoration:none;
				color:black;
		}
		.base{

			p{
				text-align:center;
				font-size:24px;
			}
			.baseinfo{
				margin:20px auto;
				width:100%;
				display:flex;
				span:nth-child(2n+1){
					flex:1;
					font-size:12px;
					text-align:center;
				}
				span:nth-child(2n+2){
					flex:2;
					font-size:12px;
					text-align:center;
				}
			}

		}
		ul{
			width:80%;
			margin:100px auto 0;
			text-align:center;
			li{

				width:100%;
				font-size:18px;
				padding:10px 0;
				font-weight:600;
				border-bottom:1px solid #000;
				a{
					text-decoration:none;
					color:#111;
				}
			}
		}
	}
	.show-menu{
		transform :translateX(0%);
	}
	.show-mask{
		opacity:1;
	}
}
</style>
<script>
// import {mapState} from 'vuex'
export default {
  props: {
    show: {
      type: Boolean
    }
  },
  data () {
    return {
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('LOGOUT')
      this.$router.replace('/')
    }
  },
  computed: {
    loginstate () {
      return this.$store.getters.getLoginState
    },
    loginname () {
      return this.$store.getters.loginstate.loginname || ' '
    },
    userinfo () {
      return this.$store.getters.loginstate || ' '
    }
  }
}
</script>
