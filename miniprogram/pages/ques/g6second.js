//
//  按大纲要求，生成符合各年级，各教学段所需试题
//  参数:    上限、步骤、运算符种类
//  返回值：    表达式字符串
//  A:  add
//  S:  sub
//  M:  Mul
//  D:  Div

let util = require("util.js");

function f61Step(grade, type, db, point) {
    let col1 = [];
    let col2 = [];
    let col3 = [];
    let that = point;
    let sques1 = "", sques2 = "", sques3 = "", sques0 = "", sques4 = "", sques5 = "";
    let nkey0, nkey1, nkey2, nkey3, nkey4, nkey5;
    let i = 0, j = 0, k = 0;
	let cques = [], ckey = [];
	let cKeyZs = [], cKeyFz = [], cKeyFm = [], cKeyFraType = [];
	let node = [], ans = [], ansZs = [], ansFs = [];
	let shizi = [];
	let you = [], czs = [], cfz = [], cfm = [], cop = [];

    let len = 0;
    let tmpQues, tmpAns;
    let fsfh = [];

    if (grade = 11 && type == 0) {
        db.collection('q62').where({
            type: 6211
        }).get({
            success: res => {
                col1 = res.data;

                i = Math.floor(Math.random() * (col1.length - 1));
                cques[0] = col1[i].ques;
                key0 = col1[i].key;
                col1.splice(i, 1);

                i = Math.floor(Math.random() * (col1.length - 1));
                cques[1] = col1[i].ques;
                nkey1 = col1[i].key;

                //console.log(nkey0, nkey1);

                for (j = 0; j < 2; j++) {
                    //console.log(cques[j]);

                    node = cques[j].split(' ');
                    len = node.length;

                    //console.log(node);
                   // console.log(len);

                    for (i = 0; i < len; i++) {

                        if (node[i][0] == 'f') {
                            you[i] = true;
                            tmpQues = (node[i]).substr(1);

                            fsfh = tmpQues.split('/');
                            cfz[i] = fsfh[0];
                            cfm[i] = fsfh[1];
                        } else if (node[i][0] != 'f') {
                            you[i] = false;
                            czs[i] = node[i];
                            cfz[i] = 0;
                            cfm[i] = 0;
                        }

                        //console.log(czs[i], cfz[i], cfm[i]); 
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
                        
                    ];

                    for (i = 0; i < 3; i++) {
                        you[i] = false;
                        czs[i] = '';
                        cfz[i] = 0;
                        cfm[i] = 0;
                    }
               }

                that.setData({
                    quesType: 1,

                    ques0: shizi[0],
                    ques1: shizi[1],
                });
            }
        });

        db.collection('q62').where({
            type: 6212
        }).get({
            success: res => {
                col2 = res.data;

                i = Math.floor(Math.random() * (col2.length - 1));
                cques[0] = col2[i].ques;
                //nkey2 = col2[i].key;

                //console.log(nkey2);

                node = cques[0].split(' ');
                len = node.length;

                    //console.log(node);
                   // console.log(len);

                    for (i = 0; i < len; i++) {

                        if (node[i][0] == 'f') {
                            you[i] = true;
                            tmpQues = (node[i]).substr(1);

                            fsfh = tmpQues.split('/');
                            cfz[i] = fsfh[0];
                            cfm[i] = fsfh[1];
                        } else if (node[i][0] != 'f') {
                            you[i] = false;
                            czs[i] = node[i];
                            cfz[i] = 0;
                            cfm[i] = 0;
                        }

                        //console.log(czs[i], cfz[i], cfm[i]); 
                    }

                    shizi[2] = [
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
                        
                    ];

                    for (i = 0; i < 3; i++) {
                        you[i] = false;
                        czs[i] = '';
                        cfz[i] = 0;
                        cfm[i] = 0;
                    }

                that.setData({
                    ques2: shizi[2],
                });
            }
        });

        db.collection('q62').where({
            type: 6213
        }).get({
            success: res => {
                col3 = res.data;

                for (k = 0; k < 3; k++) {
                    i = Math.floor(Math.random() * (col3.length - 1));
                    cques[k] = col3[i].ques;
                    ckey[k] = col3[i].key;
                }

                // parse key string
                for (k = 0; k < 3; k++) {
                    switch (ckey[k][0]) {
                        // case 'i':
                        //     cKeyFraType[k] = 1;
                        //     tmpAns = (ckey[k]).substr(1);

                        //     cKeyZs[k] = parseInt(tmpAns);
                        //     cKeyFz[k] = 0;
                        //     cKeyFm[k] = 0;

                            //console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);
                         //   break;
                        case 'f':
                            cKeyFraType[k + 3] = 2;
                            tmpAns = (ckey[k]).substr(1);

                            cKeyZs[k + 3] = 0;

                            ans = tmpAns.split('/');
                            cKeyFz[k + 3] = parseInt(ans[0]);
                            cKeyFm[k + 3] = parseInt(ans[1]);

                           // console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);
                            break;
                        // case 'm':
                        //     cKeyFraType[k] = 3;
                        //     tmpAns = (ckey[k]).substr(1);

                        //     ans = tmpAns.split('f');
                        //     cKeyZs[k] = parseInt(ans[0]);

                        //     ansFs = ans[1].split('/');
                        //     cKeyFz[k] = parseInt(ansFs[0]);
                        //     cKeyFm[k] = parseInt(ansFs[1]);
                        //     //console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);
                        //     break;
                        default:
                            cKeyFraType[k + 3] = 1;
                            tmpAns = ckey[k];

                            cKeyZs[k + 3] = parseInt(tmpAns);
                            cKeyFz[k + 3] = 0;
                            cKeyFm[k + 3] = 0;

                           // console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);

                            break;
                    }
                }

                for (j = 0; j < 3; j++) {
                    //console.log(cques[j]);

                    node = cques[j].split(' ');
                    len = node.length;

                    //console.log(node);
                   // console.log(len);

                    for (i = 0; i < len; i++) {

                        if (node[i][0] == 'f') {
                            you[i] = true;
                            tmpQues = (node[i]).substr(1);

                            fsfh = tmpQues.split('/');
                            cfz[i] = fsfh[0];
                            cfm[i] = fsfh[1];
                        } else if (node[i][0] != 'f') {
                            you[i] = false;
                            czs[i] = node[i];
                            cfz[i] = 0;
                            cfm[i] = 0;
                        }

                        //console.log(czs[i], cfz[i], cfm[i]); 
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
                        
                    ];

                    for (i = 0; i < 3; i++) {
                        you[i] = false;
                        czs[i] = '';
                        cfz[i] = 0;
                        cfm[i] = 0;
                    }
               }

                that.setData({
                    ques3: shizi[0],
                    ques4: shizi[1],
                    ques5: shizi[2],

                    keyZs: cKeyZs,
                    keyFz: cKeyFz,
                    keyFm: cKeyFm,

                    keyFraType: cKeyFraType
                });
             }
        });

    } else {
        return -1;

    }

    return 0;
}

