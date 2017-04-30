<template>
	<div class="slide">
		<div class="slide-item" :class="{'show-menu':show}">
			<router-link  v-bind:to="loginname">
				<div class="user-info" v-show="loginstate">
					<img :src="userinfo.avatar_url" alt="">
					
	             		</div>
			</router-link>
	             		<div class="base" v-show="loginstate">
	             			<router-link  v-bind:to="loginname">
	             			<p>{{userinfo.loginname}}</p>
	             			</router-link>
	             			<div class="baseinfo">
		             			<!-- <span>积分：{{userinfo}}</span> -->
		             			<!-- <span>2017年4月30日</span> -->
	             			</div>
	             		</div>
			

			<router-link to="/login" class="gologin">
             			<h2 v-if="!loginstate">登录</h2>
             		</router-link>

			<ul>
				<li><router-link to="/list/all" >全部</router-link></li>
				<li><router-link to="/list/good" >精华</router-link></li>
				<li><router-link to="/list/ask" >回答</router-link></li>
				<li><router-link to="/list/job" >招聘</router-link></li>
				<li><router-link to="/list/share" >分享</router-link></li>
				<li>消息</li>
				<li>关于</li>
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
		background-color: #33cccc;
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
				margin:20px;
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
			margin:0 auto;
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
  },
  computed: {
    loginstate () {
      return this.$store.state.loginstate
    },
    loginname () {
      return '/self/' + this.$store.state.user.loginname
    },
    userinfo () {
      return this.$store.state.user
    }
  }
}
</script>
