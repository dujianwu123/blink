import {
  classicBeh
} from '../classic-beh.js';
// 音乐管理对象
const mMgr = wx.getBackgroundAudioManager();

Component({
  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
    playing: false
  },
  attached: function(event) {
    this._recoverStatus();
    this._monitorSwitch();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function () {
      if (!this.data.playing) {
        this.setData({
          playing: true
        });
        mMgr.title = this.properties.title
        mMgr.src = this.properties.src;
      } else {
        this.setData({
          playing: false
        });
        mMgr.pause();
      }
    },
    /**
     * 判断音乐的播放状态
     */
    _recoverStatus: function() {
      if (mMgr.paused) { // 没有音乐在播放
        this.setData({
          playing: false
        });
        return
      }
      if (mMgr.src === this.properties.src) { // 说明播放的音乐和切换到页面的是一个,此时要给此页面的播放状态 设置为 true
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch: function() {
      mMgr.onPlay(() => {
        this._recoverStatus();
      });
      mMgr.onPause(() => {
        this._recoverStatus();
      });
      mMgr.onStop(() => {
        this._recoverStatus();
      });
      mMgr.onEnded(() => {
        this._recoverStatus();
      });
    }
  }

})