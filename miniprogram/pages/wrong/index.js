//index.js
//获取应用实例
import Notify from '@vant/weapp/notify/notify';
import * as config from '../config/config.js';

const app = getApp();
const db = wx.cloud.database({});

Page({
    data: {
        activeKey: 0,
        recGrade: 1,       //  当前用户所在年级
        nickName: '小明',

        grades: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
        gradesDetail: ['一年级上', '一年级下', '二年级上', '二年级下', '三年级上', '三年级下', '四年级上', '四年级下', '五年级上', '五年级下', '六年级上', '六年级下'],

        types: [],

        wrong0: [],
        wrong1: []
    },

    onLoad: function () {
        let that = this;
        let grade = that.data.recGrade;
        //let cwrong0 = [], cwrong1 = [], worng2 = [], worng3 = [], worng4 = [], worng5 = [], worng6 = [];

        //   if (that.data.recGrade == 0) {

        //   }

        db.collection('errcol').where({
            type: 0
        }).get({
            success: res => {
                //cwrong0 = res.data;
                //console.log(wrong0);
                //console.log(res.data);

                that.setData({
                    wrong0: res.data
                })
            }
        })

        db.collection('errcol').where({
            type: 1
        }).get({
            success: res => {
                // cwrong1 = res.data;
                //console.log(wrong0);
                // console.log(res.data);

                that.setData({
                    wrong1: res.data
                })
            }
        })

        db.collection('errcol').where({
            type: 2
        }).get({
            success: res => {
                //cwrong0 = res.data;
                //console.log(wrong0);
                //console.log(res.data);

                that.setData({
                    wrong2: res.data
                })
            }
        })

        db.collection('errcol').where({
            type: 3
        }).get({
            success: res => {
                //cwrong0 = res.data;
                //console.log(wrong0);
                //console.log(res.data);

                that.setData({
                    wrong3: res.data
                })
            }
        })

        db.collection('errcol').where({
            type: 4
        }).get({
            success: res => {
                //cwrong0 = res.data;
                //console.log(wrong0);
                //console.log(res.data);

                that.setData({
                    wrong4: res.data
                })
            }
        })

        db.collection('errcol').where({
            type: 5
        }).get({
            success: res => {
                //cwrong0 = res.data;
                //console.log(wrong0);
                //console.log(res.data);

                that.setData({
                    wrong5: res.data
                })
            }
        })


        //   console.log(config.types[ that.data.gradesDetail[grade] ]);
        that.setData({
            types: config.types[that.data.gradesDetail[grade]]
        })

    },

    onShow (e) {
        console.log(app.globalData.userGrade);

    },

    onChange(e) {
        // Notify({ type: 'primary', message: e.detail });
        this.setData({
            activeKey: e.detail
        })
    },

    onDelQues: function (e) {
        console.log('delete data');

        let that = this;
        let index = e.currentTarget.dataset.quesid;
        let list = that.data.wrong0;

        console.log(e.currentTarget.dataset.quesid);
        wx.cloud.callFunction({
            name: 'del',
            data: {
                quesId: e.currentTarget.dataset.quesid
            },
            success: res => {
                console.log('[云函数] [bookAdd] 删除信息成功！！ ', res);
            },
            fail: err => {
                console.error('[云函数] [bookAdd] 调用失败', err)
            }
        })

        list.splice(index, 1);       //截取指定的内容
        that.setData({               //重新渲染列表
            wrong0: list
        })
    }
})
