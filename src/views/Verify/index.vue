<template>
    <div id="verify">
        <div class="tip">正在提现，预计2天左右到账</div>
        <div class="time">提现时间：{{time}}</div>
        <div class="bg-image"></div>
        <div class="btn-box">
            <router-link to="/wallet" tag="button">确认</router-link>
        </div>
    </div>
</template>

<script>
    import wxApi from '@/utils/wxApi'
    export default {
        name: "verify",
        data(){
            return {
                time:''
            }
        },
        mounted(){
            wxApi.wxRegister(function (wx) {
                // 微信分享到朋友圈
                wx.onMenuShareTimeline({
                    title: '打卡活动 | 钱包', // 分享标题
                    link: 'http://laxin.xingcheshixian.com/', // 分享链接
                    imgUrl: 'http://laxin.xingcheshixian.com/images/xcsx_logo.jpg', // 分享图标
                    success: function (res) {
                        console.log(res)
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                // 微信分享给朋友
                wx.onMenuShareAppMessage({
                    title: '打卡活动 | 钱包', // 分享标题
                    desc: '转发行车视线公众号内容，每天都有现金拿！', // 分享描述
                    link: 'http://laxin.xingcheshixian.com/', // 分享链接
                    imgUrl: 'http://laxin.xingcheshixian.com/images/xcsx_logo.jpg', // 分享图标
                    success: function () {
                    },
                    cancel: function () {
                    }
                });
            });
        },
        activated() {
            this.time = this.$route.params.id;
        }
    }
</script>

<style scoped lang="less">
    .bg-image(@url) {
        background-image: url('/images/@{url}@2x.png');
        @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
            background-image: url('/images/@{url}@3x.png');
        }
    }
    #verify{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 0.4rem;
    }
    .tip{
        font-size: 0.16rem;
        color: #555;
        text-align: center;
    }
    .time{
        margin-top: 0.15rem;
        text-align: center;
        font-size: 0.14rem;
        color: #9f9f9f;
    }
    .bg-image{
        margin:0.81rem auto 0;
        background: url("/images/icon_tixian.png") no-repeat;
        width: 0.9rem;
        height: 0.76rem;
        background-size: cover;
    }
    .btn-box{
        margin-top: 1.12rem;
        button{
            display: block;
            margin: 0 auto;
            width: 3.35rem;
            height: 0.35rem;
            text-align: center;
            color: #fff;
            font-size: 0.14rem;
            margin: 0 auto;
            background: #6AA7FF;
            border-radius: 7px;
        }
    }

</style>