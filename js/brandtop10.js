$(function () {
  var mmb = new MMB();
  mmb.getBrandTitle();
  mmb.getbrand();
  mmb.getbrandproductlist();
  mmb.toBrandCategory();
  mmb.toProductDetail();
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
        // 设置left-num序号
        for(var i=0; i<obj.result.length; i++){
            obj.result[i].num = i+1;
        };
        var html = template('brandTopListTpl',obj);
        $('#brandTopList ul').html(html);
      }
    });
  },

  /* 获取品牌标题对应的十大品牌的销量排行商品列表 */
  getbrandproductlist: function () {
    var that = this;
    // 调用api，获取十大品牌的销量排行商品
    $.ajax({
      url: 'http://localhost:9090/api/getbrandproductlist?brandtitleid='+this.brandtitleid+'&pagesize=4',
      type: 'get',
      success: function(obj){
        console.log(obj);
        // 存储第一个商品的信息到全局，结果是undefined或一个对象
        that.firstProductinfo = obj.result[0];

        // 调用模板渲染销量排行商品
        var html = template('saleTopListTpl',obj);
        $('#saleTopList ul').html(html);

        // 调用获取销量排行商品的评论，并渲染页面
        that.getproductcom();
      }
    });
  },

  /* 获取销量排行商品的评论 */
  getproductcom: function () {
    var that = this;
    // 判断是否有产品销量信息
    if(that.firstProductinfo){
      // 调用api，获取销量排行商品的评论
      $.ajax({
        url: 'http://localhost:9090/api/getproductcom?productid='+that.firstProductinfo.productId,
        type: 'get',
        success: function(obj){
          console.log(obj);
          for(var i=0; i<obj.result.length; i++){
            obj.result[i].productName = that.firstProductinfo.productName;
            obj.result[i].productImg = that.firstProductinfo.productImg;
          };
          
          var html = template('userCommentsTpl',obj);
          $('#userComments ul').html(html);
          
        }
      });
    }else{
      $('#userComments ul').html('<p>暂无销量信息！</p>');
    }
  },

  /* 给十大品牌注册点击事件 */
  toBrandCategory: function(){
    $('#brandTopList ul').on('tap','li a',function(){
      // 等待把链接修改为商品列表页
      location.href = "http://localhost:9090/api/getproductlist?categoryid="+$(this).data('categoryid')+"&pageid=1";
    });
  },

  /* 给销量排行商品注册点击事件 */
  toProductDetail: function(){
    $('#saleTopList ul').on('tap','li a',function(){
      // 等待把链接修改为商品详情页
      location.href = "http://localhost:9090/api/getproduct?productid="+$(this).data('productid');
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