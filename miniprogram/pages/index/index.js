//index.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import * as config from '../config/config.js';

let g1First = require('../ques/g1first.js');
let g1Second = require('../ques/g1second.js');
let g2First = require('../ques/g2first.js');
let g2Second = require('../ques/g2second.js');
let g3First = require('../ques/g3first.js');
let g3Second = require('../ques/g3second.js');
let g4First = require('../ques/g4first.js');
let g4Second = require('../ques/g4second.js');
let g5Second = require('../ques/g5second.js');
let g6Second = require('../ques/g6second.js');

const app = getApp();
const audio = wx.createInnerAudioContext(); //  audio

const QCOUNT = 6; //1组6道题
const FLOTERR = Number.EPSILON * Math.pow(2, 10);   //浮点数比对差值

const db = wx.cloud.database( );

let init;   // timer

Page({
    data: {
        avatarUrl: 'https://6173-ascpg-1301277680.tcb.qcloud.la/user-unlogin.png?sign=aff839f66cc8805071eab02ce2720cc8&t=1590301116',
        hasUserInfo: false,     //  用户信息标识
        //canIUse: wx.canIUse('button.open-type.getUserInfo'),    //  开放式授权检测

        userInfo: {},
        logged: false,          //  用户是否登陆
        takeSession: false,
        requestResult: '',
        openID: '',

        enMusic: false,
        enTimer: false,
        enSwitch: false,

        txtTimer: '0:00',
        mintue: 0,
        second: 0,

        mp3: 'cloud://ascpg.6173-ascpg-1301277680/bgm.mp3',

        wdQues: 12,         //  24格栅模型中，试题占宽
        wdAns: 5,           //  24格栅模型中，答案占宽

        tickColor0: 'white',
        tickColor1: 'white',
        tickColor2: 'white',
        tickColor3: 'white',
        tickColor4: 'white',
        tickColor5: 'white',

        quesType: 0,        //  0: 整数、小数四则   1: 分数四则     2：3题整数3题分数 
        //  3：整数小数方程和比例   4: 分数方程
        keyType: 0,         //  0： 整数    1：整数带余数   2：浮点数   3：分数
        typeDetail: 0,      //  试題细分类型 与picker初始化数组对应

        ques0: '',          //  无须编码部分试题字符串
        ques1: '',
        ques2: '',
        ques3: '',
        ques4: '',
        ques5: '',

        ans0: '',
        ans1: '',
        ans2: '',
        ans3: '',
        ans4: '',
        ans5: '',

        keys: [],               //  整数答案承接数组
        keyMods: [],            //  余数答案承接数组

        modJudg0: [0, 0],       //  整数答案判定结果数对，0：错 1：对，前整数，后余数
        modJudg1: [0, 0],
        modJudg2: [0, 0],
        modJudg3: [0, 0],
        modJudg4: [0, 0],
        modJudg5: [0, 0],

        keyZs: [],              //  分数答案数组
        keyFz: [],
        keyFm: [],

        fraJudg0: [0, 0, 0],    //  分数答案判定结果数对，0：错 1：对，一整数部分，二分子部分，三分母部分
        fraJudg1: [0, 0, 0],
        fraJudg2: [0, 0, 0],
        fraJudg3: [0, 0, 0],
        fraJudg4: [0, 0, 0],
        fraJudg5: [0, 0, 0],

        keyFraType: [],         //  综合类答案类型标识，1:整数 2：分数  3：带分数   4: 小数
        isDisabled0: false,     //  分子分母输入框不可用
        isDisabled1: false,
        isDisabled2: false,
        isDisabled3: false,
        isDisabled4: false,
        isDisabled5: false,

        curJudg: [0, 0, 0, 0, 0, 0],     //  6道题最终正误判定结果，0 未完成 1 正确 2 错误

        errQues: [],        //  当前错题集错题
        errRec: [],         //  错题集中该型错题

        showGrade: false,   //  pop弹窗开关
        showType: false,

        txtScreenGrade: '一年级上',
        txtScreenType: '5以内的加法或减法',
        txtButtonGrade: '一年级',

        curGrade: -1,            //  用户所在年级
        indexType: [],              //  picker 控件试题类型索引
        txtType: [],                //  picker 控件題型字符串 

        //usrExist: false,            //  排名表中用户记录是否存在

        grades: ['一年级上', '一年级下', '二年级上', '二年级下', '三年级上', '三年级下','四年级上', '四年级下', '五年级上', '五年级下', '六年级上', '六年级下'],
        type: [ { values: Object.keys(config.types), className: 'column1' },
                { values: config.types['一年级上'], className: 'column2',defaultIndex: 0 }
            ]
    },

    //
    // functions area
    //
    onLoad: function (e) {
        let that = this;

        if (!wx.cloud) {
            wx.redirectTo({
                //url: '../chooseLib/chooseLib',
            })
            return -1;
        }

        clearInterval(init); // 计时器归零
        that.data.minute = 0;
        that.data.second = 0;
    },

    onReady() {
        let that = this;
        let ret = 0;

        // initical question
        that.data.indexType = [0, 0];   //  初始类型
        ret = that.initQues(0);
        if (ret == -1)
            return -1;

        // app.globalData.testID = 520;
    },

    onUnload() {
        audio.stop();
    },

    onGetUserInfo: function (e) {
        let that = this;
        let gradeIndex = -1;

        if (!this.data.logged && e.detail.userInfo) {
            this.setData({
                logged: true,
                avatarUrl: e.detail.userInfo.avatarUrl,
                userInfo: e.detail.userInfo
            })
            //console.log('INDEX, app.globalData.nickName', e.detail.userInfo.nickName);

            app.globalData.nickName = e.detail.userInfo.nickName;
        }

        //获取用户 OpenID
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                //console.log('INDEX, res.result.openid', res.result.openid);

                app.globalData.openid = res.result.openid;
                that.data.openID = res.result.openid;
                //查询rank中有无当前用户，无则新增，有则读取年级等个人信息
                db.collection('user').where({
                    _openid: that.data.openID
                }).get({
                    success: res => {
                        if (res.data.length != 0) {
                            
                            db.collection('rank').where({
                                _openid: that.data.openID
                            }).get({
                                success: res => {
                                    if (res.data.length != 0) {
                                        //用库中数据初始化用户所在年级
                                        app.globalData.nickName = res.data[0].nickname;     //FIXME: 更新昵称
                                        app.globalData.tdyCorrt = res.data[0].tdycorrt;
                                        app.globalData.tdyFinih = res.data[0].tdyfinih;
                                        app.globalData.tdyRate = res.data[0].sevenrate[6];
                                        app.globalData.sevenRate = res.data[0].sevenrate;
                                        app.globalData.tolCorrt = res.data[0].tolcorrt;
                                        app.globalData.tolFinih = res.data[0].tolfinih;
                                    
                                    }
                                }
                            })
4
                            app.globalData.userGrade = res.data[0].grade;
                            let strGrade = '';
                            switch (res.data[0].grade) {
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

                            this.setData({
                                indexType: [res.data[0].grade, 0],

                                txtScreenGrade: strGrade,
                                txtScreenType: config.types[strGrade][0]
                            });
                        } else {
                            //pop窗口选择年级
                            that.setData({ showGrade: true });
                        }
                    }
                })

                let oDate = new Date();
                let vDate = oDate.getDate(); //获取当前日期
                //console.log('app.globalData.openid', app.globalData.openid);
                //console.log('vDate', vDate);

                //刷新签到记录表
                wx.cloud.callFunction({
                    name: 'updateRec',
                    data: {
                        id: app.globalData.openid,
                        date: vDate
                    },
                    success: res => {
                        console.log('[云函数] [updateRec] 调用成功', res);
                    },
                    fail: err => {
                        console.error('[云函数] [updateRec] 调用失败', err)
                    }
                })
            },
            fail: err => {
                console.error('[云函数] [login] 调用失败', err);

            }
        })

        

      
    },

   
    //  button START click
    onBtnStart: function (e) {
        let that = this;
        let type = 0, ret = 0;

        // start timer
        if (that.data.enTimer) {
            that.timerClear();
            init = setInterval(function () { that.timerWork() }, 1000);
        } else {
            //that.timerClear();
            that.setData({ txtTimer: '0:00' });
        }

        // play mp3
        if (that.data.enMusic) {
            audio.autoplay = true;
            audio.loop = true;
            audio.src = that.data.mp3;
            audio.stop();       // restart music
            audio.play();
        }

        // initical question && ticker
        ret = that.initQues(type);
        if (ret == -1)
            return -1;

        that.setData({
            enSwitch: true,

            tickColor0: 'white',
            tickColor1: 'white',
            tickColor2: 'white',
            tickColor3: 'white',
            tickColor4: 'white',
            tickColor5: 'white',

            //inpBorder: '2rpx solid lightgreen',
            isDisabled0: false,
            isDisabled1: false,
            isDisabled2: false,
            isDisabled3: false,
            isDisabled4: false,
            isDisabled5: false,

            ans0: '',
            ans1: '',
            ans2: '',
            ans3: '',
            ans4: '',
            ans5: '',

            mod0: '',
            mod1: '',
            mod2: '',
            mod3: '',
            mod4: '',
            mod5: '',

            ans0Zs: '',
            ans0Fz: '',
            ans0Fm: '',

            ans1Zs: '',
            ans1Fz: '',
            ans1Fm: '',

            ans2Zs: '',
            ans2Fz: '',
            ans2Fm: '',

            ans3Zs: '',
            ans3Fz: '',
            ans3Fm: '',

            ans4Zs: '',
            ans4Fz: '',
            ans4Fm: '',

            ans5Zs: '',
            ans5Fz: '',
            ans5Fm: '',

            modJudg0: [0, 0],    //  余数判定记录
            modJudg1: [0, 0],
            modJudg2: [0, 0],
            modJudg3: [0, 0],
            modJudg4: [0, 0],
            modJudg5: [0, 0],

            //  分数判定记录
            fraJudg0: [0, 0, 0], //  0：错 1：对，一整数部分，二分子部分，三分母部分
            fraJudg1: [0, 0, 0],
            fraJudg2: [0, 0, 0],
            fraJudg3: [0, 0, 0],
            fraJudg4: [0, 0, 0],
            fraJudg5: [0, 0, 0],

            curJudg: [0, 0, 0, 0, 0, 0]
        });
    },

    //  button SUBMIT click
    onBtnSubmit: function (e) {
        let that = this;
        let i = 0;
        let finishCount = 0, correctCount = 0, errorCount = 0;
        let tdyRate = 0, tdyFinish = 0;
        let len;
        let val1, val2, val3;
        //let usrExist = false;

        // stop timer
        if (that.data.enTimer)
            that.timerClear();

        // stop music
        if (that.data.enMusic)
            audio.pause();

        // for (i=0; i<6; i++) {
        //     if (that.data.curJudg[i] == 2)
        //         errorCount++;
        // }
        // FIXME:错题与未做题暂无法分离

        if (app.globalData.openid === undefined || app.globalData.openid === '') {
            //console.log('用户未登陆');
        } else {
            if (that.data.tickColor0 == 'red') {
                correctCount++;
            } else {
                db.collection('errcol').add({
                    data: {
                        //openID: that.data.openID,
                        type: that.data.typeDetail,
                        ques: that.data.ques0,
                    },
                    success: function (res) {
                        //console.log(res)
                    },
                    fail: console.error,
                    complete: console.log
                })
            }

            if (that.data.tickColor1 == 'red') {
                correctCount++;
            } else {
                db.collection('errcol').add({
                    data: {
                        //openID: that.data.openID,
                        type: that.data.typeDetail,
                        ques: that.data.ques1,
                    },
                    success: function (res) {
                        //console.log(res)
                    },
                    fail: console.error,
                    complete: console.log
                })
            }

            if (that.data.tickColor2 == 'red') {
                correctCount++;
            } else {
                db.collection('errcol').add({
                    data: {
                        //openID: that.data.openID,
                        type: that.data.typeDetail,
                        ques: that.data.ques2,
                    },
                    success: function (res) {
                        //console.log(res)
                    },
                    fail: console.error,
                    complete: console.log
                })
            }

            if (that.data.tickColor3 == 'red') {
                correctCount++;
            } else {
                db.collection('errcol').add({
                    data: {
                        //openID: that.data.openID,
                        type: that.data.typeDetail,
                        ques: that.data.ques3,
                    },
                    success: function (res) {
                        //console.log(res)
                    },
                    fail: console.error,
                    complete: console.log
                })
            }

            if (that.data.tickColor4 == 'red') {
                correctCount++;
            } else {
                db.collection('errcol').add({
                    data: {
                        //openID: that.data.openID,
                        type: that.data.typeDetail,
                        ques: that.data.ques4,
                    },
                    success: function (res) {
                        //console.log(res)
                    },
                    fail: console.error,
                    complete: console.log
                })
            }

            if (that.data.tickColor5 == 'red') {
                correctCount++;
            } else {
                db.collection('errcol').add({
                    data: {
                    // openID: that.data.openID,
                        type: that.data.typeDetail,
                        ques: that.data.ques5,
                    },
                    success: function (res) {
                        //console.log(res)
                    },
                    fail: console.error,
                    complete: console.log
                })
            }

            //  更新用户积分记录
            that.updateRank(correctCount);

        }

        //  重置答题框
        that.setData({
            enSwitch: false,

            tickColor0: 'white',
            tickColor1: 'white',
            tickColor2: 'white',
            tickColor3: 'white',
            tickColor4: 'white',
            tickColor5: 'white',

            //inpBorder: '2rpx solid lightgreen',
            isDisabled0: false,
            isDisabled1: false,
            isDisabled2: false,
            isDisabled3: false,
            isDisabled4: false,
            isDisabled5: false,

            ans0: '',
            ans1: '',
            ans2: '',
            ans3: '',
            ans4: '',
            ans5: '',

            mod0: '',
            mod1: '',
            mod2: '',
            mod3: '',
            mod4: '',
            mod5: '',

            ans0Zs: '',
            ans0Fz: '',
            ans0Fm: '',

            ans1Zs: '',
            ans1Fz: '',
            ans1Fm: '',

            ans2Zs: '',
            ans2Fz: '',
            ans2Fm: '',

            ans3Zs: '',
            ans3Fz: '',
            ans3Fm: '',

            ans4Zs: '',
            ans4Fz: '',
            ans4Fm: '',

            ans5Zs: '',
            ans5Fz: '',
            ans5Fm: '',

            modJudg0: [0, 0],    //  余数判定记录
            modJudg1: [0, 0],
            modJudg2: [0, 0],
            modJudg3: [0, 0],
            modJudg4: [0, 0],
            modJudg5: [0, 0],

            //  分数判定记录
            fraJudg0: [0, 0, 0], //  0：错 1：对，一整数部分，二分子部分，三分母部分
            fraJudg1: [0, 0, 0],
            fraJudg2: [0, 0, 0],
            fraJudg3: [0, 0, 0],
            fraJudg4: [0, 0, 0],
            fraJudg5: [0, 0, 0],

            curJudg: [0, 0, 0, 0, 0, 0]
        });
    },

    //  add or update user RANK record
    updateRank: function (correctCount) {
        let that = this;
        let curRate = 0;

        //  更新答题积分记录
        db.collection('rank').where({
            _openid: that.data.openID
            //uid: app.globalData.openid
        }).get({
            success: res => {
                if (res.data.length) {
                    //更新记录
                    let curCorrt = correctCount;
                    let preCorrt = res.data[0].tdycorrt;
                    let preFinih = res.data[0].tdyfinih;
                    let curRate = Math.round((preCorrt + curCorrt) / (preFinih + 6) * 100);

                    wx.cloud.callFunction({
                        name: 'upRank',
                        data: {
                            id: app.globalData.openid,
                            correct: curCorrt,
                            rate: curRate
                        }
                    })

                } else {    //  积分库内无该用户则新增
                    let curRate = Math.round(correctCount / 6 * 100);

                    db.collection('rank').add({
                        data: {
                            //openID: that.data.openID,
                            nickname: that.data.userInfo.nickName,
                            grade: app.globalData.userGrade,

                            tdycorrt: correctCount,
                            tdyfinih: 6,
                            tolcorrt: correctCount,
                            tolfinih: 6,
                            point: correctCount * 2 + 6,
                            sevenrate: [0, 0, 0, 0, 0, 0, curRate]
                        },
                        success: res => {
                            //console.log(res)
                        },
                        fail: console.error,
                        complete: console.log
                    })
                }
            }
        })
    },

    //  integer and float judgement
    onBluAns0: function (e) {
        let that = this;

        switch (that.data.keyType) {
            case 0:
                if (parseInt(e.detail.value) === that.data.keys[0]) {
                    that.setData({
                        tickColor0: 'red',
                    });
                } else {
                    // that.data.curJudg[0] = 2;
                }
            case 1:
                if (parseInt(e.detail.value) === that.data.keys[0]) {
                    that.data.modJudg0[0] = 1;         //整数部分判断结果

                    if (that.data.modJudg0[1] == 1) {
                        this.setData({
                            tickColor0: 'red',
                        });
                    }
                } else {
                    // that.data.curJudg[0] = 2;
                }
                break;
            case 2:
                if (Math.abs(e.detail.value - that.data.keys[0]) <= FLOTERR) {
                    this.setData({
                        tickColor0: 'red',
                    });
                } else {
                    // that.data.curJudg[0] = 2;
                }
                break;
            default:
                break;
        }

        return 0;
    },

    onBluAns1: function (e) {
        let that = this;

        switch (that.data.keyType) {
            case 0:
                if (parseInt(e.detail.value) === that.data.keys[1]) {
                    that.setData({
                        tickColor1: 'red',
                    });
                } else {
                    // that.data.curJudg[1] = 2;
                }
            case 1:
                if (parseInt(e.detail.value) === that.data.keys[1]) {
                    that.data.modJudg1[0] = 1;         //整数部分判断结果

                    if (that.data.modJudg1[1] == 1) {
                        this.setData({
                            tickColor1: 'red',
                        });
                    }
                } else {
                    // that.data.curJudg[1] = 2;
                }
                break;
            case 2:
                if (Math.abs(e.detail.value - that.data.keys[1]) <= FLOTERR) {
                    this.setData({
                        tickColor1: 'red',
                    });
                } else {
                    // that.data.curJudg[1] = 2;
                }
                break;
            case 3:
                break;
            default:
                break;
        }

        return 0;
    },

    onBluAns2: function (e) {
        let that = this;

        switch (that.data.keyType) {
            case 0:
                if (parseInt(e.detail.value) === that.data.keys[2]) {
                    that.setData({
                        tickColor2: 'red',
                    });
                } else {
                    // that.data.curJudg[2] = 2;
                }
            case 1:
                if (parseInt(e.detail.value) === that.data.keys[2]) {
                    that.data.modJudg2[0] = 1;         //整数部分判断结果

                    if (that.data.modJudg2[1] == 1) {
                        this.setData({
                            tickColor2: 'red',
                        });
                    }
                } else {
                    // that.data.curJudg[2] = 2;
                }
                break;
            case 2:
                if (Math.abs(e.detail.value - that.data.keys[3]) <= FLOTERR) {
                    this.setData({
                        tickColor2: 'red',
                    });
                } else {
                    // that.data.curJudg[2] = 2;
                }
                break;
            case 3:
                break;
            default:
                break;
        }

        return 0;
    },

    onBluAns3: function (e) {
        let that = this;

        switch (that.data.keyType) {
            case 0:
                if (parseInt(e.detail.value) === that.data.keys[3]) {
                    that.setData({
                        tickColor3: 'red',
                    });
                } else {
                    // that.data.curJudg[3] = 2;
                }
            case 1:
                if (parseInt(e.detail.value) === that.data.keys[3]) {
                    that.data.modJudg3[0] = 1;         //整数部分判断结果

                    if (that.data.modJudg3[1] == 1) {
                        this.setData({
                            tickColor3: 'red',
                        });
                    }
                } else {
                    // that.data.curJudg[3] = 2;
                }
                break;
            case 2:
                if (Math.abs(e.detail.value - that.data.keys[3]) <= FLOTERR) {
                    this.setData({
                        tickColor3: 'red',
                    });
                } else {
                    // that.data.curJudg[3] = 2;
                }
                break;
            case 3:
                break;
            default:
                break;
        }

        return 0;
    },

    onBluAns4: function (e) {
        let that = this;

        switch (that.data.keyType) {
            case 0:
                if (parseInt(e.detail.value) === that.data.keys[4]) {
                    that.setData({
                        tickColor4: 'red',
                    });
                } else {
                    // that.data.curJudg[4] = 2;
                }
            case 1:
                if (parseInt(e.detail.value) === that.data.keys[4]) {
                    that.data.modJudg4[0] = 1;         //整数部分判断结果

                    if (that.data.modJudg4[1] == 1) {
                        this.setData({
                            tickColor4: 'red',
                        });
                    }
                } else {
                    // that.data.curJudg[4] = 2;
                }
                break;
            case 2:
                if (Math.abs(e.detail.value - that.data.keys[4]) <= FLOTERR) {
                    this.setData({
                        tickColor4: 'red',
                    });
                } else {
                    // that.data.curJudg[4] = 2;
                }
                break;
            case 3:
                break;
            default:
                break;
        }

        return 0;
    },

    onBluAns5: function (e) {
        let that = this;

        switch (that.data.keyType) {
            case 0:
                if (parseInt(e.detail.value) === that.data.keys[5]) {
                    that.setData({
                        tickColor5: 'red',
                    });
                } else {
                    // that.data.curJudg[5] = 2;
                }
            case 1:
                if (parseInt(e.detail.value) === that.data.keys[5]) {
                    that.data.modJudg5[0] = 1;         //整数部分判断结果

                    if (that.data.modJudg5[1] == 1) {
                        this.setData({
                            tickColor0: 'red',
                        });
                    }
                } else {
                    // that.data.curJudg[5] = 2;
                }
                break;
            case 2:
                if (Math.abs(e.detail.value - that.data.keys[5]) <= FLOTERR) {
                    this.setData({
                        tickColor5: 'red',
                    });
                } else {
                    // that.data.curJudg[5] = 2;
                }
                break;
            case 3:
                break;
            default:
                break;
        }

        return 0;
    },

    onBluMod0: function (e) {
        let that = this;

        if (parseInt(e.detail.value) === that.data.keyMods[0]) {
            that.data.modJudg0[1] = 1        //余数部分判定
            if (that.data.modJudg0[0] == 1) {
                this.setData({
                    tickColor0: 'red',
                });
            }
        } else {
            // that.data.curJudg[0] = 2;
        }
    },

    onBluMod1: function (e) {
        let that = this;

        if (parseInt(e.detail.value) === that.data.keyMods[1]) {
            that.data.modJudg1[1] = 1        //余数部分判定
            if (that.data.modJudg1[0] == 1) {
                this.setData({
                    tickColor1: 'red',
                });
            }
        } else {
            // that.data.curJudg[1] = 2;
        }
    },

    onBluMod2: function (e) {
        let that = this;

        if (parseInt(e.detail.value) === that.data.keyMods[2]) {
            that.data.modJudg2[1] = 1        //余数部分判定
            if (that.data.modJudg2[0] == 1) {
                this.setData({
                    tickColor2: 'red',
                });
            }
        } else {
            // that.data.curJudg[2] = 2;
        }
    },

    onBluMod3: function (e) {
        let that = this;

        if (parseInt(e.detail.value) === that.data.keyMods[3]) {
            that.data.modJudg3[1] = 1        //余数部分判定
            if (that.data.modJudg3[0] == 1) {
                this.setData({
                    tickColor3: 'red',
                });
            }
        } else {
            // that.data.curJudg[3] = 2;
        }
    },

    onBluMod4: function (e) {
        let that = this;

        if (parseInt(e.detail.value) === that.data.keyMods[4]) {
            that.data.modJudg4[1] = 1        //余数部分判定
            if (that.data.modJudg4[0] == 1) {
                this.setData({
                    tickColor4: 'red',
                });
            }
        } else {
            // that.data.curJudg[4] = 2;
        }
    },

    onBluMod5: function (e) {
        let that = this;

        if (parseInt(e.detail.value) === that.data.keyMods[5]) {
            that.data.modJudg5[1] = 1        //余数部分判定
            if (that.data.modJudg5[0] == 1) {
                this.setData({
                    tickColor5: 'red',
                });
            }
        } else {
            // that.data.curJudg[5] = 2;
        }
    },

    //  fraction type answer judgement
    //  check answer 0    
    onInpBlurAns0Zs: function (e) {
        let that = this;

        // console.log('that.data.keyFraType[0]', that.data.keyFraType[0]);
        // console.log('e.detail.value', e.detail.value);
        // console.log('that.data.keyZs[0]', that.data.keyZs[0]);

        switch (that.data.keyFraType[0]) {
            case 1:     //答案为整数时，直接比对
                if (parseInt(e.detail.value) === that.data.keyZs[0]) {
                    that.setData({
                        tickColor0: 'red',
                        isDisabled0: true,
                    });
                }
                // 分数部分禁用输入

                break;
            case 4:     //答案为小数时，差值比对
                if (Math.abs(that.data.keyZs[0] - e.detail.value) <= FLOTERR) {
                    //if (Math.abs(that.data.keyZs0 - e.detail.value) <= FLOTERR) {

                    this.setData({
                        tickColor0: 'red',
                        isDisabled0: true,
                        //inpBorder: '3rpx solid gray'
                    });
                }
                // 分数部分禁用输入
                break;
            case 2:    //答案为纯分数时，整数部分为空
                if (e.detail.value == '' && that.data.keyZs[0] == 0)
                    that.data.fraJudg0[0] = 1;
                break;
            case 3:
                if (parseInt(e.detail.value) === that.data.keyZs[0]) {
                    that.data.fraJudg0[0] = 1;
                    if (that.data.fraJudg0[0] == 1 && that.data.fraJudg0[1] == 1 && that.data.fraJudg0[2] == 1) {
                        that.setData({
                            tickColor0: 'red',
                        });
                    }
                }
                break;
            default:
                break;
        }
    },

    onInpBlurAns0Fz: function (e) {
        let that = this;

        if (parseInt(e.detail.value) === that.data.keyFz[0]) {
            //that.data.isKey0Fz = true;
            that.data.fraJudg0[1] = 1;
        }

        if (that.data.keyFraType[0] == 2) {
            if (that.data.fraJudg0[1] == 1 && that.data.fraJudg0[2] == 1) {
                that.setData({
                    tickColor0: 'red',
                });
            }
        } else if (that.data.keyFraType[0] == 3) {
            if (that.data.fraJudg0[0] == 1 && that.data.fraJudg0[1] == 1 && that.data.fraJudg0[2] == 1) {
                that.setData({
                    tickColor0: 'red',
                });
            }
        }
    },

    onInpBlurAns0Fm: function (e) {
        let that = this;

        if (parseInt(e.detail.value) === that.data.keyFm[0]) {
            // that.data.isKey0Fm = true;
            that.data.fraJudg0[2] = 1;
        }

        if (that.data.keyFraType[0] == 2) {
            if (that.data.fraJudg0[1] == 1 && that.data.fraJudg0[2] == 1) {
                that.setData({
                    tickColor0: 'red',
                });
            }
        } else if (that.data.keyFraType[0] == 3) {
            if (that.data.fraJudg0[0] == 1 && that.data.fraJudg0[1] == 1 && that.data.fraJudg0[2] == 1) {
                that.setData({
                    tickColor0: 'red',
                });
            }
        }
    },

    //  check answer 1   
    onInpBlurAns1Zs: function (e) {
        let that = this;

        switch (that.data.keyFraType[1]) {
            case 1://答案为整数时，直接比对
                    if (parseInt(e.detail.value) === that.data.keyZs[1]) {
                        that.setData({
                            tickColor1: 'red',
                            isDisabled1: true,
                        });
                    }
                // 分数部分禁用输入

                break;
            case 4:     //答案为小数时，差值比对
                if (Math.abs(that.data.keyZs[1] - e.detail.value) <= FLOTERR) {
                    this.setData({
                        tickColor1: 'red',
                        isDisabled1: true,
                        //inpBorder: '3rpx solid gray'
                    });
                }
                // 分数部分禁用输入
                break;
            case 2:    //答案为纯分数时，整数部分为空
                if (e.detail.value == '' && that.data.keyZs[1] == 0) {
                    that.data.fraJudg1[0] = 1;
                } else {
                    that.data.fraJudg1[0] = 0;
                }

                break;
            case 3:
                if (parseInt(e.detail.value) === that.data.keyZs[1]) {
                    that.data.fraJudg1[0] = 1;
                    if (that.data.fraJudg1[0] == 1 && that.data.fraJudg1[1] == 1 && that.data.fraJudg1[2] == 1) {
                        that.setData({
                            tickColor1: 'red',
                        });
                    }
                }
                break;
            default:
                break;
        }
    },

    onInpBlurAns1Fz: function (e) {
        let that = this;

        if (parseInt(e.detail.value) === that.data.keyFz[1]) {
            that.data.fraJudg1[1] = 1;
        } else {
            that.data.fraJudg1[1] = 0;
        }

        if (that.data.keyFraType[1] == 2) {
            if (that.data.fraJudg1[1] == 1 && that.data.fraJudg1[2] == 1) {
                that.setData({
                    tickColor1: 'red',
                });
            }
        } else if (that.data.keyFraType[1] == 3) {
            if (that.data.fraJudg1[0] == 1 && that.data.fraJudg1[1] == 1 && that.data.fraJudg1[2] == 1) {
                that.setData({
                    tickColor1: 'red',
                });
            }
        }
    },

    onInpBlurAns1Fm: function (e) {
        let that = this;

        if (parseInt(e.detail.value) === that.data.keyFm[1]) {
            that.data.fraJudg1[2] = 1;
        } else {
            that.data.fraJudg1[2] = 0;
        }

        if (that.data.keyFraType[1] == 2) {
            if (that.data.fraJudg1[1] == 1 && that.data.fraJudg1[2] == 1) {
                that.setData({
                    tickColor1: 'red',
                });
            }
        } else if (that.data.keyFraType[1] == 3) {
            if (that.data.fraJudg1[0] == 1 && that.data.fraJudg1[1] == 1 && that.data.fraJudg1[2] == 1) {
                that.setData({
                    tickColor1: 'red',
                });
            }
        }
    },

    //  check answer 2   
    onInpBlurAns2Zs: function (e) {
        let that = this;

        switch (that.data.keyFraType[2]) {
            case 1:     //答案为整数时，直接比对
                    if (parseInt(e.detail.value) === that.data.keyZs[2]) {
                        that.setData({
                            tickColor2: 'red',
                            isDisabled2: true,
                        });
                    }
                break;
            case 4:     //答案为小数时，差值比对
                if (Math.abs(that.data.keyZs[2] - e.detail.value) <= FLOTERR) {
                    this.setData({
                        tickColor2: 'red',
                        isDisabled2: true,
                        //inpBorder: '3rpx solid gray'
                    });
                }
                // 分数部分禁用输入
                break;
            case 2:    //答案为纯分数时，整数部分为空
                if (e.detail.value == '' && that.data.keyZs[2] == 0) {
                    that.data.fraJudg2[0] = 1;
                 }// else {
                //     that.data.fraJudg2[0] = 0;
                // }

                break;
            case 3:
                if (parseInt(e.detail.value) === that.data.keyZs[2]) {
                    that.data.fraJudg2[0] = 1;
                    if (that.data.fraJudg2[0] == 1 && that.data.fraJudg2[1] == 1 && that.data.fraJudg2[2] == 1) {
                        that.setData({
                            tickColor2: 'red',
                        });
                    }
                }
                break;
            default:
                break;
        }
    },

    onInpBlurAns2Fz: function (e) {
        let that = this;

        if (parseInt(e.detail.value) === that.data.keyFz[2]) {
            that.data.fraJudg2[1] = 1;
        } else {
            that.data.fraJudg2[1] = 0;
        }

        if (that.data.keyFraType[2] == 2) {
            if (that.data.fraJudg2[1] == 1 && that.data.fraJudg2[2] == 1) {
                that.setData({
                    tickColor2: 'red',
                });
            }
        } else if (that.data.keyFraType[2] == 3) {
            if (that.data.fraJudg2[0] == 1 && that.data.fraJudg2[1] == 1 && that.data.fraJudg2[2] == 1) {
                that.setData({
                    tickColor2: 'red',
                });
            }
        }
    },

    onInpBlurAns2Fm: function (e) {
        let that = this;

        if (parseInt(e.detail.value) === that.data.keyFm[2]) {
            that.data.fraJudg2[2] = 1;
        } else {
            that.data.fraJudg2[2] = 0;
        }

        if (that.data.keyFraType[2] == 2) {
            if (that.data.fraJudg2[1] == 1 && that.data.fraJudg2[2] == 1) {
                that.setData({
                    tickColor2: 'red',
                });
            }
        } else if (that.data.keyFraType[2] == 3) {
            if (that.data.fraJudg2[0] == 1 && that.data.fraJudg2[1] == 1 && that.data.fraJudg2[2] == 1) {
                that.setData({
                    tickColor2: 'red',
                });
            }
        }
    },

    //  check answer 3
    onInpBlurAns3Zs: function (e) {
        let that = this;

        switch (that.data.keyFraType[3]) {
            case 1:     //答案为整数时，直接比对
                    if (parseInt(e.detail.value) === that.data.keyZs[3]) {
                        that.setData({
                            tickColor3: 'red',
                            isDisabled3: true,
                        });
                    }
                // 分数部分禁用输入

                break;
            case 4:     //答案为小数时，差值比对
                if (Math.abs(that.data.keyZs[3] - e.detail.value) <= FLOTERR) {
                    this.setData({
                        tickColor3: 'red',
                        isDisabled3: true,
                        //inpBorder: '3rpx solid gray'
                    });
                }
                // 分数部分禁用输入
                break;
            case 2:    //答案为纯分数时，整数部分为空
                if (e.detail.value == '' && that.data.keyZs[3] == 0) {
                    that.data.fraJudg3[0] = 1;
                } else {
                    that.data.fraJudg3[0] = 0;
                }

                break;
            case 3:
                if (parseInt(e.detail.value) === that.data.keyZs[3]) {
                    that.data.fraJudg3[0] = 1;
                    if (that.data.fraJudg3[0] == 1 && that.data.fraJudg3[1] == 1 && that.data.fraJudg3[2] == 1) {
                        that.setData({
                            tickColor3: 'red',
                        });
                    }
                }
                break;
            default:
                break;
        }
    },

    onInpBlurAns3Fz: function (e) {
        let that = this;

        if (parseInt(e.detail.value) === that.data.keyFz[3]) {
            that.data.fraJudg3[1] = 1;
        } else {
            that.data.fraJudg3[1] = 0;
        }

        if (that.data.keyFraType[3] == 2) {
            if (that.data.fraJudg3[1] == 1 && that.data.fraJudg3[2] == 1) {
                that.setData({
                    tickColor3: 'red',
                });
            }
        } else if (that.data.keyFraType[3] == 3) {
            if (that.data.fraJudg3[0] == 1 && that.data.fraJudg3[1] == 1 && that.data.fraJudg3[2] == 1) {
                that.setData({
                    tickColor3: 'red',
                });
            }
        }
    },

    onInpBlurAns3Fm: function (e) {
        let that = this;
        if (parseInt(e.detail.value) === that.data.keyFm[3]) {
            that.data.fraJudg3[2] = 1;
        } else {
            that.data.fraJudg3[2] = 0;
        }

        if (that.data.keyFraType[3] == 2) {
            if (that.data.fraJudg3[1] == 1 && that.data.fraJudg3[2] == 1) {
                that.setData({
                    tickColor3: 'red',
                });
            }
        } else if (that.data.keyFraType[3] == 3) {
            if (that.data.fraJudg3[0] == 1 && that.data.fraJudg3[1] == 1 && that.data.fraJudg3[2] == 1) {
                that.setData({
                    tickColor3: 'red',
                });
            }
        }
    },

    //  check answer 4  
    onInpBlurAns4Zs: function (e) {
        let that = this;

        switch (that.data.keyFraType[4]) {
            case 1:     //答案为整数时，直接比对
                    if (parseInt(e.detail.value) === that.data.keyZs[4]) {
                        that.setData({
                            tickColor4: 'red',
                            isDisabled4: true,
                        });
                    }
                // 分数部分禁用输入

                break;
            case 4:     //答案为小数时，差值比对
                if (Math.abs(that.data.keyZs[4] - e.detail.value) <= FLOTERR) {
                    this.setData({
                        tickColor4: 'red',
                        isDisabled4: true,
                        //inpBorder: '3rpx solid gray'
                    });
                }
                // 分数部分禁用输入
                break;
            case 2:    //答案为纯分数时，整数部分为空
                if (e.detail.value == '' && that.data.keyZs[4] == 0) {
                    that.data.fraJudg4[0] = 1;
                } else {
                    that.data.fraJudg4[0] = 0;
                }

                break;
            case 3:
                if (parseInt(e.detail.value) === that.data.keyZs[4]) {
                    that.data.fraJudg4[0] = 1;
                    if (that.data.fraJudg4[0] == 1 && that.data.fraJudg4[1] == 1 && that.data.fraJudg4[2] == 1) {
                        that.setData({
                            tickColor4: 'red',
                        });
                    }
                }
                break;
            default:
                break;
        }
    },

    onInpBlurAns4Fz: function (e) {
        let that = this;

        if (parseInt(e.detail.value) === that.data.keyFz[4]) {
            that.data.fraJudg4[1] = 1;
        } else {
            that.data.fraJudg4[1] = 0;
        }

        if (that.data.keyFraType[4] == 2) {
            if (that.data.fraJudg4[1] == 1 && that.data.fraJudg4[2] == 1) {
                that.setData({
                    tickColor4: 'red',
                });
            }
        } else if (that.data.keyFraType[4] == 3) {
            if (that.data.fraJudg4[0] == 1 && that.data.fraJudg4[1] == 1 && that.data.fraJudg4[2] == 1) {
                that.setData({
                    tickColor4: 'red',
                });
            }
        }
    },

    onInpBlurAns4Fm: function (e) {
        let that = this;

        if (parseInt(e.detail.value) === that.data.keyFm[4]) {
            that.data.fraJudg4[2] = 1;
        } else {
            that.data.fraJudg4[2] = 0;
        }

        if (that.data.keyFraType[4] == 2) {
            if (that.data.fraJudg4[1] == 1 && that.data.fraJudg4[2] == 1) {
                that.setData({
                    tickColor4: 'red',
                });
            }
        } else if (that.data.keyFraType[4] == 3) {
            if (that.data.fraJudg4[0] == 1 && that.data.fraJudg4[1] == 1 && that.data.fraJudg4[2] == 1) {
                that.setData({
                    tickColor4: 'red',
                });
            }
        }
    },

    //  check answer 5
    onInpBlurAns5Zs: function (e) {
        let that = this;

        switch (that.data.keyFraType[5]) {
            case 1:     //答案为整数时，直接比对
                    if (parseInt(e.detail.value) === that.data.keyZs[5]) {
                        that.setData({
                            tickColor5: 'red',
                            isDisabled5: true,
                        });
                    }
                // 分数部分禁用输入

                break;
            case 4:     //答案为小数时，差值比对
                if (Math.abs(that.data.keyZs[5] - e.detail.value) <= FLOTERR) {
                    this.setData({
                        tickColor5: 'red',
                        isDisabled5: true,
                        //inpBorder: '3rpx solid gray'
                    });
                }
                // 分数部分禁用输入
                break;
            case 2:    //答案为纯分数时，整数部分为空
                if (e.detail.value == '' && that.data.keyZs[5] == 0) {
                    that.data.fraJudg5[0] = 1;
                } else {
                    that.data.fraJudg5[0] = 0;
                }

                break;
            case 3:
                if (parseInt(e.detail.value) === that.data.keyZs[5]) {
                    that.data.fraJudg5[0] = 1;
                    if (that.data.fraJudg5[0] == 1 && that.data.fraJudg5[1] == 1 && that.data.fraJudg5[2] == 1) {
                        that.setData({
                            tickColor5: 'red',
                        });
                    }
                }
                break;
            default:
                break;
        }
    },

    onInpBlurAns5Fz: function (e) {
        let that = this;

        if (parseInt(e.detail.value) === that.data.keyFz[5]) {
            that.data.fraJudg5[1] = 1;
        } else {
            that.data.fraJudg5[1] = 0;
        }

        if (that.data.keyFraType[5] == 2) {
            if (that.data.fraJudg5[1] == 1 && that.data.fraJudg5[2] == 1) {
                that.setData({
                    tickColor5: 'red',
                });
            }
        } else if (that.data.keyFraType[5] == 3) {
            if (that.data.fraJudg5[0] == 1 && that.data.fraJudg5[1] == 1 && that.data.fraJudg5[2] == 1) {
                that.setData({
                    tickColor5: 'red',
                });
            }
        }
    },

    onInpBlurAns5Fm: function (e) {
        let that = this;

        if (parseInt(e.detail.value) === that.data.keyFm[5]) {
            that.data.fraJudg5[2] = 1;
        } else {
            that.data.fraJudg5[2] = 0;
        }

        if (that.data.keyFraType[5] == 2) {
            if (that.data.fraJudg5[1] == 1 && that.data.fraJudg5[2] == 1) {
                that.setData({
                    tickColor5: 'red',
                });
            }
        } else if (that.data.keyFraType[5] == 3) {
            if (that.data.fraJudg5[0] == 1 && that.data.fraJudg5[1] == 1 && that.data.fraJudg5[2] == 1) {
                that.setData({
                    tickColor5: 'red',
                });
            }
        }
    },

    //  switch
    onChangeTimer({ detail }) {
        let that = this;

        this.setData({ enTimer: detail });
    },

    onChangeMusic({ detail }) {
        let that = this;

        this.setData({ enMusic: detail });
    },

    //  pop up
    onTapVwType: function (e) {
        this.setData({ showType: true });
    },

    onTapVwGrade: function (e) {

    },

    onPopTypeClose() {
        this.setData({ showType: false });
    },

    onPopGradeClose() {
        this.setData({ showGrade: false });
    },

    onChangeGrade(event) {
        // const { picker, value, index } = event.detail;
        // Toast(`当前值：${value}, 当前索引：${index}`);
    },

    onConfirmGrade(event) {
        let that = this;
        let txtGrade = '';
        const { picker, value, index } = event.detail;
        //Toast(`当前值：${value}, 当前索引：${index}`);

        switch (index) {
            case 0:
                txtGrade = '一年级上';
                break;
            case 1:
                txtGrade = '一年级下';
                break;
            case 2:
                txtGrade = '二年级上';
                break;
            case 3:
                txtGrade = '二年级下';
                break;
            case 4:
                txtGrade = '三年级上';
                break;
            case 5:
                txtGrade = '三年级下';
                break;
            case 6:
                txtGrade = '四年级上';
                break;
            case 7:
                txtGrade = '四年级下';
                break;
            case 8:
                txtGrade = '五年级上';
                break;
            case 9:
                txtGrade = '五年级下';
                break;
            case 10:
                txtGrade = '六年级上';
                break;
            case 11:
                txtGrade = '六年级下';
                break;
            default:
                break;
        }

        //that.data.userGrade = index + 1;

        db.collection('user').add({
            data: {
                //openID: that.data.openID,
                grade: index,
                nickname: app.globalData.nickName
            },
            success: function (res) {
                //console.log(res)
            },
            fail: console.error,
            complete: console.log
        })

        db.collection('loginRec').add({
            data: {
                //openID: that.data.openID,
                rec:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            success: function (res) {
                let oDate = new Date();
                let vDate = oDate.getDate(); //获取当前日期

                //刷新签到记录表
                wx.cloud.callFunction({
                    name: 'updateRec',
                    data: {
                        id: app.globalData.openid,
                        date: vDate
                    },
                    success: res => {
                        console.log('[云函数] [updateRec] 调用成功', res);
                    },
                    fail: err => {
                        console.error('[云函数] [updateRec] 调用失败', err)
                    }
                })
            },
            fail: console.error,
            complete: console.log
        })
        
        app.globalData.userGrade = index;

        this.setData({
            showGrade: false,

            indexType: [index, 0],
            txtScreenGrade: txtGrade,
            txtScreenType: config.types[txtGrade][0]

        });

        //picker.setColumnValues(index, config.types[value[0]]);

    },

    onCancelGrade() {
        //Toast('取消');
        this.setData({ showGrade: false });
    },

    onChangeType(event) {
        const { picker, value, index } = event.detail;
        picker.setColumnValues(1, config.types[value[0]]);
    },

    onConfirmType(e) {
        let that = this;

        that.data.indexType = e.detail.index;

        this.setData({
            txtScreenGrade: e.detail.value[0],
            txtScreenType: e.detail.value[1],
            showType: false
        });
    },

    onCancelType() {
        this.setData({ showType: false });
    },

    onHide() {
        if (app.globalData.openid === undefined || app.globalData.openid === '') {
            wx.showModal({
                content: '请登陆微信使用完整功能',
                showCancel: false,
                success: function (res) {

                }
            })
        }
    },


    // timer function
    timerClear: function (e) { //计时归零
        var that = this;

        that.data.minute = 0;
        that.data.second = 0;

        clearInterval(init);
    },

    timerWork: function () {
        let that = this;
        let sec = that.data.second;
        let secVal = sec;
        let mut = that.data.minute;
        let mutVal = mut;

        if (sec < 10)
            secVal = '0' + sec;            // 少于10补零
        else
            secVal = sec;

        that.data.second = sec + 1;

        if (sec >= 60) {
            sec = 0,
                that.data.second = 0;       // 满60归0
            mutVal = mut + 1;

            if (mut >= 10)
                mutVal = mut % 10;      //  分数满10归0            

            that.data.minute = mutVal;
        }

        that.setData({ txtTimer: mutVal + ":" + secVal, });
    },

    // decode question type
    initQues(type) {
        let that = this;
        let ret;
        let idxType = that.data.indexType;

        switch (idxType[0]) {        //  FIXME: double switch
            case 0:             //  一年级上
                switch (idxType[1]) {
                    case 0:     // 5以内加法或减法
                        ret = g1First.g1First5AorS(0, 0, this);
                        that.data.typeDetail = 0;
                        break;
                    case 1:     //  10以内加法或减法
                        ret = g1First.g1First10AorS(0, 1, this);
                        that.data.typeDetail = 1;
                        break;
                    case 2:     //  10以内连加或连减
                        ret = g1First.g1First10DulAorS(0, 2, this);
                        that.data.typeDetail = 2;
                        break;
                    case 3:     //  10以内加减混合
                        ret = g1First.g1First10AandS(0, 3, this);
                        that.data.typeDetail = 3;
                        break;
                    case 4:     //  10加个位数
                        ret = g1First.g1First10A1b(0, 4, this);
                        that.data.typeDetail = 4;
                        break;
                    case 5:     //  20以内进位加法
                        ret = g1First.g1First20ACarry(0, 5, this);
                        that.data.typeDetail = 5;
                        break;
                    default:
                        return -1;
                }
                break;
            case 1:             //  一年级下
                switch (idxType[1]) {
                    case 0:     //  20以内退位减法
                        ret = g1Second.g1Second20SBorrow(1, 0, this);
                        that.data.typeDetail = 10;
                        break;
                    case 1:     //  20以内加法或减法
                        ret = g1Second.g1Second20AorS(1, 1, this);
                        that.data.typeDetail = 11;
                        break;
                    case 2:     //  整十加减整十
                        ret = g1Second.g1Second10AandS10(1, 2, this);
                        that.data.typeDetail = 12;
                        break;
                    case 3:     //  两位数加减一位数或整十数
                        ret = g1Second.g1Second2bAandS10(1, 3, this);
                        that.data.typeDetail = 13;
                        break;
                    case 4:     //  20以内连加或连减
                        ret = g1Second.g1Second20DulAorS(1, 4, this);
                        that.data.typeDetail = 14;
                        break;
                    case 5:      //  20以内加减混合
                        ret = g1Second.g1Second20AandS(1, 5, this);
                        that.data.typeDetail = 15;
                        break;
                    default:
                        break;
                }
                break;
            case 2:             //  二年级上
                switch (idxType[1]) {
                    case 0:     //  两位数加减一位或两位数无进位退位
                        ret = g2First.f2bAorS12bNoCarry(2, 0, this);
                        that.data.typeDetail = 20;
                        break;
                    case 1:     //  100以内连加或连减
                        ret = g2First.f100DulAorS(2, 1, this);
                        that.data.typeDetail = 21;
                        break;
                    case 2:      //  100以内加减混合
                        ret = g2First.f100AandS(2, 2, this);
                        that.data.typeDetail = 22;
                        break;
                    case 3:      //   6以内乘法
                        ret = g2First.f66M(2, 3, this);
                        that.data.typeDetail = 23;
                        break;
                    case 4:     //   表内乘法
                        ret = g2First.f99M(2, 4, this);
                        that.data.typeDetail = 24;
                        break;
                    case 5:     //   表内除法
                        ret = g2First.f9D(2, 5, this);
                        that.data.typeDetail = 25;
                        break;
                    case 6:      //   100以内连乘或连除
                        ret = g2First.f100DoulMorD(2, 6, this);
                        that.data.typeDetail = 26;
                        break;
                    case 7:     //   100以内乘除混合
                        ret = g2First.f100MandD(2, 7, this);
                        that.data.typeDetail = 27;
                        break;
                    case 8:      //   100以内乘与加或乘与减
                        ret = g2First.f100MandAS(2, 8, this);
                        that.data.typeDetail = 28;
                        break;
                    default:
                        break;
                }
                // console.log(that.data.keys);
                break;
            case 3:             //  二年级下
                switch (idxType[1]) {
                    case 0:     //   几百几十相加或减
                        ret = g2Second.f110AorS(3, 0, this);
                        that.data.typeDetail = 30;
                        break;
                    case 1:     //   几千几百相加或减
                        ret = g2Second.f1100AorS(3, 1, this);
                        that.data.typeDetail = 31;
                        break;
                    case 2:     //   几千几百与几百几十相加或减
                        ret = g2Second.f1100AorS110(3, 2, this);
                        that.data.typeDetail = 32;
                        break;
                    case 3:      //   三位数加减法
                        ret = g2Second.f3bAorS(3, 3, this);
                        that.data.typeDetail = 33;
                        break;
                    case 4:     //   两位数加减两位数含进位退位
                        ret = g2Second.f2bAorSCarry(3, 4, this);
                        that.data.typeDetail = 34;
                        break;
                    case 5:     //   表内乘、除法
                        ret = g2Second.f1bMorD(3, 5, this);
                        that.data.typeDetail = 35;
                        break;
                    case 6:      //   有余数除法
                        ret = g2Second.f2bDMod(3, 6, this);
                        that.data.typeDetail = 36;
                        break;
                    case 7:      //   两位数连加或连减
                        ret = g2Second.f2bDulAandS(3, 7, this);
                        that.data.typeDetail = 37;
                        break;
                    case 8:      //   两位数加减混合
                        ret = g2Second.f2bAandS(3, 8, this);
                        that.data.typeDetail = 38;
                        break;
                    default:
                        break;
                }
                // console.log(that.data.keys);

                break;
            case 4:             //  三年级上
                switch (idxType[1]) {
                    case 0:      //   整十整百乘一位数
                        ret = g3First.f110M1b(4, 0, this);
                        that.data.typeDetail = 40;
                        break;
                    case 1:     //   整十整百除一位数
                        ret = g3First.f110D1b(4, 1, this);
                        that.data.typeDetail = 41;
                        break;
                    case 2:     //   两位数三位数乘一位数
                        ret = g3First.f3b2bD1b(4, 2, this);
                        that.data.typeDetail = 42;
                        break;
                    case 3:     //   两位数除以一位数
                        ret = g3First.f2bD1b(4, 3, this);
                        that.data.typeDetail = 43;
                        break;
                    case 4:     //   三位数乘以或除以一位数
                        ret = g3First.f3bMorD1b(4, 4, this);
                        that.data.typeDetail = 44;
                        break;
                    case 5:     //   两位乘除一位混合运算
                        ret = g3First.f3bMandD1b(4, 5, this);
                        that.data.typeDetail = 45;
                        break;
                    default:
                        break;
                }
                // console.log(that.data.keys);

                break;
            case 5:             //  三年级下
                switch (idxType[1]) {
                    case 0:     //   两位数乘或除一位数
                        ret = g3Second.f2bMorD1b(5, 0, this);
                        that.data.typeDetail = 50;
                        break;
                    case 1:     //   三位数乘或除一位数
                        ret = g3Second.f3bMorD1b(5, 1, this);
                        that.data.typeDetail = 51;
                        break;
                    case 2:      //   整十整百乘一位数
                        ret = g3Second.f110M1b(5, 2, this);
                        that.data.typeDetail = 52;
                        break;
                    case 3:      //   两位数乘两位数
                        ret = g3Second.f2bM2b(5, 3, this);
                        that.data.typeDetail = 53;
                        break;
                    case 4:      //   两位数连乘
                        ret = g3Second.f2bDoulM(5, 4, this);
                        that.data.typeDetail = 54;
                        break;
                    case 5:      //   两位数乘加、乘减混合
                        ret = g3Second.f2bMandAorS(5, 5, this);
                        that.data.typeDetail = 55;
                        break;
                    case 6:      //   两个两位数四则混合运算
                        ret = g3Second.f2bASMD2s(5, 6, db, this);
                        that.data.typeDetail = 56;
                        break;
                    default:
                        break;
                }
                // console.log(that.data.keys);

                break;
            case 6:             //  四年级上
                switch (idxType[1]) {
                    case 0:     //   三位整数加减法
                        ret = g4First.f3bAorS(6, 0, this);
                        that.data.typeDetail = 60;
                        break;
                    case 1:     //   两位数或三位数乘一位数
                        ret = g4First.f3b2bM1b(6, 1, this);
                        that.data.typeDetail = 61;
                        break;
                    case 2:     //   两位数或三位数除一位数
                        ret = g4First.f3b2bD1b(6, 2, this);
                        that.data.typeDetail = 62;
                        break;
                    case 3:     //   两位数三位数除整十数
                        ret = g4First.f3b2bD10(6, 3, this);
                        that.data.typeDetail = 63;
                        break;
                    case 4:      //   三位数除以两位数
                        ret = g4First.f3bD2b(6, 4, this);
                        that.data.typeDetail = 64;
                        break;
                    case 5:     //   被除数或除数末尾含0
                        ret = g4First.f3b0D2b0(6, 5, this);
                        that.data.typeDetail = 65;
                        break;
                    case 6:      //   三位数两步混合运算
                        ret = g4First.f3b3bASMD2s(6, 6, db, this);
                        that.data.typeDetail = 66;
                        break;
                    case 7:     //   三位整数四则混合运算
                        ret = g4First.f3b3bASMD3s(6, 7, db, this);
                        that.data.typeDetail = 67;
                        break;
                    default:
                        break;
                }
                // console.log(that.data.keys);

                break;
            case 7:             //  四年级下
                switch (idxType[1]) {
                    case 0:     //   三位整数加减法
                        ret = g4Second.f3bAorS(7, 0, this);
                        that.data.typeDetail = 70;
                        break;
                    case 1:      //   两位数乘一位数或整十数
                        ret = g4Second.f2bM1b10(7, 1, this);
                        that.data.typeDetail = 71;
                        break;
                    case 2:     //   两位三位数除一位或整十数
                        ret = g4Second.f2b3bD1b10(7, 2, this);
                        that.data.typeDetail = 72;
                        break;
                    case 3:     //   两位数乘整十数
                        ret = g4Second.f2bM10(7, 3, this);
                        that.data.typeDetail = 73;
                        break;
                    case 4:     //   整百数乘整十数
                        ret = g4Second.f100M10(7, 4, this);
                        that.data.typeDetail = 74;
                        break;
                    case 5:      //   三位数乘两位
                        ret = g4Second.f3bM2b(7, 5, this);
                        that.data.typeDetail = 75;
                        break;
                    case 6:     //四年级四测混合运算
                        ret = g4Second.f3b3bASMD4s(7, 6, db, this);
                        that.data.typeDetail = 76;
                        break;
                    case 7:     //四年级简便合运算
                        ret = g4Second.fg4easy(7, 7, db, this);
                        that.data.typeDetail = 77;
                        break;
                    default:
                        break;
                }
                // console.log(that.data.keys);

                break;
            case 8:             //  五年级上
                switch (idxType[1]) {
                    case 0:
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                    case 6:
                        break;
                    default:
                        break;
                }
                break;
            case 9:             //  五年级下
                switch (idxType[1]) {
                    case 0:     //小数运算
                        ret = g5Second.f1pot(9, 0, this);
                        that.data.typeDetail = 90;
                        break;
                    case 1:     //小数四则混合运算
                        ret = g5Second.fpotASMD(9, 1, db, this);
                        that.data.typeDetail = 91;
                        break;
                    case 2:      //小数简便运算     FIXME: 间距
                        ret = g5Second.fpotSimple(9, 2, db, this);
                        that.data.typeDetail = 92;
                        break;
                    case 3:      //简单方程
                        ret = g5Second.f2formula(9, 3, db, this);
                        that.data.typeDetail = 93;
                        break;
                    case 4:      //同分母分数加减
                        ret = g5Second.fsfAorS(9, 4, this);
                        that.data.typeDetail = 94;
                        break;
                    case 5:      //带括号分数加减混合
                        ret = g5Second.fdfAorS(9, 5, db, this);
                        that.data.typeDetail = 95;
                        break;
                    default:
                        break;
                }
                // console.log(that.data.keys);
                // console.log(that.data.keyZs);
                // console.log(that.data.keyFz);
                // console.log(that.data.keyFm);
                break;
            case 10:            //  六年级上
                switch (idxType[1]) {
                    case 0:
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                    case 6:
                        break;
                    default:
                        break;
                }
                break;
            case 11:            //  六年级下
                switch (idxType[1]) {
                    case 0:      // 各类型数字一步运算
                        ret = g6Second.f61Step(11, 0, db, this);
                        that.data.typeDetail = 110;
                        break;
                    case 1:     // 各类型数字四则运算
                        ret = g6Second.f64Opt(11, 1, db, this);
                        that.data.typeDetail = 111;
                        break;
                    case 2:      // 各类型数字简便运算
                        ret = g6Second.f6Simple(11, 2, db, this);
                        that.data.typeDetail = 112;
                        break;
                    case 3:     // 解方程
                        ret = g6Second.f6Formula(11, 3, db, this);
                        that.data.typeDetail = 113;
                        break;
                    case 4:      // 解比例
                        ret = g6Second.f6Scale(11, 4, db, this);
                        that.data.typeDetail = 114;
                        break;
                    default:
                        break;
                }
                //console.log("index key:", that.data.keyZs);
                //console.log(that.data.keyFz);
                //console.log(that.data.keyFm);
                break;
            default:
                return -1;
        }
        return 0;
    }
})
