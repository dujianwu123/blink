import {
  bookModel
} from '../../models/book.js';
import {
  classicModel
} from '../../models/classic.js';
let bookApi = new bookModel();
let classicApi = new classicModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized();
    this.getMyBookCount();
    this.getMyFavor();
  },
  getMyFavor() {
    classicApi.getMyFavor((res) => {
      this.setData({
        classics: res
      })
    });
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
    console.log('userInfo', userInfo)
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
  onJumpToDetail() {

  },
  onShareAppMessage() {
    console.log(111111)
    wx.showShareMenu({
      withShareTicket: true
    })
  },
})