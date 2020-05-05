//index.js
//获取应用实例
import * as echarts from '../../miniprogram_npm/ec-canvas/echarts';

let app = getApp();
const db = wx.cloud.database( );

let chart = null;
let sevenRate = app.globalData.sevenRate; //  7日正确率
// let tdcr = app.globalData.tdycorrt;
// let tdfh = app.globalData.tdyfinih;

Page({

    data: {
        tdyCorrt: 0,    //  本日正确
        tdyFinih: 0,    //  本日完成
        //tdyRate: app.globalData.sevenrate[6],
        sumCorrt: 5555,    //  累计正确
        sumFinih: 2355,    //  累计完成
        rank: [],

        // tdyCorrt: '',    //  本日正确
        // tdyFinih: '',    //  本日完成
        // tdyRate: '',
        // sumCorrt: '',    //  累计正确

        nickName: '王大',
        grade: '一',       //  用户所处年级
        firstUser: '赵一',
        firstPoint: 44,
        secondUser: '钱二',
        secondPoint: 33,
        thirdUser: '孙三',
        thirdPoint: 22,
        fourthUser: '李四',
        fourthPoint: 11,

        //dayData: [],
        ecBar: {
            onInit: function (canvas, width, height) {
                let todayRate = 0;
                const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });

                canvas.setChart(chart);

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
                                    [0.3, '#67e0e3'],
                                    [0.7, '#37a2da'],
                                    [1, '#fd666d']
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
                let crrRate;
                //let crrRate = this.data.sevenRate;

                for (i = 7; i > 0; i--) {
                    dayData[i - 1] = day - 7 + i;
                }

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
                        //data: [15, 2, 30, 16, 10, 17, 15, 22, 27, 9]
                        //data: [72, 65, 38, 90, 27, 83, 66, 79, 100]
                        //data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
                        data: app.globalData.sevenRate
                        //data: this.data.sevenRate
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

	   // console.log('on load', app.globalData.tdycorrt, app.globalData.tdyfinih);
    //    console.log('on load', app.globalData.tdyCorrt, app.globalData.tdyFinih);
    //    console.log(app.globalData.testID);
    //     console.log(app.globalData.userGrade);
        that.setData ({
            nickName: app.globalData.nickName + ' ',
            grade: app.globalData.userGrade + ' '
        });

    },

    onReady() {
        //console.log('in report ready: 使用完整功能选择年级，登陆用户');
        wx.showModal({
            content: '完整功能请登陆微信',
            showCancel: false,
            success: function (res) {

            }
        })
    },

    async onShow( ) {
        let that = this;
        console.log('on show', app.globalData.tdyCorrt, app.globalData.tdyFinih);

        that.setData ({
            tdyCorrt: app.globalData.tdyCorrt,    //  本日正确
            tdyFinih: app.globalData.tdyFinih,    //  本日完成
            tdyRate: app.globalData.sevenRate[6]
        });

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
            //console.log(res.list[2]);
            //console.log( typeof(res.list));

            that.setData({
                rank: res.list
                //rank: res.data
            });
        } catch (error) {
            return error;
        }

        // let sevenRate = app.globalData.sevenRate; //  7日正确率
        // let tdcr = app.globalData.tdycorrt;
        // let tdfh = app.globalData.tdyfinih;
        // let grade = app.globalData.userGrade;

        // console.log(grade);

        // db.collection('rank').where({
        //     //_id: '1d1104975e9857c80046d4761cf635d4'
        //     nickname: "王老师@文升教育",
        //     grade: 1
        // }).get({
        //     success: (res) => {
        //         // let ret = JSON.parse(res.data)
        //          console.log(res.data);
        //         //console.log(typeof(res.data));
        //         // sevenRate = res.data[0].sevenrate;

        //         that.setData({
        //             tdyCorrt: res.data[0].tdycorrt,    //  本日正确
        //             tdyFinih: res.data[0].tdyfinih,    //  本日完成
        //             tdyRate: res.data[0].sevenrate[6],
        //             sevenRate: res.data[0].sevenrate
        //         //     sumCorrt: res.data[0].sumfinih,    //  累计正确
        //         //     nickName: res.data[0].usr
        //          })
        //         // if (ret.code == 0) {
        //         //     console.log(ret.data.usr)
        //         // }
        //     }
        // })

    }

})
