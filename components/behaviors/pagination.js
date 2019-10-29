const paginationBev = Behavior({
    data: {
        dataArray: [],
        total: null,
        noneResult: false,
        loading:false
    },

    methods: {
        // 将查询到的图书的信息存到dataArray中
        setMoreData(dataArray) {
            const tempArray =
                this.data.dataArray.concat(dataArray)
            this.setData({
                dataArray: tempArray
            })
        },
        // 获取当天图书列表的长度，用来传给分页的API请求用，分页实在当前长度基础为初始值，在返回20条数据
        getCurrentStart() {
            return this.data.dataArray.length
        },

        setTotal(total) {
            this.data.total = total
            if (total == 0) {
                this.setData({
                    noneResult: true
                })
            }
        },
        // 判断下是否还有更多的图书数据可以加载
        hasMore() {
            if (this.data.dataArray.length >= this.data.total) {
                return false
            } else {
                return true
            }
        },
        initialize() {
            this.setData({
                dataArray: [],
                noneResult: false,
                loading:false
            })
            this.data.total = null
        },

        isLocked() {
            return this.data.loading ? true : false
        },

        locked() {
            this.setData({
                loading: true
            })
        },

        unLocked() {
            this.setData({
                loading: false
            })
        },

    }
})

export {
    paginationBev
}