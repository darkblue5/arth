//
//  按大纲要求，生成符合各年级，各教学段所需试题
//  参数:    上限、步骤、运算符种类
//  返回值：    表达式字符串
//  A:  add
//  S:  sub
//  M:  Mul
//  D:  Div

let util = require("util.js");

//  20	两位数加减一位或两位数无进位退位
function f2bAorS12bNoCarry(grade, type, pt) {

    let a1 = 0, a2 = 0, a = 0, b1 = 0, b2 = 0, b = 0, m = 0, n = 0;
    let i = 0;
    let arr = [];
    let ans;
    let ques = [];
    let optType;
    let bit;
    let that = pt;      

    if (grade == 2 && type == 0) {
        for (i=0; i<6; i++) {
            optType = Math.ceil(Math.random() * 2);
            bit = Math.ceil(Math.random() * 2);
            switch (optType) {
                case 1:     // a + b
                    a1 = util.rangeRand(1, 9);
                    a2 = util.rangeRand(1, 9);

                    if (bit == 1) {
    					b1 = util.rangeRand(1, 9 - a1);
    				} else if (bit == 2) {
    					b1 = util.rangeRand(1, 9 - a1);
    					b2 = util.rangeRand(1, 9 - a2);
    				}
    				a = a1 + a2 * 10;
    				b = b1 + b2 * 10;

                    arr = [a, '+', b];
                    ans = a + b;
                    break;
                case 2:     //a-b
                	a1 = util.rangeRand(1, 9);
                	a2 = util.rangeRand(1, 9);

                    if (bit == 1) {
    					b1 = util.rangeRand(1, a1 - 1);
    				} else if (bit == 2) {
    					b1 = util.rangeRand(1, a1 - 1);
    					b2 = util.rangeRand(1, a2 - 1);
    				}
    				a = a1 + a2 * 10;
    				b = b1 + b2 * 10;

                    arr = [a, '-', b];
                    ans = a - b;
                    break;
                default:
                    break;
            }

        ques[i] = arr.join(' ');

        }

    }

    that.setData({
        ques0: ques[0],
        ques1: ques[1],
        ques2: ques[2],
        ques3: ques[3],
        ques4: ques[4],
        ques5: ques[5]
    });

    return 0;

}

//	21	100以内连加或连减
function f100DulAorS(grade, type, pt) {
    let a = 0, b = 0, c = 0, m = 0, i=0;
    let arr = [];
    let ans = 0;
    let ques = [];
    let optType;
    let that = pt

    if (grade == 2 && type == 1) {
        for (i=0; i<6; i++) {
            optType = Math.ceil(Math.random() * 2);
        
            switch (optType) {
                case 1: // a + b + c
                    a = util.rangeRand(100 / 5, 100 / 2);
                    m = util.min(a, 100 / 5);
                    b = util.rangeRand(m, 100 / 2);
                    c = util.rangeRand(1, 100 - a - b);
                    arr = [a, '+', b, '+', c];
                    ans = a + b + c;
                    break;
                case 2: // a - b - c
                    a = util.rangeRand(100 / 2, 100 * 4 / 5);
                    b = util.rangeRand(1, 100 - a - 5);
                    c = util.rangeRand(1, 100 - a - b);
                    arr = [a, '-', b, '-', c];
                    ans = a - b - c;
                    break;
                default:
                    break;
            }

            ques[i] = arr.join(' ');
        }

    }

   that.setData({
        ques0: ques[0],
        ques1: ques[1],
        ques2: ques[2],
        ques3: ques[3],
        ques4: ques[4],
        ques5: ques[5]
    });

    return 0;
}

//  100以内加减混合
function f100AandS(grade, type, pt) {
    let a = 0, b = 0, c = 0, i=0;
    let arr = [];
    let ans = 0;
    let ques = [];
    let optType;
    let that = pt;


    if (grade == 2 && type == 2) {
        for (i=0; i<6; i++) {
            optType = Math.ceil(Math.random() * 2);
        
            switch (optType) {
                case 1:     //a+b-c
                    a = util.rangeRand(1, 100 / 2);
                    b = util.rangeRand(1, 100 - 5 - a);
                    c = util.rangeRand(1, a + b);
                    arr = [a, '+', b, '-', c];
                    ans = a + b - c;
                    break;
                case 2:     //a-b+c
                    a = util.rangeRand(1, 100 * 4 / 5);
                    b = util.rangeRand(1, a - 5);
                    c = util.rangeRand(1, 100 - a + b)
                    arr = [a, '-', b, '+', c];
                    ans = a - b + c;
                    break;
                default:
                    return -1;
            }
            ques[i] = arr.join(' ');
        }
    }

    that.setData({
        ques0: ques[0],
        ques1: ques[1],
        ques2: ques[2],
        ques3: ques[3],
        ques4: ques[4],
        ques5: ques[5]
    });

    return 0;

}


//  23 6以内乘法
function f66M(grade, type, pt) {
    let a = 0, b = 0, i=0;
    let arr = [];
    let ans;
    let ques = [];
    let that = pt;


    if (grade == 2 && type == 3) { //20以内退位加法
        for (i=0; i<6; i++) {
            a = util.rangeRand(1, 6);
            b = util.rangeRand(1, 6);

            arr = [a, '×', b];
            ans = a * b;

            ques[i] = arr.join(' ');
        }
    }

    that.setData({
        ques0: ques[0],
        ques1: ques[1],
        ques2: ques[2],
        ques3: ques[3],
        ques4: ques[4],
        ques5: ques[5]
    });

    return 0;
}

