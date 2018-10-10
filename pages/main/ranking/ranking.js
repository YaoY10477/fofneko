// pages/main/ranking/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addIndex : 0,
    classIndex : 0,
    tableDatas : [],
    IncreaseList: [
      {
        tabTitle: "本周涨幅榜",
        listDatas: [
          {
            name: "上证指数",
            return_y1: "2724.62"
          },
          {
            name: "中证指数",
            return_y1: "2624.55"
          },
          {
            name: "沪深指数",
            return_y1: "2150.25"
          },
          {
            name: "上证指数",
            return_y1: "2524.82"
          },
        ]
      }, {
        tabTitle: "本月涨幅榜",
        listDatas: [
          {
            name: "上证指数",
            return_y1: "2724.62"
          },
          {
            name: "中证指数",
            return_y1: "2624.55"
          },
          {
            name: "沪深指数",
            return_y1: "2150.25"
          },
          {
            name: "上证指数",
            return_y1: "2524.82"
          }
        ],
      }, {
        tabTitle: "本年涨幅榜",
        listDatas: []
      }
    ], 
    DeclinesList: [
      {
        tabTitle: "本周跌幅榜",
        listDatas: [],
      }, {
        tabTitle: "本月跌幅榜",
        listDatas: [
          {
            name: "上证指数",
            return_y1: "2724.62"
          },
          {
            name: "中证指数",
            return_y1: "2624.55"
          },
          {
            name: "沪深指数",
            return_y1: "2150.25"
          },
          {
            name: "上证指数",
            return_y1: "2524.82"
          },
        ]
      }, {
        tabTitle: "本年涨幅榜",
        listDatas: [
          {
            name: "上证指数",
            return_y1: "2724.62"
          },
          {
            name: "中证指数",
            return_y1: "2624.55"
          },
          {
            name: "沪深指数",
            return_y1: "2150.25"
          },
          {
            name: "上证指数",
            return_y1: "2524.82"
          },
        ]
      }
    ],
    classer: [
      {
        text: "涨幅榜",
        value: "up"
      }, {
        text: "跌幅榜",
        value: "down"
      }
    ],
    address: [
      {
        text: "全部",
        value: "all"
      }, {
        text: "中国",
        value: "all"
      }, {
        text: "亚洲",
        value: "all"
      }, {
        text: "美洲",
        value: "all"
      }, {
        text: "欧洲",
        value: "all"
      }, {
        text: "其他",
        value: "all"
      }
    ],
  },

  //切换地区
  changeAddIndex: function ($event) {
    this.setData({
      addIndex: $event.currentTarget.dataset.index
    })
  },

  //切换涨幅榜/跌幅榜
  changeClassIndex : function($event){
    let index = $event.currentTarget.dataset.index;
    this.setData({
      classIndex : index,
      tableDatas : index ? this.data.DeclinesList : this.data.IncreaseList
    });
    this.goTop()
  },

  //滚动条返回顶部
  goTop : function(){
    if(wx.pageScrollTo){
      wx.pageScrollTo({
        scrollTop: 0,
        duration : 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始默认涨幅榜
    this.setData({
      tableDatas: this.data.IncreaseList
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