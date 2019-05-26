<template>
    <div id="verify">
        <div class="tip">上传截图正在审核中，请耐心等待</div>
        <div class="time">上传时间：{{time}}</div>
        <div class="bg-image"></div>
        <div class="btn-box">
            <router-link to="/wallet" tag="button">确认</router-link>
        </div>
        <div class="info-box">
            <Intro></Intro>
        </div>
    </div>
</template>

<script>
    import Intro from '@/components/Intro'
    export default {
        name: "auth",
        components:{
            Intro
        },
        data(){
          return {
              time:''
          }
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
        margin:0.62rem auto 0;
        background: url("/images/icon_shenhe.png") no-repeat;
        width: 1rem;
        height: 1rem;
        background-size: cover;
    }
    .btn-box{
        margin-top: 1rem;
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
    .info-box{
        display: block;
        width: 3.35rem;
        margin: 0 auto;
    }

</style>