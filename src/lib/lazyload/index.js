/* eslint-disable*/ 
import lazyload from './lazy.js'
var MyPlugin = {}
MyPlugin.install = function(Vue,option){
    Vue.prototype.lazyload = lazyload.init(option)
}

export default  MyPlugin