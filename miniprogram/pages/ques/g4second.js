//
//  g4second.js
//	function: 按大纲要求，生成符合四年级下学期所需试题
//  A: Add  S: Sub  M: Mul  D: Div
//  by sean wang
//  2020.9.17
//
import * as config from '../config/config.js';
let util = require("util.js");

//	70	三位整数加减法
function f3bAorS(grade, type, pt) {
    let a = 0, b = 0, m = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let i = 0;
    let that = pt;

    if (grade == 7 && type == 0) {
        for (i = 0; i < 6; i++) {
            optType = Math.ceil(Math.random() * 2);

            switch (optType) {
                case 1:     //a+b
                    a = util.rangeRand(111, 999);
                    b = util.rangeRand(111, 999 - a);

                    arr = [a, '+', b];
                    key[i] = a + b;
                    break;
                case 2:     //a-b
                    a = util.rangeRand(111, 999);
                    b = util.rangeRand(111, a - 1);

                    arr = [a, '-', b];
                    key[i] = a - b;
                    break;
                default:
                    break;
            }
            ques[i] = arr.join(' ');
        }
    } else {
        return -1;
    }

    that.setData({
    	quesType: 0,
        keyType: 0,

        wdQues: 12,
        wdAns: 5,
        
        ques0: ques[0],
        ques1: ques[1],
        ques2: ques[2],
        ques3: ques[3],
        ques4: ques[4],
        ques5: ques[5],

        rques0: ques[0],
        rques1: ques[1],
        rques2: ques[2],
        rques3: ques[3],
        rques4: ques[4],
        rques5: ques[5],

        keys: key
    });

    return 0;
}

//	71	两位数乘一位数或整十数
function f2bM1b10(grade, type, pt) {
    let a = 0, b = 0, m = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType = 0, bit = 0;
    let i = 0;
    let that = pt;

    if (grade == 7 && type == 1) {
        for (i = 0; i < 6; i++) {

            bit = Math.ceil(Math.random() * 2);
            a = util.rangeRand(11, 99);
            if (bit == 1) {
                b = util.rangeRand(1, 9);
            } else if (bit == 2) {
                b = util.rangeRand(1, 9);
                b = b * 10;
            }

            arr = [a, '×', b];
            key[i] = a * b;

            ques[i] = arr.join(' ');
        }

    } else {
        return -1;
    }

    that.setData({
    	quesType: 0,
        keyType: 0,

        wdQues: 12,
        wdAns: 5,
        
        ques0: ques[0],
        ques1: ques[1],
        ques2: ques[2],
        ques3: ques[3],
        ques4: ques[4],
        ques5: ques[5],

        rques0: ques[0],
        rques1: ques[1],
        rques2: ques[2],
        rques3: ques[3],
        rques4: ques[4],
        rques5: ques[5],

        keys: key
    });

    return 0;
}

//	72	两位三位数除一位或整十数
//  FIXME: 余数处理, 
function f2b3bD1b10(grade, type, pt) {
    let a = 0, b = 0, mod = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType = 0, bit = 0;
    let i = 0;
    let that = pt;

    if (grade == 7 && type == 2) {
        for (i = 0; i < 6; i++) {

            bit = Math.ceil(Math.random() * 2);

            if (bit == 1) {
                a = util.rangeRand(11, 99);
            } else if (bit == 2) {
                a = util.rangeRand(111, 999);
            }

            b = util.rangeRand(2, 9);

            mod = a % b;
            if (mod != 0)
                a = a - mod;

            arr = [a, '÷', b];
            key[i] = a / b;

            ques[i] = arr.join(' ');

        }
    } else {
        return -1;
    }

    that.setData({
    	quesType: 0,
        keyType: 0,

        wdQues: 12,
        wdAns: 5,
        
        ques0: ques[0],
        ques1: ques[1],
        ques2: ques[2],
        ques3: ques[3],
        ques4: ques[4],
        ques5: ques[5],
        
        rques0: ques[0],
        rques1: ques[1],
        rques2: ques[2],
        rques3: ques[3],
        rques4: ques[4],
        rques5: ques[5],

        keys: key
    });

    return 0;
}

