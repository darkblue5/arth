//index.js
//获取应用实例
const app = getApp()
import * as echarts from '../../miniprogram_npm/ec-canvas/echarts';

const db = wx.cloud.database({});

let chart = null;
let sevenRate = [99, 99, 99, 99, 99, 99, 99]; //  7日正确率

Page({

    data: {
        tdyCorrt: 55,    //  本日正确
        tdyFinih: 22,    //  本日完成
        tdyRate: sevenRate[6],
        sumCorrt: 5555,    //  累计正确
        sumFinih: 2355,    //  累计完成

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

                todayRate = sevenRate[6];

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
                        data: sevenRate
                        //data: this.data.sevenRate
                    }]

                };

                chart.setOption(option);
                return chart;
            }
        }
    },

    onLoad() {
        //     var now = new Date();
        //     var day = now.getDate();
        //     let i = 0;
        //    // let dayData = [];

        //     for (i=0; i<8; i++) {
        //         this.data.dayData[i] = day - i + 1;
        //     }

        //   //  console.log(dayData);

        // db.collection('rank').where({
        //     _id: '1d1104975e9857c80046d4761cf635d4'
        // }).get({
        //     success: res => {
        //         let usrInfo = [];

        //         usrInfo = res.data;

        //         console.log(res.data);
        //         console.log(usrInfo);

        //         this.setData({
        //             // tdyCorrt: usrInfo.tdycorrt,    //  本日正确
        //             // tdyFinih: usrInfo.tdyfinih,    //  本日完成
        //             // tdyRate: usrInfo.sevenrate[6],
        //             // sumCorrt: usrInfo.sumcorrt,    //  累计正确
        //             // nickName: usrInfo.usr
        //             tdyCorrt: res.data.tdycorrt,    //  本日正确
        //             tdyFinih: res.data.tdyfinih,    //  本日完成
        //             tdyRate: res.data.sevenrate[6],
        //             sumCorrt: res.data.sumcorrt,    //  累计正确
        //             nickName: res.data.usr
        //         })
        //     }
        // })

    },

    onShow: function(e) {
        let that = this;

        db.collection('rank').where({
            _id: '1d1104975e9857c80046d4761cf635d4'
        }).get({
            success: (res) => {

                console.log(res.data);
                //console.log(typeof(res.data));
                sevenRate = res.data[0].sevenrate;

                that.setData({
                    tdyCorrt: res.data[0].tdycorrt,    //  本日正确
                    tdyFinih: res.data[0].tdyfinih,    //  本日完成
                    tdyRate: res.data[0].sevenrate[6],
                    sumCorrt: res.data[0].sumfinih,    //  累计正确
                    nickName: res.data[0].usr
                })
            }
        })

    }

})
