import {KeywordModel} from '../../models/keyword.js'
const keywordApi = new KeywordModel();
import {bookModel} from '../../models/book.js'
const bookApi = new bookModel();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    word: ''
  },
  attached: function() {
    this.setData({
      historyWords: keywordApi.getHistory()
    })
    keywordApi.getHot().then((res)=>{
      this.setData({
        hotWords: res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onCancel: function() {
      this.triggerEvent('cancel',{},{})
    },
    onConfirm: function(event) {
      wx.showLoading();
      const word = event.detail.value || event.detail.tapText;
      this.setData({
        searching: true,
        dataArray: [],
        word: word
      });
      if(word){
        bookApi.search(0, word).then((res)=>{
          this.setData({
            dataArray: res.books,
          });
          keywordApi.addToHistory(word);
          wx.hideLoading();
        });
      }
    },
    onDelete: function() {
      this.setData({
        searching: false
      })
    }
  }
})
