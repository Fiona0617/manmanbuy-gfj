$(function(){
  var mmb = new MMB();
  mmb.getBrandTitle();
  mmb.toBrandTopList();
});

var MMB = function(){};

MMB.prototype = {
  /* 获取品牌名称 */
  getBrandTitle: function(){
    var baseUrl = 'http://localhost:9090';
    $.ajax({
      url: baseUrl+'/api/getbrandtitle',
      type: 'get',
      success: function(obj){
        console.log(obj);
        // 调用模板，渲染品牌名称列表
        var html = template('brandTitleTpl',obj);
        $('#main .content .mui-table-view').html(html);
      }
    });
  },

  /* 点击品牌，跳转品牌排行列表页 */
  toBrandTopList: function(){
    $('#main .content ul').on('tap','li a',function(){
      // 获取品牌id和名称
      var brandtitleid = $(this).data('id');
      var brandTitle = $(this).data('title');
      brandTitle = brandTitle.substring(0,brandTitle.length-4);
      // 跳转到十大品牌页面，并传参数过去
      location.href = 'brandtop10.html?brandtitleid='+brandtitleid+'&brandTitle='+brandTitle;
    });
  }
}
