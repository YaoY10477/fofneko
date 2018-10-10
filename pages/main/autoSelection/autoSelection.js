// pages/main/autoSelection/autoSelection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected : [],
    removeRow : [],
    operFlg : false,
    selectAllFlg : false,
    orderAsc : {},
    // listData:[],
    listData: [
      {
        id: 'si506',
        name: '上证50指数',
        theme: '大盘',
        flg: '-',
        return_y1: '0.0523'
      }, {
        id: 'hs3006',
        name: '沪深300',
        theme: '大盘',
        flg: '+',
        return_y1: '0.0523'
      }, {
        id: 'pb5006',
        name: '普标500',
        theme: '大盘',
        flg: '-',
        return_y1: '0.0523'
      }, {
        id: 'sndk6',
        name: '纳斯达克',
        theme: '小盘',
        flg: '+',
        return_y1: '0.0523'
      }, {
        id: 'si5006',
        name: '中证500',
        theme: '大盘',
        flg: '+',
        return_y1: '0.0523'
      }, {
        id: 'si50',
        name: '上证50指数',
        theme: '大盘',
        flg: '-',
        return_y1: '0.0523'
      }, {
        id: 'hs300',
        name: '沪深300',
        theme: '大盘',
        flg: '+',
        return_y1: '0.0523'
      }, {
        id: 'pb500',
        name: '普标500',
        theme: '大盘',
        flg: '-',
        return_y1: '0.0523'
      }, {
        id: 'sndk',
        name: '纳斯达克',
        theme: '小盘',
        flg: '+',
        return_y1: '0.0523'
      }, {
        id: 'si500',
        name: '中证500',
        theme: '大盘',
        flg: '+',
        return_y1: '0.0523'
      }, {
        id: 'si501',
        name: '上证50指数',
        theme: '大盘',
        flg: '-',
        return_y1: '0.0523'
      }, {
        id: 'hs3001',
        name: '沪深300',
        theme: '大盘',
        flg: '+',
        return_y1: '0.0523'
      }, {
        id: 'pb5001',
        name: '普标500',
        theme: '大盘',
        flg: '-',
        return_y1: '0.0523'
      }, {
        id: 'sndk1',
        name: '纳斯达克',
        theme: '小盘',
        flg: '+',
        return_y1: '0.0523'
      }, {
        id: 'si5001',
        name: '中证500',
        theme: '大盘',
        flg: '+',
        return_y1: '0.0523'
      }, {
        id: 'si502',
        name: '上证50指数',
        theme: '大盘',
        flg: '-',
        return_y1: '0.0523'
      }, {
        id: 'hs3002',
        name: '沪深300',
        theme: '大盘',
        flg: '+',
        return_y1: '0.0523'
      }, {
        id: 'pb5002',
        name: '普标500',
        theme: '大盘',
        flg: '-',
        return_y1: '0.0523'
      }, {
        id: 'sndk2',
        name: '纳斯达克',
        theme: '小盘',
        flg: '+',
        return_y1: '0.0523'
      }, {
        id: 'si5002',
        name: '中证500',
        theme: '大盘',
        flg: '+',
        return_y1: '0.0523'
      },
    ]
  },

  //操作
  operation : function($event){
    this.setData({
      operFlg: !this.data.operFlg,
      selectAllFlg : false
    })
  },

  //添加对比
  addSelected: function ($event) {
    let _rowId = $event.currentTarget.dataset.id;
    if (!this.data.operFlg) {
      let newSelected = this.data.selected;
      let index = newSelected.indexOf(_rowId);
      let selected = index == -1 ? newSelected.length >= 4 ? wx.showModal({
        title: `提示`,
        content: `PK资产已达上限`,
        showCancel: false
      }) : newSelected.push(_rowId) : newSelected.splice(index, 1)
      this.setData({
        selected: newSelected
      })
    } else {
      let newRemoveRow = this.data.removeRow;
      let index = newRemoveRow.indexOf(_rowId);
      let removeRow = index == -1 ? newRemoveRow.push(_rowId) : newRemoveRow.splice(index, 1)
      this.setData({
        removeRow: newRemoveRow,
        selectAllFlg: false
      })
    }
  },

  //全选/反选
  selectAll : function(){
    let _data = this.data;
    let removeRowLen = this.data.removeRow.length;
    if(removeRowLen >= this.data.listData.length){
      if (this.data.selectAllFlg){

      }
      this.setData({
        removeRow : [],
        selectAllFlg : false
      })
    }else{ 
      // if (!this.data.selectAllFlg) {
        // for (let i = 0; i < 4 - selectedLen; i++) {
          // this.setSelectedByIndex(0)
          this.selectAllRow('removeRow')
        // }
      // }
      this.setData({
        selectAllFlg: true
      });
    }
  },

  //选中所有行
  selectAllRow : function(ob){
    let rm = new Array();
    for(let o of this.data.listData){
      rm.push(o.id)
    }
    this.setData({
      [ob] : rm
    })
  },

  //设置选中
  setSelectedByIndex: function (ind) {
    return this.data.selected.length < ind ? null 
    : this.data.selected.indexOf(this.data.listData[ind].id) == -1 ? 
    this.setData({
        selected: this.data.selected.concat([this.data.listData[ind].id])
    }) 
    : this.setSelectedByIndex(ind + 1)
  },

  //移除全部自选
  removeSelecteds : function(){
    this.data.removeRow.length ? 
    wx.showModal({
      title: `提示`,
      content: `确认将这${this.data.removeRow.length}个选项移除自选?`,
      success : function(){
        this.setData({
          selected : [],
          selectAllFlg : false
        })
      }.bind(this)
    })
    : wx.showModal({
      title: `提示`,
      content: `没有选中的自选项`,
      showCancel : false
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

  //下拉刷新
  onPageScroll: function (e) {
    return
    let bt = this.data.groupHeight - e.scrollTop;
    if (bt == this.data.windowHeight) {          //判断是否触底
      if (this.data.page < this.data.maxPage) {   //判断是否已达到最大页码
        wx.showLoading({
          title: '玩命加载中...',
          mask: true
        });
        setTimeout(function () {
          this.setData({
            page: this.data.page + 1
          })
          wx.pageScrollTo({
            scrollTop: bt,
            duration: 0
          });
          wx.hideLoading()
        }.bind(this), 1000)
      } else {
        wx.showToast({
          title: '再拉也没有啦',
          icon: 'none',
          mask: false,
          duration: 2000
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取页面高度
    wx.createSelectorQuery().select(".container").boundingClientRect().exec(function (resp) {
      this.setData({
        groupHeight: resp[0].height
      })
    }.bind(this));
    //获取窗口可视高度
    wx.getSystemInfo({
      success: function (res) {
        this.setData({
          windowHeight: res.windowHeight
        })
      }.bind(this),
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