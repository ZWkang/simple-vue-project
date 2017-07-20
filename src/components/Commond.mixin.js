let CommondMixin = {
    methods: {
        gettab: function (tab, good, top) {
        let str = ''
        if (top) {
            str = '置顶'
        } else if (good) {
            str = '精华'
        } else {
            switch (tab) {
                case 'share':
                    str = '分享'
                    break
                case 'ask' :
                    str = '问答'
                    break
                case 'job' :
                    str = '招聘'
                    break
                default :
                    str = '全部'
                    break
                }
            }
        return str
        }
    }
}