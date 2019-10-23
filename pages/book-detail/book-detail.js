import { bookModel } from '../../models/book.js';
import {
  likeModel
} from '../../models/like.js';
const bookApi = new bookModel();
let likeApi = new likeModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: {},
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading();
    // 获取id
    const bid = options.bid; // 接收外部传递过来的数据
    console.log(bid);
    const detail = bookApi.getDetail(bid);
    const comments = bookApi.getComments(bid);
    const likeStatus = bookApi.getLikeStatus(bid);

    Promise.all([detail, comments, likeStatus]).then((res)=>{
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      });
      wx.hideLoading();
    })
    // detail.then(res=>{
    //   console.log('detail',res)
    //   this.setData({
    //     book: res
    //   })
    // });
    // comments.then(res=>{
    //   console.log('comments', res)
    //   this.setData({
    //     comments: res.comments
    //   })
    // });
    // likeStatus.then(res=>{
    //   console.log('likeStatus', res)
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // });
  },
  onLike: function (event) {
    const like_or_status = event.detail.behavior;
    likeApi.like(like_or_status,this.data.book.id,400)
  },
  onFakePost: function() {
    this.setData({
      posting: true
    })
  },
  onCancel: function() {
    this.setData({
      posting: false
    })
  },
  onPost: function(event) {
    // const comment = event.detail.tapText;// 从tap组件传过来的值
    // const commentInput = event.detail.value; // 输入input获取的值
    const comment = event.detail.tapText || event.detail.value;
    if (!comment) {
      return 
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return 
    }

    bookApi.postComment(this.data.book.id, comment).then((res)=>{
      wx.showToast({
        title: '+ 1',
        icon: 'none'
      })

      this.data.comments.unshift({
        content:comment,
        nums: 1
      })
      this.setData({
        comments: this.data.comments,
        posting: false
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})