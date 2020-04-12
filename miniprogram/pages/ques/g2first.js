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
function f2bAorS12bNoCarry(upa, upb, type) {

    let a1 = 0, a2 = 0, a = 0, b1 = 0, b2 = 0, b = 0, m = 0, n = 0;
    let arr = [];
    let ans;
    let ques;
    let optType;
    let bit;

    optType = Math.ceil(Math.random() * 2);
    bit = Math.ceil(Math.random() * 2);

    if (type == 20) {
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
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;

}

//	21	100以内连加或连减
function f100DulAorS(upa, upb, upc, type) {
    let a = 0, b = 0, c = 0, m = 0;
    let arr = [];
    let ans = 0;
    let ques;
    let optType;

    optType = Math.ceil(Math.random() * 2);

    if (type == 21) {
        switch (optType) {
            case 1: // a + b + c
                a = util.rangeRand(upa / 5, upa / 2);
                m = util.min(a, upb / 5);
                b = util.rangeRand(m, upb / 2);
                c = util.rangeRand(1, upc - a - b);
                arr = [a, '+', b, '+', c];
                ans = a + b + c;
                break;
            case 2: // a - b - c
                a = util.rangeRand(upa / 2, upa * 4 / 5);
                b = util.rangeRand(1, upb - a - 5);
                c = util.rangeRand(1, upc - a - b);
                arr = [a, '-', b, '-', c];
                ans = a - b - c;
                break;
            default:
                break;
        }
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;

}

//  100以内加减混合
function f100AandS(upa, upb, upc, type) {
    let a = 0, b = 0, c = 0;
    let arr = [];
    let ans = 0;
    let ques;
    let optType;

    optType = Math.ceil(Math.random() * 2);

    if (type == 22) {
        switch (optType) {
            case 1:     //a+b-c
                a = util.rangeRand(1, upa / 2);
                b = util.rangeRand(1, upa - 5 - a);
                c = util.rangeRand(1, a + b);
                arr = [a, '+', b, '-', c];
                ans = a + b - c;
                break;
            case 2:     //a-b+c
                a = util.rangeRand(1, upa * 4 / 5);
                b = util.rangeRand(1, a - 5);
                c = util.rangeRand(1, upc - a + b)
                arr = [a, '-', b, '+', c];
                ans = a - b + c;
                break;
            default:
                return -1;
        }
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;

}


//  23 6以内乘法
function f69M(upa, upb, type) {
    let a = 0, b = 0;
    let arr = [];
    let ans;
    let ques;

    if (type == 23 || type == 24) { //20以内退位加法
        a = util.rangeRand(1, upa);
        b = util.rangeRand(1, upb);
    }

    arr = [a, '×', b];
    ans = a * b;

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}

 //   25 表内除法
function f9D(upa, upb, type) {

    let a = 0, b = 0, c = 0;
    let arr = [];
    let ans;
    let ques;

    if (type == 25) {       //表内除法
        a = util.rangeRand(1, upa);
        b = util.rangeRand(1, upb);
        c = a * b;

    }

    arr = [c, '÷', a];
    ans = b;

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;

}


//	100 以内连乘或连除
function f100DoulMorD(upa, upb, upc, type) {

    let a = 0, b = 0, c = 0, m = 0, n = 0;
    let arr = [];
    let ans = 0;
    let ques;
    let optType;

    optType = Math.ceil(Math.random() * 2);

    if (type == 26) {
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
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;

}


//	100 100以内乘除混合
function f100MandD(upa, upb, upc, type) {
    let a = 0, b = 0, c = 0, m = 0;
    let arr = [];
    let ans = 0;
    let ques;
    let optType;

    optType = Math.ceil(Math.random() * 2);

    if (type == 27) {
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
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}


//	100以内乘与加或乘与减
function f100MandAS(upa, upb, upc, type) {
    let a = 0, b = 0, c = 0, m = 0;
    let arr = [];
    let ans = 0;
    let ques;
    let optType;

    optType = Math.ceil(Math.random() * 2);

    if (type == 28) {
        switch (optType) {
            case 1:     //a x b + c
                a = util.rangeRand(1, 9);
                b = util.rangeRand(1, 9);
                m = a * b;
                c = util.rangeRand(1, upc - m);
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
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;

}



module.exports = {
	f2bAorS12bNoCarry: f2bAorS12bNoCarry,
	f100DulAorS: f100DulAorS,
	f100AandS: f100AandS,
	f69M: f69M,
	f9D: f9D,
	f100DoulMorD: f100DoulMorD,
	f100MandD: f100MandD,
	f100MandAS: f100MandAS,

}