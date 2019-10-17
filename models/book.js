import { HTTP } from '../util/http_p.js';
class bookModel extends HTTP {
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }
  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }
}
export { bookModel }