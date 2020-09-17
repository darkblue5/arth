//app.js
import * as config from 'pages/config/config.js';

let _DEBUG_ = true;
let types = {};
let grades = [];

App({
    
    onLaunch: function () {
        let len = config.types.length;
        let i = 0;

        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                // env 参数说明：
                //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
                //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
                //   如不填则使用默认环境（第一个创建的环境）
                // env: 'my-env-id',
                traceUser: true,
            })
        }
  
        for(i=0; i<len; i++) {
            types[config.types[i].grade] = config.types[i].type;
            grades[i] = config.types[i].grade;
        }

        this.globalData = {
        	openid: '',
            userGrade: 0,
            tdyCorrt: 0,    //  本日正确
            tdyFinih: 0,    //  本日完成
            tolCorrt: 0,
            tolFinih: 0,
            tdyRate: 0,
            sevenRate: [],  //  本周正确率
            nickName: '佚名',
            _types: types,
            _grades: grades
            
        }
    }
})


//重写console.log方法，判断是否开启日志调试模式，否则就不输出
console.log = ( function(oriLogFunc){
    return function(str){
      if (_DEBUG_){//判断配置文件是否开启日志调试
        oriLogFunc.call(console, str);
      }
    }
})(console.log);