//	73	两位数乘整十数
function f2bM10(grade, type, pt) {
    let a = 0, b = 0, m = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType = 0, bit = 0;
    let i = 0;
    let that = pt;

    if (grade == 7 && type == 3) {
        for (i = 0; i < 6; i++) {

            bit = 2;
            a = util.rangeRand(11, 99);
            if (bit == 1) {
                b = util.rangeRand(1, 9);
            } else if (bit == 2) {
                b = util.rangeRand(1, 9);
                b = b * 10;
            }

            arr = [a, '×', b];
            key[i] = a * b;

            ques[i] = arr.join(' ');

        }
    } else {
        return -1;
    }

    that.setData({
    	quesType: 0,
        keyType: 0,

        wdQues: 12,
        wdAns: 5,
        
        ques0: ques[0],
        ques1: ques[1],
        ques2: ques[2],
        ques3: ques[3],
        ques4: ques[4],
        ques5: ques[5],

        rques0: ques[0],
        rques1: ques[1],
        rques2: ques[2],
        rques3: ques[3],
        rques4: ques[4],
        rques5: ques[5],

        keys: key
    });

    return 0;
}

//	74	整百数乘整十数
function f100M10(grade, type, pt) {
    let a = 0, b = 0, m = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType = 0;
    let i = 0;
    let that = pt;

    if (grade == 7 && type == 4) {
        for (i = 0; i < 6; i++) {

            a = util.rangeRand(1, 9);
            b = util.rangeRand(1, 9);

            a = a * 100;
            b = b * 10;

            arr = [a, '×', b];
            key[i] = a * b;

            ques[i] = arr.join(' ');
        }

    } else {
        return -1;
    }

    that.setData({
    	quesType: 0,
        keyType: 0,

        wdQues: 12,
        wdAns: 5,
        
        ques0: ques[0],
        ques1: ques[1],
        ques2: ques[2],
        ques3: ques[3],
        ques4: ques[4],
        ques5: ques[5],

        rques0: ques[0],
        rques1: ques[1],
        rques2: ques[2],
        rques3: ques[3],
        rques4: ques[4],
        rques5: ques[5],

        keys: key
    });

    return 0;
}

//	75	三位数乘两位
function f3bM2b(grade, type, pt) {
    let a = 0, b = 0, m = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType = 0;
    let i = 0;
    let that = pt;

    if (grade == 7 && type == 5) {
        for (i = 0; i < 6; i++) {

            a = util.rangeRand(111, 999);
            b = util.rangeRand(11, 99);

            arr = [a, '×', b];
            key[i] = a * b;

            ques[i] = arr.join(' ');
        }

    } else {
        return -1;
    }

    that.setData({
    	quesType: 0,
        keyType: 0,

        wdQues: 12,
        wdAns: 5,
        
        ques0: ques[0],
        ques1: ques[1],
        ques2: ques[2],
        ques3: ques[3],
        ques4: ques[4],
        ques5: ques[5],

        rques0: ques[0],
        rques1: ques[1],
        rques2: ques[2],
        rques3: ques[3],
        rques4: ques[4],
        rques5: ques[5],

        keys: key
    });

    return 0;
}

//	76	三位数四测混合运算 4题带小括号，2题带中括号
function f3b3bASMD4s(grade, type, db, pt) {
    let col = [];
    let that = pt;
    let cques = [], ckey = [];
    let k = 0, i = 0;

    if (grade == 7 && type == 6) {

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q42',
                type: 4201,
                count: config.types[7].count[6]
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

//	77	简便运算
function fg4easy(grade, type, db, pt) {

let col = [];
let that = pt;
let cques = [], ckey = [];
let k = 0, i = 0;

if (grade == 7 && type == 7) {

    wx.cloud.callFunction({
        name: 'dbquery',
        data: {
            table: 'q42',
            type: 4204,
            //count: config.types[7].count[7]
            count: 150
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


module.exports = {
    f3bAorS: f3bAorS,
    f2bM1b10: f2bM1b10,
    f2b3bD1b10: f2b3bD1b10,
    f2bM10: f2bM10,
    f100M10: f100M10,
    f3bM2b: f3bM2b,
    f3b3bASMD4s: f3b3bASMD4s,
    fg4easy: fg4easy
}