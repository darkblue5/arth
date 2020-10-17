//
//  g5second.js
//	function: 按大纲要求，生成符合五年级下学期所需试题
//  A: Add  S: Sub  M: Mul  D: Div
//  by sean wang
//  2020.9.19
//
import * as config from '../config/config.js';
let util = require("util.js");

function f1pot(grade, type, pt) {
    let that = pt;
    let pta, ita, a;
    let ptb, itb, b;
    let c;

    let res = 0;
    let optType;    // 1:加 2:减 3:乘 4:除
    let sques0 = "", sques1 = "", sques2 = "", sques3 = "", sques4 = "", sques5 = "";
    let ques = "";
    //let nkey0, nkey1, nkey2, nkey3, nkey4, nkey5;
    let key = [];
    let i = 0;

    if (grade == 9 && type == 0) {
        for (i=0; i<6; i++) {
            optType = util.rangeRand(1, 4);

            switch (optType) {
                case 1:
                    ita = util.rangeRand(1, 9);
                    pta = util.rangeRand(1, 99);
                    a = Number(ita + (pta / 100).toFixed(2));

                    itb = util.rangeRand(1, 20);
                    ptb = util.rangeRand(1, 9);
                    b = Number(itb + ptb / 10);

                    res = a + b;
                    ques = a.toString() + '+' + b.toString();
                    break;
                case 2:
                    ita = util.rangeRand(1, 9);
                    pta = util.rangeRand(1, 99);
                    a = Number(ita + (pta / 100).toFixed(2));

                    itb = util.rangeRand(1, ita - 1);
                    ptb = util.rangeRand(1, 9);
                    b = Number(itb + ptb / 10);

                    res = a - b;
                    ques = a.toString() + '-' + b.toString();
                    break;
                case 3:
                    ita = util.rangeRand(1, 9);
                    pta = util.rangeRand(1, 99);
                    a = Number(ita + (pta / 100).toFixed(2));

                    itb = util.rangeRand(1, 20);
                    ptb = util.rangeRand(1, 9);
                    b = Number(itb + ptb / 10);

                    // FIXME:
                    res = a * b
                    ques = a.toString() + '×' + b.toString();
                    break;
                case 4:
                    ita = util.rangeRand(1, 9);
                    pta = util.rangeRand(1, 99);
                    a = Number(ita + pta / 100);

                    itb = util.rangeRand(1, 20);
                    ptb = util.rangeRand(1, 9);
                    b = Number(itb + ptb / 10);

                    c = (a * b).toFixed(3);

                    res = c / b
                    ques = c.toString() + '÷' + b.toString();
                    break;
                default:
                    break;
            }

            switch (i) {
                case 0:
                    sques0 = ques;
                    key[0] = res;
                    break;
                case 1:
                    sques1 = ques;
                    key[1] = res;
                    break;
                case 2:
                    sques2 = ques;
                    key[2] = res;
                    break;
                case 3:
                    sques3 = ques;
                    key[3] = res;
                    break;
                case 4:
                    sques4 = ques;
                    key[4] = res;
                    break;
                case 5:
                    sques5 = ques;
                    key[5] = res;
                    break;
                default:
                    break;
            }
       }

        that.setData({            
            quesType: 0,
            keyType: 2,

            wdQues: 10,
            wdAns: 7,

            ques0: sques0,
            ques1: sques1,
            ques2: sques2,
            ques3: sques3,
            ques4: sques4,
            ques5: sques5,

            rques0: sques0,
            rques1: sques1,
            rques2: sques2,
            rques3: sques3,
            rques4: sques4,
            rques5: sques5,


            keys: key
        })
    }

    return 0;
}

