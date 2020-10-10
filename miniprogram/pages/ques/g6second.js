//
//  g6second.js
//	function: 按大纲要求，生成符合六年级下学期所需试题
//  A: Add  S: Sub  M: Mul  D: Div
//  by sean wang
//  2020.9.22
//

import * as config from '../config/config.js';
let util = require("util.js");

//  各类型数字一步运算
function f61Step(grade, type, db, pt) {
    let that = pt;
    let shizi = [];

    let node = [], ans = [], ansZs = [], ansFs = [];
    let fsfh = [];
    let you = [], czs = [], cfz = [], cfm = [], cop = [];
    let cKeyZs = [], cKeyFz = [], cKeyFm = [], cKeyFraType = [];

    let len = 0;
    let i = 0, j = 0, k = 0;
    let cques = [];
    let ckey = [];

    let tmpAns;
    
    if (grade == 11 && type == 0) {
        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q62',
                type: 6201,
                //count: config.types[11].count[0]
                count: 88
            }
        }).then(res => {           
            for (k = 0; k < 3; k++) {
                cques[k] = res.result.data[k].ques;
                ckey[k] = res.result.data[k].key;        
            }

            console.log('ckey: ' + ckey);
            // parse key string
            for (k = 0; k < 3; k++) {
                switch (ckey[k][0]) {         
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
                        cKeyFraType[k] = 4;     // 无分数全部采用浮点型进行比对
                        tmpAns = ckey[k];

                        cKeyZs[k] = parseFloat(tmpAns);
                        cKeyFz[k] = 0;
                        cKeyFm[k] = 0;
                        break;
                }
                console.log( 'cKeyFraType[k]: ' + cKeyFraType[k] + cKeyZs[k] + cKeyFz[k] + cKeyFm[k] );
            }

            for (j = 0; j < 3; j++) {
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
                    {
                        youfs: you[7],
                        zs: czs[7],
                        fz: cfz[7],
                        fm: cfm[7],
                    },
                    {
                        youfs: you[8],
                        zs: czs[8],
                        fz: cfz[8],
                        fm: cfm[8],
                    },
                    {
                        youfs: you[9],
                        zs: czs[9],
                        fz: cfz[9],
                        fm: cfm[9],
                    },
                    {
                        youfs: you[10],
                        zs: czs[10],
                        fz: cfz[10],
                        fm: cfm[10],
                    },
                    {
                        youfs: you[11],
                        zs: czs[11],
                        fz: cfz[11],
                        fm: cfm[11],
                    },

                ];

                for (i = 0; i < 11; i++) {
                    you[i] = false;
                    czs[i] = '';
                    cfz[i] = 0;
                    cfm[i] = 0;
                }
            }
            
            // console.log('cKeyZs: ' + cKeyZs);
            // console.log(cKeyFz);
            // console.log(cKeyFm);
            // console.log('cKeyFraType' + cKeyFraType);

            that.setData({
                quesType: 1,
                keyType: 3,

                wdQues: 12,
                wdAns: 5,

                ques0: shizi[0],
                ques1: shizi[1],
                ques2: shizi[2],

                keyZs: cKeyZs,
                keyFz: cKeyFz,
                keyFm: cKeyFm,

                keyFraType: cKeyFraType
            });

        }).catch(err => {
            // handle error
        })
        
    } else {
        return -1;
    }

    if (grade == 11 && type == 0) {
        //console.log(config.types[10].count[1]);

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q62',
                type: 6203,
                //count: config.types[11].count[0]
                count: 204
            }
        }).then(res => {           
            for (k = 0; k < 3; k++) {
                cques[k] = res.result.data[k].ques;
                ckey[k] = res.result.data[k].key;        
            }

            console.log(ckey);
            // parse key string
            for (k = 0; k < 3; k++) {
                switch (ckey[k][0]) {
         
                    case 'f':
                        cKeyFraType[k + 3] = 2;
                        tmpAns = (ckey[k]).substr(1);

                        cKeyZs[k] = 0;

                        ans = tmpAns.split('/');
                        cKeyFz[k + 3] = parseInt(ans[0]);
                        cKeyFm[k + 3] = parseInt(ans[1]);
                        //console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);
                        break;
                    case 'm':
                        cKeyFraType[k + 3] = 3;
                        tmpAns = (ckey[k]).substr(1);

                        ans = tmpAns.split('f');
                        cKeyZs[k + 3] = parseInt(ans[0]);

                        ansFs = ans[1].split('/');
                        cKeyFz[k + 3] = parseInt(ansFs[0]);
                        cKeyFm[k + 3] = parseInt(ansFs[1]);
                        //console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);
                        break;
                    default:
                        cKeyFraType[k + 3] = 4;     // 无分数全部采用浮点型进行比对
                        tmpAns = ckey[k];

                        cKeyZs[k + 3] = parseFloat(tmpAns);
                        cKeyFz[k + 3] = 0;
                        cKeyFm[k + 3] = 0;
                        break;
                }
                //console.log(cKeyFraType[k], cKeyZs[k], cKeyFz[k], cKeyFm[k]);
            }

            for (j = 0; j < 3; j++) {
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

                shizi[j + 3] = [
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
                    {
                        youfs: you[7],
                        zs: czs[7],
                        fz: cfz[7],
                        fm: cfm[7],
                    },
                    {
                        youfs: you[8],
                        zs: czs[8],
                        fz: cfz[8],
                        fm: cfm[8],
                    },
                    {
                        youfs: you[9],
                        zs: czs[9],
                        fz: cfz[9],
                        fm: cfm[9],
                    },
                    {
                        youfs: you[10],
                        zs: czs[10],
                        fz: cfz[10],
                        fm: cfm[10],
                    },
                    {
                        youfs: you[11],
                        zs: czs[11],
                        fz: cfz[11],
                        fm: cfm[11],
                    },

                ];

                for (i = 0; i < 11; i++) {
                    you[i] = false;
                    czs[i] = '';
                    cfz[i] = 0;
                    cfm[i] = 0;
                }
            }

            // console.log(cKeyZs);
            // console.log(cKeyFz);
            // console.log(cKeyFm);
            // console.log(cKeyFraType);

            that.setData({
                quesType: 1,
                keyType: 3,

                wdQues: 12,
                wdAns: 5,

                ques3: shizi[3],
                ques4: shizi[4],
                ques5: shizi[5],

                keyZs: cKeyZs,
                keyFz: cKeyFz,
                keyFm: cKeyFm,

                keyFraType: cKeyFraType
            });
        }).catch(err => {
            // handle error
        })
        
    } else {
        return -1;
    }

    return 0;
}