function f64Opt(grade, type, db, point) {
	let col1 = [];
    let col2 = [];
    let col3 = [];
    let that = point;
    let sques1 = "", sques2 = "", sques3 = "", sques0 = "", sques4 = "", sques5 = "";
    let nkey0, nkey1, nkey2, nkey3, nkey4, nkey5;
    let i = 0, j = 0, k = 0;
	let cques = [], ckey = [];
	let cKeyZs = [], cKeyFz = [], cKeyFm = [], cKeyFraType = [];
	let node = [], ans = [], ansZs = [], ansFs = [];
	let shizi = [];
	let you = [], czs = [], cfz = [], cfm = [], cop = [];

    let len = 0;
    let tmpQues, tmpAns;
    let fsfh = [];

    if (grade = 11 &&  type == 1) {
        db.collection('q62').where({
            type: 6221
        }).get({
            success: res => {
                col3 = res.data;

//                 i = Math.floor(Math.random() * (col1.length - 1));
//                 sques0 = col1[i].ques;
//                 nkey0 = col1[i].key;
//                 col1.splice(i, 1);

// 				i = Math.floor(Math.random() * (col1.length - 1));
//                 sques1 = col1[i].ques;
//                 nkey1 = col1[i].key;
//                 col1.splice(i, 1);

//                 i = Math.floor(Math.random() * (col1.length - 1));
//                 sques2 = col1[i].ques;
//                 nkey2 = col1[i].key;
// col3 = res.data;

                for (k = 0; k < 3; k++) {
                    i = Math.floor(Math.random() * (col3.length - 1));
                    cques[k] = col3[i].ques;
                    ckey[k] = col3[i].key;
                }

                // parse key string
                for (k = 0; k < 3; k++) {
                    switch (ckey[k][0]) {
                        // case 'i':
                        //     cKeyFraType[k] = 1;
                        //     tmpAns = (ckey[k]).substr(1);

                        //     cKeyZs[k] = parseInt(tmpAns);
                        //     cKeyFz[k] = 0;
                        //     cKeyFm[k] = 0;

                            //console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);
                         //   break;
                        case 'f':
                            cKeyFraType[k + 3] = 2;
                            tmpAns = (ckey[k]).substr(1);

                            cKeyZs[k + 3] = 0;

                            ans = tmpAns.split('/');
                            cKeyFz[k + 3] = parseInt(ans[0]);
                            cKeyFm[k + 3] = parseInt(ans[1]);

                           // console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);
                            break;
                        // case 'm':
                        //     cKeyFraType[k] = 3;
                        //     tmpAns = (ckey[k]).substr(1);

                        //     ans = tmpAns.split('f');
                        //     cKeyZs[k] = parseInt(ans[0]);

                        //     ansFs = ans[1].split('/');
                        //     cKeyFz[k] = parseInt(ansFs[0]);
                        //     cKeyFm[k] = parseInt(ansFs[1]);
                        //     //console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);
                        //     break;
                        default:
                            cKeyFraType[k + 3] = 1;
                            tmpAns = ckey[k];

                            cKeyZs[k + 3] = parseInt(tmpAns);
                            cKeyFz[k + 3] = 0;
                            cKeyFm[k + 3] = 0;

                           // console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);

                            break;
                    }
                }

                for (j = 0; j < 3; j++) {
                    //console.log(cques[j]);

                    node = cques[j].split(' ');
                    len = node.length;

                    //console.log(node);
                   // console.log(len);

                    for (i = 0; i < len; i++) {

                        if (node[i][0] == 'f') {
                            you[i] = true;
                            tmpQues = (node[i]).substr(1);

                            fsfh = tmpQues.split('/');
                            cfz[i] = fsfh[0];
                            cfm[i] = fsfh[1];
                        } else if (node[i][0] != 'f') {
                            you[i] = false;
                            czs[i] = node[i];
                            cfz[i] = 0;
                            cfm[i] = 0;
                        }

                        //console.log(czs[i], cfz[i], cfm[i]); 
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
                        
                    ];

                    for (i = 0; i < 3; i++) {
                        you[i] = false;
                        czs[i] = '';
                        cfz[i] = 0;
                        cfm[i] = 0;
                    }
               }

                that.setData({
                    quesType: 1,
                    
                    ques0: shizi[0],
                    ques1: shizi[1],
                    ques2: shizi[2],

                    // keyZs: cKeyZs,
                    // keyFz: cKeyFz,
                    // keyFm: cKeyFm,

                    // keyFraType: cKeyFraType
                });

            }
        });

        db.collection('q62').where({
            type: 6222
        }).get({
            success: res => {
                col2 = res.data;

                //console.log(col.length);

                for (k = 0; k < 3; k++) {
                    i = Math.floor(Math.random() * (col2.length - 1));
                    cques[k] = col2[i].ques;
                    ckey[k] = col2[i].key;
                    col2.splice(i, 1);
                    //    console.log(cques[k]);
                }

                // parse key string
                for (k = 0; k < 3; k++) {
                    switch (ckey[k][0]) {
                        // case 'i':
                        //     cKeyFraType[k] = 1;
                        //     tmpAns = (ckey[k]).substr(1);

                        //     cKeyZs[k] = parseInt(tmpAns);
                        //     cKeyFz[k] = 0;
                        //     cKeyFm[k] = 0;

                             //console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);
                            //break;
                        case 'f':
                            cKeyFraType[k + 3] = 2;
                            tmpAns = (ckey[k]).substr(1);

                            cKeyZs[k + 3] = 0;

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
                            cKeyFraType[k + 3] = 1;
                            tmpAns = ckey[k];

                            cKeyZs[k + 3] = parseInt(tmpAns);
                            cKeyFz[k + 3] = 0;
                            cKeyFm[k + 3] = 0;

                            break;
                    }

                   // console.log(cKeyFraType[k + 3], cKeyZs[k + 3], cKeyFz[k + 3], cKeyFm[k + 3]);

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

                    for (i = 0; i < 12; i++) {
                        you[i] = false;
                        czs[i] = '';
                        cfz[i] = 0;
                        cfm[i] = 0;
                    }
                }

                that.setData({
					ques3: shizi[0],
                    ques4: shizi[1],
                    ques5: shizi[2],

                    keyZs: cKeyZs,
                    keyFz: cKeyFz,
                    keyFm: cKeyFm,

                    keyFraType: cKeyFraType
                });
            }
		});
    } else {
        return -1;

    }

    return 0;
}

