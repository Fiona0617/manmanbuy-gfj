$(function () {
  var mmb = new MMB();
  mmb.getcouponproduct();
});

var MMB = function () {};

MMB.prototype = {
  /* 根据优惠券标题id获取该标题对应的列表 */
  getcouponproduct: function(){
    // 获取url传递过来的优惠券标题id
    var couponid = this.GetQueryString('couponid');
    // 调用api，获取优惠券列表信息
    $.ajax({
      url: 'http://localhost:9090/api/getcouponproduct?couponid='+couponid,
      type: 'get',
      success: function(obj){
        console.log(obj);
        var html = template('couponProductListTpl',obj);
        $('#main .content ul').html(html);
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