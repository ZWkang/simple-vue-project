<template>
  <div class="reply-container">
    <textarea :class="{'errord': estate}" name="" id="" cols="30" rows="10" v-model="content"> </textarea>
    <input type="submit" class="submit" @click.stop="replypost">
  </div>
</template>
<style scoped>
.errord {
  border-color: red !important;
}
.reply-container {
  padding: 0 10px;
}
textarea {
  transition: all 0.6s ease-in;
  box-shadow: 1px 1px 0 #E7E7E7;
  box-sizing: border-box;
  font-family: arial, sans-serif;
  font-size: 1.2rem;
  height: 10rem;
  margin: 10px auto;
  outline-color: -moz-use-text-color;
  outline-style: none;
  outline-width: medium;
  padding: 2px;
  width: 95%;
  resize: none;
  border-radius: 10px;
}

.submit {
  -webkit-appearance: none;
  width: 3rem;
  height: 2rem;
  border-radius: .2rem;
  font-size: 1rem;
  line-height: 1.2rem;
  box-shadow: none;
  border: 1px solid #0099ff;
  background-color: #fff;
  display: block;
  margin: 0 auto;
  font-weight: 600;
}
</style>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      estate: false,
      content: this.reply_to ? this.reply_to + ' ' : ''
    }
  },
  props: {
    reply_id: {
      default: '',
      type: String
    },
    topic_id: {
      default: '',
      type: String
    },
    reply_to: {
      default: '',
      type: String
    }
  },
  methods: {
    replypost: function () {
      if (this.topic_id && this.isLogined && this.content) {
        const url = 'https://cnodejs.org/api/v1/topic/' + this.topic_id + '/replies'
        const param = {
          'accesstoken': this.accesstoken,
          'content': this.content,
          'reply_id': this.reply_id
        }
        axios.post(url, param).then((response) => {
          this.clearrepltid()
          this.content = ''
          window.location.reload()
        }, (e) => {
          this.estate = true
          setTimeout(() => {
            this.estate = false
          }, 1000)
        })
      } else {
        this.estate = true
        setTimeout(() => {
          this.estate = false
        }, 1000)
      }
    },
    clearrepltid: function () {
      this.$emit('chooseTreeItem', ' ')
    }
  },
  computed: {
    isLogined: function () {
      return this.$store.getters.getLoginState
    },
    accesstoken: function () {
      return this.$store.getters.loginstate.accesstoken
    }
  }
}
</script>
