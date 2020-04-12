//
//  按大纲要求，生成符合各年级，各教学段所需试题
//  参数:    上限、步骤、运算符种类
//  返回值：    表达式字符串
//  A:  add
//  S:  sub
//  M:  Mul
//  D:  Div

let util = require("util.js");

// 10 20以内退位减法
function g1Second20SBorrow(upa, upb, type) {
    let a = 0, b = 0, c = 0, m = 0;
    let arr = [];
    let ans;
    let ques;

    if (type == 10) { //20以内退位加法
        a = util.rangeRand(1, 8);
       // c = util.rangeRand(1, 8);
        b = util.rangeRand(a + 1, 9);
    }
    a = a + 10;

    arr = [a, '-', b];
    ans = a - b;

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}

// 11 20以内加或减
function g1Second20AorS(upa, upb, type) {
    let a = 0, b = 0, m = 0;
    let arr = [];
    let ans;
    let ques;
    let optType;


    optType = Math.ceil(Math.random() * 2);

    if (type == 11) {
        switch (optType) {
            case 1:     //a+b
                a = util.rangeRand(1, upa - 1);
                m = util.min(upb, upa - a);
                b = util.rangeRand(1, m);

                arr = [a, '+', b];
                ans = a + b;
                break;
            case 2:     //a-b
                a = util.rangeRand(1, upa - 1);
                b = util.rangeRand(1, a);


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


//  12   整十加减整十
function g1Second10AandS10(upa, upb, type) {
    let a = 0, b = 0, m = 0;
    let arr = [];
    let ans;
    let ques;
    let optType;

    optType = Math.ceil(Math.random() * 2);

    if (type == 12) {
        switch (optType) {
            case 1:     //a+b
                a = util.rangeRand(1, 9);
                m = util.min(1, 9 - a);
                b = util.rangeRand(1, m);

                a = a * 10;
                b = b * 10;
              
                arr = [a, '+', b];
                ans = a + b;
                break;
            case 2:     //a-b
                a = util.rangeRand(1, 9);
                b = util.rangeRand(1, a);

                a = a * 10;
                b = b * 10;
              
                arr = [a, '-', b];
                ans = a - b;
                break;
            default:
                return -1;
        }
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}

// 13 两位数加减一位数或整十数
function g1Second2bAandS10(upa, upb, type) {
    let a = 0, b = 0, m = 0;
    let arr = [];
    let ans;
    let ques;
    let bit = 0;
    let optType;


    optType = Math.ceil(Math.random() * 2);
    bit = Math.ceil(Math.random() * 2);

    if (type == 13) {
        switch (optType) {
            case 1:     //a+b
                a = util.rangeRand(10, upa - 11);
               // m = util.min(upb, upa - a);
               if (bit == 1) {
               		b = util.rangeRand(1, 9);
               } else if (bit == 2) {
					b = util.rangeRand(1, (100 - a) / 10);
					b = b * 10;
				}

                arr = [a, '+', b];
                ans = a + b;
                break;
            case 2:     //a-b
				if (bit == 1) {
					a = util.rangeRand(10, upa - 1);
               		b = util.rangeRand(1, 9);
				} else if (bit == 2) {
					a = util.rangeRand(20, upa - 1);
					b = util.rangeRand(1, a / 10 );
					b = b * 10;
				}

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


//	14	20以内连加或连减
function g1Second20DulAorS(upa, upb, upc, type) {
    let a = 0, b = 0, c = 0;
    let arr = [];
    let ans = 0;
    let ques;
    let optType;

    optType = Math.ceil(Math.random() * 2);

    if (type == 14) {
        switch (optType) {
            case 1: // a + b + c
                a = util.rangeRand(1, upa - 12);
                b = util.rangeRand(1, upb - 1 - a)
                c = util.rangeRand(1, upc - a - b);
                arr = [a, '+', b, '+', c];
                ans = a + b + c;
                break;
            case 2: // a - b - c
                a = util.rangeRand(upa - 7, upa);
                b = util.rangeRand(1, a - 2);
                c = util.rangeRand(1, a - b);
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

 //  20以内加减混合
function g1Second20AandS(upa, upb, upc, type) {
    let a = 0, b = 0, c = 0;
    let arr = [];
    let ans = 0;
    let ques;
    let optType;

    optType = Math.ceil(Math.random() * 2);

    if (type == 15) {
        switch (optType) {
            case 1:     //a+b-c
                a = util.rangeRand(1, upa - 8)
                b = util.rangeRand(1, upb - 1 - a);
                c = util.rangeRand(1, a + b)
                arr = [a, '+', b, '-', c];
                ans = a + b - c;
                break;
            case 2:     //a-b+c
                a = util.rangeRand(1, upa - 1);
                b = util.rangeRand(1, a - 1);
                c = util.rangeRand(1, upc - 1 - a + b)
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

module.exports = {
	g1Second20SBorrow: 	g1Second20SBorrow,
	g1Second20AorS: 	g1Second20AorS,
	g1Second10AandS10: 	g1Second10AandS10,
	g1Second2bAandS10: 	g1Second2bAandS10,
	g1Second20DulAorS: 	g1Second20DulAorS,
	g1Second20AandS: 	g1Second20AandS,

}