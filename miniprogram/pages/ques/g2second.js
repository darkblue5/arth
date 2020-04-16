//
//  按大纲要求，生成符合各年级，各教学段所需试题
//  参数:    上限、步骤、运算符种类
//  返回值：    表达式字符串
//  A:  add
//  S:  sub
//  M:  Mul
//  D:  Div

let util = require("util.js");


//	30 几百几十相加或减
function f110AorS(grade, type, pt) {
    let a = 0, b = 0, m = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;

    if (grade == 3 && type == 0) {
        for (i = 0; i < 6; i++) {
            optType = Math.ceil(Math.random() * 2);
            switch (optType) {
                case 1:     //a+b
                    a = util.rangeRand(10, 99);
                    b = util.rangeRand(10, 99 - a);

                    a = a * 10;
                    b = b * 10;

                    arr = [a, '+', b];
                    key[i] = a + b;
                    break;
                case 2:     // a - b
                    a = util.rangeRand(11, 100 - 1);
                    b = util.rangeRand(1, a);

                    a = a * 10;
                    b = b * 10;

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


//	31 几千几百相加或减
function f1100AorS(grade, type, pt) {
    let a = 0, b = 0, m = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;


    if (grade == 3 && type == 1) {
        for (i = 0; i < 6; i++) {

            optType = Math.ceil(Math.random() * 2);

            switch (optType) {
                case 1:     //a+b
                    a = util.rangeRand(10, 99);
                    b = util.rangeRand(10, 99 - a);

                    a = a * 100;
                    b = b * 100;

                    arr = [a, '+', b];
                    key[i] = a + b;
                    break;
                case 2:     // a - b
                    a = util.rangeRand(11, 100 - 1);
                    b = util.rangeRand(1, a);

                    a = a * 100;
                    b = b * 100;

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

//	32	几千几百与几百几十相加或减
function f1100AorS110(grade, type, pt) {
    let a = 0, b = 0, m = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;


    if (grade == 3 && type == 2) {
        for (i = 0; i < 6; i++) {

            optType = Math.ceil(Math.random() * 2);

            switch (optType) {
                case 1:     //a+b
                    a = util.rangeRand(10, 99);
                    b = util.rangeRand(10, 99 - a);

                    a = a * 100;
                    b = b * 10;

                    arr = [a, '+', b];
                    key[i] = a + b;
                    break;
                case 2:     // a - b
                    a = util.rangeRand(11, 100 - 1);
                    b = util.rangeRand(1, 100);

                    a = a * 100;
                    b = b * 10;

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

//	33	三位数加减法
function f3bAorS(grade, type, pt) {
    let a = 0, b = 0, m = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;


    if (grade == 3 && type == 3) {
        for (i = 0; i < 6; i++) {

            optType = Math.ceil(Math.random() * 2);

            switch (optType) {
                case 1:     //a+b
                    a = util.rangeRand(111, 999);
                    b = util.rangeRand(111, 999 - a);

                    arr = [a, '+', b];
                    key[i] = a + b;
                    break;
                case 2:     // a - b
                    a = util.rangeRand(111, 999);
                    b = util.rangeRand(111, a);

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

//	34	两位数加减两位数含进位退位
function f2bAorSCarry(grade, type, pt) {
    let a = 0, b = 0, m = 0, i = 0;
    let a1 = 0, a2 = 0, b1 = 0, b2 = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;


    if (grade == 3 && type == 4) {
        for (i = 0; i < 6; i++) {

            optType = Math.ceil(Math.random() * 2);

            switch (optType) {
                case 1:     //a+b
                    a1 = util.rangeRand(1, 9);
                    b1 = util.rangeRand(10 - a1, 9);
                    a2 = util.rangeRand(1, 9);
                    b2 = util.rangeRand(10 - a2, 9);

                    a = a1 + a2 * 10;
                    b = b1 + b2 * 10;

                    arr = [a, '+', b];
                    key[i] = a + b;
                    break;
                case 2:     // a - b
                    a1 = util.rangeRand(1, 8);
                    b1 = util.rangeRand(a1 + 1, 9);

                    a2 = util.rangeRand(1, 8);
                    b2 = util.rangeRand(1, a2 - 1);

                    a = a1 + a2 * 10;
                    b = b1 + b2 * 10;

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

//	35	表内乘、除法
function f1bMorD(grade, type, pt) {
    let a = 0, b = 0, m = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;


    if (grade == 3 && type == 5) {
        for (i = 0; i < 6; i++) {

            optType = Math.ceil(Math.random() * 2);

            switch (optType) {
                case 1:     //a x b
                    a = util.rangeRand(1, 9);
                    b = util.rangeRand(1, 9);

                    arr = [a, '×', b];
                    key[i] = a * b;
                    break;
                case 2:     // a / b
                    a = util.rangeRand(1, 9);
                    b = util.rangeRand(1, 9);
                    m = a * b;

                    arr = [m, '÷', b];
                    key[i] = m / b;
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

//	36	有余数除法
function f2bDMod(grade, type, pt) {
    let a = 0, b = 0, m = 0, i = 0, mod = 0;
    let arr = [];
    let key = [];
    let mods = [];
    let ques = [];
    let optType;
    let that = pt;


    if (grade == 3 && type == 6) {
        for (i = 0; i < 6; i++) {

            optType = Math.ceil(Math.random() * 2);

            a = util.rangeRand(2, 10);
            b = util.rangeRand(2, 9);
            m = a * b;
            mod = util.rangeRand(1, b - 1)

            arr = [m + mod, '÷', b];
            key[i] = a;
            mods[i] = mod;
            ques[i] = arr.join(' ');

        }
    } else {
        return -1;
    }

    that.setData({
        quesType: 0,
        keyType: 1,

        wdQues: 10,
        wdAns: 5,
        
        ques0: ques[0],
        ques1: ques[1],
        ques2: ques[2],
        ques3: ques[3],
        ques4: ques[4],
        ques5: ques[5],

        keys: key,
        keyMods: mods
    });

    return 0;



}

//	37	两位数连加或连减
function f2bDulAandS(grade, type, pt) {
    let a = 0, b = 0, c = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;


    if (grade == 3 && type == 7) {
        for (i = 0; i < 6; i++) {

            optType = Math.ceil(Math.random() * 2);

            switch (optType) {
                case 1: // a + b + c
                    a = util.rangeRand(30, 50);
                    b = util.rangeRand(11, 99 - 50)
                    c = util.rangeRand(11, 99 - a - b);
                    arr = [a, '+', b, '+', c];
                    key[i] = a + b + c;
                    break;
                case 2: // a - b - c
                    a = util.rangeRand(70, 99);
                    b = util.rangeRand(11, a - 11);
                    c = util.rangeRand(11, a - b);
                    arr = [a, '-', b, '-', c];
                    key[i] = a - b - c;
                    break;
                default:
                    break;
            }
            ques[i] = arr.join(' ');

        }
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

//	38	两位数加减混合
function f2bAandS(grade, type, pt) {
    let a = 0, b = 0, c = 0, i = 0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;


    if (grade == 3 && type == 8) {
        for (i = 0; i < 6; i++) {
            optType = Math.ceil(Math.random() * 2);

            switch (optType) {
                case 1:     //a+b-c
                    a = util.rangeRand(11, 99)
                    b = util.rangeRand(11, 99);
                    c = util.rangeRand(11, 99)
                    arr = [a, '+', b, '-', c];
                    key[i] = a + b - c;
                    break;
                case 2:     //a-b+c
                    a = util.rangeRand(11, 99);
                    b = util.rangeRand(11, a);
                    c = util.rangeRand(11, 99 - a + b)
                    arr = [a, '-', b, '+', c];
                    key[i] = a - b + c;
                    break;
                default:
                    return -1;
            }
            ques[i] = arr.join(' ');
        }
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


module.exports = {
    f110AorS: f110AorS,
    f1100AorS: f1100AorS,
    f1100AorS110: f1100AorS110,
    f3bAorS: f3bAorS,
    f2bAorSCarry: f2bAorSCarry,
    f1bMorD: f1bMorD,
    f2bDMod: f2bDMod,
    f2bDulAandS: f2bDulAandS,
    f2bAandS: f2bAandS,
}