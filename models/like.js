import { HTTP } from '../util/http.js'
class likeModel extends HTTP {
  /**
   * 点赞 or 取消点赞
   */
  like(like_or_cancel, art_id, type) {
    let url = like_or_cancel === 'cancel' ? 'like/cancel' : 'like'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: art_id,
        type: type
      },
      success: (data) => {
        console.log(data)
      }
    })
  }

  getClassicLikeStatus(artID, category, sCallback) {
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: sCallback
    })
  }
}
export { likeModel }