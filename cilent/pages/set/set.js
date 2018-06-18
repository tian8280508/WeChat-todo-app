var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    p_isAllowSelected:true,
    p_isAllowClearFinished:true,
    p_isAllowClearOutFinished: false,
    p_isAutoFinished:true,
  },

  allSelected:function(e){
    app.globalData.isAllowSelected = e.detail.value
    wx.setStorageSync('isAllowSelected', app.globalData.isAllowSelected);
  },

  clearFinished:function(e){
    app.globalData.isAllowClearFinished = e.detail.value
    wx.setStorageSync('isAllowClearFinished', app.globalData.isAllowClearFinished);
  },

  clearOutFinished: function (e) {
    app.globalData.isAllowClearOutFinished = e.detail.value
    wx.setStorageSync('isAllowClearOutFinished', app.globalData.isAllowClearOutFinished);
  },

  autoFinished: function (e) {
    app.globalData.isAutoFinished = e.detail.value;
    wx.setStorageSync('isAutoFinished', app.globalData.isAutoFinished);
  },

  clearHistory:function(e){
    wx.removeStorageSync('history')
    wx.showToast({
      title: '清除成功',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData.isAllowClearOutFinished);
    this.setData({
      p_isAllowSelected: app.globalData.isAllowSelected,
      p_isAllowClearFinished: app.globalData.isAllowClearFinished,
      p_isAutoFinished: app.globalData.isAutoFinished,
      p_isAllowClearOutFinished: app.globalData.isAllowClearOutFinished,
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