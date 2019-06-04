//轮播图
function slider(){
    var mySwiper = new Swiper ('.slide-box-top', {
        loop: true,
        autoplay : 3000,
        autoplayDisableOnInteraction : false,
        pagination: '.pagination',
        paginationClickable: true,
        centeredSlides: true,
        slidesPerView: 3,
        watchActiveIndex: true
    });
    var mySwiper = new Swiper ('.slide-box-new', {
        loop: true,
        autoplayDisableOnInteraction : false,
        centeredSlides: true,
        slidesPerView: 3,
        watchActiveIndex: true
    });
    $(".slide-box-new").mouseover(function () {
        $(".swiper-btn",this).show();
        mySwiper.stopAutoplay();
    }).mouseout(function () {
        // $(".swiper-btn",this).hide();
        mySwiper.startAutoplay();
    });
    $('.new-box .btnLeft').on('click', function(e){
        e.preventDefault()
        mySwiper.stopAutoplay();
        mySwiper.swipePrev();
        mySwiper.startAutoplay();
    })
    $('.new-box .btnRight').on('click', function(e){
        e.preventDefault()
        mySwiper.stopAutoplay();
        mySwiper.swipeNext();
        mySwiper.startAutoplay();
    })
}

function isShowToolbar(){
        $(window).scroll(function(){
            if($(document).scrollTop()>=50){
                $(".toolbar").show();
            }else {
                $(".toolbar").hide();
            }
        });
        $(".to-top").on("click",function () {
            $("html").animate({"scrollTop":0},300);
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
    isShowToolbar();
    tabContHover();
    isShowTop();
})