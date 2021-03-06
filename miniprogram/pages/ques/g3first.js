//
//  g3first.js
//	function: 按大纲要求，生成符合三年级上学期所需试题
//  A: Add  S: Sub  M: Mul  D: Div
//  by sean wang
//  2020.9.17
//

let util = require("util.js");

//	40	整十整百乘一位数
function f110M1b(grade, type, pt) {
    let a = 0, b = 0, m = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType = 0, bit = 0;
    let that = pt;


    if (grade == 4 && type == 0) {
        for (i = 0; i < 6; i++) {
            bit = Math.ceil(Math.random() * 2);

            a = util.rangeRand(1, 9);
            if (bit == 1) {
                a = a * 10;
            } else if (bit == 2) {
                a = a * 100;
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

    return ques;
}

//	41	整十整百除一位数
function f110D1b(grade, type, pt) {
    let a = 0, b = 0, mod = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType = 0, bit = 0;
    let that = pt;


    if (grade == 4 && type == 1) {
        for (i = 0; i < 6; i++) {
            bit = Math.ceil(Math.random() * 2);

            a = util.rangeRand(1, 9);
            if (bit == 1) {
                a = a * 10;
            } else if (bit == 2) {

                a = a * 100;
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

    return ques;
}

//	42	两位数三位数乘一位数
function f3b2bD1b(grade, type, pt) {
    let a = 0, b = 0, m = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType = 0, bit = 0;
    let that = pt;


    if (grade == 4 && type == 2) {
        for (i = 0; i < 6; i++) {

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

    return ques;
}

//	43	两位数除以一位数
function f2bD1b(grade, type, pt) {
    let a = 0, b = 0, mod = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType = 0, bit = 0;
    let that = pt;


    if (grade == 4 && type == 3) {
        for (i = 0; i < 6; i++) {

            bit = Math.ceil(Math.random() * 2);

            a = util.rangeRand(11, 99);
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
    return ques;
}

//	44	三位数乘以或除以一位数
function f3bMorD1b(grade, type, pt) {
    let a = 0, b = 0, mod = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType = 0;
    let that = pt;


    if (grade == 4 && type == 4) {
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

    return ques;
}

//	45	两位乘除一位混合运算
function f3bMandD1b(grade, type, pt) {
    let a = 0, b = 0, m = 0, c = 0, mod = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType = 0;
    let that = pt;

    if (grade == 4 && type == 5) {
        for (i = 0; i < 6; i++) {
            optType = Math.ceil(Math.random() * 2);

            switch (optType) {
                case 1:     // a x b / c
                    a = util.rangeRand(1, 9);
                    b = util.rangeRand(1, 9);
                    m = util.rangeRand(1, 9);
                    //c = util.rangeRand(1, 9);
                    b = b * m;
                    c = m;

                    arr = [a, '×', b, '÷', c];
                    key[i] = a * b / c;
                    break;
                case 2:     // a / b * c
                    b = util.rangeRand(1, 9);
                    m = util.rangeRand(1, 9);
                    a = b * m;
                    c = util.rangeRand(1, 9);

                    arr = [a, '÷', b, '×', c];
                    key[i] = a / b * c;
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

    return ques;
}

module.exports = {
    f110M1b: f110M1b,
    f110D1b: f110D1b,
    f3b2bD1b: f3b2bD1b,
    f2bD1b: f2bD1b,
    f3bMorD1b: f3bMorD1b,
    f3bMandD1b: f3bMandD1b,
}