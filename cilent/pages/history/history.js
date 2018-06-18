// pages/history/history.js
var wxCharts = require('../../utils/wxcharts.js')
var cateChart = null;
var columnChart = null;
var workCount = 0;
var studyCount = 0;
var lifeCount = 0;
var outCount = 0;
var otherCount = 0;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    varietyArray: ['工作', '学习', '生活', '出行', '其他'],
    timediff: 604800000, // 7天是604800000 30天2592000000  1年31536000000
    isPieChart:false,
    historys:[],
    showDays:['近七天','近一个月','近一年'],
    sdIndex:0,
  },

  showDayChangeLeft:function(e){
    console.log(e);
    var temp = this.data.sdIndex - 1;
    if (temp < 0) 
      temp+=3;
    this.setData({
      sdIndex:temp%3
    })
  },

  showDayChangeRight: function (e) {
    var temp = this.data.sdIndex ;
    console.log((temp + 1) %3)
    this.setData({
      sdIndex: (temp + 1) % 3
    })
  },

  onClickChange:function(e){
    var val = !wx.getStorageSync('isPieChart') 
    this.setData({
      isPieChart: val
    })
    wx.setStorageSync('isPieChart', val);
    if (wx.getStorageSync('isPieChart'))
      this.getPieChart();
    else this.getColumnChart();
  },

  itemDelete:function(e){
    var index = e.currentTarget.dataset.index;
    var historys = this.data.historys;
    var remove = historys.splice(index, 1);
    this.setData({
      historys: historys,
    });
    wx.setStorageSync('history', historys);
  },

  getColumnChart:function(e){
    var chartData = {
      main: {
        title: '1234',
        data: [workCount, studyCount, lifeCount, outCount, otherCount],
        categories: ['工作', '学习', '生活', '出行', '其他'],
      },
    };
    var windowWidth = 320;
    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: chartData.main.categories,
      series: [{
        name: '数量',
        data: chartData.main.data,
        format: function (val, name) {
          return val;
        }
      }],
      yAxis: {
        format: function (val) {
          return val;
        },
        min: 0,
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: windowWidth,
      height: 200,
    });
  },

  getPieChart:function (e){
    var windowWidth = 320;
    cateChart = new wxCharts({
      animation: true,
      canvasId: 'cateCanvas',
      type: 'pie',
      width: windowWidth,
      height: 300,
      dataLabel: true,
      series: [{
        name: '工作',
        data: workCount,
      }, {
        name: '学习',
        data: studyCount,
      },
      {
        name: '生活',
        data: lifeCount,
      }, {
        name: '出行',
        data: outCount,
      }, {
        name: '其他',
        data: otherCount,
      },],
    })
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
    var history = wx.getStorageSync('history');
    var today = new Date();
    var diff = this.data.timediff;
    switch (this.data.sdIndex) {
      case 0: diff = 604800000; break;
      case '1': diff = 2592000000; break;
      case '2': diff = 31536000000; break;
    }
    this.setData({ timediff: diff })
    var isPieChart = wx.getStorageSync('isPieChart') || false
    this.setData({
      historys: wx.getStorageSync('history'),
      timediff: 604800000,
      isPieChart: isPieChart
    })
    wx.setStorageSync('isPieChart', isPieChart)
    workCount = 0;
    studyCount = 0;
    lifeCount = 0;
    outCount = 0;
    otherCount = 0;
    for (let i = 0; i < history.length; i++) {
      var temp = new Date(history[i].finishTime)
      if (today.getTime() - temp.getTime() < diff) {
        switch (history[i].matter["0"].vaindex) {
          case 0: workCount++; break;
          case '1': studyCount++; break;
          case '2': lifeCount++; break;
          case '3': outCount++; break;
          case '4': otherCount++; break;
          default:
            console.log(history[i].matter["0"].vaindex)
        }
      }
    }
    if (wx.getStorageSync('isPieChart'))
      this.getPieChart();
    else this.getColumnChart();
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
    var today = new Date();
    var history = wx.getStorageSync('history')
    var diff = this.data.timediff
    switch (this.data.sdIndex) {
      case 0: diff = 604800000; break;
      case '1': diff = 2592000000; break;
      case '2': diff = 31536000000; break;
    }
    this.setData({ timediff: diff })
    workCount = 0;
    studyCount = 0;
    lifeCount = 0;
    outCount = 0;
    otherCount = 0;
    for (let i = 0; i < history.length; i++) {
      var temp = new Date(history[i].finishTime)
      if (today.getTime() - temp.getTime() < diff) {
        switch (history[i].matter["0"].vaindex) {
          case 0: workCount++; break;
          case '1': studyCount++; break;
          case '2': lifeCount++; break;
          case '3': outCount++; break;
          case '4': otherCount++; break;
          default:
            console.log(history[i].matter["0"].vaindex)
        }
      }
    }
    if (wx.getStorageSync('isPieChart'))
      this.getPieChart();
    else this.getColumnChart();
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