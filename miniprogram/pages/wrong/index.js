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
        txtGrade: '',
        nickName: '佚名',
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

    onLoad: function () {
        let that = this;
        let grade = 0;
        let worngCount = [];
        let i = 0;
        let quesCount = 0;

        if (app.globalData.openid === undefined || app.globalData.openid === '') {
            // 未登录时的默认展示一年级上
            that.setData({
                types: config.types[that.data.gradesDetail[0]],
                quesType: config.typeIndex[0],
                recGrade: 0
            })
        } else {
            quesCount = config.typeIndex[app.globalData.userGrade].length;
            grade = app.globalData.userGrade;

            that.setData({
                types: config.types[that.data.gradesDetail[grade]],
                quesType: config.typeIndex[app.globalData.userGrade],
                recGrade: app.globalData.userGrade
            })
        }

        console.log('LOAD, that.data.types', that.data.types);
        console.log('LOAD, that.data.quesType', that.data.quesType);
        console.log('LOAD, that.data.recGrade', that.data.recGrade);

    },

    onShow(e) {
        //console.log(app.globalData.userGrade);
        let that = this;
        let i = 0;

        //console.log('SHOW, that.data.recGrade', that.data.recGrade);
        //console.log('SHOW, that.data.quesType', that.data.quesType);

        that.data.openID = app.globalData.openid;
        //for (i=0; i<that.data.quesType.length; i++)
        switch (app.globalData.userGrade) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                //直接赋值
                // for (i = 0; i < that.data.quesType.length; i++) {
                //     switch (that.data.quesType[i] % 10) {
                //         case 0:
                //             db.collection('errcol').where({
                //                 _openid: that.data.openID,
                //                 type: that.data.quesType[0]
                //             }).get({
                //                 success: res => {
                //                     console.log('WRONG, res.data', res.data);
                //                     that.setData({
                //                         wrong0: res.data,
                //                         count0: res.data.length
                //                     })
                //                 }
                //             })
                //             break;
                //         case 1:
                //             db.collection('errcol').where({
                //                 _openid: that.data.openID,
                //                 type: that.data.quesType[1]
                //             }).get({
                //                 success: res => {
                //                     that.setData({
                //                         wrong1: res.data,
                //                         count1: res.data.length
                //                     })
                //                 }
                //             })
                //             break;
                //         case 2:
                //             db.collection('errcol').where({
                //                 _openid: that.data.openID,
                //                 type: that.data.quesType[2]
                //             }).get({
                //                 success: res => {
                //                     that.setData({
                //                         wrong2: res.data,
                //                         count2: res.data.length
                //                     })
                //                 }
                //             })
                //             break;
                //         case 3:
                //             db.collection('errcol').where({
                //                 _openid: that.data.openID,
                //                 type: that.data.quesType[3]
                //             }).get({
                //                 success: res => {
                //                     that.setData({
                //                         wrong3: res.data,
                //                         count3: res.data.length
                //                     })
                //                 }
                //             })
                //             break;
                //         case 4:
                //             db.collection('errcol').where({
                //                 _openid: that.data.openID,
                //                 type: that.data.quesType[4]
                //             }).get({
                //                 success: res => {
                //                     that.setData({
                //                         wrong4: res.data,
                //                         count4: res.data.length
                //                     })
                //                 }
                //             })
                //             break;
                //         case 5:
                //             db.collection('errcol').where({
                //                 _openid: that.data.openID,
                //                 type: that.data.quesType[5]
                //             }).get({
                //                 success: res => {
                //                     that.setData({
                //                         wrong5: res.data,
                //                         count5: res.data.length
                //                     })
                //                 }
                //             })
                //             break;
                //         case 6:
                //             db.collection('errcol').where({
                //                 _openid: that.data.openID,
                //                 type: that.data.quesType[6]
                //             }).get({
                //                 success: res => {
                //                     that.setData({
                //                         wrong6: res.data,
                //                         count6: res.data.length
                //                     })
                //                 }
                //             })
                //             break;
                //         case 7:
                //             db.collection('errcol').where({
                //                 _openid: that.data.openID,
                //                 type: that.data.quesType[7]
                //             }).get({
                //                 success: res => {
                //                     that.setData({
                //                         wrong7: res.data,
                //                         count7: res.data.length
                //                     })
                //                 }
                //             })
                //             break;
                //         case 8:
                //             db.collection('errcol').where({
                //                 _openid: that.data.openID,
                //                 type: that.data.quesType[8]
                //             }).get({
                //                 success: res => {
                //                     that.setData({
                //                         wrong8: res.data,
                //                         count8: res.data.length
                //                     })
                //                 }
                //             })
                //             break;
                //         default:
                //             break;
                //     }
                // }
                // break;
            case 9:
            case 10:
            case 11:
                //使用分数渲染模板
                for (i = 0; i < that.data.quesType.length; i++) {
                    switch (that.data.quesType[i] % 10) {
                        case 0:
                            db.collection('errcol').where({
                                _openid: that.data.openID,
                                type: that.data.quesType[0]
                            }).get({
                                success: res => {
                                    that.parseQstring(res.data, 0);
                                }
                            })
                            break;
                        case 1:
                            db.collection('errcol').where({
                                _openid: that.data.openID,
                                type: that.data.quesType[1]
                            }).get({
                                success: res => {
                                    that.parseQstring(res.data, 1);
                                }
                            })
                            break;
                        case 2:
                            db.collection('errcol').where({
                                _openid: that.data.openID,
                                type: that.data.quesType[2]
                            }).get({
                                success: res => {
                                    that.parseQstring(res.data, 2);
                                }
                            })
                            break;
                        case 3:
                            db.collection('errcol').where({
                                _openid: that.data.openID,
                                type: that.data.quesType[3]
                            }).get({
                                success: res => {
                                    that.parseQstring(res.data, 3);
                                }
                            })
                            break;
                        case 4:
                            db.collection('errcol').where({
                                _openid: that.data.openID,
                                type: that.data.quesType[4]
                            }).get({
                                success: res => {
                                    that.parseQstring(res.data, 4);
                                }
                            })
                            break;
                        case 5:
                            db.collection('errcol').where({
                                _openid: that.data.openID,
                                type: that.data.quesType[5]
                            }).get({
                                success: res => {
                                    that.parseQstring(res.data, 5);
                                }
                            })
                            break;
                        case 6:
                            db.collection('errcol').where({
                                _openid: that.data.openID,
                                type: that.data.quesType[6]
                            }).get({
                                success: res => {
                                    that.parseQstring(res.data, 6);

                                }
                            })
                            break;
                        case 7:
                            db.collection('errcol').where({
                                _openid: that.data.openID,
                                type: that.data.quesType[7]
                            }).get({
                                success: res => {
                                    that.parseQstring(res.data, 7);

                                }
                            })
                            break;
                        case 8:
                            db.collection('errcol').where({
                                _openid: that.data.openID,
                                type: that.data.quesType[8]
                            }).get({
                                success: res => {
                                    that.parseQstring(res.data, 8);
                                }
                            })
                            break;
                        default:
                            break;
                    }
                }
                break;
            default:
                break;
        }
    },

    onReady() {
        let that = this;
        let strGrade = '';

        console.log('WRONG, app.globalData.userGrade', app.globalData.userGrade);

        switch (app.globalData.userGrade) {
            case 0:
                strGrade = '一年级上';
                break;
            case 1:
                strGrade = '一年级下';
                break;
            case 2:
                strGrade = '二年级上';
                break;
            case 3:
                strGrade = '二年级下';
                break;
            case 4:
                strGrade = '三年级上';
                break;
            case 5:
                strGrade = '三年级下';
                break;
            case 6:
                strGrade = '四年级上';
                break;
            case 7:
                strGrade = '四年级下';
                break;
            case 8:
                strGrade = '五年级上';
                break;
            case 9:
                strGrade = '五年级下';
                break;
            case 10:
                strGrade = '六年级上';
                break;
            case 11:
                strGrade = '六年级下';
                break;
            default:
                break;
        }

        //console.log('in wrong ready: 使用完整功能选择年级，登陆用户');
        if (app.globalData.openid === undefined || app.globalData.openid === '') {
            that.setData({
                txtGrade: '未确认年级'
            });
        } else {
            that.setData({
                nickName: app.globalData.nickName + ' ',
                txtGrade: strGrade
            });
        }

    },

    onChange(e) {
        // Notify({ type: 'primary', message: e.detail });
        this.setData({
            activeKey: e.detail
        })
    },

    parseQstring: function (object, type) {
        let that = this;
        let str = [];
        let node = [];
        let len = 0, i = 0, j = 0;
        let you = [], fsfh = [], czs = [], cfz = [], cfm = [];
        let ecol = [];
        let frame = { zs: -1, fz: -1, fm: -1 };

        for (j = 0; j < object.length; j++) {
            //console.log(object[j]._id);

            str[j] = object[j].ques;
            node = str[j].split(' ');
            len = node.length;

            let eques = [];
            let rec = { id: '', ques: [] };

            for (i = 0; i < len; i++) {
                let frame = { zs: -1, fz: -1, fm: -1 };

                if (node[i][0] == 'f') {
                    you[i] = true;
                    node[i] = node[i].replace('f', '')
                    frame.zs = -1;

                    fsfh = node[i].split('/');
                    frame.fz = fsfh[0];
                    frame.fm = fsfh[1];
                } else if (node[i][0] != 'f') {
                    you[i] = false;
                    frame.zs = node[i];
                    frame.fz = -1;
                    frame.fm = -1;
                }
                eques.push(frame);
            }

            rec.id = object[j]._id;
            rec.ques = eques;

            ecol.push(rec);
        }

        switch (type) {
            case 0:
                that.setData({
                    wrong0: ecol,
                    count0: ecol.length
                })
                break;
            case 1:
                that.setData({
                    wrong1: ecol,
                    count1: ecol.length
                })
                break;
            case 2:
                that.setData({
                    wrong2: ecol,
                    count2: ecol.length
                })
                break;
            case 3:
                that.setData({
                    wrong3: ecol,
                    count3: ecol.length
                })
                break;
            case 4:
                that.setData({
                    wrong4: ecol,
                    count4: ecol.length
                })
                break;
            case 5:
                that.setData({
                    wrong5: ecol,
                    count5: ecol.length
                })
                break;
            case 6:
                that.setData({
                    wrong6: ecol,
                    count6: ecol.length
                })
                break;
            case 7:
                that.setData({
                    wrong7: ecol,
                    count7: ecol.length
                })
                break;
            case 8:
                that.setData({
                    wrong8: ecol,
                    count8: ecol.length
                })
                break;
            default:
                break;
        }

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
                list0.splice(quesIndex, 1); //截取指定的内容
                that.setData({ //重新渲染列表
                    wrong0: list0
                })
                break;
            case 1:
                let list1 = that.data.wrong1;
                list1.splice(quesIndex, 1); //截取指定的内容
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
        if (app.globalData.openid === undefined || app.globalData.openid === '') {
            wx.showModal({
                content: '请登陆微信使用完整功能',
                showCancel: false,
                success: function (res) {

                }
            })
        }
    },

})