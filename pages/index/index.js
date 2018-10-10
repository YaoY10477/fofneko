const util = require("../../utils/util.js");
const Charts = require("../../utils/wx-charts.js");
const query = wx.createSelectorQuery();
const path = getApp().globalData.path;

//index.js
//获取应用实例
const app = getApp();
Page({
  width: "100%",
  overflow: "hidden",
  data: {
    maxPage : 0,
    page : 1,
    pageSize : 10,
    isList : true,
    listMsg : '正在努力加载中...',
    addIndex : 0,
    classIndex : 0,
    keyword : "",
    orderAsc : {},
    matrixRange : [2015,2016,2017,2018],
    blockBck : [
      {
        name: "普标500",
        value: "pb500",
        return_y1: "0.0135",
        series: [3, 3.2, 5, 3.6],
        flg: "+"
      }, {
        name: "沪深300",
        value: "hs300",
        return_y1: "0.0135",
        series: [2, 2.9, 3, 3.6],
        flg: "-"
      }, {
        name: "黄金",
        value: "gold",
        return_y1: "0.0135",
        series: [5, 4.2, 4.3, 3],
        flg: "+"
      }, {
        name: "上证50",
        value: "si50",
        return_y1: "0.0135",
        series: [6.1, 4.2, 4.8, 5],
        flg: "-"
      }, {
        name: "恒生指数",
        value: "hszs",
        return_y1: "0.0135",
        series: [5.3, 5.9, 5.2, 4.5],
        flg: "-"
      }
    ],
    address : [
      {
        name: "全部",
        district_code: "all"
      }
    ],
    classer : [
      {
        text: "全部",
        value: "all"
      }, {
        text: "权益",
        value: "all"
      }, {
        text: "债券",
        value: "all"
      }, {
        text: "商品",
        value: "all"
      }, {
        text: "房地产",
        value: "all"
      }, {
        text: "另类资产",
        value: "all"
      }
    ],
    listData: [],
    userInfo : {},
    hasUserInfo : false,
    canIUse : wx.canIUse('button.open-type.getUserInfo')
  },

  //onload
  onLoad: function () {
    this.getAddInfo();
    // this.initBckChart();
    this.updateListData();
    this.updateListData(true);
    console.log(app.globalData)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.initWindowHeight();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      };
      this.initWindowHeight();
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.initWindowHeight();
        }
      })
    }
  },

  //初始化窗口高度
  initWindowHeight(){
    wx.getSystemInfo({
      success: function (res) {
        this.setData({
          windowHeight: res.windowHeight
        })
      }.bind(this),
    })
  },

  //列表、矩阵切换
  changeIsList: function ($event) {
    this.setData({
      isList: $event.currentTarget.id == 'list'
    })
  },

  //地区切换
  changeAddIndex: function ($event) {
    this.setData({
      listData: [],
      page : 1,
      addIndex: $event.currentTarget.dataset.index,
      listMsg : "正在努力加载中..."
    });
    delete this.data.groupHeight;
    this.updateListData()
  },

  //上拉刷新
  onPageScroll:function(e){
    let oldHeight = this.data.groupHeight;
    let bt = oldHeight - e.scrollTop;
    let oldwdh = this.data.windowHeight;
    // console.log(this.data.groupHeight, e.scrollTop , this.data.windowHeight)
    if (bt == oldwdh) {          //判断是否触底
      if (this.data.page < this.data.maxPage) {   //判断是否已达到最大页码
        wx.showLoading({
          title: '玩命加载中...',
          mask: true
        });
        this.updateListData(true, function(resp) {
          wx.hideLoading();
        }.bind(this))
      }else{
        wx.showToast({
          title : '再拉也没有啦',
          icon : 'none',
          mask : false,
          duration : 2000
        })
      }
    }
  },

  //下拉刷新
  onPullDownRefresh: function (e) {
    if(this.data.isList){
      wx.showModal({
        title : "提示",
        content : "是否刷新列表数据",
        success: function (index) {
          wx.stopPullDownRefresh();
          if (!index.cancel) {
            wx.showLoading({
              title: '玩命加载中...',
              mask: true
            });
            this.setData({
              page: 1,
              listMsg: "正在努力加载中...",
              listData: [],
              maxPage: 0
            });
            this.updateListData(null, function (resp) {
              wx.hideLoading();
            })
          }
        }.bind(this)
      })
    } else {
      wx.stopPullDownRefresh();
    }
  },

  //切换类型
  changeClassIndex: function ($event) {
    this.setData({
      classIndex: $event.currentTarget.dataset.index
    })
  },

  //列表排序
  orderByList: function ($event) {
    var field = $event.currentTarget.dataset.field;
    this.setData({
      orderAsc: Object.assign(this.data.orderAsc, {
        [field]: !this.data.orderAsc[field]
      })
    })
    //这里调用list接口排序
  },

  //获取content高度
  setGroupHeight : function(){
    wx.createSelectorQuery().select(".container").boundingClientRect(
      function (resp) {
        this.setData({
          groupHeight: resp.height // this.data.groupHeight ? this.data.groupHeight + util.rpxToPx(900) :resp.height
        })
      }.bind(this)
    ).exec();
  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  initBckChart() {
    for (var o of this.data.blockBck) {
      let series = o.series;
      let flg = o.flg;
      let op = {
        series: series,
        flg: flg,
        minVal: util.getMinByArr(series),
        maxVal: util.getMaxByArr(series),
        maxLen: series.length - 1
      };
      let $ctx = wx.createCanvasContext(o.value);
      wx.createSelectorQuery().select(`#${o.value}`).boundingClientRect().exec(function (resp) {
        Object.assign(op, {
          width: resp[0]['width'],
          height: resp[0]['height'],
          xEquable: Math.ceil(resp[0]['width'] / op.maxLen),
          yEquable: Math.ceil(resp[0]['height'] / Math.ceil(op.maxVal))
        })
        this.createChart($ctx, op);
      }.bind(this));
    }
  },

  createChart(ctx, op) {
    let color = op.flg == "-" ? "green" : "red";
    ctx.setLineWidth(2);
    ctx.setStrokeStyle("blue");
    ctx.fillStyle = "red";
    //画不显示的连接线，与收益线图组合成一个多边形
    ctx.setStrokeStyle("skyblue");
    ctx.moveTo(op.width, (op.maxVal - op.series[op.series.length - 1]) * op.yEquable);
    ctx.lineTo(op.width, op.height);
    ctx.lineTo(0, op.height);
    ctx.lineTo(0, (op.maxVal - op.series[0]) * op.yEquable);
    // ctx.fill();
    ctx.beginPath();
    for (let i = 0; i < op.series.length; i++) {
      let d = op.series[i];
      ctx.setStrokeStyle(color);
      let w = op.xEquable * i;
      let h = op.yEquable * (op.maxVal - d);
      ctx.lineTo(w < 0 ? 0 : w > op.width ? op.width : w, h < 0 ? 0 : h > op.height ? op.height : h);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.draw();
  },

  //获取一级分区信息（地区）
  getAddInfo(){
    wx.request({
      url: `http://${path}/api/benchmark/district/`,
      dataType:'json',
      success : function(result){
        let resp = result.data;
        this.setData({
          address: this.data.address.concat(resp.data)
        })
      }.bind(this)
    })
  },

  //更新列表数据
  updateListData(scrFlg,fn){
    let page = scrFlg ? this.data.page + 1 : this.data.page;
    wx.request({
      url: `http://${path}/api/benchmark/get/${this.data.address[this.data.addIndex]['name']}/`,
      data : {
        page: page,
        page_size : this.data.pageSize,
        // add: this.data.address[this.data.addIndex]['text']
      },
      dataType : 'json',
      success: function (result){
        let resp = result.data;
        if (resp.success) {
          if (resp.data.length) {
            this.setData({
              listData: this.data.listData.concat(resp.data),
              maxPage: resp.page_info.total_page,
              page : page
            });
            if (fn) {
              fn(resp)
            }
            this.setGroupHeight();
          } else {
            this.setData({
              listMsg: "没有查询到数据",
              listData: [],
              maxPage: 0
            });
          }
        }
      }.bind(this),
      fail: function(err){
        if (fn) {
          fn(resp)
        }
        this.setData({listMsg : "没有查询到数据"});
        wx.showToast({
          title: '请求超时,请检查网络连接',
          icon: 'none',
          mask: false,
          duration: 2000
        })
      }.bind(this),
      complete : function(){
        wx.hideLoading();
      }
    })
  },

  //根据输入框关键字查询列表
  search() {
    wx.showLoading({
      title: '玩命加载中...',
      mask: true
    });
    setTimeout(function(){
      wx.hideLoading()
    },1000)
  }
})
