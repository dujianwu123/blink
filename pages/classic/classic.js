import {
  classicModel
} from '../../models/classic.js';
import {
  likeModel
} from '../../models/like.js';
// 期刊的数据API
let classicApi = new classicModel();
// 点赞数据API
let likeApi = new likeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicDate: null,
    first: false,
    latest: true,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取最新一期数据
    classicApi.getLatest((res) => {
      this.setData({
        classicDate: res, //给 data中的classicDate 赋值
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
      console.log("最新一起res", res)
    })
  },

  // 点赞功能
  onLike: function(event) {
    // 通过自定义事件，来获取到like子子组件传递过来的值，来判断是点赞还是取消点赞
    let like_or_cancel = event.detail.behavior;
    likeApi.like(like_or_cancel, this.data.classicDate.id, this.data.classicDate.type);
  },
  // 获取下一期
  onNext: function(event) {
    this._updateClassic('next');
  },
  // 获取上一期
  onPrevious: function(event) {
    this._updateClassic('previous');
  },
  /**
   * 获取上/下一期的期刊内容
   */
  _updateClassic: function(nextOrPrevious) {
    let index = this.data.classicDate.index;
    classicApi.getClassic(index, nextOrPrevious, (res) => {
      // 点赞的数量和状态不可以缓存，没更换一起就要重新获取下点赞的信息
      this._getLikeStatus(res.id, res.type);
      this.setData({
        classicDate: res,
        latest: classicApi.isLatest(res.index),
        first: classicApi.isFirst(res.index)
      });
    });
  },
  /**
   * 获取点赞数和状态
   */
  _getLikeStatus: function (artID, category) {
    likeApi.getClassicLikeStatus(artID, category, (res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  }
})