// 小数四则混合运算
function fpotASMD(grade, type, db, pt) {
    let that = pt;
    let sques0 = "", sques1 = "", sques2 = "", sques3 = "", sques4 = "", sques5 = "";
    //let nkey0, nkey1, nkey2, nkey3, nkey4, nkey5;
    let key = [];
	let col = [];
    let i = 0;

    if (grade == 9 && type == 1) {

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q52',
                type: 5211,
                count: config.types[9].count[1]
            }
        }).then(res => {
            let i = 0;
            let ckey = [];
            
            for (i=0; i<6; i++) {
                ckey[i] = parseInt(res.result.data[i].key);
            }

            that.setData({
                quesType: 0,
                keyType: 0,

                wdQues: 15,
                wdAns: 2,

                ques0: res.result.data[0].ques,
                ques1: res.result.data[1].ques,
                ques2: res.result.data[2].ques,
                ques3: res.result.data[3].ques,
                ques4: res.result.data[4].ques,
                ques5: res.result.data[5].ques,

                rques0: res.result.data[0].ques,
                rques1: res.result.data[1].ques,
                rques2: res.result.data[2].ques,
                rques3: res.result.data[3].ques,
                rques4: res.result.data[4].ques,
                rques5: res.result.data[5].ques,

                keys: ckey
            });
        }).catch(err => {
            // handle error
        })

    } else {
        return -1;
    }

    return 0;
}

//小数简便运算
function fpotSimple(grade, type, db, pt) {
    let that = pt;
    let sques0 = "", sques1 = "", sques2 = "", sques3 = "", sques4 = "", sques5 = "";
    //let nkey0, nkey1, nkey2, nkey3, nkey4, nkey5;
    let key = [];
    let col = [];
    let i = 0;
    
    if (grade == 9 && type == 2) {

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q52',
                type: 5212,
                count: config.types[9].count[2]
            }
        }).then(res => {
            let i = 0;
            let ckey = [];
            
            for (i=0; i<6; i++) {
                ckey[i] = parseInt(res.result.data[i].key);
            }

            that.setData({
                quesType: 0,
                keyType: 0,

                wdQues: 16,
                wdAns: 1,

                ques0: res.result.data[0].ques,
                ques1: res.result.data[1].ques,
                ques2: res.result.data[2].ques,
                ques3: res.result.data[3].ques,
                ques4: res.result.data[4].ques,
                ques5: res.result.data[5].ques,

                rques0: res.result.data[0].ques,
                rques1: res.result.data[1].ques,
                rques2: res.result.data[2].ques,
                rques3: res.result.data[3].ques,
                rques4: res.result.data[4].ques,
                rques5: res.result.data[5].ques,

                keys: ckey
            });
        }).catch(err => {
            // handle error
        })

    } else {
        return -1;
    }

    return 0;
}

//简单方程
function f2formula(grade, type, db, pt) {
    let that = pt;
    //let sques0 = "", sques1 = "", sques2 = "", sques3 = "", sques4 = "", sques5 = "";
    //let nkey0, nkey1, nkey2, nkey3, nkey4, nkey5;
    // let key = [];
    // let col = [];
    // let i = 0;
   
    if (grade == 9 && type == 3) {
        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q52',
                type: 5213,
                //count: config.types[9].count[3]
                count: 28
            }
        }).then(res => {
            console.log(res);
            
            let i = 0;
            let ckey = [];
            
            for (i=0; i<6; i++) {
                ckey[i] = parseInt(res.result.data[i].key);
            }

            that.setData({
                quesType: 3,
                keyType: 2,

                wdQues: 13,
                wdAns: 4,

                ques0: res.result.data[0].ques,
                ques1: res.result.data[1].ques,
                ques2: res.result.data[2].ques,
                ques3: res.result.data[3].ques,
                ques4: res.result.data[4].ques,
                ques5: res.result.data[5].ques,

                rques0: res.result.data[0].ques,
                rques1: res.result.data[1].ques,
                rques2: res.result.data[2].ques,
                rques3: res.result.data[3].ques,
                rques4: res.result.data[4].ques,
                rques5: res.result.data[5].ques,

                keys: ckey
            });
        }).catch(err => {
            // handle error
        })

    } else {
        return -1;
    }

    return 0;
}

