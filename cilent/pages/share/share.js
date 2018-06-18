var config = require('../../config')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    importanceArray: ["!", "!!", "!!!", "!!!!"],
    varietyArray: ['工作', '学习', '生活', '出行', '其他'],
    title:'',
    detail:null,
    time:'',
    date:'',
    vaindex:'',
    imindex:'',
    address:null,
    imgPath:null,
    host:'',
    id:'',
    sharestate:'',
    isHost:false,
    hasImg:false,
    tempTitle:'',
  },

  setImage: function (e) {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        that.setData({
          imagePath: res.tempFilePaths,
          hasImg: true
        })
      },
    })
  },

  getisHost:function(){
    if ( (app.globalData.userInfo.nickName) && app.globalData.userInfo.nickName == this.data.host)
      this.setData({
        isHost:true
      })
    else this.setData({
      isHost: false
    })
  },

  addToMine:function(){
    var that = this ;
    var host = app.globalData.userInfo.nickName;
    var _matters = wx.getStorageSync('matters') || [];
    if ( this.data.sharestate == 0)
      wx.showToast({
        title: '添加失败，该页面已经取消分享', icon:'none'
      })
    else {
      var matter = {
        title: this.data.title,
        detail: this.data.detail,
        time: this.data.time,
        date: this.data.date,
        vaindex: this.data.vaindex,
        imindex: this.data.imindex,
        address: this.data.address,
        host: app.globalData.userInfo.nickName,
        imagePath: this.data.imagePath,
        category: this.data.varietyArray[this.data.vaindex],
        importanceLevel: this.data.importanceArray[this.data.imindex],
        finished: false,
        hasImg: this.data.hasImg,
      };
      _matters.push(matter)
      try {
        wx.setStorageSync('matters', _matters)
        wx.showToast({
          title: '添加成功', icon: 'none'
        })
      } catch (e) {
        console.log('setStorageFailed');
        wx.showToast({
          title: '添加失败', icon: 'none'
        })
      }
    }
  },

  cancelShare:function(){
    var that = this;
    wx.request({
      url: `${config.service.host}/weapp/deleteBook`,
      method: 'POST',
      data: {
        host:that.data.host,
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
    wx.switchTab({
      url: '/pages/homepage/homepage',
    })
  },

  //只是一个模板
  getdata: function (h,t) {
    var that = this;
    var host = h;
    var temptitle = t;
    console.log(h+t)
    return new Promise(function (resolve , reject){
      wx.request({
        url: `${config.service.host}/weapp/getbookinfo/` + host,
        method: 'GET',
        success: function (res) {
          resolve(res.data);
          for ( let i = 0 ; i < res.data.length ; i++)
          {
            if ( res.data[i].title == temptitle)
            {
              that.setData({
                title: res.data[i].title,
                detail: res.data[i].detail,
                time: res.data[i].time,
                date: res.data[i].date,
                vaindex: res.data[i].vaindex,
                imindex: res.data[i].imindex,
                address: res.data[i].address,
                imgPath: res.data[i].imgpath,
                host: res.data[i].host,
                host_avatar: res.data[i].host_avatar,
                id: res.data[i].id,
                sharestate: res.data[i].sharestate,
              })
            }
          }
          if (that.data.imgPath)
            that.setData({
              hasImg: true
            })
          else {
            that.setData({
              hasImg: false
            })
          }
          that.getisHost();
          // 用来测试数据库返回信息
          /*wx.showModal({
            title: '测试数据库',
            content: JSON.stringify(res.data[0]),
          })*/

        },
        fail: function (res) {
          reject(res);
          console.log(res)
        }
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata(options.host , options.tempTitle).then( res => {console.log(res)});
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
    console.log('Refresh');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    console.log('share')
    var host = app.globalData.userInfo.nickName;
    var temptitle = this.data.title;
    return{
      title:'橘猫日程表',
      desc: '来自' + app.globalData.userInfo.nickName+'的日程分享',
      path:'/pages/share/share?host=' + app.globalData.userInfo.nickName +'&tempTitle=' + temptitle,
    }
  }
})