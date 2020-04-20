//
//  按大纲要求，生成符合各年级，各教学段所需试题
//  参数:    上限、步骤、运算符种类
//  返回值：    表达式字符串
//  A:  add
//  S:  sub
//  M:  Mul
//  D:  Div

let util = require("util.js");

// 01： 5以内加减
function g1First5AorS (grade, type, pt) {
    let a = 0, b = 0, m = 0, i = 0;
    let arr = [];
    let key = [];
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
	                key[i] = a + b;
	                break;
	            case 2:     //a-b
	                a = util.rangeRand(1, 5 - 1);
	                b = util.rangeRand(1, a);


	                arr = [a, '-', b];
	                key[i] = a - b;
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

// 01： 10以内加或减
function g1First10AorS(grade, type, pt) {
    let a = 0, b = 0, m = 0, i=0;
    let arr = [];
    let key = [];
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
	                key[i] = a + b;
	                break;
	            case 2:     //a-b
	                a = util.rangeRand(1, 10 - 1);
	                b = util.rangeRand(1, a);

	                arr = [a, '-', b];
	                key[i] = a - b;
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


// 02 10以内连加连减  
//  FIX ME:
function g1First10DulAorS(grade, type, pt) {
    let a = 0, b = 0, c = 0, i=0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;

	if (grade == 0 && type == 2) {
    	for(i=0; i<6; i++) {
	    	optType = Math.ceil(Math.random() * 2);

	        switch (optType) {
	            case 1: // a + b + c
	                a = util.rangeRand(4, 7);
	                b = util.rangeRand(1, 9 - a)
	                c = util.rangeRand(1, 9 - a - b);
	                arr = [a, '+', b, '+', c];
	                key[i] = a + b + c;
	                break;
	            case 2: // a - b - c
	                a = util.rangeRand(7, 9);
	                b = util.rangeRand(1, a - 2);
	                c = util.rangeRand(1, a - b);
	                arr = [a, '-', b, '-', c];
	                key[i] = a - b - c;
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


// 03： 10以内加减混合
function g1First10AandS(grade, type, pt) {
    let a = 0, b = 0, c = 0, i=0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;

	if (grade == 0 && type == 3) {
		for (i=0; i<6; i++) {
	    	optType = Math.ceil(Math.random() * 2);

	        switch (optType) {
	            case 1:     //a+b-c
	                a = util.rangeRand(1, 5)
	                b = util.rangeRand(1, 9 - a);
	                c = util.rangeRand(1, a + b)
	                arr = [a, '+', b, '-', c];
	                key[i] = a + b - c;
	                break;
	            case 2:     //a-b+c
	                a = util.rangeRand(1, 9);
	                b = util.rangeRand(1, a - 1);
	                c = util.rangeRand(1, 9 - a + b)
	                arr = [a, '-', b, '+', c];
	                key[i] = a - b + c;
	                break;
	            default:
	                return -1;
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


// 04： 10加个位数
function g1First10A1b(grade, type, pt) {
    let b = 0, i=0;
    let arr = [];
    let ques = [];
    let key = [];
    let that = pt;

    if (grade == 0 && type == 4) {
    	for (i=0; i<6; i++) {
	        b = util.rangeRand(1, 9);

	        arr = [10, '+', b];
	        key[i] = 10 + b;
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

//  05： 20以内进位加法
function g1First20ACarry(grade, type, pt) {
    let a = 0, b = 0, m = 0, i=0;
    let arr = [];
    let key = [];
    let ques = [];
    let that = pt;

    if (grade == 0 && type == 5) {
    	for (i=0; i<6; i++) {
	        a = util.rangeRand(1, 7);
	        m = 10 - a;
	        b = util.rangeRand(m, 9);
	    
		    arr = [a, '+', b];
		    key[i] = a + b;

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

    return ques;
}


module.exports = {
    g1First5AorS: g1First5AorS,
    g1First10AorS: g1First10AorS,
    g1First10DulAorS: g1First10DulAorS,
    g1First10AandS: g1First10AandS,
    g1First10A1b: g1First10A1b,
    g1First20ACarry: g1First20ACarry
}