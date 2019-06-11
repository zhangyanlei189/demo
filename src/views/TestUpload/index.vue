<template>
    <div id="verify">
        <div class="tip">上传<span>当日转发文章截图</span>并过审即可获得1元现金奖励</div>
        <div class="tip font-red">每天只能上传一次截图,多次上传审核不予通过</div>

        <div class="bg-image" @click="wxChooseImg" :style="'background-image: url('+defaultBg+')'"><!--<input type="file" name="imgdata" accept="image/*" @change="selectImg">--></div>
        <div class="btn-box">
            <button @click="toUpload">确认提交</button>
        </div>
        <div class="info-box">
            <Intro></Intro>
        </div>
    </div>
</template>

<script>
    import Intro from '@/components/Intro'
    import wxApi from '@/utils/wxApi'
    import wx from 'weixin-js-sdk';
    export default {
        name: "auth",
        data(){
            return {
                defaultBg:'/images/icon_shangchuan.png',
                file:'',
                wxObj:{},
                serverId:''
            }
        },
        components:{
            Intro
        },
        mounted(){
            let vm = this;
            wxApi.wxRegister(function (wx) {
                vm.wxObj = wx;
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
            this.defaultBg = '/images/icon_shangchuan.png';
            this.file = '';
            this.serverId = '';
        },
        methods:{
            selectImg(e){
                let vm = this;
                let file = e.target.files[0];
                vm.file = file;
                console.log(file);
                console.log('kkkfffhhh');
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    console.log(e.target)
                    vm.defaultBg = e.target.result;
                };
            },

            wxChooseImg(){
                let vm = this;
                console.log(vm.wxObj);
                vm.wxObj.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        console.log(res.localIds[0]);
                        console.log("上传id--------------");
                        if (window.__wxjs_is_wkwebview) {
                            vm.wxObj.getLocalImgData({
                                localId: res.localIds[0], // 图片的localID
                                success: function (r) {
                                    vm.defaultBg = r.localData; // localData是图片的base64数据，可以用img标签显示
                                }
                            });
                        }else {
                            vm.defaultBg = res.localIds[0];
                        }
                        vm.wxObj.uploadImage({
                            localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (obj) {
                                vm.serverId = obj.serverId; // 返回图片的服务器端ID
                            }
                        });
                    }
                });
            },

            toUpload(){
                console.log("start=============================")
                console.log('end-kkkkkkrrrrrr=======================');
                // return false;
                let vm = this;
                let serveid = vm.serverId;
                if(!serveid || serveid == ""){
                    vm.$toast("请选择图片");
                    return false;
                }
                let openid = localStorage.getItem("openid");
                vm.$indicator.open('上传中...');
                vm.axios.post(vm.baseUrl+'laxin/testupload',{imgid:serveid,openid:openid})
                    .then((res)=>{
                        console.log(res);
                        console.log("resssssssssssssssssfffffffffffffff");
                        vm.$indicator.close();
                        let data = res.data;
                        if(data.code == 1){
                            // vm.$toast(data.data.imgurl);
                            vm.serverId = '';
                            vm.defaultBg = '/images/icon_shangchuan.png';
                            vm.$router.push('/auth/'+data.data.time);
                        }else{
                            vm.$toast(data.msg);
                        }
                    })
                    .catch(()=>{
                        vm.$indicator.close();
                        vm.$toast("网络异常,请稍后重试");
                    })
            },

            /*update(e){
                let vm = this;
                let file = vm.file;
                if (typeof file == "undefined" || !file) {
                    vm.$toast("请选择图片");
                    return false;
                }
                let openid = localStorage.getItem("openid");
                let param = new FormData(); //创建form对象
                param.append('imgdata',file,file.name);//通过append向form对象添加数据
                param.append('_token','e3SBpEc2vB88QyLsLV4DKcqUNTca68jzaRToB5j8');//添加form表单中其他数据
                param.append('openid',openid);
                console.log(param.get('imgdata')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };  //添加请求头
                vm.$indicator.open('上传中...');
                vm.axios.post(vm.baseUrl+'laxin/upload',param,config)
                    .then(res=>{
                        vm.$indicator.close();
                        let data = res.data;
                        if(data.code == 1){
                            vm.$router.push('/auth/'+data.data);
                        }else{
                            vm.$toast(data.msg);
                        }
                    })
                    .catch(res=>{
                        vm.$indicator.close();
                        vm.$toast('网络异常，请联系管理员');
                        console.log(res);
                        console.log('err0000');
                    })
            }*/
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
        padding-top: 0.2rem;
    }
    .tip{
        font-size: 0.14rem;
        color: #555;
        text-align: center;
        margin-bottom: 0.14rem;
        span{
            color: #6AA7FF;
        }
        &.font-red{color: red;}
    }
    .time{
        margin-top: 0.15rem;
        text-align: center;
        font-size: 0.14rem;
        color: #9f9f9f;
    }
    .bg-image{
        margin:0.42rem auto 0;
        /*background: url("/images/icon_shangchuan.png") no-repeat;*/
        background-repeat: no-repeat;
        width: 2.1rem;
        height: 2.1rem;
        background-size: contain;
        overflow: hidden;
        object-fit: cover;
        background-position: center center;
        input{
            display: block;
            width: 100%;
            height: 100%;
            background: transparent;
            opacity: 0;
        }
    }
    .btn-box{
        margin-top: 0.5rem;
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
        width: 3.35rem;
        margin: 0 auto;
    }

</style>