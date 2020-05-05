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
        //console.log(app.globalData.userGrade);

    },

    onReady() {
        let that = this;

        console.log('in wrong ready: 使用完整功能选择年级，登陆用户');
        that.setData({
            nickName: app.globalData.nickName + ' ',
            recGrade: app.globalData.userGrade
        });

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
        let quesIndex = e.currentTarget.dataset.qindex;

        console.log('ques index:', quesIndex);

        switch (that.data.activeKey) {
            case 0:
                let list0 = that.data.wrong0;
                list0.splice(quesIndex, 1);       //截取指定的内容
                that.setData({               //重新渲染列表
                    wrong0: list0
                })
                break;
            case 1:
                let list1 = that.data.wrong1;
                list0.splice(quesIndex, 1);       //截取指定的内容
                that.setData({               //重新渲染列表
                    wrong1: list1
                })
                break;
            case 2:
                let list2 = that.data.wrong2;
                list2.splice(quesIndex, 1);       //截取指定的内容
                that.setData({               //重新渲染列表
                    wrong2: list2
                })
                break;
            case 3:
                let list3 = that.data.wrong3;
                list3.splice(quesIndex, 1);       //截取指定的内容
                that.setData({               //重新渲染列表
                    wrong3: list3
                })
                break;
            case 4:
                let list4 = that.data.wrong4;
                list4.splice(quesIndex, 1);       //截取指定的内容
                that.setData({               //重新渲染列表
                    wrong4: list4
                })
                break;
            case 5:
                let list5 = that.data.wrong5;
                list5.splice(quesIndex, 1);       //截取指定的内容
                that.setData({               //重新渲染列表
                    wrong5: list5
                })
                break;
            case 6:
                let list6 = that.data.wrong6;
                list6.splice(quesIndex, 1);       //截取指定的内容
                that.setData({               //重新渲染列表
                    wrong6: list6
                })
                break;
            case 7:
                let list7 = that.data.wrong7;
                list7.splice(quesIndex, 1);       //截取指定的内容
                that.setData({               //重新渲染列表
                    wrong7: list7
                })
                break;
            default:
                break;
        }

        console.log('index id:', e.currentTarget.dataset.quesid);

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


    },

    onHide() {

        //console.log('in wrong: 使用完整功能选择年级，登陆用户');
    },

})
