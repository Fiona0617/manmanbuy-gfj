$(function () {
  var mmb = new MMB();
  mmb.getcouponproduct();
  mmb.showCouponImg();
  mmb.closeMask();
});

var MMB = function () {};

MMB.prototype = {
  /* 根据优惠券标题id获取该标题对应的列表 */
  getcouponproduct: function () {
    var that = this;
    // 获取url传递过来的优惠券标题id
    var couponid = this.GetQueryString('couponid');
    // 调用api，获取优惠券列表信息
    $.ajax({
      url: 'http://localhost:9090/api/getcouponproduct?couponid=' + couponid,
      type: 'get',
      success: function (obj) {
        console.log(obj);
        // 定义一个优惠券序列号，存储到自定义属性
        // 存储所有图片信息到全局数组
        that.imgArr = [];
        for(var i=0; i<obj.result.length; i++){
          that.imgArr.push(obj.result[i].couponProductImg);
          obj.result[i].num = i;
        };
        // 调用模板，渲染页面
        var html = template('couponProductListTpl', obj);
        $('#main .content ul').html(html);
      }
    });
  },

  /* 点击优惠券列表，弹出优惠券图片 */
  showCouponImg: function(){
    var that = this;
    $('#main .content ul').on('tap','li a',function(){
      console.log(this);
      // 显示轮播图遮罩层
      $('.mask').attr('style','display:block;');
      // 渲染轮播图内容
      var html = "";
      for(var i=0; i<that.imgArr.length; i++){
        var addhtml = "<div class='swiper-slide'>"+that.imgArr[i]+"</div>";
        html += addhtml;
        $('.mask .inner-slider .swiper-container .swiper-wrapper').html(html);
      };
      // 获取当前要显示的对应图片索引，并设置初始化轮播图显示第几张
      var num = $(this).data('num');
      that.num = num;
      // 设置显示的当前图片
      var currentImg = -(num+1)*300;
      $('.mask .inner-slider .swiper-container .swiper-wrapper').css("transform","translate3d("+currentImg+"px, 0px, 0px);");
      // 初始化轮播图组件
      that.initSlider();
    });
  },

  /* 隐藏遮罩层 */
  closeMask: function(){
    $('.close').on('tap',function(){
      // 隐藏轮播图遮罩层
      $('.mask').attr('style','display:none;');
    });
  },

  /* 初始化swiper轮播图 */
  initSlider: function () {
    var that = this;
    var mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal', // 水平切换选项
      loop: true, // 循环模式选项
      initialSlide: that.num, // 设定初始化时slide的索引，轮播图从第几张开始

      // 如果需要前进后退按钮
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      }
    })
  },

  /* 获取url指定名称的参数值，name为想要获取值的对应的参数名 */
  GetQueryString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

}