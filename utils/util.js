const systemInfo = wx.getSystemInfoSync();

const utils = {

    fmtFixed: function (val, index) {
      if (val == null || isNaN(val) || typeof (val) == "string" && val == '')
        return "--";
      return Number((val * 1).toFixed(index));
    },

    fmtRatio: function (val, index) {
      var index = arguments[1] ? arguments[1] : 2;
      if (val == null || isNaN(val) || typeof (val) == "string" && val == '') {
        return '--';
      }
      var ratio = (val * 100).toFixed(index);
      return ratio + '%';
    },

    getColor: function (id, arr, resp1, resp2) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == id) {
          return resp1 == null ? "lightGreen" : resp1
        }
      }
      return resp2 == null ? "gray" : resp2
    },

    getMinByArr: function (arr) {
      return Math.min.apply(Math, arr)
    },

    getMaxByArr: function (arr) {
      return Math.max.apply(Math, arr)
    },

    rpxToPx : function(val){
      let wh = systemInfo.windowWidth;
      return Math.ceil(val / 750 * wh)
    },

    pxToRpx: function (val) {
      let wh = systemInfo.windowWidth;
      return Math.ceil(val * 750 / wh)
    },
    
    getsystemInfo : function(){
      return systemInfo
    }
}

module.exports = utils