function f6Simple(grade, type, db, point) {
    let that = point;
    let shizi = [];

    let node = [], ans = [], ansZs = [], ansFs = [];
    let fsfh = [];
    let you = [], czs = [], cfz = [], cfm = [], cop = [];
    let cKeyZs = [], cKeyFz = [], cKeyFm = [], cKeyFraType = [];

    let len = 0;
    let i = 0, j = 0, k = 0;
    let cques = [];
    let ckey = [];

    let sques0 = "", sques1 = "", sques2 = "", sques3 = "", sques4 = "", sques5 = "";
    let nkey0, nkey1, nkey2, nkey3, nkey4, nkey5;
    let tmpAns;
    let col = [];


    if (grade = 11 && type == 2) {
        // ques[0] = "64 + f3/5 - f2/7";
        // ques[1] = "f8/11 + 52 - f1/3";
        // ques[2] = "f8/11 + 52 - f1/3";
        // ques[3] = "3 - ( f8/13 - f1/2 )";
        // ques[4] = "( 4 + f2/5 ) - f2/7";
        // ques[5] = "( 4 + f2/5 ) - f2/7";

        db.collection('q62').where({
            type: 6231
        }).get({
            success: res => {
                col = res.data;

                //console.log(col.length);

                for (k = 0; k < 6; k++) {
                    i = Math.floor(Math.random() * (col.length - 1));
                    cques[k] = col[i].ques;
                    ckey[k] = col[i].key;
                    col.splice(i, 1);
                    console.log(ckey[k]);
                }

                // parse key string
                for (k = 0; k < 6; k++) {
                    switch (ckey[k][0]) {
                        case 'd':
                            cKeyFraType[k] = 4;
                            tmpAns = (ckey[k]).substr(1);

                            cKeyZs[k] = parseFloat(tmpAns);
                            cKeyFz[k] = 0;
                            cKeyFm[k] = 0;

                            //console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);
                            break;
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
                    console.log(cKeyFraType[k], cKeyZs[k], cKeyFz[k], cKeyFm[k]);
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
            }
        });
    }

    return 0;

}

function f6Formula(grade, type, db, point) {
    let that = point;
    let shizi = [];

    let node = [], ans = [], ansZs = [], ansFs = [];
    let fsfh = [];
    let you = [], czs = [], cfz = [], cfm = [], cop = [];
    let cKeyZs = [], cKeyFz = [], cKeyFm = [], cKeyFraType = [];

    let len = 0;
    let i = 0, j = 0, k = 0;
    let cques = [];
    let ckey = [];

    let sques0 = "", sques1 = "", sques2 = "", sques3 = "", sques4 = "", sques5 = "";
    let nkey0, nkey1, nkey2, nkey3, nkey4, nkey5;
    let tmpAns;
    let col = [];


    if (grade = 11 && type == 3) {
        // ques[0] = "64 + f3/5 - f2/7";
        // ques[1] = "f8/11 + 52 - f1/3";
        // ques[2] = "f8/11 + 52 - f1/3";
        // ques[3] = "3 - ( f8/13 - f1/2 )";
        // ques[4] = "( 4 + f2/5 ) - f2/7";
        // ques[5] = "( 4 + f2/5 ) - f2/7";

        db.collection('q62').where({
            type: 6241
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

                            //console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);
                        //    break;
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

                            cKeyZs[k] = parseInt(tmpAns);   //FIXME:
                            cKeyFz[k] = 0;
                            cKeyFm[k] = 0;

                            //console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);
                            break;
                    }
                    console.log(cKeyFraType[k], cKeyZs[k], cKeyFz[k], cKeyFm[k]);
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
            }
        });


    }

    return 0;

}