//同分母分数加减
function fsfAorS(grade, type, pt) {
    let that = pt;
    let shizi = [];

    let you = [];
    let czs = [], cfz = [], cfm = [], cop = [];
    let cKeyZs = [], cKeyFz = [], cKeyFm = [], cKeyFraType = [];
    let len = 0;
    let i = 0, j = 0;
    let optType = 0;

    let cques = [];     //编码表达式

    if (grade == 9 && type == 4) {
        for (j = 0; j < 6; j++) {
            optType = util.rangeRand(1, 2);

            you[0] = true;
            // czs[0] = 0;

            cfm[0] = util.rangeRand(3, 99);
            cfz[0] = util.rangeRand(1, cfm[0] - 1);

            if (optType == 1) {
                you[1] = false;
                czs[1] = '+';

                you[2] = true;
                cfz[2] = util.rangeRand(1, cfm[0] - cfz[0] - 1);
                cfm[2] = cfm[0];

                cKeyZs[j] = 0;
                cKeyFz[j] = cfz[0] + cfz[2];
                cKeyFm[j] = cfm[0];
            } else if(optType == 2) {
                you[1] = false;
                czs[1] = '-';

                you[2] = true;
                cfz[2] = util.rangeRand(1, cfz[0] - 1);
                cfm[2] = cfm[0];

                cKeyZs[j] = 0;
                cKeyFz[j] = cfz[0] - cfz[2];
                cKeyFm[j] = cfm[0];
            }

            //console.log(cKeyZs[j], cKeyFz[j], cKeyFm[j]);

            shizi[j] = [
                {
                    youfs: you[0],
                    zs: czs[0],
                    fz: cfz[0],
                    fm: cfm[0],
                },
                {
                    youfs: you[1],
                    zs: czs[1],
                    fz: cfz[1],
                    fm: cfm[1],
                },
                {
                    youfs: you[2],
                    zs: czs[2],
                    fz: cfz[2],
                    fm: cfm[2],
                }

            ];

            cKeyFraType[j] = 2;

            //编码同分母有达式为一维字符串
            //for (i=0; i<3; i++) {
                //cques[j] = 'f7/30 + f2/5';
                cques[j] = 'f' + cfz[0] + '/' + cfm[0] + ' ' + czs[1] + ' ' + 'f' + cfz[2] + '/' + cfm[2];
                //console.log('cques[j]' + cques[j]);
           // }
        }

        that.setData({
            quesType: 1,
            keyType: 3,

            wdQues: 10,
            wdAns: 5,

            ques0: shizi[0],
            ques1: shizi[1],
            ques2: shizi[2],
            ques3: shizi[3],
            ques4: shizi[4],   
            ques5: shizi[5],

            rques0: cques[0],
            rques1: cques[1],
            rques2: cques[2],
            rques3: cques[3],
            rques4: cques[4],   
            rques5: cques[5],

           // keyZs: cKeyZs,
            keyFz: cKeyFz,
            keyFm: cKeyFm,

            keyFraType: cKeyFraType
        });
    }

    return 0;
}

