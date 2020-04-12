//index.js
const app = getApp()
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import * as config from '../config/config.js';

let init;   // timer
const audio = wx.createInnerAudioContext({}); //  audio


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
        
        userGrade: 1,   //  用户所在年级

        grades: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
        type: [
            {
                values: Object.keys(config.types),
                className: 'column1'
                
            },
            {
                values: config.types['一年级上'],
                className: 'column2',
                defaultIndex: 2
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
        const { picker, value, index } = event.detail;
        Toast(`当前值：${value}, 当前索引：${index}`);
    },

    onChangeType(event) {
       // console.log('events act');

        // const { picker, value, index } = event.detail;
        // Toast(`当前值：${value}, 当前索引：${index}`);

        // const { pkType, value } = event.detail;
        // pkType.setColumnValues(1, this.data.type[value[0]]);
        // getApp().picker = picker;

       // picker.setColumnValues(1, types[value[0]]);
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

})
