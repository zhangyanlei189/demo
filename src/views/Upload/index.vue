<template>
    <div id="verify">
        <div class="tip">上传<span>当日转发文章截图</span>并过审即可获得1元现金奖励</div>
        <div class="bg-image" :style="'background-image: url('+defaultBg+')'"><input type="file" name="imgdata" accept="image/png,image/gif,image/jpeg" @change="selectImg"></div>
        <div class="btn-box">
            <button @click="update">确认提交</button>
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
        data(){
            return {
                defaultBg:'/images/icon_shangchuan.png',
                file:''
            }
        },
        components:{
            Intro
        },
        activated() {
            this.defaultBg = '/images/icon_shangchuan.png';
            this.file = '';
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
            update(e){
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
                vm.axios.post(vm.baseUrl+'laxin/upload',param,config)
                    .then(res=>{
                        let data = res.data;
                        if(data.code == 1){
                            vm.$router.push('/auth/'+data.data);
                        }else{
                            vm.$toast(data.msg);
                        }
                    })
                    .catch(res=>{
                        console.log(res);
                        console.log('err0000');
                    })
            }
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
        span{
            color: #6AA7FF;
        }
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