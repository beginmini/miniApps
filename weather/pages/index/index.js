//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    inputValue:null,
    weatherDatas:null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindKeyInput:function(e){
    // console.log(e.detail.value)
    this.setData({
      inputValue: e.detail.value
    })
    console.log(this.data.inputValue);
  },
  searchWeather:function() {
    var thisweather = this;
    app.getWeather(this.data.inputValue,function(data){
      console.log('data');
      console.log(data);
      console.log('data.result');
      console.log(data.result);
      console.log('data.result.future');
      console.log(data.result.future);
     
      thisweather.setData({ weatherDatas: data.result.future})
      console.log('weatherDatas')
      console.log(thisweather.data.weatherDatas);
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