function f6Scale(grade, type, db, point) {

    let that = point;
    let shizi = [];

    let node = [], ans = [], ansZs = [], ansFs = [];
    let fsfh = [];
    let you = [], czs = [], cfz = [], cfm = [], cop = [];
    let cKeyZs = [], cKeyFz = [], cKeyFm = [], cKeyFraType = [];

    let len = 0;
    let i = 0, j = 0, k = 0;
    let cques = [];
    let ckey = [];

    let sques0 = "", sques1 = "", sques2 = "", sques3 = "", sques4 = "", sques5 = "";
    let nkey0, nkey1, nkey2, nkey3, nkey4, nkey5;
    let tmpAns;
    let col = [];


    if (grade = 11 && type == 4) {
        // ques[0] = "64 + f3/5 - f2/7";
        // ques[1] = "f8/11 + 52 - f1/3";
        // ques[2] = "f8/11 + 52 - f1/3";
        // ques[3] = "3 - ( f8/13 - f1/2 )";
        // ques[4] = "( 4 + f2/5 ) - f2/7";
        // ques[5] = "( 4 + f2/5 ) - f2/7";

        db.collection('q62').where({
            type: 6251
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

                            //console.log(cKeyZs[k], cKeyFz[k], cKeyFm[k]);
                            //break;
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
                    console.log(cKeyFraType[k], cKeyZs[k], cKeyFz[k], cKeyFm[k]);
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
            }
        });


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