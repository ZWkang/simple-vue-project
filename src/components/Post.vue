<template>
<div class="postpage">
	<div class="postpage-container">
		<input v-model="title" type="text" placeholder="请输入标题" v-bind:class="{'active': errormsg}">
		<div class="post-type">
			<span>分类：</span>
			<select v-model="type" >
				<option value="ask">问答</option>
				<option value="share">分享</option>
				<option value="job">招聘</option>
			</select>
		</div>
		<div class="post-content" >
			<textarea name="" id="" cols="30" rows="10" v-model="content" v-bind:class="{'active': errormsg}">
			</textarea>
		</div>

		<input type="submit" value="提交" @click.stop="topicaction">
	</div>
</div>
</template>
<style scoped lang="scss">
.active{
	border-color:red !important;
}
.postpage{
	.postpage-container{
		input[type="text"]{
			transition: all 0.5s ease-in;
			box-sizing: border-box;
			text-align:center;
			font-size:1.4em;
			height:2em;
			border-radius:4px;
			border:1px solid #c8cccf;
			color:#6a6f77;
			-web-kit-appearance:none;
			-moz-appearance: none;
			display:block;
			outline:0;
			text-decoration:none;
			width:80%;
			margin:.8rem auto;
			&:focus{
				border-color:#0099ff;
				outline-style:none;
			}
		}
		.post-type{
			position:relative;
			width:80%;
			overflow:hidden;
			margin:.8rem auto;
			vertical-align:top;

			span{
				position:absolute;
				top:0;
				left:10px;
				line-height:2rem;
			}
		}
		label{
			vertical-align:middle;
			float:right;
		}
		select{
			border: solid 1px #c8cccf;
			padding-right: 14px;
			width:60%;
			float:right;
			height:2rem;
			line-height:3rem;
			border-radius:5px;
			font-size:1.2rem;
			text-align:center;
			&:focus{
				border-color:#0099ff;
				outline-style:none;
			}
		}
		.post-content{
			text-align:center;
			textarea{
				transition: all 0.6s ease-in;
				-moz-box-shadow:1px 1px 0 #E7E7E7;
				-moz-box-sizing:border-box;
				font-family:arial,sans-serif;
				font-size:1.2rem;
				height:20rem;
				margin:10px auto;
				outline-color:-moz-use-text-color;
				outline-style:none;
				outline-width:medium;
				padding:2px;
				width:80%;
				resize:none;
				border-radius:10px;
				&:focus{
					border:1px solid #0099ff;
				}
			}
		}
		input[type="submit"]{
			-webkit-appearance: none;
			width:4rem;
			height:2rem;
			border-radius:.5rem;
			font-size:1.2rem;
			line-height:1.2rem;
			box-shadow:none;
			border:1px solid #0099ff;
			background-color:#fff;
			display:block;
			margin:0 auto;
			font-weight:600;
		}

	}
}
</style>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      title: '',
      content: '',
      type: 'ask',
      errormsg: false,
      topic: ''
    }
  },
  methods: {
    topicaction: function () {
      if (this.isLogined) {
        if (this.topic) {
          this.updatetopic()
        } else {
          this.posttopic()
        }
      } else {
        this.errormsg = true
        setTimeout(() => {
          // console.log(222)
          this.errormsg = false
        }, 1000)
      }
    },
    updatetopic: function () {
      if (this.type === 'ask' || this.type === 'all' || this.type === 'share') {
        const params = {
          accesstoken: this.uuidkey,
          content: this.content,
          title: this.title,
          tab: this.type,
          topic_id: this.topic
        }
        axios.post('https://cnodejs.org/api/v1/topics/update', params).then((response) => {
          this.$router.replace({name: 'detail', params: { id: response.data.topic_id }})
        }, (e) => {
          this.errormsg = true
          setTimeout(() => {
            // console.log(222)
            this.errormsg = false
          }, 1000)
        })
      }
    },
    posttopic: function () {
      if (this.type === 'ask' || this.type === 'all' || this.type === 'share') {
        const params = {
          accesstoken: this.uuidkey,
          content: this.content,
          title: this.title,
          tab: this.type
        }
        axios.post('https://cnodejs.org/api/v1/topics', params).then((response) => {
          this.$router.replace({name: 'detail', params: { id: response.data.topic_id }})
        }, (e) => {
          this.errormsg = true
          setTimeout(() => {
            // console.log(222)
            this.errormsg = false
          }, 1000)
        })
      }
    },
    gettopic: function () {
      if (this.$route.name === 'editpost') {
        axios.get('https://cnodejs.org/api/v1/topic/' + this.$route.params.topicid + '?mdrender=false').then((response) => {
          const data = response.data.data
          // console.log(data)
          if (data.author_id !== this.$store.getters.loginstate.id) {
            return void (0)
          }
          this.content = data.content
          this.type = data.tab
          this.title = data.title
          this.topic = this.$route.params.topicid
        })
      }
    }
  },
  computed: {
    isLogined: function () {
      return this.$store.getters.getLoginState
    },
    uuidkey: function () {
      return this.$store.getters.loginstate.accesstoken
    }
  },
  mounted: function () {
    this.gettopic()
  }
}
</script>