//异分母带括号分数加减
function fdfAorS(grade, type, db, pt) {
    let that = pt;
    let shizi = [];

    let node = [], ans = [], ansZs = [], ansFs = [];
    let fsfh = [];
    let you = [], czs = [], cfz = [], cfm = [], cop = [];
    let cKeyZs = [], cKeyFz = [], cKeyFm = [], cKeyFraType = [];

    let len = 0;
    let i = 0, j = 0, k=0;
    let cques = [];
    let ckey = [];

    let sques0 = "", sques1 = "", sques2 = "", sques3 = "", sques4 = "", sques5 = "";
    let nkey0, nkey1, nkey2, nkey3, nkey4, nkey5;
    let tmpAns;
    let col = [];


    if (grade == 9 && type == 5) {

        db.collection('q52').where({
            type: 5214
        }).get({
            success: res => {
                col = res.data;

                //console.log(col.length);

                for (k = 0; k < 6; k++) {
                    i = Math.floor(Math.random() * (col.length - 1));
                    cques[k] = col[i].ques;
                    ckey[k] = col[i].key;
                    col.splice(i, 1);
                    //    console.log(cques[k]);
                }

                // parse key string
                for (k = 0; k < 6; k++) {
                    switch (ckey[k][0]) {
                        // case 'i':
                        //     cKeyFraType[k] = 1;
                        //     tmpAns = (ckey[k]).substr(1);

                        //     cKeyZs[k] = parseInt(tmpAns);
                        //     cKeyFz[k] = 0;
                        //     cKeyFm[k] = 0;

                        //     //console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);
                        //     break;
                        case 'f':
                            cKeyFraType[k] = 2;
                            tmpAns = (ckey[k]).substr(1);

                            cKeyZs[k] = 0;

                            ans = tmpAns.split('/');
                            cKeyFz[k] = parseInt(ans[0]);
                            cKeyFm[k] = parseInt(ans[1]);
                            //console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);

                            break;
                        case 'm':
                            cKeyFraType[k] = 3;
                            tmpAns = (ckey[k]).substr(1);

                            ans = tmpAns.split('f');
                            cKeyZs[k] = parseInt(ans[0]);

                            ansFs = ans[1].split('/');
                            cKeyFz[k] = parseInt(ansFs[0]);
                            cKeyFm[k] = parseInt(ansFs[1]);
                            //console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);

                            break;
                        default:
                            cKeyFraType[k] = 1;
                            //tmpAns = (ckey[k]).substr(1);
                            tmpAns = ckey[k];

                            cKeyZs[k] = parseInt(tmpAns);
                            cKeyFz[k] = 0;
                            cKeyFm[k] = 0;
                            break;
                    }
                }

                for (j = 0; j < 6; j++) {
                    node = cques[j].split(' ');
                    len = node.length;

                    for (i = 0; i < len; i++) {

                        if (node[i][0] == 'f') {
                            you[i] = true;
                            node[i] = node[i].replace('f', '')

                            fsfh = node[i].split('/');
                            cfz[i] = fsfh[0];
                            cfm[i] = fsfh[1];
                        } else if (node[i][0] != 'f') {
                            you[i] = false;
                            czs[i] = node[i];
                            cfz[i] = 0;
                            cfm[i] = 0;
                        }
                    }

                    shizi[j] = [
                        {
                            youfs: you[0],
                            zs: czs[0],
                            fz: cfz[0],
                            fm: cfm[0],
                        },
                        {
                            youfs: you[1],
                            zs: czs[1],
                            fz: cfz[1],
                            fm: cfm[1],
                        },
                        {
                            youfs: you[2],
                            zs: czs[2],
                            fz: cfz[2],
                            fm: cfm[2],
                        },
                        {
                            youfs: you[3],
                            zs: czs[3],
                            fz: cfz[3],
                            fm: cfm[3],
                        },
                        {
                            youfs: you[4],
                            zs: czs[4],
                            fz: cfz[4],
                            fm: cfm[4],
                        },
                        {
                            youfs: you[5],
                            zs: czs[5],
                            fz: cfz[5],
                            fm: cfm[5],
                        },
                        {
                            youfs: you[6],
                            zs: czs[6],
                            fz: cfz[6],
                            fm: cfm[6],
                        },

                    ];

                    for (i = 0; i < 7; i++) {
                        you[i] = false;
                        czs[i] = '';
                        cfz[i] = 0;
                        cfm[i] = 0;
                    }
                }

                that.setData({
                    quesType: 1,
                    keyType: 3,

        wdQues: 12,
        wdAns: 5,

                    ques0: shizi[0],
                    ques1: shizi[1],
                    ques2: shizi[2],
                    ques3: shizi[3],
                    ques4: shizi[4],
                    ques5: shizi[5],

                    rques0: cques[0],
                    rques1: cques[1],
                    rques2: cques[2],
                    rques3: cques[3],
                    rques4: cques[4],
                    rques5: cques[5],                

                    keyZs: cKeyZs,
                    keyFz: cKeyFz,
                    keyFm: cKeyFm,

                    keyFraType: cKeyFraType
                });

                //console.log('cKeyZs, cKeyFz, cKeyFm', cKeyZs, cKeyFz, cKeyFm)
            }
        });       
    }

    return 0;
}


module.exports = {
    f1pot: f1pot,
    fpotASMD: fpotASMD,
    fpotSimple: fpotSimple,
    f2formula: f2formula,
    fsfAorS: fsfAorS,
    fdfAorS: fdfAorS
}