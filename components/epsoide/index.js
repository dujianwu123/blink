// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String,
      observer: function (newVal, oldVal, changedPath) {
        // 当属性index被修改的时候回去触发observer 
        // 在这块执行setData 更新属性index ，就会去触发observer ，那么此时index 类型为String时 '0'->'08' ,'08' -> '008', '008' -> '0008'
        // 而 index 为Number类型时，0->08  小程序会处理，把08 变为 8 ，所以this.setData一直是8 ，所以就不是更新属性了，就不会无限触发observer
        // 为了解决这种无限循环的问题，用一个中间值来替代，以后在observer中不要直接修改属性
        let val = newVal < 10 ? '0' + newVal : newVal;
        // this.setData({ // 更新属性
        //   index: val
        // })
        this.setData({ // 更新属性
          _index: val
        })
        return val;
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    month: '',
    year: 0,
    _index: ''
  },
  attached: function () {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    
    this.setData({
      month: this.data.months[month],
      year: year
    });

  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
