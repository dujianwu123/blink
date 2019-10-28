// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean // 判断显示什么心的图片
    },
    count: {
      type: Number
    },
    readOnly: {
      type: Boolean //判断是不是只读
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {
      // 自定义事件
      if (this.properties.readOnly) { // 如果是只读的就不操作后面了
        return 
      }
      let count = this.properties.count
      // like若为true 证明是要由喜欢  --> 不喜欢 , 所以应该减1 反之加1
      count = this.properties.like ? count - 1 : count + 1
      this.setData({
        count: count,
        like: !this.properties.like
      });
      let behavior = this.properties.like ? 'like' : 'cancel';
      // 激活 把behavior 传递给父级的 like 事件
      this.triggerEvent('like', {
        behavior: behavior
      }, {});
    }
  }
})
