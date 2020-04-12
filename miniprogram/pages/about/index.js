//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        //use-footer-slot:true
        // indicatorDots: true,
        // vertical: false,
        // autoplay: true,
        // circular: false,
        // interval: 2000,
        // duration: 500,
        // previousMargin: 0,
        // nextMargin: 0
    },

    onLoad: function () {

    },

    onShareAppMessage: function (res) {
        if (res.from === 'button') {
        }
        return {
            title: '计算能手 小程序',
            path: '../pages/index/index',
            success: function (res) {
                console.log('成功', res)
            }
        }
    },

    onBtnRet: function(e) {
        wx.switchTab({
            url: '../index/index',
        });
    }


})
