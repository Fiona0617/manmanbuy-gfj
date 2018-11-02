$(function () {
  var mmb = new MMB();
  mmb.getBrandTitle();
  mmb.getbrand();
  mmb.getbrandproductlist();
  mmb.getproductcom();
});

var MMB = function () {};

MMB.prototype = {
  /* 获取品牌名称 */
  getBrandTitle: function(){
    // 获取url传递过来的品牌名称
    var brandTitle = this.GetQueryString('brandTitle');
    // 获取url传递过来的品牌id
    var brandtitleid = this.GetQueryString('brandtitleid');
    this.brandtitleid = brandtitleid;
    // 显示在页面
    $('#brandTopList .brand-name').text(brandTitle);
    $('#saleTopList .brand-name').text(brandTitle);
    $('#userComments .brand-name').text(brandTitle);
    $('#bottomHeader .brand-name').text(brandTitle);
  },

  /* 获取品牌标题对应的十大品牌 */
  getbrand: function () {
    // 调用api，获取十大品牌
    $.ajax({
      url: 'http://localhost:9090/api/getbrand?brandtitleid='+this.brandtitleid,
      type: 'get',
      success: function(obj){
        console.log(obj);
        var html = template('brandTopListTpl',obj);
        $('#brandTopList ul').html(html);
      }
    });
  },

  /* 获取品牌标题对应的十大品牌的销量排行商品列表 */
  getbrandproductlist: function () {
    // 调用api，获取十大品牌的销量排行商品
    $.ajax({
      url: 'http://localhost:9090/api/getbrandproductlist?brandtitleid='+this.brandtitleid+'&pagesize=4',
      type: 'get',
      success: function(obj){
        console.log(obj);
        var html = template('saleTopListTpl',obj);
        $('#saleTopList ul').html(html);
      }
    });
  },

  /* 获取销量排行商品的评论 */
  getproductcom: function () {
    // 调用api，获取销量排行商品的评论
    $.ajax({
      url: 'http://localhost:9090/api/getproductcom?productid='+this.brandtitleid,
      type: 'get',
      success: function(obj){
        console.log(obj);
        var html = template('userCommentsTpl',obj);
        $('#userComments ul').html(html);
      }
    });
  },

  /* 获取url指定名称的参数值，name为想要获取值的对应的参数名 */
  GetQueryString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
}