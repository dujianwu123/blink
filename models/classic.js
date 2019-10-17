import {HTTP} from '../util/http.js'
class classicModel extends HTTP{
  /**
   * 获取最新一期期刊内容
   */
  getLatest(callback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        callback(res);
        this._setLatestIndex(res.index);
        let key = this._getKey(res.index);
        wx.setStorageSync(key, res);
      }
    })
  }
  /**
   * 上一期OR下一期的获取期刊内容
   */
  getClassic(index, nextOrPrevious, sCallback) {
    let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    let classic = wx.getStorageSync(key);
    if (!classic) {
      this.request({
        url: 'classic/' + index + '/' + nextOrPrevious,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res);
          sCallback(res);
        }
      })
    } else {
      sCallback(classic)
    }
    
  }

  /**
   * 判断是否是最早一期
   */
  isFirst(index) {
    return index === 1 ? true : false;
  }
  /**
   * 判断是否是最新一期
   */
  isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return latestIndex === index ? true : false;
  }
  /**
   * 把最新一期的期号存入到storage里
   */
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index);
  }
  /**
   * 获取最新一期在storage里的期号
   */
  _getLatestIndex() {
    let index = wx.getStorageSync('latest');
    return index
  }
  /**
   * 获取classic 缓存的key
   */
  _getKey(index) {
    let key = 'classic-' + index;
    return key
  }
}
export { classicModel }