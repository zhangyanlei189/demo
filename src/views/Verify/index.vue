<template>
    <div id="verify">
        <div class="tip">正在提现，预计2天左右到账</div>
        <div class="time">提现时间：2019.05.10 14:32</div>
        <div class="bg-image"></div>
        <div class="btn-box">
            <button>确认</button>
        </div>
    </div>
</template>

<script>

    export default {
        name: "verify"
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