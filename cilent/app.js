//var Bmob = require('/utils/Bmob-1.5.1.min.js');
//Bmob.initialize('5baa51f1fac306c008ece7def0b92202','530bc471d1a5c6ea68d1a428a4fe52a8')
//app.js
var time = require('./utils/util.js')
var config = require('./config');
App({
  onLaunch: function (options) {
    console.log(options.scene)
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
    var name = wx.getStorageSync('name');
    var avatar = wx.getStorageSync('avatar');

    if (!name || !avatar) {
      wx.getUserInfo({
        success: function (res) {
          var userInfo = res.userInfo;
          wx.setStorageSync('name', userInfo.nickName);
          wx.setStorageSync('avatar', userInfo.avatarUrl);
        }
      });
    }
  },
  
  addHistory:function(matter){
    var history = wx.getStorageSync('history') || [];
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //一月是0
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    var thisDate = yyyy + '-' + mm + '-' + dd;
    history.push({
      matter : matter,
      finishTime: today,
      finishDateStr: thisDate,
    })
    wx.setStorageSync('history', history)
  },

  globalData: {
    userInfo: null,
    isAllowSelected: wx.getStorageSync('isAllowSelected'),
    isAllowClearFinished: wx.getStorageSync('isAllowClearFinished'),
    isAllowClearOutFinished: wx.getStorageSync('isAllowClearOutFinished'),
    isAutoFinished: wx.getStorageSync('isAutoFinished'),
  }
})