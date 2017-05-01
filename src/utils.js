var debounce = function (fn, delaytime) {
  let tags
  return function () {
    let that = this
    let args = arguments
    if (tags) {
      clearTimeout(tags)
    }
    tags = setTimeout(function () {
      fn.apply(that, args)
    }, delaytime)
  }
}
export default debounce
