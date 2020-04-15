//
//	四年级上
//  按大纲要求，生成符合各年级，各教学段所需试题
//  参数:    上限、步骤、运算符种类
//  返回值：    表达式字符串
//  A:  add
//  S:  sub
//  M:  Mul
//  D:  Div

let util = require("util.js");

//	三位整数加减法
function f3bAorS(grade, type, pt) {
    let a = 0, b = 0, m = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;

    if (grade == 6 && type == 0) {
        for(i=0; i<6; i++) {
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

//	61 两位数或三位数乘一位数
function f3b2bM1b(grade, type, pt) {
    let a = 0, b = 0, m = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType = 0, bit = 0;
    let that = pt;

    if (grade == 6 && type == 1) {
                for(i=0; i<6; i++) {

        bit = Math.ceil(Math.random() * 2);

        if (bit == 1) {
            a = util.rangeRand(11, 99);
        } else if (bit == 2) {
            a = util.rangeRand(111, 999);
        }

        b = util.rangeRand(1, 9);

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

//	62 两位数或三位数除一位数
function f3b2bD1b(grade, type, pt) {
    let a = 0, b = 0, c = 0, mod = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType = 0, bit = 0;
    let that = pt;

    if (grade == 6 && type == 2) {
        for(i=0; i<6; i++) {

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

            c = a / b;
            arr = [a, '÷', b];

            key[i] = c;
            ques[i] = arr.join(' ');
        }

    } else {
        return -1;
    }

    that.setData({
        quesType: 0,
        keyType: 0,

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

//  FIXME: 0开头
//	63 两位数三位数除整十数
function f3b2bD10(grade, type, pt) {
    let a = 0, b = 0, mod = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType = 0, bit = 0;
    let that = pt;

    if (grade == 6 && type == 3) {
                for(i=0; i<6; i++) {

        bit = Math.ceil(Math.random() * 2);

        if (bit == 1) {
            a = util.rangeRand(1, 9);
        } else if (bit == 2) {
            a = util.rangeRand(11, 99);
        }

        b = util.rangeRand(1, 9);

        mod = a % b;
        if (mod != 0)
            a = a - mod;

        a = a * 10;
        b = b * 10;

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

//	64 三位数除以两位数
function f3bD2b(grade, type, pt) {
    let a = 0, b = 0, mod = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType = 0, bit = 0;
    let that = pt;

    if (grade == 6 && type == 4) {
                for(i=0; i<6; i++) {

        bit = Math.ceil(Math.random() * 2);

        a = util.rangeRand(111, 999);
        b = util.rangeRand(11, 99);

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

//	65 被除数或除数末尾含0
function f3b0D2b0(grade, type, pt) {
    let a = 0, b = 0, m = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType = 0, bit = 0;
    let that = pt;

    if (grade == 6 && type == 5) {
                for(i=0; i<6; i++) {

        bit = Math.ceil(Math.random() * 2);

        if (bit == 1) {
            a = util.rangeRand(1, 9);
            b = util.rangeRand(2, 9);

            arr = [a * b * 10, '÷', b];
            key[i] = a * 10;
        } else if (bit == 2) {
            a = util.rangeRand(1, 9);
            b = util.rangeRand(2, 9);

            arr = [a * b * 100, '÷', b * 10];
            key[i] = a * 10;
        }

        ques[i] = arr.join(' ');
    }

    } else {
        return -1;
    }

    that.setData({
        quesType: 0,
        keyType: 0,

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

//	66 三位数两步混合运算
function f3b3bASMD2s(grade, type, db, pt) {
    let col = [];
    let that = pt;
    let cques = [], ckey = [];
    let k = 0, i = 0;

    if (grade == 6 && type == 6) {
        db.collection('q41').where({
            type: 4101
        }).get({
            success: res => {
                col = res.data;

                for (k = 0; k < 6; k++) {
                    i = Math.floor(Math.random() * (col.length - 1));
                    cques[k] = col[i].ques;
                    ckey[k] = parseInt(col[i].key);
                    col.splice(i, 1);
                }

                that.setData({
                    quesType: 0,
                    keyType: 0,

                    ques0: cques[0],
                    ques1: cques[1],
                    ques2: cques[2],
                    ques3: cques[3],
                    ques4: cques[4],
                    ques5: cques[5],

                    keys: ckey
                });
            }
        });
    } else {
        return -1;
    }

    return 0;
}

//	67 三位整数四则混合运算
function f3b3bASMD3s(grade, type, db, pt) {
    let col = [];
    let that = pt;
    let cques = [], ckey = [];
    let k = 0, i = 0;

    if (grade == 6 && type == 7) {
        db.collection('q41').where({
            type: 4102
        }).get({
            success: res => {
                col = res.data;

                for (k = 0; k < 6; k++) {
                    i = Math.floor(Math.random() * (col.length - 1));
                    cques[k] = col[i].ques;
                    ckey[k] = parseInt(col[i].key);
                    col.splice(i, 1);
                }

                that.setData({
                    quesType: 0,
                    keyType: 0,

                    ques0: cques[0],
                    ques1: cques[1],
                    ques2: cques[2],
                    ques3: cques[3],
                    ques4: cques[4],
                    ques5: cques[5],

                    keys: ckey
                });
            }
        });
    } else {
        return -1;
    }

    return 0;
}


module.exports = {
    f3bAorS: f3bAorS,
    f3b2bM1b: f3b2bM1b,
    f3b2bD1b: f3b2bD1b,
    f3b2bD10: f3b2bD10,
    f3bD2b: f3bD2b,
    f3b0D2b0: f3b0D2b0,
    f3b3bASMD2s: f3b3bASMD2s,
    f3b3bASMD3s: f3b3bASMD3s,
}