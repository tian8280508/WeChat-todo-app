// pages/homepage/homepage.js
var that = this;
var config = require('../../config')
var app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address:null,
    matter:'',
    matters:[],
    allFinished:false,
    isExist:false,
  },

  onClickBtn:function(e){
    wx.navigateTo({
      url: '/pages/add/add',
    })
  },

  save: function () {
    wx.setStorageSync('matters', this.data.matters);
  },

  onItemRemove:function(e){
    var index = e.currentTarget.dataset.index;
    var matters = this.data.matters;
    var remove = matters.splice(index, 1);
    this.setData({
      matters: matters,
    });
    this.save();
    app.addHistory(remove) ;
  },

  onItemFinished:function(e){
    var index = e.currentTarget.dataset.index;
    var matters = this.data.matters;
    matters[index].finished = !matters[index].finished
    this.setData({
      matters: matters,
    });
    this.save();
  },

  onItemModify: function (e) {
    var index = e.currentTarget.dataset.index;
    var matters = this.data.matters;
    wx.navigateTo({
      url: '/pages/detail/detail?index=' + index,
    })
  },

  clearOutdatedFinished:function(e){
    if (app.globalData.isAllowClearOutFinished)
    {
      var matters = wx.getStorageSync('matters');
      var length = matters.length;
      for (let i = length - 1; i >= 0; i--) {
        var matter = matters[i];
        var temp = matter.date + ' ' + matter.time + ':30';
        var olddate = new Date(temp).getTime();
        var month = 1000 * 60 * 60 * 24 * 30;
        var today = new Date().getTime();
        if (today - (olddate) > 0) {
          var remove = matters.splice(i, 1);
          app.addHistory(remove);
        }
      }
      this.setData({
        matters: matters,
      });
      this.save();
    }
    else return ;
  },

  clearFinished:function(){
    if (app.globalData.isAllowClearFinished)
    {
      var matters = wx.getStorageSync('matters');
      var length = matters.length;
      for (let i = length - 1; i >= 0; i--) {
        var matter = matters[i];
        if ( matter.finished ){
          var remove = matters.splice(i, 1);
          app.addHistory(remove);
        }
      }
      this.setData({
        matters: matters,
      });
      this.save();
    }
  },

  allFiSt:function() {
    if (app.globalData.isAllowSelected)
    {
      var matters = wx.getStorageSync('matters');
      for (let i = 0; i < matters.length; i++) {
        if (this.data.allFinished)
          matters[i].finished = false;
        else matters[i].finished = true;
      }
      this.setData({
        matters: matters,
        allFinished: !this.data.allFinished,
      });
      this.save();
    }
    else return ;
  },

  getdata: function (title) {
    var title = title
    var that = this;
    var host = app.globalData.userInfo.nickName;
    return new Promise(function (resovle , reject){
      wx.request({
        url: `${config.service.host}/weapp/getbookinfo/` + host,
        method: 'GET',
        success: function (res) {
          console.log(res);
          resovle(res.data);
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].title == title)
            {
              that.setData({
                isExist: true,
              })
              return;
            }
          }
          that.setData({
            isExist: false,
          })
          // if (that.data.imgPath)
          //   that.setData({
          //     hasImg: true
          //   })
          // 用来测试数据库返回信息
          /*wx.showModal({
            title: '测试数据库',
            content: JSON.stringify(res.data[0]),
          })*/

        },
        fail: function (res) {
          console.log(res)
          reject(res)
        }
      })
    });
  },

  goSharePage:function(e){
    var that = this
    var index = e.currentTarget.dataset.index;
    var matters = this.data.matters;
    var matter = matters[index];
    var host = app.globalData.userInfo.nickName;
    var host_avatar = app.globalData.userInfo.avatarUrl
    var title = matter.title
    var temp = 0;
    this.setData({
      isExist: false,
    })
    wx.request({
      url: `${config.service.host}/weapp/getbookinfo/` + host,
      method: 'GET',
      success: function (res) {
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].title == title) {
            that.setData({
              isExist: true,
            })
            break;
          }
        }
        if (!that.data.isExist) {
          wx.request({
            url: `${config.service.host}/weapp/testdb`,
            method: 'POST',
            data: {
              title: matter.title,
              detail: matter.detail,
              time: matter.time,
              date: matter.date,
              vaindex: matter.vaindex,
              imindex: matter.imindex,
              address: matter.address,
              imgpath: matter.imagePath,
              host: host,
              host_avatar: host_avatar,
              sharestate: '1',
            },
            success: function (res) {
              if ( temp == 0)
              {
                wx.navigateTo({
                  url: '/pages/share/share?host=' + host + '&tempTitle=' + title,
                })
                temp = 1;
              }
              console.log(res)
            },
            fail: function (res) {
              console.log(res)
            }
          })
        }
        if ( temp == 0)
        {
          temp = 1
          wx.navigateTo({
            url: '/pages/share/share?host=' + host + '&tempTitle=' + title,
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  //下面这个没用，充代码量
  temp_goSharePage:function(e){
    var index = e.currentTarget.dataset.index;
    var matters = this.data.matters;
    var matter = matters[index];
    var host = app.globalData.userInfo.nickName;
    var host_avatar = app.globalData.userInfo.avatarUrl
    this.getdata(matter.title)
    console.log('go on')
    if (!this.data.isExist)
    {
      wx.request({
        url: `${config.service.host}/weapp/testdb`,
        method: 'POST',
        data: {
          title: matter.title,
          detail: matter.detail,
          time: matter.time,
          date: matter.date,
          vaindex: matter.vaindex,
          imindex: matter.imindex,
          address: matter.address,
          imgpath: matter.imagePath,
          host: host,
          host_avatar: host_avatar,
          sharestate: '1',
        },
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
    //this.getdata();
    // wx.navigateTo({
    //   url: '/pages/share/share?host=' + host,
    // })
  },

  createItem: function (e) {
    wx.navigateTo({ url: '/pages/add/add' })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }, 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _matters = wx.getStorageSync('matters');
    this.setData({ matters : _matters , allFinished:!_matters.length})
    if (app.globalData.isAutoFinished) {
      var matters = wx.getStorageSync('matters');
      var length = matters.length;
      for (var i = length - 1; i >= 0; i--) {
        var matter = matters[i];
        var temp = matter.date + ' ' + matter.time + ':30';
        var olddate = new Date(temp).getTime();
        var month = 1000 * 60 * 60 * 24 * 30;
        var today = new Date().getTime();
        if (today - (olddate) > 0) {
          matters[i].finished = true;
        }
      }
      this.setData({
        matters: matters,
      });
      this.save();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})