// 各类型数字四则运算
function f64Opt(grade, type, db, pt) {
    let that = pt;
    let shizi = [];

    let node = [], ans = [], ansZs = [], ansFs = [];
    let fsfh = [];
    let you = [], czs = [], cfz = [], cfm = [], cop = [];
    let cKeyZs = [], cKeyFz = [], cKeyFm = [], cKeyFraType = [];

    let len = 0;
    let i = 0, j = 0, k = 0;
    let cques = [];
    let ckey = [];

    let tmpAns;
    
    if (grade == 11 && type == 1) {
        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q62',
                type: 6202,
                //count: config.types[11].count[0]
                count: 111
            }
        }).then(res => {           
            for (k = 0; k < 3; k++) {
                cques[k] = res.result.data[k].ques;
                ckey[k] = res.result.data[k].key;        
            }

            console.log(ckey);
            // parse key string
            for (k = 0; k < 3; k++) {
                switch (ckey[k][0]) {
         
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
                        cKeyFraType[k] = 4;     // 无分数全部采用浮点型进行比对
                        tmpAns = ckey[k];

                        cKeyZs[k] = parseFloat(tmpAns);
                        cKeyFz[k] = 0;
                        cKeyFm[k] = 0;
                        break;
                }
                //console.log(cKeyFraType[k], cKeyZs[k], cKeyFz[k], cKeyFm[k]);
            }

            console.log('cKeyFraType[k]: ' + cKeyFraType[k] + cKeyZs[k] + cKeyFz[k] + cKeyFm[k]);

            for (j = 0; j < 3; j++) {
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
                    {
                        youfs: you[7],
                        zs: czs[7],
                        fz: cfz[7],
                        fm: cfm[7],
                    },
                    {
                        youfs: you[8],
                        zs: czs[8],
                        fz: cfz[8],
                        fm: cfm[8],
                    },
                    {
                        youfs: you[9],
                        zs: czs[9],
                        fz: cfz[9],
                        fm: cfm[9],
                    },
                    {
                        youfs: you[10],
                        zs: czs[10],
                        fz: cfz[10],
                        fm: cfm[10],
                    },
                    {
                        youfs: you[11],
                        zs: czs[11],
                        fz: cfz[11],
                        fm: cfm[11],
                    },

                ];

                for (i = 0; i < 11; i++) {
                    you[i] = false;
                    czs[i] = '';
                    cfz[i] = 0;
                    cfm[i] = 0;
                }
            }

            that.setData({
                quesType: 1,
                keyType: 3,

                ques0: shizi[0],
                ques1: shizi[1],
                ques2: shizi[2],

                keyZs: cKeyZs,
                keyFz: cKeyFz,
                keyFm: cKeyFm,

                keyFraType: cKeyFraType
            });

        }).catch(err => {
            // handle error
        })
        
    } else {
        return -1;
    }

    if (grade == 11 && type == 1) {
        //console.log(config.types[10].count[1]);

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q62',
                type: 6204,
                //count: config.types[11].count[0]
                count: 122
            }
        }).then(res => {           
            for (k = 0; k < 3; k++) {
                cques[k] = res.result.data[k].ques;
                ckey[k] = res.result.data[k].key;        
            }

            console.log(ckey);
            // parse key string
            for (k = 0; k < 3; k++) {
                switch (ckey[k][0]) {
         
                    case 'f':
                        cKeyFraType[k + 3] = 2;
                        tmpAns = (ckey[k]).substr(1);

                        cKeyZs[k] = 0;

                        ans = tmpAns.split('/');
                        cKeyFz[k + 3] = parseInt(ans[0]);
                        cKeyFm[k + 3] = parseInt(ans[1]);
                        //console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);

                        break;
                    case 'm':
                        cKeyFraType[k + 3] = 3;
                        tmpAns = (ckey[k]).substr(1);

                        ans = tmpAns.split('f');
                        cKeyZs[k + 3] = parseInt(ans[0]);

                        ansFs = ans[1].split('/');
                        cKeyFz[k + 3] = parseInt(ansFs[0]);
                        cKeyFm[k + 3] = parseInt(ansFs[1]);
                        //console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);

                        break;
                    default:
                        cKeyFraType[k + 3] = 4;     // 无分数全部采用浮点型进行比对
                        tmpAns = ckey[k];

                        cKeyZs[k + 3] = parseFloat(tmpAns);
                        cKeyFz[k + 3] = 0;
                        cKeyFm[k + 3] = 0;
                        break;
                }
                //console.log(cKeyFraType[k], cKeyZs[k], cKeyFz[k], cKeyFm[k]);
            }

            for (j = 0; j < 3; j++) {
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

                shizi[j + 3] = [
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
                    {
                        youfs: you[7],
                        zs: czs[7],
                        fz: cfz[7],
                        fm: cfm[7],
                    },
                    {
                        youfs: you[8],
                        zs: czs[8],
                        fz: cfz[8],
                        fm: cfm[8],
                    },
                    {
                        youfs: you[9],
                        zs: czs[9],
                        fz: cfz[9],
                        fm: cfm[9],
                    },
                    {
                        youfs: you[10],
                        zs: czs[10],
                        fz: cfz[10],
                        fm: cfm[10],
                    },
                    {
                        youfs: you[11],
                        zs: czs[11],
                        fz: cfz[11],
                        fm: cfm[11],
                    },

                ];

                for (i = 0; i < 11; i++) {
                    you[i] = false;
                    czs[i] = '';
                    cfz[i] = 0;
                    cfm[i] = 0;
                }
            }

            that.setData({
                quesType: 1,
                keyType: 3,

                wdQues: 14,
                wdAns: 3,

                ques3: shizi[3],
                ques4: shizi[4],
                ques5: shizi[5],

                keyZs: cKeyZs,
                keyFz: cKeyFz,
                keyFm: cKeyFm,

                keyFraType: cKeyFraType
            });

        }).catch(err => {
            // handle error
        })
        
    } else {
        return -1;
    }

    return 0;
}

