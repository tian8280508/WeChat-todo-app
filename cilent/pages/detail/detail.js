// pages/detail/detail.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk
Page({

  /**
   * 页面的初始数据
   */
  data: {
    importanceArray: ["!", "!!", "!!!", "!!!!"],
    imindex: 1,
    varietyArray: ['工作', '学习', '生活', '出行', '其他'],
    vaindex: 0,
    title: "",
    detail: "",
    time: "",
    date: "",
    address: "",
    imagePath: '',
    infoCol: true,
    iconCol: true,
    matters:[],
    matter:'',
    index:99,
    hasImg:false,
  },

  inputTitle: function (event) {
    this.setData({ title: event.detail.value.trim() })
  },

  inputDetail: function (event) {
    this.setData({ detail: event.detail.value.trim() })
  },

  setDate: function (event) {
    this.setData({ date: event.detail.value.trim() })
  },

  setTime: function (event) {
    this.setData({ time: event.detail.value.trim() })
  },

  setCategory: function (event) {
    this.setData({ vaindex: event.detail.value.trim() })
  },

  setEmergency: function (e) {
    this.setData({ imindex: e.detail.value.trim() })
  },

  btn_modify: function (event) {
    if (!this.data.title) {
      wx.showToast({ title: '请填写任务主题~', icon: 'none' });
      return;
    }
    var matters = wx.getStorageSync('matters') || [];
    matters[this.data.index] = {
      importanceLevel: this.data.importanceArray[this.data.imindex],
      category: this.data.varietyArray[this.data.vaindex],
      title: this.data.title,
      detail: this.data.detail,
      time: this.data.time,
      date: this.data.date,
      address: this.data.address,
      imagePath: this.data.imagePath,
      imindex: this.data.imindex,
      vaindex: this.data.vaindex,
      hasImg:this.data.hasImg,
    };
    //console.log(matters);
    try {
      wx.setStorageSync('matters', matters)
    } catch (e) {
      console.log('setStorageFailed');
    }
    wx.switchTab({
      url: '/pages/homepage/homepage',
    })
  },

  setAddress: function (event) {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: 'FZTBZ-WD66P-FACDT-VHSBP-MUUG7-Z3BJS'
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            var address = addressRes.result.formatted_addresses.recommend;
            that.setData({
              address: address
            })
          }
        })
      }
    })
  },

  setImage: function (e) {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        that.setData({
          imagePath: res.tempFilePaths,
          hasImg:true
        })
      },
    })
  },

  clearImage: function (e) {
    this.setData({
      imagePath: '',
      hasImg: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      index: options.index,
      matter: wx.getStorageSync('matters')[options.index],
    })
    this.setData({
      title: this.data.matter.title,
      detail:this.data.matter.detail,
      time:this.data.matter.time,
      date:this.data.matter.date,
      vaindex: this.data.matter.vaindex,
      imindex: this.data.matter.imindex,
      address: this.data.matter.address,
      imagePath: this.data.matter.imagePath,
      hasImg:this.data.matter.hasImg
    })
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