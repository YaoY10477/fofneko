//app.js
App({
  onLaunch: function () {
    //设置根部地址
    this.globalData.path = "192.168.11.140:8066";
    this.APPID = "wxcce65dacfe0f2a7e";
    this.secret = "54b377ead4d492b9f9d2c16a5c833efd";

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.getLoginInfo(res,function(resp){
          this.globalData.session = resp.data.session_key;
          this.globalData.openid = resp.data.openid;
        }.bind(this))
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
              this.globalData.userInfo = this.userInfo = res.userInfo

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
  },
  globalData: {
    userInfo: null
  },
  getLoginInfo : function(res,fn){
    wx.request({
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=${this.APPID}&secret=${this.secret}&js_code=${res.code}&grant_type=authorization_code`,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        fn(res)
      }
    })
  }
})