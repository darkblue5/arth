//
//	三年级下
//  按大纲要求，生成符合各年级，各教学段所需试题
//  参数:    上限、步骤、运算符种类
//  返回值：    表达式字符串
//  A:  add
//  S:  sub
//  M:  Mul
//  D:  Div

let util = require("util.js");

//	50 两位数乘或除一位数
function f2bMorD1b(upa, upb, type) {
	let a = 0, b = 0, mod = 0;
    let arr = [];
    let ans;
    let ques;
    let optType;

    optType = Math.ceil(Math.random() * 2);

	b = util.rangeRand(2, 9);

    if (type == 50) {
        switch (optType) {
            case 1:     //a x b
                a = util.rangeRand(11, 99);

                arr = [a, '×', b];
                ans = a * b;
                break;
            case 2:     // a / b
                a = util.rangeRand(11, 99);

				mod = a % b;
				if (mod != 0)
					a = a - mod;

                arr = [a, '÷', b];
                ans = a / b;
                break;
            default:
                break;
        }
    } else {
        return -1;
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}

//	51 三位数乘或除一位数
//	FIXME: 乘积可能超过三位
function f3bMorD1b(upa, upb, type) {
	let a = 0, b = 0, mod = 0;
    let arr = [];
    let ans;
    let ques;
    let optType;

    optType = Math.ceil(Math.random() * 2);

	b = util.rangeRand(2, 9);

    if (type == 51) {
        switch (optType) {
            case 1:     //a x b
                a = util.rangeRand(111, 999);

                arr = [a, '×', b];
                ans = a * b;
                break;
            case 2:     // a / b
                a = util.rangeRand(111, 999);

				mod = a % b;
				if (mod != 0)
					a = a - mod;

                arr = [a, '÷', b];
                ans = a / b;
                break;
            default:
                break;
        }
    } else {
        return -1;
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}

//	52 整十整百乘一位数
function f110M1b(upa, upb, type) {
	let a = 0, b = 0;
	let bit = 0;
    let arr = [];
    let ans;
    let ques;
    let optType;

    optType = Math.ceil(Math.random() * 2);
	bit = Math.ceil(Math.random() * 2);

	b = util.rangeRand(2, 9);

    if (type == 52) {
		a = util.rangeRand(1, 9);

		if (bit == 1) {
			a = a * 10;
		} else if (bit == 2) {
			a = a * 100;
		}
		arr = [a, '×', b];
		ans = a * b;
		
    } else {
        return -1;
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}

//	53 两位数乘两位数
function f2bM2b(upa, upb, type) {
	let a = 0, b = 0;
    let arr = [];
    let ans;
    let ques;
    let optType;

    optType = Math.ceil(Math.random() * 2);

    if (type == 53) {
		a = util.rangeRand(10, 99);
		b = util.rangeRand(10, 99);

		arr = [a, '×', b];
		ans = a * b;		
    } else {
        return -1;
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}

//	54 两位数连乘
function f2bDoulM(upa, upb, upc, type) {
	let a = 0, b = 0, c = 0;
    let arr = [];
    let ans;
    let ques;

    if (type == 54) {
		a = util.rangeRand(10, 99);
		b = util.rangeRand(10, 99);
		c = util.rangeRand(10, 99);

		arr = [a, '×', b, '×', c];
		ans = a * b * c;		
    } else {
        return -1;
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}

//	55 两位数乘加、乘减混合
function f2bMandAorS(upa, upb, upc, type) {
	let a = 0, b = 0, c = 0, mod = 0;
    let arr = [];
    let ans;
    let ques;
    let optType;

    optType = Math.ceil(Math.random() * 2);


    if (type == 55) {
        switch (optType) {
            case 1:     //a x b + c
				a = util.rangeRand(10, 99);
				b = util.rangeRand(10, 99);
				c = util.rangeRand(10, 99);

                arr = [a, '×', b, '+', c];
                ans = a * b + c;
                break;
            case 2:     // a x b - c
				a = util.rangeRand(10, 99);
				b = util.rangeRand(10, 99);
				c = util.rangeRand(10, 99);

                arr = [a, '×', b, '-', c];
                ans = a * b - c;
                break;
            default:
                break;
        }
    } else {
        return -1;
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}

//	56 两个两位数四则混合运算
//	FIXME: 

function f2bASMD2s(type, db, point) {

    let col = [];
    let that = point;
    let cques = [], ckey = [];
    let k = 0, i = 0;

    if (type == 56) {
		db.collection('qu32').where({
            type: 3201
        }).get({
            success: res => {
                col = res.data;

                for (k = 0; k < 6; k++) {
                    i = Math.floor(Math.random() * (col.length - 1));
                    cques[k] = col[i].ques;
                    ckey[k] = parseInt(col[i].key);
                    col.splice(i, 1);
                    //console.log(cques[k]);
                    console.log(ckey[k]);

                }

                that.setData({
                    ques0: cques[0] + '=',
                    ques1: cques[1] + '=',
                    ques2: cques[2] + '=',
                    ques3: cques[3] + '=',
                    ques4: cques[4] + '=',
                    ques5: cques[5] + '=',

                    key: ckey
                });
            }
        });
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