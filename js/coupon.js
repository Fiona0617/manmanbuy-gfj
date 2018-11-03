$(function () {
  var mmb = new MMB();
  mmb.getcoupon();
  mmb.toCouponProduct();
});

var MMB = function () {};

MMB.prototype = {
  /* 获取优惠券标题信息，并渲染到页面 */
  getcoupon: function(){
    // 调用api，获取优惠券标题信息
    $.ajax({
      url: 'http://localhost:9090/api/getcoupon',
      type: 'get',
      success: function(obj){
        console.log(obj);
        var html = template('couponTitleTpl',obj);
        $('#couponList').html(html);
      }
    });
  },

  /* 给每个优惠券标题注册点击事件，跳转到优惠券列表 */
  toCouponProduct: function(){
    $('#couponList').on('tap','.inner',function(){
      // 获取优惠券标题id
      var couponid = $(this).data('id');
      // 跳转到优惠券列表页面，并传递参数优惠券标题id
      location.href = "couponproduct.html?couponid="+couponid;
    });
  }
}