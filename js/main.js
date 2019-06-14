//轮播图
function slider(){
    var Swiper = {
        len:0,
        currLen:0

    }
    function clonePreHtml(){//向左滚动
        $(".slide-box-new .swiper-wrapper").animate({marginLeft:"-1842px"},function () {
            var firstNode = $(".slide-box-new .swiper-slide:first").remove();
            var secondNode = $(".slide-box-new .swiper-slide:first").remove();
            var thirdNode = $(".slide-box-new .swiper-slide:first").remove();
            $(".slide-box-new .swiper-wrapper").append(firstNode);
            $(".slide-box-new .swiper-wrapper").append(secondNode);
            $(".slide-box-new .swiper-wrapper").append(thirdNode);
            $(".slide-box-new .swiper-wrapper").css("margin-left","-921px");
        })
    }
    function cloneAfterHtml(){
        $(".slide-box-new .swiper-wrapper").animate({marginLeft:"-0"},function () {
            var firstNode = $(".slide-box-new .swiper-slide:last").remove();
            var secondNode = $(".slide-box-new .swiper-slide:last").remove();
            var thirdNode = $(".slide-box-new .swiper-slide:last").remove();
            $(".slide-box-new .swiper-wrapper").prepend(firstNode);
            $(".slide-box-new .swiper-wrapper").prepend(secondNode);
            $(".slide-box-new .swiper-wrapper").prepend(thirdNode);
            $(".slide-box-new .swiper-wrapper").css("margin-left","-921px");
        });
    }
    function initSwiper() {
        Swiper.len = $(".slide-box-new .swiper-slide").length;
        var str = "";
        if(Swiper.len<3){
            str = Swiper.len==1?"<div class='swiper-slide'></div><div class='swiper-slide'></div>":"<div class='swiper-slide'></div>";
        }
        $(".slide-box-new .swiper-wrapper").append(str);

        Swiper.currLen = $(".slide-box-new .swiper-slide").length;

        var a = 9-Swiper.currLen;
        var flag = 0;
        for (var i = 0;i<a;i++) {
            if(i == Swiper.currLen){
                flag =0;
            }
            var cloneNode = $(".slide-box-new .swiper-slide:eq("+flag+")").clone();
            $(".slide-box-new .swiper-wrapper").append(cloneNode);
            flag ++;
        }

        $(".slide-box-new .swiper-wrapper").width(($(".slide-box-new .swiper-slide").width()+2)*9).css("margin-left","-921px");

    }
    initSwiper();

    var timmer = 0;

    timmer =setInterval(function () {
        clonePreHtml();
    },5000)

    var start = +new Date();
    $(".btnLeft").on("click",function () {
        if(+new Date() - start<500){
            return false;
        }
        start = +new Date();
        clearInterval(timmer);
        $(".slide-box-new .swiper-wrapper").stop();
        cloneAfterHtml();
        timmer =setInterval(function () {
            cloneAfterHtml();
        },5000)
    });

    $(".btnRight").on("click",function () {
        if(+new Date() - start<500){
            return false;
        }
        start = +new Date();
        clearInterval(timmer);
        $(".slide-box-new .swiper-wrapper").stop();
        clonePreHtml();
        timmer =setInterval(function () {
            clonePreHtml();
        },5000)
    });
    
}

function navAnim(){
    $(".nav-list").on("mouseover",function () {
        var height = $(this).find(".fix-height").height();
        $(this).find(".child-box").height(height);
    }).on("mouseout",function () {
        $(this).find(".child-box").height(0);
    });
}



function tabContHover(){
    $(".tabs-cont li").on("mouseover",function () {
        $(this).addClass("act").siblings().removeClass("act");

    });
    $(".tabs-list").on("mouseover",function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
}


function isShowTop(){
    $(window).scroll(function(){
        if($(document).scrollTop()>=10){
            $(".top-box").show();
        }else {
            $(".top-box").hide();
        }
    });
    $(".top-box .top").on("click",function () {
        $("html").animate({"scrollTop":0},300);
    });
}





$(function () {
    navAnim();
    slider();
    // isShowToolbar();
    tabContHover();
    isShowTop();
})