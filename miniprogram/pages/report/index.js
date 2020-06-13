//index.js
//获取应用实例
import * as echarts from '../../miniprogram_npm/ec-canvas/echarts';

let app = getApp();
const db = wx.cloud.database( );

let chart = null;
let sevenRate = app.globalData.sevenRate; //  7日正确率

Page({

    data: {
        tdyCorrt: 0,    //  本日正确
        tdyFinih: 0,    //  本日完成
        tolCorrt: 0,    //  累计正确
        tolFinih: 0,    //  累计完成
        rank: [],

        nickName: '',
        grade: 0,       //  用户所处年级
        firstUser: '',
        firstPoint: 1,
        secondUser: '',
        secondPoint: 2,
        thirdUser: '',
        thirdPoint: 3,
        fourthUser: '',
        fourthPoint: 4,

        //dayData: [],
        ecBar: {
            onInit: function (canvas, width, height) {
                let todayRate = 0;
                const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });

                canvas.setChart(chart);

                //若未登录正确率初始值为0
                if (app.globalData.sevenRate[6] === undefined)
                    todayRate = 0;
                else
                    todayRate = app.globalData.sevenRate[6];

                var option = {
                    backgroundColor: "#ffffff",
                    color: ["#37A2DA", "#32C5E9", "#67E0E3"],
                    series: [{
                        name: '业务指标',
                        type: 'gauge',
                        detail: {
                            formatter: '{value}%',
                            textStyle: {
                                color: '#ffffff',
                                fontSize: 1,
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 10,
                                shadowBlur: 0,
                                color: [
                                    [0.3, '#ffe3b3'],
                                    [0.7, '#64bd47'],
                                    [1, '#30a0e0']
                                ]
                            }
                        },
                        data: [{
                            value: todayRate,
                            //name: '完成率',
                        }]

                    }]
                };

                chart.setOption(option, true);

                return chart;
            }
        },

        ecScatter: {
            onInit: function (canvas, width, height) {
                const chart = echarts.init(canvas, null, {
                    // width: 360,
                    // height: 250
                    width: width,
                    height: height
                });
                canvas.setChart(chart);

                var now = new Date();
                var day = now.getDate();
                let i = 0;
                let dayData = [];
                let weekRate = [];
                //let crrRate = this.data.sevenRate;

                for (i = 7; i > 0; i--) {
                    dayData[i - 1] = day - 7 + i;
                }

                //console.log(app.globalData.sevenRate);
                if (app.globalData.sevenRate.length == 0)
                    weekRate = [100, 100, 100, 100, 100, 100, 100];
                else
                    weekRate = app.globalData.sevenRate;

                var option = {
                    title: {
                        text: '本周正确率(%)',
                        textStyle: {
                            color: '#000',
                            fontSize: '14',
                        },
                        left: 'left'
                    },
                    color: ["#37A2DA"],
                    // legend: {
                    //   data: ['A'],
                    //   top: 50,
                    //   left: 'center',
                    //   backgroundColor: 'red',
                    //   z: 100
                    // },
                    // grid: {
                    //   containLabel: true
                    // },
                    tooltip: {
                        show: true,
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        // data: ['一', '二', '三', '四', '五', '六', '日', '一', '二', '三'],
                        // data: ['一', '二', '三', '四', '五', '六', '日'],
                        data: dayData,


                        // x轴的字体样式
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#000',
                                fontSize: '14',
                            }
                        },
                        // 控制网格线是否显示
                        splitLine: {
                            show: true,
                            //  改变轴线颜色
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['#aaaaaa']
                            }
                        },
                        // x轴的颜色和宽度
                        axisLine: {
                            lineStyle: {
                                color: '#000',
                                width: 1,   //这里是坐标轴的宽度,可以去掉
                            }
                        }
                        // show: false
                    },

                    yAxis: {
                        x: 'center',
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
                        // data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

                        // show: false
                    },

                    series: [{
                        name: '正确率',
                        type: 'line',
                        smooth: false,
                        data: weekRate
                        //data: sevenRate
                    }]

                };

                chart.setOption(option);
                return chart;
            }
        }
    },

    onLoad() {
        let that = this;
        // try {
        //     let res = await db.collection('rank')
        //         .aggregate()
        //         .match({
        //             grade: 1
        //         })
        //         .sort({
        //             point: -1
        //         })
        //         .limit(4)
        //         .end();
        //     //console.log(res.list[2]);
        //     //console.log( typeof(res.list));

        //     that.setData({
        //        rank: res.list
        //        //rank: res.data
        //     });
        // } catch (error) {
        //     return error;
        // }

        //console.log('REPORT, app.globalData.nickName', app.globalData.nickName);
        if (app.globalData.openid === undefined || app.globalData.openid === '') {
            that.setData ({
                nickName: '未命名 ',
                grade: '未登陆　'
            });
        } else {
            let nameStr = app.globalData.nickName;

            if(app.globalData.nickName.length > 6)
                nameStr = app.globalData.nickName.substr(0, 6);
            else
                nameStr = app.globalData.nickName;

            that.setData ({
                nickName: nameStr + ' ',
                grade: app.globalData.userGrade + ' '
            });
        }
    },

    onReady() {
        let that = this;
        let strGrade = '';

        //console.log('in report ready: 使用完整功能选择年级，登陆用户');
        if (app.globalData.openid === undefined || app.globalData.openid === '') {
            wx.showModal({
                content: '请登陆微信使用完整功能',
                showCancel: false,
                success: function (res) {
                    // FIXME:
                }
            })
        } else {
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

            that.setData({
                grade: strGrade + '　'//  用户所处年级                
            });
        }
    },

    async onShow( ) {
        let that = this;
        console.log('on show', app.globalData.tdyCorrt, app.globalData.tdyFinih);

        that.setData ({
            tdyCorrt: app.globalData.tdyCorrt,    //  本日正确
            tdyFinih: app.globalData.tdyFinih,    //  本日完成
            tolCorrt: app.globalData.tolCorrt,
            tolFinih: app.globalData.tolFinih,
            tdyRate: app.globalData.sevenRate[6]
        });

        if (app.globalData.openid === undefined || app.globalData.openid === '') {

            that.setData({
                rank: [{nickname: '用户一', point: 400}, {nickname: '用户二', point: 300}, {nickname: '用户三', point: 200}, {nickname: '用户四', point: 100}]
            });

        } else {
            try {            
                let res = await db.collection('rank')
                    .aggregate()
                    .match({
                        grade: app.globalData.userGrade
                    })
                    .sort({
                        point: -1
                    })
                    .limit(4)
                    .end();
                //console.log(res.list);

                that.setData({
                    rank: res.list
                });
            } catch (error) {
                return error;
            }

        }
    }

})
