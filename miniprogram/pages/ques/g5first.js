//
//  g5first.js
//	function: 按大纲要求，生成符合五年级上学期所需试题
//  A: Add  S: Sub  M: Mul  D: Div
//  by sean wang
//  2020.9.22
//


import * as config from '../config/config.js';
let util = require("util.js");

//  80: 整数四则运算
function intAsmd(grade, type, db, pt) {
    let that = pt;
    
    if (grade == 8 && type == 0) {
        console.log(config.types[8].count[0]);

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q51',
                type: 5101,
                count: config.types[8].count[0]
            }
        }).then(res => {
            let i = 0;
            let ckey = [];
            
            for (i=0; i<6; i++) {
                ckey[i] = parseInt(res.result.data[i].key);
            }

            that.setData({
                quesType: 0,
                keyType: 0,

                wdQues: 14,
                wdAns: 3,

                ques0: res.result.data[0].ques,
                ques1: res.result.data[1].ques,
                ques2: res.result.data[2].ques,
                ques3: res.result.data[3].ques,
                ques4: res.result.data[4].ques,
                ques5: res.result.data[5].ques,

                rques0: res.result.data[0].ques,
                rques1: res.result.data[1].ques,
                rques2: res.result.data[2].ques,
                rques3: res.result.data[3].ques,
                rques4: res.result.data[4].ques,
                rques5: res.result.data[5].ques,

                keys: ckey
            });
        }).catch(err => {
            // handle error
        })

    } else {
        return -1;
    }

    return 0;
}

//  81: 整数简便运算
function intSimple(grade, type, db, pt) {

    let that = pt;
    
    if (grade == 8 && type == 1) {
        console.log(config.types[8].count[1]);

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q51',
                type: 5105,
                count: config.types[8].count[1]
            }
        }).then(res => {
            let i = 0;
            let ckey = [];
            
            for (i=0; i<6; i++) {
                ckey[i] = parseInt(res.result.data[i].key);
            }

            that.setData({
                quesType: 0,
                keyType: 0,

                wdQues: 14,
                wdAns: 3,

                ques0: res.result.data[0].ques,
                ques1: res.result.data[1].ques,
                ques2: res.result.data[2].ques,
                ques3: res.result.data[3].ques,
                ques4: res.result.data[4].ques,
                ques5: res.result.data[5].ques,

                rques0: res.result.data[0].ques,
                rques1: res.result.data[1].ques,
                rques2: res.result.data[2].ques,
                rques3: res.result.data[3].ques,
                rques4: res.result.data[4].ques,
                rques5: res.result.data[5].ques,

                keys: ckey
            });
        }).catch(err => {
            // handle error
        })

    } else {
        return -1;
    }

    return 0;
}

//  82: 小数加减运算
function fltAs(grade, type, db, pt) {

    let that = pt;
    
    if (grade == 8 && type == 2) {
        console.log(config.types[8].count[2]);

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q51',
                type: 5102,
                count: config.types[8].count[2]
            }
        }).then(res => {
            let i = 0;
            let ckey = [];
            
            for (i=0; i<6; i++) {
                ckey[i] = parseInt(res.result.data[i].key);
            }

            that.setData({
                quesType: 0,
                keyType: 0,

                wdQues: 12,
                wdAns: 5,

                ques0: res.result.data[0].ques,
                ques1: res.result.data[1].ques,
                ques2: res.result.data[2].ques,
                ques3: res.result.data[3].ques,
                ques4: res.result.data[4].ques,
                ques5: res.result.data[5].ques,

                rques0: res.result.data[0].ques,
                rques1: res.result.data[1].ques,
                rques2: res.result.data[2].ques,
                rques3: res.result.data[3].ques,
                rques4: res.result.data[4].ques,
                rques5: res.result.data[5].ques,

                keys: ckey
            });
        }).catch(err => {
            // handle error
        })

    } else {
        return -1;
    }


    return 0;

}

//  83: 小数乘除运算
function fltMd(grade, type, db, pt) {
    let that = pt;
    
    if (grade == 8 && type == 3) {
        console.log(config.types[8].count[3]);

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q51',
                type: 5103,
                count: config.types[8].count[3]
            }
        }).then(res => {
            let i = 0;
            let ckey = [];
            
            for (i=0; i<6; i++) {
                ckey[i] = parseInt(res.result.data[i].key);
            }

            that.setData({
                quesType: 0,
                keyType: 0,

                wdQues: 12,
                wdAns: 5,

                ques0: res.result.data[0].ques,
                ques1: res.result.data[1].ques,
                ques2: res.result.data[2].ques,
                ques3: res.result.data[3].ques,
                ques4: res.result.data[4].ques,
                ques5: res.result.data[5].ques,

                rques0: res.result.data[0].ques,
                rques1: res.result.data[1].ques,
                rques2: res.result.data[2].ques,
                rques3: res.result.data[3].ques,
                rques4: res.result.data[4].ques,
                rques5: res.result.data[5].ques,

                keys: ckey
            });
        }).catch(err => {
            // handle error
        })

    } else {
        return -1;
    }


    return 0;

}

//  84: 小数四则运算
function fltAsmd(grade, type, db, pt) {
    let that = pt;
    
    if (grade == 8 && type == 4) {
        console.log(config.types[8].count[4]);

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q51',
                type: 5104,
                count: config.types[8].count[4]
            }
        }).then(res => {
            let i = 0;
            let ckey = [];
            
            for (i=0; i<6; i++) {
                ckey[i] = parseInt(res.result.data[i].key);
            }

            that.setData({
                quesType: 0,
                keyType: 0,

                wdQues: 16,
                wdAns: 2,

                ques0: res.result.data[0].ques,
                ques1: res.result.data[1].ques,
                ques2: res.result.data[2].ques,
                ques3: res.result.data[3].ques,
                ques4: res.result.data[4].ques,
                ques5: res.result.data[5].ques,
                
                rques0: res.result.data[0].ques,
                rques1: res.result.data[1].ques,
                rques2: res.result.data[2].ques,
                rques3: res.result.data[3].ques,
                rques4: res.result.data[4].ques,
                rques5: res.result.data[5].ques,

                keys: ckey
            });
        }).catch(err => {
            // handle error
        })

    } else {
        return -1;
    }

    return 0;

}

module.exports = {
    intAsmd: intAsmd,
    intSimple: intSimple,
    fltAs: fltAs,
    fltMd: fltMd,
    fltAsmd: fltAsmd
}