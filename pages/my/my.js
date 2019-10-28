import {
  bookModel
} from '../../models/book.js';
let bookApi = new bookModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized();
    this.getMyBookCount();
  },
  getMyBookCount() {
    bookApi.getMyBookCount().then((res) => {
      this.setData({
        bookCount: res.count
      })
    })
  },
  userAuthorized() {
    // 获取用户是否授权
    wx.getSetting({
      success: data=>{
        console.log(data);
        if(data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
        }
      }
    })
  },
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo;
    if(userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },
  onJumpToAbout(e) {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },
  onStudy() {
    wx.navigateTo({
      url: '/pages/course/course'
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