// pages/main/detail/detail.js
import * as echarts from '../../../ec-canvas/echarts';
const util = require("../../../utils/util.js");
const Charts = require("../../../utils/wx-charts.js");
const path = getApp().globalData.path;
let bckId = null;

function initCharts(canvas, width, height) {
  let series = new Array();
  let xOp = new Array();
  let chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  wx.request({
    url: `http://${path}/api/benchmark/price_trend/${bckId}/year/`,
    success: function (resp) {
      if (resp.data.success) {
        let op = {
          data: [],
          color:'#3555B6',
          type: 'line',
          symbol: 'none',
          smooth: true,
          areaStyle: {
            color : {
              type : 'linear',
              x :0,y:0,x2:0,y2:1,
              colorStops:[{
                offset:0,
                color: '#3555B6'
              },{
                offset:1,
                  color: '#303C55'
              }]
            }
          },
        };
        let legend = new Array();
        for(let i of resp.data.data){
          op.name = i.name;
          op.data.push(i.close);
          xOp.push(i.date);
        }
        series.push(op);
        for (let o of series){
          legend.push(o.name)
        };
        var option = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xOp,
            inverse : true,
            axisLine: {
              lineStyle: {
                color: "#6E6D79"
              }
            },
            nameTextStyle: {
              color: '#6E6D79'
            }
          },
          grid: {
            left: 55
          },
          legend: {
            data: legend,
            left: "center",
            top : "bottom",
            textStyle: {
              color : "#6E6D79"
            },
          },
          yAxis: {
            type: 'value',
            min: 'dataMin',
            max: 'dataMax',
            splitLine:{
              lineStyle : {
                color : "#6E6D79"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#6E6D79"
              }
            },
            nameTextStyle: {
              color: '#6E6D79'
            }
          },
          series: series
        };
        chart.setOption(option);
        return chart;
      }
    }
  })


};

Page({
  data: {
    priceTrend: {
      onInit: initCharts
    },
    benchmarkId  : "",
    range : "all",
    maxPage : 3,
    page : 1,
    inChina : true,
    groups : {
      PriceTrend : {
        width : 0,
        height: 0
      },
      charts : {
        width : 10,
        height: 10
      }
    },
    correlation : "high",
    mainInfo :{},
    IntervalOp : [
      {
        text : "全部",
        value: "all"
      },
      {
        text : "今年以来",
        value: "total"
      },
      {
        text : "2017",
        value: "2017"
      },
      {
        text : "2016",
        value: "2016"
      },
      {
        text : "2015",
        value: "2015"
      }
    ],
    fundListData: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5
      ]
  },

  //onload
  onLoad: function (options) {
    //获得传入的基金ID
    bckId = options.benchmarkId;
    this.setData({
      page : 1,
      benchmarkId: options.benchmarkId
    });
    this.initMainInfo();
    // this.initAreaCharts("PriceTrend", {})
  },

  //加入自选
  addSelected : function($event){
    console.log(this.data)
  },

  //切换时间区间
  changeInterval : function($event){
    this.setData({
      range: $event.currentTarget.dataset.val
    })
  },

  //相关资产切换相关性高低
  changeCorrelation: function ($event) {
    this.setData({
      correlation: $event.currentTarget.dataset.val
    })
  },

  //相关资产切换中国/海外
  regionChange : function($event){
    this.setData({
      inChina : !$event.detail.value
    })
  },

  interactive : function($event){
    // console.log($event)
    wx.showActionSheet({
      itemList: ["微信好友","保存到相册"],
      success: function(action){
        switch(action.tapIndex){
          case 0:
          console.log("发送微信好友")
          break;
          case 1:
          console.log("保存相册")
          break;
        }
      }
    })
  },

  //根据id设置容器尺寸
  setGroupSizeById(id,fn){
    wx.createSelectorQuery().select(`#${id}`).boundingClientRect(function (resp) {
      this.data["groups"][id]["width"] = resp.width;
      this.data["groups"][id]["height"] = resp.height;
      let newGrp = Object.assign({}, this.data.groups,{
        [id] : {
          width : resp.width,
          height: resp.height
        }
      });
      this.setData({
        groups: newGrp
      });
      if(fn){fn()};
    }.bind(this)).exec();
  },

  //查看更多
  selectMore : function(){
    //每页额外加载5条，已达最大页码则收起全部
    this.setData({
      page: this.data.page < this.data.maxPage ? this.data.page + 1 : 1
    })
  },

  //面积图通用方法
  initAreaCharts : function(gname,op){
    //面积图通用配置属性
    this.setGroupSizeById(gname, function () {
      console.log(this.data)
      let options = {
        canvasId: gname,
        type: 'area',
        extra : {
          lineStyle : 'curve'
        },
        rotate : -45,
        legend:{
          rotate : -45
        },
        yAxis : {
          fontColor : '#fff'
        },
        xAxis : {
          fontColor : '#fff'
        },
        width: this.data.groups[gname]['width']*1.04,
        height: this.data.groups[gname]['height'],
        categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
        series: [{
          name: '成交量1',
          data: [70, 40, 65, 100, 34, 18],
          format: function (val) {
            return val.toFixed(2) + '万';
          }
        }, {
          name: '成交量2',
          data: [15, 20, 45, 37, 4, 80],
          format: function (val) {
            return val.toFixed(2) + '万';
          }
        }],

      };
      //自定义扩展属性
      Object.assign(options, op);
      console.log(options)
      let chart = new Charts(options);
    }.bind(this));
  },

  //加载指标详情
  initMainInfo(){
    wx.request({
      url: `http://${path}/api/benchmark/detail/${this.data.benchmarkId}/`,
      success : function(result){
        let resp = result.data;
        if(resp.success){
          this.setData({
            mainInfo : resp.data
          })
        }
      }.bind(this)
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