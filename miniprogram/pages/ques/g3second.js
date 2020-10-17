//
//  g3second.js
//	function: 按大纲要求，生成符合三年级下学期所需试题
//  A: Add  S: Sub  M: Mul  D: Div
//  by sean wang
//  2020.9.17
//

import * as config from '../config/config.js';
let util = require("util.js");

//	50 两位数乘或除一位数
function f2bMorD1b(grade, type, pt) {
    let a = 0, b = 0, mod = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;

    if (grade == 5 && type == 0) {
        for (i = 0; i < 6; i++) {

            optType = Math.ceil(Math.random() * 2);

            b = util.rangeRand(2, 9);
            switch (optType) {
                case 1:     //a x b
                    a = util.rangeRand(11, 99);

                    arr = [a, '×', b];
                    key[i] = a * b;
                    break;
                case 2:     // a / b
                    a = util.rangeRand(11, 99);

                    mod = a % b;
                    if (mod != 0)
                        a = a - mod;

                    arr = [a, '÷', b];
                    key[i] = a / b;
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

//	51 三位数乘或除一位数
//	FIXME: 乘积可能超过三位
function f3bMorD1b(grade, type, pt) {
    let a = 0, b = 0, mod = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;

    if (grade == 5 && type == 1) {
        for (i = 0; i < 6; i++) {
            optType = Math.ceil(Math.random() * 2);

            b = util.rangeRand(2, 9);
            switch (optType) {
                case 1:     //a x b
                    a = util.rangeRand(111, 999);

                    arr = [a, '×', b];
                    key[i] = a * b;
                    break;
                case 2:     // a / b
                    a = util.rangeRand(111, 999);

                    mod = a % b;
                    if (mod != 0)
                        a = a - mod;

                    arr = [a, '÷', b];
                    key[i] = a / b;
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

//	52 整十整百乘一位数
function f110M1b(grade, type, pt) {
    let a = 0, b = 0, i = 0;
    let bit = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;

    if (grade == 5 && type == 2) {
        for (i = 0; i < 6; i++) {

            optType = Math.ceil(Math.random() * 2);
            bit = Math.ceil(Math.random() * 2);

            b = util.rangeRand(2, 9);

            a = util.rangeRand(1, 9);

            if (bit == 1) {
                a = a * 10;
            } else if (bit == 2) {
                a = a * 100;
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

//	53 两位数乘两位数
function f2bM2b(grade, type, pt) {
    let a = 0, b = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;

    if (grade == 5 && type == 3) {
        for (i = 0; i < 6; i++) {
            optType = Math.ceil(Math.random() * 2);

            a = util.rangeRand(10, 99);
            b = util.rangeRand(10, 99);

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

//	54 两位数连乘
function f2bDoulM(grade, type, pt) {
    let a = 0, b = 0, c = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let that = pt;

    if (grade == 5 && type == 4) {
        for (i = 0; i < 6; i++) {

            a = util.rangeRand(10, 99);
            b = util.rangeRand(10, 99);
            c = util.rangeRand(10, 99);

            arr = [a, '×', b, '×', c];
            key[i] = a * b * c;

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

//	55 两位数乘加、乘减混合
function f2bMandAorS(grade, type, pt) {
    let a = 0, b = 0, c = 0, mod = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;

    if (grade == 5 && type == 5) {
        for (i = 0; i < 6; i++) {
            optType = Math.ceil(Math.random() * 2);

            switch (optType) {
                case 1:     //a x b + c
                    a = util.rangeRand(10, 99);
                    b = util.rangeRand(10, 99);
                    c = util.rangeRand(10, 99);

                    arr = [a, '×', b, '+', c];
                    key[i] = a * b + c;
                    break;
                case 2:     // a x b - c
                    a = util.rangeRand(10, 99);
                    b = util.rangeRand(10, 99);
                    c = util.rangeRand(10, 99);

                    arr = [a, '×', b, '-', c];
                    key[i] = a * b - c;
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


//	56 两个两位数四则混合运算
function f2bASMD2s(grade, type, db, pt) {
    let that = pt;
    let qcount = config.types[5].count[6];

    if (grade == 5 && type == 6) {

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q32',
                type: 3201,
                count: qcount
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

module.exports = {
    f2bMorD1b: f2bMorD1b,
    f3bMorD1b: f3bMorD1b,
    f110M1b: f110M1b,
    f2bM2b: f2bM2b,
    f2bDoulM: f2bDoulM,
    f2bMandAorS: f2bMandAorS,
    f2bASMD2s: f2bASMD2s,
}