//  112：各类型数字简便运算
function f6Simple(grade, type, db, pt) {
    let that = pt;
    let shizi = [];

    let node = [], ans = [], ansZs = [], ansFs = [];
    let fsfh = [];
    let you = [], czs = [], cfz = [], cfm = [], cop = [];
    let cKeyZs = [], cKeyFz = [], cKeyFm = [], cKeyFraType = [];

    let len = 0;
    let i = 0, j = 0, k = 0;
    let cques = [];
    let ckey = [];

    let tmpAns;

    if (grade == 11 && type == 2) {
        //console.log(config.types[10].count[1]);

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q62',
                type: 6205,
                count: config.types[11].count[2]
            }
        }).then(res => {           
            for (k = 0; k < 6; k++) {
                cques[k] = res.result.data[k].ques;
                ckey[k] = res.result.data[k].key;        
            }

            console.log(ckey);
            // parse key string
            for (k = 0; k < 6; k++) {
                switch (ckey[k][0]) {
         
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
                        cKeyFraType[k] = 4;     // 无分数全部采用浮点型进行比对
                        tmpAns = ckey[k];

                        cKeyZs[k] = parseFloat(tmpAns);
                        cKeyFz[k] = 0;
                        cKeyFm[k] = 0;
                        break;
                }
                //console.log(cKeyFraType[k], cKeyZs[k], cKeyFz[k], cKeyFm[k]);
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
                    {
                        youfs: you[7],
                        zs: czs[7],
                        fz: cfz[7],
                        fm: cfm[7],
                    },
                    {
                        youfs: you[8],
                        zs: czs[8],
                        fz: cfz[8],
                        fm: cfm[8],
                    },
                    {
                        youfs: you[9],
                        zs: czs[9],
                        fz: cfz[9],
                        fm: cfm[9],
                    },
                    {
                        youfs: you[10],
                        zs: czs[10],
                        fz: cfz[10],
                        fm: cfm[10],
                    },
                    {
                        youfs: you[11],
                        zs: czs[11],
                        fz: cfz[11],
                        fm: cfm[11],
                    },

                ];

                for (i = 0; i < 11; i++) {
                    you[i] = false;
                    czs[i] = '';
                    cfz[i] = 0;
                    cfm[i] = 0;
                }
            }

            that.setData({
                quesType: 1,
                keyType: 3,

                wdQues: 14,
                wdAns: 3,

                ques0: shizi[0],
                ques1: shizi[1],
                ques2: shizi[2],
                ques3: shizi[3],
                ques4: shizi[4],
                ques5: shizi[5],

                keyZs: cKeyZs,
                keyFz: cKeyFz,
                keyFm: cKeyFm,

                keyFraType: cKeyFraType
            });

        }).catch(err => {
            // handle error
        })
        
    } else {
        return -1;
    }

    return 0;

}

