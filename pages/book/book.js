import {
  bookModel
} from '../../models/book.js';
import {random} from '../../util/common'
let bookApi = new bookModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const hotList = bookApi.getHotList()
    hotList.then((res)=>{
      this.setData({
        books: res
      })
    })
  },

  onSearching: function () {
    this.setData({
      searching: true
    })
  },

  onCancel: function() {
    this.setData({
      searching: false
    })
  },
  onReachBottom: function() {
    this.setData({
      more: random(16)
    })
  }
})