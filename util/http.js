import { config } from '../config.js';
const tips = {
  1: '抱歉出现了一个错误',
  1000: "输入参数错误",
  1001: "输入的json格式不正确",
  1002: "找不到资源",
  1003: "未知错误",
  1004: "禁止访问",
  1005: "不正确的开发者key",
  1006: "服务器内部错误",
  3000: "该期内容不存在",
  1007: "出错了"
};
class HTTP {
  request(params) {
    if (!params.method) {
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey 
      },
      success: (res) => {
        let code = res.statusCode.toString();
        if (code.startsWith('2')) {
          params.success && params.success(res.data);
        } else {
          // 服务器异常
          let error_code = res.data.error_code;
          this._show_error(error_code)
        }
      },
      fail: (err) => {
         // api 调用失败
        this._show_error(1)
      }
    })
  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1;
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}
export { HTTP }