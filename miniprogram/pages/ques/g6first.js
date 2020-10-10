//
//  g6first.js
//	function: 按大纲要求，生成符合六年级下学期所需试题
//  A: Add  S: Sub  M: Mul  D: Div
//  by sean wang
//  2020.9.22
//

import * as config from '../config/config.js';
let util = require("util.js");

//  100: 整数小数四则运算
function ifAsmd(grade, type, db, pt) {
    let that = pt;
    
    if (grade == 10 && type == 0) {
        console.log(config.types[10].count[0]);

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q61',
                type: 6101,
                count: config.types[10].count[0]
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

//  101: 分数加减法
function dAs(grade, type, db, pt) {
    
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

    if (grade == 10 && type == 1) {
        //console.log(config.types[10].count[1]);

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q61',
                type: 6102,
                count: config.types[10].count[1]
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

//  102: 分数乘除法
function dSd(grade, type, db, pt) {
    
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

    if (grade == 10 && type == 2) {
        //console.log(config.types[10].count[1]);

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q61',
                type: 6103,
                count: config.types[10].count[2]
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

//  103: 分数四则运算
function dAsmd(grade, type, db, pt) {
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

    if (grade == 10 && type == 3) {
        //console.log(config.types[10].count[1]);

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q61',
                type: 6103,
                count: config.types[10].count[3]
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

//  104: 带分数的简便运算
function dSimp(grade, type, db, pt) {
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

    if (grade == 10 && type == 4) {
        //console.log(config.types[10].count[1]);

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q61',
                type: 6105,
                count: config.types[10].count[4]
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

//  105: 分数方程
function dformu(grade, type, db, pt) {
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

    if (grade == 10 && type == 5) {
        //console.log(config.types[10].count[1]);

        wx.cloud.callFunction({
            name: 'dbquery',
            data: {
                table: 'q61',
                type: 6106,
                count: config.types[10].count[5]
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
    ifAsmd: ifAsmd,
    dAs: dAs,
    dSd: dSd,
    dAsmd: dAsmd,
    dSimp: dSimp,
    dformu: dformu
}