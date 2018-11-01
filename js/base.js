$(function () {
    var mmm = new MMM();
    mmm.initNavScroll();
    mmm.navTriggerActive();
})

var MMM = function () {};
MMM.prototype = {
    // nav栏初始化滚动
    initNavScroll: function () {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0009, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            scrollX: true, //是否横向滚动
            scrollY: false, //是否竖向滚动
            indicators: false //是否显示滚动条
        });
    },
    // nav栏点击切换active类
    navTriggerActive: function(){
        $('.nav-bar').on('tap','li',function(){
            $(this).addClass('active').siblings().removeClass('active');
        })
    }
}