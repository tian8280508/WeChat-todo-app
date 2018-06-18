var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk

Page({

  /**
   * 页面的初始数据
   */
  data: {
    host:'123',
    importanceArray:["!","!!","!!!","!!!!"],
    imindex:1,
    varietyArray:['工作','学习','生活','出行','其他'],
    vaindex:0,
    title: "",
    detail: null,
    time: "",
    date: "",
    address: null,
    imagePath:null,
    infoCol:true,
    iconCol:true,
    hasImg:false,
  },

  inputTitle:function (event){
    this.setData({title: event.detail.value.trim()})
  },

  inputDetail: function (event) {
    this.setData({ detail: event.detail.value.trim() })
  },

  setDate:function(event){
    this.setData({ date: event.detail.value.trim() })
  },

  setTime:function(event){
    this.setData({ time: event.detail.value.trim()})
  },

  setCategory:function(event){
    this.setData({ vaindex: event.detail.value.trim()})
  },

  setEmergency:function(e){
    this.setData({ imindex: e.detail.value.trim()})
  },

  create:function(event){
    if (!this.data.title) {
      wx.showToast({ title: '请填写任务主题~', icon: 'none' });
      return;
    }
    var matters = wx.getStorageSync('matters') || [];
    var temp = {
      title: this.data.title,
      detail: this.data.detail, 
      time: this.data.time,
      date: this.data.date,
      vaindex: this.data.vaindex,
      imindex: this.data.imindex,
      address: this.data.address,
      host:this.data.host,
      imagePath: this.data.imagePath,
      category: this.data.varietyArray[this.data.vaindex],
      importanceLevel: this.data.importanceArray[this.data.imindex],
      finished:false,
      hasImg:this.data.hasImg,
    };
    matters.push(temp);
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

  setAddress:function(event){
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

  setImage:function(e){
    var that= this;
    wx.chooseImage({
      success: function(res) {
        that.setData({
          imagePath:res.tempFilePaths,
          hasImg: true
        })
      },
    })
  },

  clearImage:function(e){
    this.setData({
      imagePath: null,
      hasImg: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //一月是0
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minutes = today.getMinutes();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    if (hour < 10) {
      hour = '0' + hour
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    var thisDate = yyyy + '-' + mm + '-' + dd;
    var thisTime = hour + ':' + minutes;
    this.setData({
      date: thisDate,
      time: thisTime
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