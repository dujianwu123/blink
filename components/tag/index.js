// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    // 开启插槽
    multipleSlots: true
  },
  externalClasses: ['tag-class'],
  properties: {
    text: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function(e) {
      this.triggerEvent('tapping', {
        tapText: this.properties.text
      })
    }
  }
})
