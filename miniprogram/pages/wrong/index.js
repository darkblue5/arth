//index.js
//获取应用实例
//import Notify from '@vant/weapp/notify/notify';
import * as config from '../config/config.js';

const app = getApp();
const db = wx.cloud.database({});

Page({
            data: {
                activeKey: 0,
                recGrade: 0, //  当前用户所在年级
                nickName: '小明',
                openID: '',

                grades: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
                gradesDetail: ['一年级上', '一年级下', '二年级上', '二年级下', '三年级上', '三年级下', '四年级上', '四年级下', '五年级上', '五年级下', '六年级上', '六年级下'],

                types: [],
                count: [],

                wrong0: [],
                wrong1: [],
                wrong2: [],
                wrong3: [],
                wrong4: [],
                wrong5: [],
                wrong6: [],
                wrong7: [],

                quesType: []

            },

            onLoad: function() {
                let that = this;
                let grade = that.data.recGrade;
                let worngCount = [];
                let i = 0;
                let quesCount = config.typeIndex[that.data.recGrade].length;

                that.data.openID = app.globalData.openid;

                // for ( i=0; i<quesCount; i++ ) {
                //     that.data.quesType[i] = config.typeIndex[that.data.recGrade][i];
                // }

                // console.log('LOAD 1, that.data.quesType', that.data.quesType);

                that.setData({
                    types: config.types[that.data.gradesDetail[grade]],
                    quesType: config.typeIndex[that.data.recGrade]
                    //count: worngCount
                })

                //console.log('LOAD 2, that.data.quesType', that.data.quesType);
            },

            onShow(e) {
                //console.log(app.globalData.userGrade);
                let that = this;
                let i = 0;

                console.log('SHOW, that.data.recGrade', that.data.recGrade);
                console.log('SHOW, that.data.quesType', that.data.quesType);

                //for (i=0; i<that.data.quesType.length; i++)
                switch (that.data.recGrade) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        switch (that.data.quesType[i]) {
                            case 0:
                                db.collection('errcol').where({
                                    _openid: that.data.openID,
                                    type: that.data.quesType[i]
                                }).get({
                                    success: res => {
                                        that.setData({
                                            wrong0: res.data,
                                            count0: res.data.length
                                        })
                                    }
                                })
                                break;
                            case 1:
                                db.collection('errcol').where({
                                    _openid: that.data.openID,
                                    type: quesType[1]
                                }).get({
                                    success: res => {
                                        that.setData({
                                            wrong1: res.data,
                                            count1: res.data.length
                                        })
                                    }
                                })
                                break;
                            case 3:
                                db.collection('errcol').where({
                                    _openid: that.data.openID,
                                    type: quesType[2]
                                }).get({
                                    success: res => {
                                        that.setData({
                                            wrong2: res.data,
                                            count2: res.data.length
                                        })
                                    }
                                })
                                break;
                            case 4:
                                db.collection('errcol').where({
                                    _openid: that.data.openID,
                                    type: quesType[3]
                                }).get({
                                    success: res => {
                                        that.setData({
                                            wrong3: res.data,
                                            count3: res.data.length
                                        })
                                    }
                                })
                                break;
                            case 5:
                                db.collection('errcol').where({
                                    _openid: that.data.openID,
                                    type: quesType[4]
                                }).get({
                                    success: res => {
                                        that.setData({
                                            wrong4: res.data,
                                            count4: res.data.length
                                        })
                                    }
                                })
                                break;
                            case 6:
                                db.collection('errcol').where({
                                    _openid: that.data.openID,
                                    type: quesType[5]
                                }).get({
                                    success: res => {
                                        that.setData({
                                            wrong5: res.data,
                                            count5: res.data.length
                                        })
                                    }
                                })
                                break;
                            case 7:
                                db.collection('errcol').where({
                                    _openid: that.data.openID,
                                    type: quesType[6]
                                }).get({
                                    success: res => {
                                        that.setData({
                                            wrong6: res.data,
                                            count6: res.data.length
                                        })
                                    }
                                })
                                break;
                            case 8:
                                db.collection('errcol').where({
                                    _openid: that.data.openID,
                                    type: quesType[7]
                                }).get({
                                    success: res => {
                                        that.setData({
                                            wrong7: res.data,
                                            count7: res.data.length
                                        })
                                    }
                                })
                                break;
                            case 8:
                                db.collection('errcol').where({
                                    _openid: that.data.openID,
                                    type: quesType[8]
                                }).get({
                                    success: res => {
                                        that.setData({
                                            wrong8: res.data,
                                            count8: res.data.length
                                        })
                                    }
                                })
                                break;
                        }
                        break;
                    case 9:
                        break;
                    case 10:
                        break;
                    case 11:
                        break;
                    default:
                        break;
                    }

                        // case 12:
                        // case 13:
                        // case 14:
                        // case 15:
                        // case 20:
                        // case 21:
                        // case 22:
                        // case 23:
                        // case 24:
                        // case 25:
                        // case 26:
                        // case 27:
                        // case 28:
                        // case 30:
                        // case 31:
                        // case 32:
                        // case 33:
                        // case 34:
                        // case 35:
                        // case 36:
                        // case 37:
                        // case 38:
                        // case 40:
                        // case 41:
                        // case 42:
                        // case 43:
                        // case 44:
                        // case 45:
                        // case 50:
                        // case 51:
                        // case 52:
                        // case 53:
                        // case 54:
                        // case 55:
                        // case 56:
                        // case 60:
                        // case 61:
                        // case 62:
                        // case 63:
                        // case 64:
                        // case 65:
                        // case 66:
                        // case 67:
                        // case 70:
                        // case 71:
                        // case 72:
                        // case 73:
                        // case 74:
                        // case 75:
                        // case 76:
                        // case 80:
                        // case 90:
                        // case 91:
                        // case 92:
                        //直接赋值

                        // case 93:
                        //     //加 X=
                        //     break;
                        // case 94:
                        // case 95:
                        // case 100:
                        // case 110:
                        // case 111:
                        // case 112:
                        //     //使用分数渲染模板
                        //     break;
                        // case 113:
                        // case 114:
                        //     //使用分数渲染模板，并且加 X=
                        //     break;
                        //}

                        //console.log('that.data.quesTypes', that.data.quesTypes);

                },

                onReady() {
                        let that = this;

                        //console.log('in wrong ready: 使用完整功能选择年级，登陆用户');
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

                    onDelQues: function(e) {
                        console.log('delete data');

                        let that = this;
                        let index = e.currentTarget.dataset.quesid;
                        let quesIndex = e.currentTarget.dataset.qindex;

                        console.log('ques index:', quesIndex);

                        switch (that.data.activeKey) {
                            case 0:
                                let list0 = that.data.wrong0;
                                list0.splice(quesIndex, 1); //截取指定的内容
                                that.setData({ //重新渲染列表
                                    wrong0: list0
                                })
                                break;
                            case 1:
                                let list1 = that.data.wrong1;
                                list0.splice(quesIndex, 1); //截取指定的内容
                                that.setData({ //重新渲染列表
                                    wrong1: list1
                                })
                                break;
                            case 2:
                                let list2 = that.data.wrong2;
                                list2.splice(quesIndex, 1); //截取指定的内容
                                that.setData({ //重新渲染列表
                                    wrong2: list2
                                })
                                break;
                            case 3:
                                let list3 = that.data.wrong3;
                                list3.splice(quesIndex, 1); //截取指定的内容
                                that.setData({ //重新渲染列表
                                    wrong3: list3
                                })
                                break;
                            case 4:
                                let list4 = that.data.wrong4;
                                list4.splice(quesIndex, 1); //截取指定的内容
                                that.setData({ //重新渲染列表
                                    wrong4: list4
                                })
                                break;
                            case 5:
                                let list5 = that.data.wrong5;
                                list5.splice(quesIndex, 1); //截取指定的内容
                                that.setData({ //重新渲染列表
                                    wrong5: list5
                                })
                                break;
                            case 6:
                                let list6 = that.data.wrong6;
                                list6.splice(quesIndex, 1); //截取指定的内容
                                that.setData({ //重新渲染列表
                                    wrong6: list6
                                })
                                break;
                            case 7:
                                let list7 = that.data.wrong7;
                                list7.splice(quesIndex, 1); //截取指定的内容
                                that.setData({ //重新渲染列表
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
                        wx.showModal({
                            content: '完整功能请登陆微信',
                            showCancel: false,
                            success: function(res) {

                            }
                        })
                    },

            })