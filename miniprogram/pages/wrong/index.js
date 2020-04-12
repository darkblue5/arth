//index.js
//获取应用实例
const app = getApp()
import Notify from '@vant/weapp/notify/notify';

Page({
  data: {
      activeKey: 0
  },
  
  onLoad: function () {

  },

  onChange(e) {
     // Notify({ type: 'primary', message: e.detail });
      this.setData ({
          activeKey: e.detail          
      })
  }

})
