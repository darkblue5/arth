//
//  按大纲要求，生成符合各年级，各教学段所需试题
//  参数:    上限、步骤、运算符种类
//  返回值：    表达式字符串
//  A:  add
//  S:  sub
//  M:  Mul
//  D:  Div

let util = require("util.js");

// 0： 5以内加减
function g1First5AorS (grade, type, pt) {
    let a = 0, b = 0, m = 0, i = 0;
    let arr = [];
    let ans;
    let ques = [];
    let optType;
    let that = pt;

    optType = Math.ceil(Math.random() * 2);

    if (grade == 0 && type == 0) {
    	for(i=0; i<6; i++) {
	        switch (optType) {
	            case 1:     //a+b
	                a = util.rangeRand(1, 5 - 1);
	                m = util.min(1, 5 - a);
	                b = util.rangeRand(1, m);

	                arr = [a, '+', b];
	                ans = a + b;
	                break;
	            case 2:     //a-b
	                a = util.rangeRand(1, 5 - 1);
	                b = util.rangeRand(1, a);


	                arr = [a, '-', b];
	                ans = a - b;
	                break;
	            default:
	                break;
	        }
	        ques[i] = arr.join(' ')
		}
    } else {
        return -1;
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

// 1： 10以内加或减
function g1First10AorS(grade, type, pt) {
    let a = 0, b = 0, m = 0, i=0;
    let arr = [];
    let ans;
    let ques = [];
    let optType;
    let that = pt;

    if (grade == 0 && type == 1) {
		for(i=0; i<6; i++) {
	    	optType = Math.ceil(Math.random() * 2);

	        switch (optType) {
	            case 1:     //a+b
	                a = util.rangeRand(1, 10 - 1);
	                m = util.min(1, 10 - a);
	                b = util.rangeRand(1, m);

	                arr = [a, '+', b];
	                ans = a + b;
	                break;
	            case 2:     //a-b
	                a = util.rangeRand(1, 10 - 1);
	                b = util.rangeRand(1, a);

	                arr = [a, '-', b];
	                ans = a - b;
	                break;
	            default:
	                break;
	        }
			ques[i] = arr.join(' ')
		}
    } else {
        return -1;
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


// 6： 10以内连加连减  
//  FIX ME:
function g1First10DulAorS(upa, upb, upc, type) {
    let a = 0, b = 0, c = 0;
    let arr = [];
    let ans = 0;
    let ques;
    let optType;

    optType = Math.ceil(Math.random() * 2);

    if (type == 2) {
        switch (optType) {
            case 1: // a + b + c
                a = util.rangeRand(4, 7);
                b = util.rangeRand(1, 9 - a)
                c = util.rangeRand(1, 9 - a - b);
                arr = [a, '+', b, '+', c];
                ans = a + b + c;
                break;
            case 2: // a - b - c
                a = util.rangeRand(7, 9);
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


// 7： 10以内加减混合
function g1First10AandS(upa, upb, upc, type) {
    let a = 0, b = 0, c = 0;
    let arr = [];
    let ans = 0;
    let ques;
    let optType;

    optType = Math.ceil(Math.random() * 2);

    if (type == 3) {
        switch (optType) {
            case 1:     //a+b-c
                a = util.rangeRand(1, 5)
                b = util.rangeRand(1, 9 - a);
                c = util.rangeRand(1, a + b)
                arr = [a, '+', b, '-', c];
                ans = a + b - c;
                break;
            case 2:     //a-b+c
                a = util.rangeRand(1, 9);
                b = util.rangeRand(1, a - 1);
                c = util.rangeRand(1, 9 - a + b)
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


// 1： 10加个位数
function g1First10A1b(upa, upb, type) {
    let b = 0;
    let arr = [];
    let ans;
    let ques;


    if (type == 4) {
        b = util.rangeRand(1, upb);

        arr = [10, '+', b];
        ans = 10 + b;
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}

//  5： 20以内进位加法
function g1First20ACarry(upa, upb, type) {
    let a = 0, b = 0, m = 0;
    let arr = [];
    let ans;
    let ques;

    if (type == 5) { //20以内进位加法
        a = util.rangeRand(1, upa - 11);
        m = a % 10;
        b = util.rangeRand((10 - m), 9);
    }

    arr = [a, '+', b];
    ans = a + b;

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;

}


/*

//  10:   两位数加减混合
function mixAS2bit(upa, upb, upc, type) {
    let a = 0, b = 0, c = 0;
    let arr = [];
    let ans = 0;
    let ques;
    let optType;

    a = rangeRand(upa / 5, upa / 2);
    optType = Math.ceil(Math.random() * 2);

    if (type == 10) {
        switch (optType) {
            case 1:     //a+b-c
                b = rangeRand(upb / 5, upb / 2);
                mid = a + b;
                c = rangeRand(10, mid)
                arr = [a, '+', b, '-', c];
                ans = mid - c;
                break;
            case 2:     //a-b+c
                b = Math.ceil(Math.random() * (a - upa / 5));        // FIXME:
                mid = a - b;
                c = Math.ceil(Math.random() * (upc - mid));
                arr = [a, '-', b, '+', c];
                ans = mid + c;
                break;
            default:
                return -1;
        }
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;

}

//  11：整百加减整十整百
function mixAS100100(upa, upb, type) {
    let a = 0, b = 0;
    let arr = [];
    let ans;
    let ques;
    let optType;
    let bit = 0;    //整百或整十

    optType = Math.ceil(Math.random() * 2);
    bit = Math.ceil(Math.random() * 2);

    if (type == 11) {
        switch (optType) {
            case 1:     //a+b
                a = rangeRand(1, upa);
                b = rangeRand(1, upb);
                a = a * 100;

                if (bit == 1) {
                    b = b * 100;
                } else if (bit == 2) {
                    b = b * 10;
                }       

                arr = [a, '+', b];
                ans = a + b;
                break;
            case 2:     //a-b
                a = rangeRand(1, upa);
                b = rangeRand(1, a);

                if (bit == 1) {
                    b = rangeRand(1, a);
                    b = b * 100;
                } else if (bit == 2) {
                    b = rangeRand(1, 9);
                    b = b * 10;
                }
                a = a * 100;                

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

//  12：三位数加减混合
function mixAS3bit(upa, upb, upc, type) {
    let a = 0, b = 0, c = 0;
    let arr = [];
    let ans = 0;
    let ques;
    let optType;

    a = rangeRand(Math.ceil(upa / 5), Math.ceil(upa / 2));
    optType = Math.ceil(Math.random() * 2);

    if (type == 12) {
        switch (optType) {
            case 1:     //a+b-c
                b = rangeRand(Math.ceil(upb / 5), Math.ceil(upb / 2));
                mid = a + b;
                c = rangeRand(10, mid)
                arr = [a, '+', b, '-', c];
                ans = mid - c;
                break;
            case 2:     //a-b+c
                b = Math.ceil(Math.random() * Math.ceil((a - upa / 5)));        // FIXME:
                mid = a - b;
                c = Math.ceil(Math.random() * (upc - mid));
                arr = [a, '-', b, '+', c];
                ans = mid + c;
                break;
            default:
                return -1;
        }
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;

}




//  16：有余数除法 未测试
//  FIXME: 
function div100mod(upa, upb, type) {
    let a = 0, b = 0, c = 0, mod = 0;
    let arr = [];
    let ans;
    let ques;

    if (type == 16) {       //有余数除数
        a = rangeRand(1, upa);
        b = rangeRand(1, upb);
        mod = rangeRand(1, b);
        c = a * b + mod;
    }
    arr = [c, '÷', b];
    ans = a;

    ques = arr.join(' ') + ' =' + ans + '%' + mod;

    return ques;
}


//  20：不进位乘法
function mulNoCarry(upa, upb, type) {
    let a1 = 0, a2 = 0, a = 0; b = 0, b1 = 0, b2 = 0, c1 = 0, c2 = 0, m = 0;
    let arr = [];
    let ans;
    let ques;

    if (type == 20) {       //有余数除数
        a1 = rangeRand(1, 9 );
        a2 = rangeRand(1, 9 );

        c1 = Math.floor(10 / a1);
        c2 = Math.floor(10 / a2);
        m = min(c1, c2);
        if (m == 0) m = 1;
        b1 = rangeRand(1, m);
        b2 = rangeRand(1, m);

        a = a1 + a2 * 10;
        b = b1 + b2 * 10;

        arr = [a, '×', b];
        ans = a * b;
    }
    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;

}

//  21：连续进位乘法
//  FIX ME
function mulWithCarry(upa, upb, type) {
    let a1 = 0, a2 = 0, a = 0; b = 0, b1 = 0, b2 = 0, c1 = 0, c2 = 0, m = 0;
    let arr = [];
    let ans;
    let ques;

    if (type == 21) {       //有余数除数
        a1 = rangeRand(1, 9);
        a2 = rangeRand(1, 9);

        c1 = Math.floor(10 / a1);
        c2 = Math.floor(10 / a2);
        m = max(c1, c2);
        if (m == 0) m = 1;
        b1 = rangeRand(m, 9);
        b2 = rangeRand(m, 9);

        a = a1 + a2 * 10;
        b = b1 + b2 * 10;

        arr = [a, '×', b];
        ans = a * b;
    }
    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}

//  22：乘数中间有0
function mulMid0(upa, upb, type) {
    let a1 = 0, a3 = 0, a = 0; b = 0;
    let arr = [];
    let ans;
    let ques;

    if (type == 22) {
        a1 = rangeRand(1, 9);
        a3 = rangeRand(1, 9);

        b = rangeRand(1, 9);

        a = a1 + a3 * 100;

        arr = [a, '×', b];
        ans = a * b;
    }
    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}

//  23：乘数末尾有0
function mulTail0(upa, upb, type) {
    let a2 = 0, a3 = 0, a = 0; b = 0;
    let arr = [];
    let ans;
    let ques;

    if (type == 23) {
        a2 = rangeRand(1, 9);
        a3 = rangeRand(1, 9);

        b = rangeRand(1, 9);

        a = a2*10 + a3 * 100;

        arr = [a, '×', b];
        ans = a * b;
    }
    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;

}

//  24：三位数除以一位数
function div3bit1bit(upa, upb, type) {
    let a = 0, b = 0, c = 0;
    let arr = [];
    let ans;
    let ques;

    if (type == 24) {       //表内除法
        a = rangeRand(100, upa);
        b = rangeRand(1, upb);
        c = a % b;
        if ((a-c) > 100)
            a = a - c;
        else if ((a-c) <= 100)
            a = a - c + b;
    }
   
    arr = [a, '÷', b];
    ans = a / b;

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}

//  25：两位数乘整十数
function mul2bit10(upa, upb, type) {
    let a = 0, b = 0;
    let arr = [];
    let ans;
    let ques;

    if (type == 25) { //20以内退位加法
        a = rangeRand(10, upa);
        b = rangeRand(1, upb);
    }

    b = b * 10;

    arr = [a, '×', b];
    ans = a * b;

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;

}


*/

module.exports = {
    g1First5AorS: g1First5AorS,
    g1First10AorS: g1First10AorS,
    g1First10DulAorS: g1First10DulAorS,
    g1First10AandS: g1First10AandS,
    g1First10A1b: g1First10A1b,
    g1First20ACarry: g1First20ACarry
}