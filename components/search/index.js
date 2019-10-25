import { KeywordModel } from '../../models/keyword.js'
import { bookModel } from '../../models/book.js';
import { paginationBev } from '../behaviors/pagination';
const keywordApi = new KeywordModel();
const bookApi = new bookModel();
Component({
  behaviors:[paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: '_load_more'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    // dataArray: [], 用行为behaviors接管
    searching: false,
    word: '',
    // loading: false // 加载更多锁，是否正在发生请求，默认是没有发生请求
  },
  attached: function () {
    this.setData({
      historyWords: keywordApi.getHistory()
    })
    keywordApi.getHot().then((res) => {
      this.setData({
        hotWords: res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _load_more: function () {
      if (!this.data.word) {
        return
      }
      if (this.data.loading) {
        return;
      }
      // let length = this.data.dataArray.length; 用行为behaviors接管
      // this.data.loading = true; // wxml不需要更新loading可以这么赋值
      if(this.hasMore()) {
        this.data.loading = true;
        bookApi.search(this.getCurrentStart(), this.data.word).then((res) => {
          // const tempArray = this.data.dataArray.concat(res.books);  用行为behaviors接管
          this.setMoreData(res.books);
          this.data.loading = false; 
          // this.setData({
          //   dataArray: tempArray,
          //   loading: false
          // })  用行为behaviors接管
        })
      }
    },
    onCancel: function () {
      this.triggerEvent('cancel', {}, {})
    },
    onConfirm: function (event) {
      wx.showLoading();
      const word = event.detail.value || event.detail.tapText;
      this.setData({
        searching: true,
        dataArray: [],
        word: word,
      });
      if (word) {
        bookApi.search(0, word).then((res) => {
          // this.setData({
          //   dataArray: res.books,
          // }); 用行为behaviors接管
          this.setMoreData(res.books);
          this.setTotal(res.total)
          keywordApi.addToHistory(word);
          wx.hideLoading();
        });
      }
    },
    onDelete: function () {
      this.setData({
        searching: false
      })
    }
  }
})
