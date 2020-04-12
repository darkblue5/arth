//index.js
//获取应用实例
const app = getApp()
import * as echarts from '../../miniprogram_npm/ec-canvas/echarts';

let chart = null;

Page({

    data: {
        compCount: 63,
        crrCount: 12,
        lastCount: 5,
        totalCount: 2355,

        //dayData: [],
        ecBar: {
            onInit: function (canvas, width, height) {
                let rate = 0;
                const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });

                canvas.setChart(chart);

                rate = Math.round(Math.random() * 90);


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
                            value: rate,
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
                let crrRate = [];

                for (i = 8; i > 0; i--) {
                    // dayData[i] = day + 2;
                    dayData[i - 1] = day - 7 + i;
                    //onsole.log(i);
                }

                for (i = 0; i < 9; i++) {
                    crrRate[i] = Math.round(Math.random() * 90);
                }
                crrRate[9] = 100;

                //console.log(dayData);

                //  console.log(dayData);

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
                        data: crrRate
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

    }

})

// function getBarOption() {
//     return {
//         color: ['#37a2da', '#32c5e9', '#67e0e3'],
//         tooltip: {
//             trigger: 'axis',
//             axisPointer: {            // 坐标轴指示器，坐标轴触发有效
//                 type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//             }
//         },
//         legend: {
//             data: ['热度', '正面', '负面']
//         },
//         grid: {
//             left: 20,
//             right: 20,
//             bottom: 15,
//             top: 40,
//             containLabel: true
//         },
//         xAxis: [
//             {
//                 type: 'value',
//                 axisLine: {
//                     lineStyle: {
//                         color: '#999'
//                     }
//                 },
//                 axisLabel: {
//                     color: '#666'
//                 }
//             }
//         ],
//         yAxis: [
//             {
//                 type: 'category',
//                 axisTick: { show: false },
//                 data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
//                 axisLine: {
//                     lineStyle: {
//                         color: '#999'
//                     }
//                 },
//                 axisLabel: {
//                     color: '#666'
//                 }
//             }
//         ],
//         series: [
//             {
//                 name: '热度',
//                 type: 'bar',
//                 label: {
//                     normal: {
//                         show: true,
//                         position: 'inside'
//                     }
//                 },
//                 data: [300, 270, 340, 344, 300, 320, 310]
//             },
//             {
//                 name: '正面',
//                 type: 'bar',
//                 stack: '总量',
//                 label: {
//                     normal: {
//                         show: true
//                     }
//                 },
//                 data: [120, 102, 141, 174, 190, 250, 220]
//             },
//             {
//                 name: '负面',
//                 type: 'bar',
//                 stack: '总量',
//                 label: {
//                     normal: {
//                         show: true,
//                         position: 'left'
//                     }
//                 },
//                 data: [-20, -32, -21, -34, -90, -130, -110]
//             }
//         ]
//     };
// }

// function getScatterOption() {

//     var data = [];
//     var data2 = [];

//     for (var i = 0; i < 10; i++) {
//         data.push(
//             [
//                 Math.round(Math.random() * 100),
//                 Math.round(Math.random() * 100),
//                 Math.round(Math.random() * 40)
//             ]
//         );
//         data2.push(
//             [
//                 Math.round(Math.random() * 100),
//                 Math.round(Math.random() * 100),
//                 Math.round(Math.random() * 100)
//             ]
//         );
//     }

//     var axisCommon = {
//         axisLabel: {
//             textStyle: {
//                 color: '#C8C8C8'
//             }
//         },
//         axisTick: {
//             lineStyle: {
//                 color: '#fff'
//             }
//         },
//         axisLine: {
//             lineStyle: {
//                 color: '#C8C8C8'
//             }
//         },
//         splitLine: {
//             lineStyle: {
//                 color: '#C8C8C8',
//                 type: 'solid'
//             }
//         }
//     };

//     return {
//         color: ["#FF7070", "#60B6E3"],
//         backgroundColor: '#eee',
//         xAxis: axisCommon,
//         yAxis: axisCommon,
//         legend: {
//             data: ['aaaa', 'bbbb']
//         },
//         visualMap: {
//             show: false,
//             max: 100,
//             inRange: {
//                 symbolSize: [20, 70]
//             }
//         },
//         series: [{
//             type: 'scatter',
//             name: 'aaaa',
//             data: data
//         },
//         {
//             name: 'bbbb',
//             type: 'scatter',
//             data: data2
//         }
//         ],
//         animationDelay: function (idx) {
//             return idx * 50;
//         },
//         animationEasing: 'elasticOut'
//     };
// }