//  113: 解方程
function f6Formula(grade, type, db, pt) {
    let that = pt;
    let shizi = [];

    let node = [], ans = [], ansZs = [], ansFs = [];
    let fsfh = [];
    let you = [], czs = [], cfz = [], cfm = [], cop = [];
    let cKeyZs = [], cKeyFz = [], cKeyFm = [], cKeyFraType = [];

    let len = 0;
    let i = 0, j = 0, k = 0;
    let cques = [];
    let ckey = [];

    let tmpAns;

    if (grade == 11 && type == 3) {
        //console.log(config.types[10].count[1]);

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q62',
                type: 6206,
                count: config.types[11].count[3]
            }
        }).then(res => {           
            for (k = 0; k < 6; k++) {
                cques[k] = res.result.data[k].ques;
                ckey[k] = res.result.data[k].key;        
            }

            console.log(ckey);
            // parse key string
            for (k = 0; k < 6; k++) {
                switch (ckey[k][0]) {
         
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
                        tmpAns = ckey[k];

                        cKeyZs[k] = parseInt(tmpAns);
                        cKeyFz[k] = 0;
                        cKeyFm[k] = 0;
                        break;
                }
                //console.log(cKeyFraType[k], cKeyZs[k], cKeyFz[k], cKeyFm[k]);
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
                    {
                        youfs: you[7],
                        zs: czs[7],
                        fz: cfz[7],
                        fm: cfm[7],
                    },
                    {
                        youfs: you[8],
                        zs: czs[8],
                        fz: cfz[8],
                        fm: cfm[8],
                    },
                    {
                        youfs: you[9],
                        zs: czs[9],
                        fz: cfz[9],
                        fm: cfm[9],
                    },
                    {
                        youfs: you[10],
                        zs: czs[10],
                        fz: cfz[10],
                        fm: cfm[10],
                    },
                    {
                        youfs: you[11],
                        zs: czs[11],
                        fz: cfz[11],
                        fm: cfm[11],
                    },

                ];

                for (i = 0; i < 11; i++) {
                    you[i] = false;
                    czs[i] = '';
                    cfz[i] = 0;
                    cfm[i] = 0;
                }
            }

            that.setData({
                quesType: 4,
                keyType: 3,

                wdQues: 12,
                wdAns: 5,

                ques0: shizi[0],
                ques1: shizi[1],
                ques2: shizi[2],
                ques3: shizi[3],
                ques4: shizi[4],
                ques5: shizi[5],

                keyZs: cKeyZs,
                keyFz: cKeyFz,
                keyFm: cKeyFm,

                keyFraType: cKeyFraType
            });

        }).catch(err => {
            // handle error
        })
        
    } else {
        return -1;
    }

    return 0;

}

