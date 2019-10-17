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

  /**
   * 根据artID, category来具体获取点赞的信息，此信息不能缓存
   */
  getClassicLikeStatus(artID, category, sCallback) {
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: sCallback
    })
  }
}
export { likeModel }