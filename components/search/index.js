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
      observer: 'loadMore'
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
    loadMore: function () {
      if (!this.data.word) {
        return
      }
      if (this.isLocked()) {
        return;
      }
      // this.data.loading = true; // wxml不需要更新loading可以这么赋值
      if(this.hasMore()) {
        this.locked()
        bookApi.search(this.getCurrentStart(), this.data.word).then((res) => {
          this.setMoreData(res.books);
          this.unLocked();
        },()=>{
          this.unLocked(); // 如果失败或断网了，也需要解锁，要不请求的时候断网，而一会有来网了，如果不在这解锁就会成为死锁了
        })
      }
    },
    onCancel: function () {
      this.triggerEvent('cancel', {}, {})
    },
    onConfirm: function (event) {
      wx.showLoading();
      this.initialize();
      const word = event.detail.value || event.detail.tapText;
      this._showResult(word);
      if (word) {
        bookApi.search(0, word).then((res) => {
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
    },
    _showResult(word) {
      this.setData({
        searching: true,
        word: word,// 此处是为了点击后input能马上显示点击的文本
      });
    }
  }
})
