<template>
	<div class="Login-container">
		<div class="Login-item">
			<div class="nologin">
				<h2>acssesstoken</h2>
				<input :class="{'borderred': estate}" type="text" name="accesstoken"class="accesstoken" v-model="accesstoken" >
				<input type="button" value="Login" class="loginbutton" @click="loginaccount">
			</div>
		</div>
	</div>
</template>
<style lang="scss">
.borderred {
    border-color:red !important;
}
.Login-container{
    width: 90%;
    height: auto;
    overflow: hidden;
    margin: 0 auto;
    .Login-item{
        font-size: 0;
        width: 100%;
        height: auto;
        overflow: hidden;
        .nologin{
            h2{
                font-size: 38px;
                text-align: left;
                margin:15px auto;
            }
            .accesstoken{
                border:1px solid #ccc;
                width : 90%;
                height : 30px;
                padding:5px 10px ;
                border-radius: 5px;
                font-size:20px;
                font-weight:600;
            }
            .loginbutton{
                -webkit-appearance: none;
                display:block;
                width:4rem;
                height:3rem;
                margin:10px auto 10px;;
                padding:6px;
                font-size:1rem;
                font-weight:600;
                background-color:#e1e1e1;
                text-align:center;
                vertical-align: top;
            }
        }
    }
}
</style>
<script>
import axios from 'axios'
import debounce from '@/utils.js'
export default {
  data () {
    return {
      accesstoken: '',
      estate: false
    }
  },
  computed: {
    LoginState: function () {
      return this.$store.getters.getLoginState
    }
  },
  mounted () {},
  methods: {
    loginaccount: function () {
      axios.post('https://cnodejs.org/api/v1/accesstoken', {'accesstoken': this.accesstoken.trim()}).then((response) => {
        const reps = {
          'accesstoken': this.accesstoken.trim(),
          'avatar_url': response.data.avatar_url,
          'id': response.data.id,
          'loginname': response.data.loginname
        }
        this.$store.dispatch('LOGIN', reps)
        this.$router.push('/')
        // 简单的登录修改store
      }, debounce((e) => {
        this.estate = true
        setTimeout(() => {
          this.estate = false
        }, 1000)
      }))
        // 一个debounce 限制登录点击
    }
  }
}
</script>
