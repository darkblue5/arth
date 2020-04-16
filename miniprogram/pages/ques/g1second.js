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
function g1Second20SBorrow(grade, type, pt) {
    let a = 0, b = 0, c = 0, m = 0, i=0;
    let arr = [];
    let key = [];
    let ques = [];
    let that = pt;

    if (grade == 1 && type == 0) { //20以内退位加法
        for (i=0; i<6; i++) {
            a = util.rangeRand(1, 8);
           // c = util.rangeRand(1, 8);
            b = util.rangeRand(a + 1, 9);

            a = a + 10;

            arr = [a, '-', b];
            key[i] = a - b;

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

// 11 20以内加或减
function g1Second20AorS(grade, type, pt) {
    let a = 0, b = 0, m = 0, i=0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;

    if (grade == 1 && type == 1) {
        for(i=0; i<6; i++) {
            optType = Math.ceil(Math.random() * 2);

            switch (optType) {
                    case 1:     //a+b
                        a = util.rangeRand(1, 20 - 1);
                        m = util.min(20, 20 - a);
                        b = util.rangeRand(1, m);

                        arr = [a, '+', b];
                        key[i] = a + b;
                        break;
                    case 2:     //a-b
                        a = util.rangeRand(1, 20 - 1);
                        b = util.rangeRand(1, a);


                        arr = [a, '-', b];
                        key[i] = a - b;
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


//  12   整十加减整十
function g1Second10AandS10(grade, type, pt) {
    let a = 0, b = 0, m = 0, i=0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;

    if (grade == 1 && type == 2) {
        for (i=0; i<6; i++) {
            optType = Math.ceil(Math.random() * 2);

            switch (optType) {
                case 1:     //a+b
                    a = util.rangeRand(1, 9);
                    m = util.min(1, 9 - a);
                    b = util.rangeRand(1, m);

                    a = a * 10;
                    b = b * 10;
                  
                    arr = [a, '+', b];
                    key[i] = a + b;
                    break;
                case 2:     //a-b
                    a = util.rangeRand(1, 9);
                    b = util.rangeRand(1, a);

                    a = a * 10;
                    b = b * 10;
                  
                    arr = [a, '-', b];
                    key[i] = a - b;
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


    return ques;
}

// 13 两位数加减一位数或整十数
function g1Second2bAandS10(grade, type, pt) {
    let a = 0, b = 0, m = 0, i=0;
    let arr = [];
    let key = [];
    let ques = [];
    let bit = 0;
    let optType;
    let that = pt;

    if (grade == 1 && type == 3) {
        for (i=0; i<6; i++) {
            optType = Math.ceil(Math.random() * 2);
            bit = Math.ceil(Math.random() * 2);

            switch (optType) {
                case 1:     //a+b
                    a = util.rangeRand(10, 99 - 11);
                   // m = util.min(upb, upa - a);
                   if (bit == 1) {
                   		b = util.rangeRand(1, 9);
                   } else if (bit == 2) {
    					b = util.rangeRand(1, (100 - a) / 10);
    					b = b * 10;
    				}

                    arr = [a, '+', b];
                    key[i] = a + b;
                    break;
                case 2:     //a-b
    				if (bit == 1) {
    					a = util.rangeRand(10, 99 - 1);
                   		b = util.rangeRand(1, 9);
    				} else if (bit == 2) {
    					a = util.rangeRand(20, 99 - 1);
    					b = util.rangeRand(1, a / 10 );
    					b = b * 10;
    				}

                    arr = [a, '-', b];
                    key[i] = a - b;
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


//	14	20以内连加或连减
function g1Second20DulAorS(grade, type, pt) {
    let a = 0, b = 0, c = 0, i=0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt;

    if (grade == 1 && type == 4) {
        for (i=0; i<6; i++) {
            optType = Math.ceil(Math.random() * 2);

            switch (optType) {
                case 1: // a + b + c
                    a = util.rangeRand(1, 20 - 12);
                    b = util.rangeRand(1, 20 - 1 - a)
                    c = util.rangeRand(1, 20 - a - b);
                    arr = [a, '+', b, '+', c];
                    key[i] = a + b + c;
                    break;
                case 2: // a - b - c
                    a = util.rangeRand(20 - 7, 20);
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

 //  20以内加减混合
function g1Second20AandS(grade, type, pt) {
    let a = 0, b = 0, c = 0, i=0;
    let arr = [];
    let key = [];
    let ques = [];
    let optType;
    let that = pt

    if (grade == 1 && type == 5) {
        for (i=0; i<6; i++) {
            optType = Math.ceil(Math.random() * 2);

            switch (optType) {
                case 1:     //a+b-c
                    a = util.rangeRand(1, 20 - 8)
                    b = util.rangeRand(1, 20 - 1 - a);
                    c = util.rangeRand(1, a + b)
                    arr = [a, '+', b, '-', c];
                    key[i] = a + b - c;
                    break;
                case 2:     //a-b+c
                    a = util.rangeRand(1, 20 - 1);
                    b = util.rangeRand(1, a - 1);
                    c = util.rangeRand(1, 20 - 1 - a + b)
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
	g1Second20SBorrow: 	g1Second20SBorrow,
	g1Second20AorS: 	g1Second20AorS,
	g1Second10AandS10: 	g1Second10AandS10,
	g1Second2bAandS10: 	g1Second2bAandS10,
	g1Second20DulAorS: 	g1Second20DulAorS,
	g1Second20AandS: 	g1Second20AandS,

}