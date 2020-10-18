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
            title: '计算能手 计算训练好帮手',
            path: 'pages/index/index',
            success: function (res) {
                console.log('成功', res)
            }
        }
    },

    onShareTimeline : function() {
        return {
          title: '计算能手 计算训练好帮手',
        //   query: {
        //     key: value
        //   },
        //   imageUrl: 'https://6173-ascpg-1301277680.tcb.qcloud.la/tlicon.jpg?sign=e5bf8f0911da56865afe10540cbfb279&t=1602984301'
        }
    },

    onBtnRet: function(e) {
        wx.switchTab({
            url: '../index/index',
        });
    }


})
