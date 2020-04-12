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
function f3bAorS(upa, upb, type) {
	let a = 0, b = 0, m = 0;
    let arr = [];
    let ans;
    let ques;
    let optType;

    optType = Math.ceil(Math.random() * 2);

    if (type == 70) {
        switch (optType) {
            case 1:     //a+b
                a = util.rangeRand(111, 999);
                b = util.rangeRand(111, 999 - a);

                arr = [a, '+', b];
                ans = a + b;
                break;
            case 2:     //a-b
                a = util.rangeRand(111, 999);
                b = util.rangeRand(111, a - 1);

                arr = [a, '-', b];
                ans = a - b;
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

//	71	两位数乘一位数或整十数
function f2bM1b10 (upa, upb, type) {
let a = 0, b = 0, m = 0;
    let arr = [];
    let ans;
    let ques;
    let optType = 0, bit = 0;

	bit = Math.ceil(Math.random() * 2);
	a = util.rangeRand(11, 99);

    if (type == 71) {
		if (bit == 1) {
			b = util.rangeRand(1, 9);
		} else if (bit == 2) {
			b = util.rangeRand(1, 9);
			b = b * 10;
		}

		arr = [a, '×', b];
		ans = a * b;
    } else {
        return -1;
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}

//	72	两位三位数除一位或整十数
//  FIXME: 余数处理, 
function f2b3bD1b10 (upa, upb, type) {
	let a = 0, b = 0, mod = 0;
    let arr = [];
    let ans;
    let ques;
    let optType = 0, bit = 0;

	bit = Math.ceil(Math.random() * 2);

    if (type == 72) {
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
		ans = a / b;
    } else {
        return -1;
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}

//	73	两位数乘整十数
function f2bM10 (upa, upb, type) {
	let a = 0, b = 0, m = 0;
    let arr = [];
    let ans;
    let ques;
    let optType = 0, bit = 0;

	//bit = Math.ceil(Math.random() * 2);
	bit = 2;
	a = util.rangeRand(11, 99);

    if (type == 73) {
		if (bit == 1) {
			b = util.rangeRand(1, 9);
		} else if (bit == 2) {
			b = util.rangeRand(1, 9);
			b = b * 10;
		}

		arr = [a, '×', b];
		ans = a * b;
    } else {
        return -1;
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}

//	74	整百数乘整十数
function f100M10 (upa, upb, type) {
	let a = 0, b = 0, m = 0;
    let arr = [];
    let ans;
    let ques;
    let optType = 0;

    if (type == 74) {
		a = util.rangeRand(1, 9);
		b = util.rangeRand(1, 9);

		a = a * 100;
		b = b * 10;

		arr = [a, '×', b];
		ans = a * b;
    } else {
        return -1;
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}

//	75	三位数乘两位
function f3bM2b (upa, upb, type) {
	let a = 0, b = 0, m = 0;
    let arr = [];
    let ans;
    let ques;
    let optType = 0;

    if (type == 75) {
		a = util.rangeRand(111, 999);
		b = util.rangeRand(11, 99);

		arr = [a, '×', b];
		ans = a * b;
    } else {
        return -1;
    }

    ques = arr.join(' ') + ' =' + ans + '%';

    return ques;
}

//	76	三位数四测混合运算 4题带小括号，2题带中括号
function f3b3bASMD4s (db, type, point) {
    let col1 = [];
    let col2 = [];
    let col3 = [];
    let that = point;
    let sques1="", sques2="", sques3="", sques0="", sques4="", sques5="";
    let nkey0, nkey1, nkey2, nkey3, nkey4, nkey5;
    let i = 0, j = 0, k=0;

    if (type == 76) {
        db.collection('q52').where({
            type: 5211
        }).get({
            success: res => {
                col1 = res.data;

                i = Math.floor(Math.random() * (col1.length - 1));
                sques0 = col1[i].ques;
                nkey0 = col1[i].key;
                col1.splice(i, 1);

                i = Math.floor(Math.random() * (col1.length - 1));
                sques1 = col1[i].ques;
                nkey1 = col1[i].key;

                that.setData({
                    ques0: sques0 + '=',
                    ques1: sques1 + '=',

                    key0: nkey0,
                    key1: nkey1
                })
            }
        });
        
        db.collection('q52').where({
            type: 1114
        }).get({
            success: res => {
                col2 = res.data;

                j = Math.floor(Math.random() * (col2.length - 1));
                sques2 = col2[j].ques;
                nkey2 = col2[j].key;
                col1.splice(j, 1);

                j = Math.floor(Math.random() * (col2.length - 1));
                sques3 = col2[j].ques;
                nkey3 = col2[j].key;

                // console.log(nkey2);
                // console.log(nkey3);

                that.setData({
                    ques2: sques2 + '=',
                    ques3: sques3 + '=',

                    key2: nkey2,
                    key3: nkey3
                })
            }
        });
       
        db.collection('q52').where({
            type: 1124
        }).get({
            success: res => {
                col3 = res.data;

                k = Math.floor(Math.random() * (col3.length - 1));
                sques4 = col3[k].ques;
                nkey4 = col3[k].key;
                col1.splice(k, 1);

                k = Math.floor(Math.random() * (col3.length - 1));
                sques5 = col3[k].ques;
                nkey5 = col3[k].key;

                // console.log(nkey4);
                // console.log(nkey5);

                that.setData({
                    ques4: sques4 + '=',
                    ques5: sques5 + '=',

                    key4: nkey4,
                    key5: nkey5
                })
            }
        });

    } else {
        return -1;

    }

}

//	77	简便运算
function fg4easy (upa, upb, type) {

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