//
//	四年级下
//  按大纲要求，生成符合各年级，各教学段所需试题
//  参数:    上限、步骤、运算符种类
//  返回值：    表达式字符串
//  A:  add
//  S:  sub
//  M:  Mul
//  D:  Div

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

        keys: key
    });

    return 0;
}

//	76	三位数四测混合运算 4题带小括号，2题带中括号
function f3b3bASMD4s(grade, type, db, pt) {
    let col1 = [];
    let col2 = [];
    let col3 = [];
    let that = pt;
    let sques1 = "", sques2 = "", sques3 = "", sques0 = "", sques4 = "", sques5 = "";
    let nkey0, nkey1, nkey2, nkey3, nkey4, nkey5;
    let i = 0, j = 0, k = 0;
    let key = [];

    if (grade == 7 && type == 6) {
        db.collection('q52').where({
            type: 5211
        }).get({
            success: res => {
                col1 = res.data;

                i = Math.floor(Math.random() * (col1.length - 1));
                sques0 = col1[i].ques;
                key[0] = col1[i].key;
                col1.splice(i, 1);

                i = Math.floor(Math.random() * (col1.length - 1));
                sques1 = col1[i].ques;
                key[1] = col1[i].key;

                that.setData({
                	quesType: 0,
                    keyType: 0,

                    wdQues: 16,
                    wdAns: 3,
        
                    ques0: sques0,
                    ques1: sques1,
                })
            }
        });

        db.collection('q52').where({
            type: 5212
        }).get({
            success: res => {
                col2 = res.data;

                j = Math.floor(Math.random() * (col2.length - 1));
                sques2 = col2[j].ques;
                key[2] = col2[j].key;
                col1.splice(j, 1);

                j = Math.floor(Math.random() * (col2.length - 1));
                sques3 = col2[j].ques;
                key[3] = col2[j].key;

                that.setData({
                    ques2: sques2,
                    ques3: sques3,
                })
            }
        });

        db.collection('q52').where({
            type: 5213
        }).get({
            success: res => {
                col3 = res.data;

                k = Math.floor(Math.random() * (col3.length - 1));
                sques4 = col3[k].ques;
                key[4] = col3[k].key;
                col1.splice(k, 1);

                k = Math.floor(Math.random() * (col3.length - 1));
                sques5 = col3[k].ques;
                key[5] = col3[k].key;

                // console.log(nkey4);
                // console.log(nkey5);

                that.setData({
                    ques4: sques4,
                    ques5: sques5,

                    keys: key
                })
            }
        });

    } else {
        return -1;

    }

}

//	77	简便运算
function fg4easy(upa, upb, type) {

}


module.exports = {
    f3bAorS: f3bAorS,
    f2bM1b10: f2bM1b10,
    f2b3bD1b10: f2b3bD1b10,
    f2bM10: f2bM10,
    f100M10: f100M10,
    f3bM2b: f3bM2b,
    f3b3bASMD4s: f3b3bASMD4s,
    fg4easy: fg4easy,
}