//  114: 解比例
function f6Scale(grade, type, db, pt) {
    let that = pt;
    let shizi = [];

    let node = [], ans = [], ansZs = [], ansFs = [];
    let fsfh = [];
    let you = [], czs = [], cfz = [], cfm = [], cop = [];
    let cKeyZs = [], cKeyFz = [], cKeyFm = [], cKeyFraType = [];

    let len = 0;
    let i = 0, j = 0, k = 0;
    let cques = [];
    let ckey = [];

    let tmpAns;

    if (grade == 11 && type == 4) {
        //console.log(config.types[10].count[1]);

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q62',
                type: 6207,
                count: config.types[11].count[4]
            }
        }).then(res => {           
            for (k = 0; k < 6; k++) {
                cques[k] = res.result.data[k].ques;
                ckey[k] = res.result.data[k].key;        
            }

            console.log(ckey);
            // parse key string
            for (k = 0; k < 6; k++) {
                switch (ckey[k][0]) {
         
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
                        tmpAns = ckey[k];

                        cKeyZs[k] = parseInt(tmpAns);
                        cKeyFz[k] = 0;
                        cKeyFm[k] = 0;
                        break;
                }
                //console.log(cKeyFraType[k], cKeyZs[k], cKeyFz[k], cKeyFm[k]);
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
                    {
                        youfs: you[7],
                        zs: czs[7],
                        fz: cfz[7],
                        fm: cfm[7],
                    },
                    {
                        youfs: you[8],
                        zs: czs[8],
                        fz: cfz[8],
                        fm: cfm[8],
                    },
                    {
                        youfs: you[9],
                        zs: czs[9],
                        fz: cfz[9],
                        fm: cfm[9],
                    },
                    {
                        youfs: you[10],
                        zs: czs[10],
                        fz: cfz[10],
                        fm: cfm[10],
                    },
                    {
                        youfs: you[11],
                        zs: czs[11],
                        fz: cfz[11],
                        fm: cfm[11],
                    },

                ];

                for (i = 0; i < 11; i++) {
                    you[i] = false;
                    czs[i] = '';
                    cfz[i] = 0;
                    cfm[i] = 0;
                }
            }

            that.setData({
                quesType: 4,
                keyType: 3,

                wdQues: 12,
                wdAns: 5,

                ques0: shizi[0],
                ques1: shizi[1],
                ques2: shizi[2],
                ques3: shizi[3],
                ques4: shizi[4],
                ques5: shizi[5],

                keyZs: cKeyZs,
                keyFz: cKeyFz,
                keyFm: cKeyFm,

                keyFraType: cKeyFraType
            });

        }).catch(err => {
            // handle error
        })
        
    } else {
        return -1;
    }

    return 0;
}

module.exports = {

    f61Step: f61Step,
    f64Opt: f64Opt,
    f6Simple: f6Simple,
    f6Formula: f6Formula,
    f6Scale: f6Scale
}