function f99M(grade, type, pt) {
    let a = 0, b = 0, i=0;
    let arr = [];
    let ans;
    let ques = [];
    let that = pt;

    if (grade == 2 && type == 4) { //20以内退位加法
        for (i=0; i<6; i++) {
            a = util.rangeRand(1, 9);
            b = util.rangeRand(1, 9);

            arr = [a, '×', b];
            ans = a * b;

            ques[i] = arr.join(' ');
        }
    }

    that.setData({
        ques0: ques[0],
        ques1: ques[1],
        ques2: ques[2],
        ques3: ques[3],
        ques4: ques[4],
        ques5: ques[5]
    });

    return 0;

}
 //   25 表内除法
function f9D(grade, type, pt) {
    let a = 0, b = 0, c = 0, i=0;
    let arr = [];
    let ans;
    let ques = [];
    let that = pt;


    if (grade == 2 && type == 5) {       //表内除法
        for (i=0; i<6; i++) {
            a = util.rangeRand(1, 9);
            b = util.rangeRand(1, 9);
            c = a * b;

            arr = [c, '÷', a];
            ans = b;

            ques[i] = arr.join(' ');
        }
    }

    that.setData({
        ques0: ques[0],
        ques1: ques[1],
        ques2: ques[2],
        ques3: ques[3],
        ques4: ques[4],
        ques5: ques[5]
    });

    return 0;

}


//	100 以内连乘或连除
function f100DoulMorD(grade, type, pt) {
    let a = 0, b = 0, c = 0, m = 0, n = 0, i=0;
    let arr = [];
    let ans = 0;
    let ques = [];
    let optType;
    let that = pt;


    if (grade == 2 && type == 6) {
        for(i=0; i<6; i++){
            optType = Math.ceil(Math.random() * 2);

            switch (optType) {
                case 1:     //aXb/c
                    a = util.rangeRand(1, 9);
                    b = util.rangeRand(1, 9);
                    c = util.rangeRand(1, 9);
                 
                    arr = [a, '×', b, '×', c];
                    ans = a * b * c;
                    break;
                case 2:     //a/b*c
                    m = util.rangeRand(1, 9);
                    n = util.rangeRand(1, 3);
    				c = util.rangeRand(1, 9);

    				b = m * c;
                    a = n * b;

                    arr = [a, '÷', m, '÷', c];
                    ans = a / m / c;
                    break;
                default:
                    return -1;
            }

            ques[i] = arr.join(' ');

        }
    }

    that.setData({
        ques0: ques[0],
        ques1: ques[1],
        ques2: ques[2],
        ques3: ques[3],
        ques4: ques[4],
        ques5: ques[5]
    });

    return 0;

}


//	100 100以内乘除混合
function f100MandD(grade, type, pt) {
    let a = 0, b = 0, c = 0, m = 0, i=0;
    let arr = [];
    let ans = 0;
    let ques = [];
    let optType;
    let that = pt;


    if (grade == 2 && type == 7) {
        for (i=0; i<6; i++) {
            optType = Math.ceil(Math.random() * 2);

            switch (optType) {
                case 1:     //aXb/c
                    a = util.rangeRand(1, 9);
                    m = util.rangeRand(1, 9);
                    b = util.rangeRand(1, 9);
                    c = m;

                    b = b * m;

                    arr = [a, '×', b, '÷', c];
                    ans = a * b / c;
                    break;
                case 2:     //a/b*c
                    m = util.rangeRand(1, 9);
                    b = util.rangeRand(1, 9);
                    a = m * b;
                    c = util.rangeRand(1, 9);
                    arr = [a, '÷', b, '×', c];
                    ans = a / b * c;
                    break;
                default:
                    return -1;
            }
            ques[i] = arr.join(' ');
        }
    }

    that.setData({
        ques0: ques[0],
        ques1: ques[1],
        ques2: ques[2],
        ques3: ques[3],
        ques4: ques[4],
        ques5: ques[5]
    });

    return 0;
}

//  HOTFIX: 
//	100以内乘与加或乘与减
function f100MandAS(grade, type, pt) {
    let a = 0, b = 0, c = 0, m = 0, i=0;
    let arr = [];
    let ans = 0;
    let ques = [];
    let optType;
    let that = pt;


    if (grade == 2 && type == 8) {
        for (i=0; i<6; i++) {
            optType = Math.ceil(Math.random() * 2);

            switch (optType) {
                case 1:     //a x b + c
                    a = util.rangeRand(1, 9);
                    b = util.rangeRand(1, 9);
                    m = a * b;
                    c = util.rangeRand(1, m);
                    arr = [a, '×', b, '+', c];
                    ans = a * b + c;
                    break;
                case 2:     //a x b - c
                    a = util.rangeRand(1, 9);
                    b = util.rangeRand(1, 9);
                    m = a * b;
                    c = util.rangeRand(1, m - 1);
                    arr = [a, '×', b, '-', c];
                    ans = a * b - c;
                    break;
                default:
                    return -1;
            }
            ques[i] = arr.join(' ');
        }
    }

    that.setData({
        ques0: ques[0],
        ques1: ques[1],
        ques2: ques[2],
        ques3: ques[3],
        ques4: ques[4],
        ques5: ques[5]
    });

    return 0;

}



module.exports = {
	f2bAorS12bNoCarry: f2bAorS12bNoCarry,
	f100DulAorS: f100DulAorS,
	f100AandS: f100AandS,
	f66M: f66M,
    f99M: f99M,
	f9D: f9D,
	f100DoulMorD: f100DoulMorD,
	f100MandD: f100MandD,
	f100MandAS: f100MandAS,

}