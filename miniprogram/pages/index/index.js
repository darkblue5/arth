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

Page({
    data: {
        enMusic: false,
        enTimer: false,
        enSwitch: false,

        txtTimer: '0:00',
        mintue: 0,
        second: 0,

        mp3: 'cloud://ascpg.6173-ascpg-1301277680/bgm.mp3',

        tickColor0: 'red',
        tickColor1: 'white',
        tickColor2: 'red',
        tickColor3: 'red',
        tickColor4: 'white',
        tickColor5: 'red',

        isFraction: 0,
        ques0: '1322 + 2123',
        ques1: '1322 + 2123',
        ques2: '1322 + 2123',
        ques3: '1322 + 2123',
        ques4: '13242 + 2123',
        ques5: '1322 + 2123',
        
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

    onLoad: function (e) {
        let that = this;

        clearInterval(init); // 计时器归零
        that.data.minute = 0;
        that.data.second = 0;
    },

    onUnload() {
        audio.stop();
    },

    onGetUserInfo: function (e) {
        
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

        // initical question
        //type = getQuesType( );
        ret = that.initQues(type);

        that.setData({
            enSwitch: true
        });
    },

    //  button SUBMIT click
    onBtnSubmit: function (e) {
        let that = this;

        // stop timer
        if (that.data.enTimer) 
            that.timerClear();

        // stop music
        if (that.data.enMusic)
            audio.pause();

        // updata answer data


        that.setData({
            enSwitch: false
        });
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
        // let that = this;

        // if (!that.data.showGrade) {
        //     that.setData({
        //         showGrade: true
        //     });
        // } else {
        //     that.setData({
        //         showGrade: false
        //     });
        // }
        this.setData({ showGrade: true });
    },

    onPopTypeClose() {
        this.setData({ showType: false });
    },

    onPopGradeClose() {
        this.setData({ showGrade: false });
    },

    onReady() {
        // const pkType = this.selectComponent('.pk-type') //获取组件实例
        // pkType.setIndexes([this.data.index]) //setIndexes()中的参数是一个数组
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
        // Toast('确定');

        that.data.indexType = e.detail.index;

        this.setData({ 
            txtScreenGrade: e.detail.value[0],
            txtScreenType: e.detail.value[1],
            showType: false
        });

        // console.log(e.detail.index);
        // console.log(e.detail.value);
        console.log(e.detail.index[0]);
        console.log(e.detail.index[1]);
    },

    onCancelType() {
        //Toast('取消');
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
            case 0:
                switch (idxType[1]) {
                    case 0:     // 5以内加法或减法
                        ret = g1First.g1First5AorS(0, 0, this);
                        break;
                    case 1:     //  10以内加法或减法
                        ret = g1First.g1First10AorS(0, 1, this);
                        break;
                    case 3:     //  10以内连加或连减
                        retString = g1First.g1First10DulAorS(10, 10, 10, 2);
                        break;
                    case 4:     //  10以内加减混合
                        retString = g1First.g1First10AandS(10, 10, 10, 3);
                        break;
                    case 5:     //  10加个位数
                        retString = g1First.g1First10A1b(10, 9, 4);
                        break;
                    case 6:     //  20以内进位加法
                        retString = g1First.g1First20ACarry(20, 20, 5);
                        break;
                    default:
                        return -1;
                }
                break;
            case 1:
                switch (idxType[1]) {
                    case 0:     //  20以内退位减法
                        break;
                    case 1:     //  20以内加法或减法
                        break;
                    case 2:     //  整十加减整十
                        break;
                    case 3:     //  两位数加减一位数或整十数
                        break;
                    case 4:     //  20以内连加或连减
                        break;
                    case 5:      //  20以内加减混合
                        break;
                    default:
                        break;                    
                }
                break;
            case 2:
                console.log('grade 2');
                break;
            case 3:
                console.log('grade 2');
                break;
            case 4:
                console.log('grade 3');
                break;
            case 5:
                console.log('grade 3');
                break;
            case 6:
                console.log('grade 4');
                break;
            case 7:
                console.log('grade 4');
                break;
            case 8:
                console.log('grade 5');
                break;
            case 9:
                console.log('grade 5');
                break;
            case 10:
                console.log('grade 6');
                break;
            case 11:
                console.log('grade 6');
                break;
            default:
                return -1;
        }
        return 0;
    }
})
