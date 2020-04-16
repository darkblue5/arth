//index.js
const app = getApp()
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import * as config from '../config/config.js';

let init;   // timer
const audio = wx.createInnerAudioContext({}); //  audio

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

const QCOUNT = 6; //1组6道题
const FLOTERR = Number.EPSILON * Math.pow(2, 10);   //浮点数比对差值

const db = wx.cloud.database({});

Page({
    data: {
        avatarUrl: './user-unlogin.png',
        userInfo: {},
        logged: false,
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

        ques0: '',
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

        keys: [],
        keyMods: [],
        modJudg: [0, 0],   //  0：错 1：对，前整数，后余数        
        keyZs: [],
        keyFz: [],
        keyFm: [],
        fraJudg: [0, 0, 0], //  0：错 1：对，一整数，二分子，三分母

        errQues: [],        //  当前入错题集错题
        errRec: [],         //  错题集中该型错题
        
        curRecord: [0, 0],
        dayRecord: [0, 0],
        talRecord: [0, 0],

        showGrade: false,
        showType: false,

        txtScreenGrade: '一年级上',
        txtScreenType: '5以内的加法或减法',
        txtButtonGrade: '一年级',

        userGrade: 1,           //  用户所在年级
        indexType: [],          //  picker 控件试题类型索引
        txtType: [],            //  picker 控件題型字符串 

        grades: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
        type: [
            {
                values: Object.keys(config.types),
                className: 'column1'
                
            },
            {
                values: config.types['一年级上'],
                className: 'column2',
                defaultIndex: 0
            }
        ]
    },


// functions

    onLoad: function (e) {
        let that = this;

        if (!wx.cloud) {
            wx.redirectTo({
                url: '../chooseLib/chooseLib',
            })
            return
        }

        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            this.setData({
                                avatarUrl: res.userInfo.avatarUrl,
                                userInfo: res.userInfo
                            })
                        }
                    })
                }
            }
        })

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
    },

    onUnload() {
        audio.stop();
    },

    onGetUserInfo: function (e) {
        if (!this.data.logged && e.detail.userInfo) {
            this.setData({
                logged: true,
                avatarUrl: e.detail.userInfo.avatarUrl,
                userInfo: e.detail.userInfo
            })
        }
    },

    onGetOpenid: function () {
        
    },

    //  button START click
    onBtnStart: function(e) {
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

            ans0: '',
            ans1: '',
            ans2: '',
            ans3: '',
            ans4: '',
            ans5: '',

            modJudg: [0, 0],
            fraJudg: [0, 0, 0]
        });
    },

    //  button SUBMIT click
    onBtnSubmit: function (e) {
        let that = this;
        let i = 0;
        let finishCount = 0, correctCount = 0;

        // stop timer
        if (that.data.enTimer) 
            that.timerClear();

        // stop music
        if (that.data.enMusic)
            audio.pause();

        // updata answer data
        if (that.data.ans0 != '') finishCount++;
        if (that.data.ans1 != '') finishCount++;
        if (that.data.ans2 != '') finishCount++;
        if (that.data.ans3 != '') finishCount++;
        if (that.data.ans4 != '') finishCount++;
        if (that.data.ans5 != '') finishCount++;

        if (that.data.tickColor0 == 'red') correctCount++;
        if (that.data.tickColor1 == 'red') correctCount++;
        if (that.data.tickColor2 == 'red') correctCount++;
        if (that.data.tickColor3 == 'red') correctCount++;
        if (that.data.tickColor4 == 'red') correctCount++;
        if (that.data.tickColor5 == 'red') correctCount++;

        that.setData({
            enSwitch: false,

            tickColor0: 'white',
            tickColor1: 'white',
            tickColor2: 'white',
            tickColor3: 'white',
            tickColor4: 'white',
            tickColor5: 'white',

            ans0: '',
            ans1: '',
            ans2: '',
            ans3: '',
            ans4: '',
            ans5: '',
        });
    },

    onBluAns0: function(e) {
        let that = this;
        
        switch (that.data.keyType) {
            case 0:
                if (e.detail.value == that.data.keys[0]) {
                    that.setData({
                        tickColor0: 'red',
                    });
                }
            case 1:
                if (e.detail.value == that.data.keys[0]) {
                    that.data.modJudg[0] = 1;         //整数部分判断结果

                    if (that.data.modJudg[1] == 1) {
                        this.setData({
                            tickColor0: 'red',
                        });
                    }
                }
                break;
            case 2:
                if (Math.abs(e.detail.value - that.data.keys[0]) <= FLOTERR) {
                    this.setData({
                        tickColor0: 'red',
                    });
                } else {
                    //  console.log(that.data.key[0]);
                }
                break;
            case 2:
                break;
            default:
                break;
        }

        return 0;
    },

    onBluMod0: function(e) {
        let that = this;

        if (e.detail.value == that.data.keyMods[0]) {
            that.data.modJudg[1] = 1        //余数部分判定
            if (that.data.modJudg[0] == 1) {
                this.setData({
                    tickColor0: 'red',
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
        let that = this;

        // 获取用户 OpenID
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                //console.log('[云函数] [login] user openid: ', res.result.openid);
                app.globalData.openid = res.result.openid;
                that.data.openID = res.result.openid;
                // wx.navigateTo({
                //     url: '../userConsole/userConsole',
                // })
            },
            fail: err => {
                console.error('[云函数] [login] 调用失败', err);
                // wx.navigateTo({
                //     url: '../deployFunctions/deployFunctions',
                // })
            }
        })

        that.setData({ showGrade: true });
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
        let strGrade = '';
        const { picker, value, index } = event.detail;
        //Toast(`当前值：${value}, 当前索引：${index}`);

        switch (index) {
            case 0:
                strGrade = '一年级';
                break;
            case 1:
                strGrade = '二年级';
                break;
            case 2:
                strGrade = '三年级';
                break;
            case 3:
                strGrade = '四年级';
                break;
            case 4:
                strGrade = '五年级';
                break;
            case 5:
                strGrade = '六年级';
                break;
            default:
                break;
        }

        this.setData({ 
            showGrade: false,
            txtScreenGrade: strGrade,
        });
        that.data.userGrade = index + 1;

        //console.log(that.data.userGrade);
    },

    onCancelGrade() {
        //Toast('取消');
        this.setData({ showGrade: false });
    },

    onChangeType(event) {
        Toast('数值改变');
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

        switch (idxType[0]){        //  FIXME: double switch
            case 0:             //  一年级上
                switch (idxType[1]) {
                    case 0:     // 5以内加法或减法
                        ret = g1First.g1First5AorS(0, 0, this);
                        break;
                    case 1:     //  10以内加法或减法
                        ret = g1First.g1First10AorS(0, 1, this);
                        break;
                    case 2:     //  10以内连加或连减
                        ret = g1First.g1First10DulAorS(0, 2, this);
                        break;
                    case 3:     //  10以内加减混合
                        ret = g1First.g1First10AandS(0, 3, this);
                        break;
                    case 4:     //  10加个位数
                        ret = g1First.g1First10A1b(0, 4, this);
                        break;
                    case 5:     //  20以内进位加法
                        ret = g1First.g1First20ACarry(0, 5, this);
                        break;
                    default:
                        return -1;
                }
                //console.log(that.data.keys);
                break;
            case 1:             //  一年级下
                switch (idxType[1]) {
                    case 0:     //  20以内退位减法
                        ret = g1Second.g1Second20SBorrow(1, 0, this);
                        break;
                    case 1:     //  20以内加法或减法
                        ret = g1Second.g1Second20AorS(1, 1, this);
                        break;
                    case 2:     //  整十加减整十
                        ret = g1Second.g1Second10AandS10(1, 2, this);
                        break;
                    case 3:     //  两位数加减一位数或整十数
                        ret = g1Second.g1Second2bAandS10(1, 3, this);
                        break;
                    case 4:     //  20以内连加或连减
                        ret = g1Second.g1Second20DulAorS(1, 4, this);
                        break;
                    case 5:      //  20以内加减混合
                        ret = g1Second.g1Second20AandS(1, 5, this);
                        break;
                    default:
                        break;                    
                }
                console.log(that.data.keys);
                break;
            case 2:             //  二年级上
                switch (idxType[1]) {
                    case 0:     //  两位数加减一位或两位数无进位退位
                        ret = g2First.f2bAorS12bNoCarry(2, 0, this);
                        break;
                    case 1:     //  100以内连加或连减
                        ret = g2First.f100DulAorS(2, 1, this);
                        break;
                    case 2:      //  100以内加减混合
                        ret = g2First.f100AandS(2, 2, this);
                        break;
                    case 3:      //   6以内乘法
                        ret = g2First.f66M(2, 3, this);
                        break;
                    case 4:     //   表内乘法
                        ret = g2First.f99M(2, 4, this);
                        break;
                    case 5:     //   表内除法
                        ret = g2First.f9D(2, 5, this);
                        break;
                    case 6:      //   100以内连乘或连除
                        ret = g2First.f100DoulMorD(2, 6, this);
                        break;
                    case 7:     //   100以内乘除混合
                        ret = g2First.f100MandD(2, 7, this);
                        break;
                    case 8:      //   100以内乘与加或乘与减
                        ret = g2First.f100MandAS(2, 8, this);
                        break;
                    default:
                        break;
                }
                console.log(that.data.keys);
                break;
            case 3:             //  二年级下
                switch (idxType[1]) {
                    case 0:     //   几百几十相加或减
                        ret = g2Second.f110AorS(3, 0, this);
                        break;
                    case 1:     //   几千几百相加或减
                        ret = g2Second.f1100AorS(3, 1, this);
                        break;
                    case 2:     //   几千几百与几百几十相加或减
                        ret = g2Second.f1100AorS110(3, 2, this);
                        break;
                    case 3:      //   三位数加减法
                        ret = g2Second.f3bAorS(3, 3, this);
                        break;
                    case 4:     //   两位数加减两位数含进位退位
                        ret = g2Second.f2bAorSCarry(3, 4, this);
                        break;
                    case 5:     //   表内乘、除法
                        ret = g2Second.f1bMorD(3, 5, this);
                        break;
                    case 6:      //   有余数除法
                        ret = g2Second.f2bDMod(3, 6, this);
                        break;
                    case 7:      //   两位数连加或连减
                        ret = g2Second.f2bDulAandS(3, 7, this);
                        break;
                    case 8:      //   两位数加减混合
                        ret = g2Second.f2bAandS(3, 8, this);
                        break;
                    default:
                        break;
                }
                console.log(that.data.keys);

                break;
            case 4:             //  三年级上
                switch (idxType[1]) {
                    case 0:      //   整十整百乘一位数
                        ret = g3First.f110M1b(4, 0, this);
                        break;
                    case 1:     //   整十整百除一位数
                        ret = g3First.f110D1b(4, 1, this);
                        break;
                    case 2:     //   两位数三位数乘一位数
                        ret = g3First.f3b2bD1b(4, 2, this);
                        break;
                    case 3:     //   两位数除以一位数
                        ret = g3First.f2bD1b(4, 3, this);
                        break;
                    case 4:     //   三位数乘以或除以一位数
                        ret = g3First.f3bMorD1b(4, 4, this);
                        break;
                    case 5:     //   两位乘除一位混合运算
                        ret = g3First.f3bMandD1b(4, 5, this);
                        break;
                    default:
                        break;
                }
                console.log(that.data.keys);

                break;
            case 5:             //  三年级下
                switch (idxType[1]) {
                    case 0:     //   两位数乘或除一位数
                        ret = g3Second.f2bMorD1b(5, 0, this);
                        break;
                    case 1:     //   三位数乘或除一位数
                        ret = g3Second.f3bMorD1b(5, 1, this);
                        break;
                    case 2:      //   整十整百乘一位数
                        ret = g3Second.f110M1b(5, 2, this);
                        break;
                    case 3:      //   两位数乘两位数
                        ret = g3Second.f2bM2b(5, 3, this);
                        break;
                    case 4:      //   两位数连乘
                        ret = g3Second.f2bDoulM(5, 4, this);
                        break;
                    case 5:      //   两位数乘加、乘减混合
                        ret = g3Second.f2bMandAorS(5, 5, this);
                        break;
                    case 6:      //   两个两位数四则混合运算
                        ret = g3Second.f2bASMD2s(5, 6, db, this);
                        break;
                    default:
                        break;
                }
                console.log(that.data.keys);

                break;
            case 6:             //  四年级上
                switch (idxType[1]) {
                    case 0:     //   三位整数加减法
                        ret = g4First.f3bAorS(6, 0, this);
                        break;
                    case 1:     //   两位数或三位数乘一位数
                        ret = g4First.f3b2bM1b(6, 1, this);
                        break;
                    case 2:     //   两位数或三位数除一位数
                        ret = g4First.f3b2bD1b(6, 2, this);
                        break;
                    case 3:     //   两位数三位数除整十数
                        ret = g4First.f3b2bD10(6, 3, this);
                        break;
                    case 4:      //   三位数除以两位数
                        ret = g4First.f3bD2b(6, 4, this);
                        break;
                    case 5:     //   被除数或除数末尾含0
                        ret = g4First.f3b0D2b0(6, 5, this);
                        break;
                    case 6:      //   三位数两步混合运算
                        ret = g4First.f3b3bASMD2s(6, 6, db, this);
                        break;
                    case 7:     //   三位整数四则混合运算
                        ret = g4First.f3b3bASMD3s(6, 7, db, this);
                        break;
                    default:
                        break;
                }
                console.log(that.data.keys);

                break;
            case 7:             //  四年级下
                switch (idxType[1]) {
                    case 0:     //   三位整数加减法
                        ret = g4Second.f3bAorS(7, 0, this);
                        break;
                    case 1:      //   两位数乘一位数或整十数
                        ret = g4Second.f2bM1b10(7, 1, this);
                        break;
                    case 2:     //   两位三位数除一位或整十数
                        ret = g4Second.f2b3bD1b10(7, 2, this);
                        break;
                    case 3:     //   两位数乘整十数
                        ret = g4Second.f2bM10(7, 3, this);
                        break;
                    case 4:     //   整百数乘整十数
                        ret = g4Second.f100M10(7, 4, this);
                        break;
                    case 5:      //   三位数乘两位
                        ret = g4Second.f3bM2b(7, 5, this);
                        break;
                    case 6:     //四年级四测混合运算
                        ret = g4Second.f3b3bASMD4s(7, 6, db, this);
                        break;
                    default:
                        break;
                }
                console.log(that.data.keys);

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
                        break;
                    case 1:     //小数四则混合运算
                        ret = g5Second.fpotASMD(9, 1, db, this);
                        break;
                    case 2:      //小数简便运算     FIXME: 间距
                        ret = g5Second.fpotSimple(9, 2, db, this);
                        break;
                    case 3:      //简单方程
                        ret = g5Second.f2formula(9, 3, db, this);
                        break;
                    case 4:      //同分母分数加减
                        ret = g5Second.fsfAorS(9, 4, this);
                        break;
                    case 5:      //带括号分数加减混合
                        ret = g5Second.fdfAorS(9, 5, db, this);
                        break;
                    default:
                        break;
                }
                console.log(that.data.keys);
                console.log(that.data.keyZs);
                console.log(that.data.keyFz);
                console.log(that.data.keyFm);
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
                        break;
                    case 1:     // 各类型数字四则运算
                        ret = g6Second.f64Opt(11, 1, db, this);
                        break;
                    case 2:      // 各类型数字简便运算
                        ret = g6Second.f6Simple(11, 2, db, this);
                        break;
                    case 3:     // 解方程
                        ret = g6Second.f6Formula(11, 3, db, this);
                        break;
                    case 4:      // 解比例
                        ret = g6Second.f6Scale(11, 4, db, this);
                        break;
                    default:
                        break;
                }
                console.log(that.data.keyZs);
                console.log(that.data.keyFz);
                console.log(that.data.keyFm);
                break;
            default:
                return -1;
        }
        return 0;
    }
})
