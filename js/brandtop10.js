$(function () {
  var mmb = new MMB();
  mmb.getbrand();
  mmb.getbrandproductlist();
  mmb.getproductcom();
});

var MMB = function () {};

MMB.prototype = {
  /* 获取品牌标题对应的十大品牌 */
  getbrand: function () {
    // 获取url传递过来的品牌id和名称
    var brandtitleid = this.GetQueryString('brandtitleid');
    var brandTitle = this.GetQueryString('brandTitle');
    console.log(brandTitle);
    // 调用api，获取十大品牌
    $.ajax({
      url: 'http://localhost:9090/api/getbrand?brandtitleid='+brandtitleid,
      type: 'get',
      success: function(obj){
        var html = template('brandTopListTpl',obj);
        $('#brandTopList ul').html(html);
      }
    });
  },

  /* 获取品牌标题对应的十大品牌的销量排行商品列表 */
  getbrandproductlist: function () {

  },

  /* 获取销量排行商品的评论 */
  getproductcom: function () {

  },

  /* 获取url指定名称的参数值，name为想要获取值的对应的参数名 */
  GetQueryString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
}