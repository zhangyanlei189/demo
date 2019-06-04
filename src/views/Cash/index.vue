<template>
    <div id="cash">
        <form @submit.prevent="onSubmit">
        <div class="page-field-wrapper">
            <div class="page-part">
                <div class="money">
                    <div class="label">提现金额</div>
                    <span>￥</span><input type="text" v-model="data.money">
                    <!--<div class="able">可用余额：￥{{data.cash}}</div>-->
                    <div class="able">提现金额需大于等于￥20.00</div>
                </div>
            </div>
            <div class="page-part">
                <mt-field label="支付宝姓名" placeholder="请输入支付宝姓名" type="input" v-model="data.payname "></mt-field>
                <mt-field label="支付宝账号" placeholder="请输入支付宝账号" type="input" v-model="data.payuser"></mt-field>
            </div>
            <div class="page-part">
                <mt-field label="手机号" placeholder="请输入手机号" type="input" v-model="data.tel"></mt-field>
                <mt-field label="验证码" placeholder="输入验证码" v-model="data.code">
                    <div class="getCode" v-if="canSend" type="button" @click="getCode">{{timeout}}</div>
                    <div class="getCode grey" v-else type="button">{{timeout}}</div>
                </mt-field>
            </div>
            <div class="btn-box">
                <button class="submit">确认提交</button>
            </div>
        </div>
        </form>
        <div class="tip">温馨提示：请确认支付宝已实名认证，并填写真实姓名</div>
    </div>
</template>

<script>
    export default {
        name: "cash",
        data(){
          return {
              data:{
                  money:'',
                  cash:'',
                  payname:'',
                  payuser:'',
                  tel:'',
                  code:''
              },
              btnStatus:false,
              canSend:true,
              timeout:"发送验证码",
              timmer:null
          }
        },
        watch:{
            btnStatus(){

            }
        },
        activated() {
            this.initData();
        },
        methods:{
            initData(){
                let openid = localStorage.getItem("openid");
                console.log('fffffbbbb');
                let vm = this;
                this.axios.get(vm.baseUrl+'laxin/index?openid='+openid)
                    .then(res=>{
                        let data = res.data;
                        if(data.code == 1){
                            vm.data.cash = data.data.cash;
                            vm.data.money = data.data.cash;
                        }else{
                            vm.$toast(data.msg);
                        }
                    })
                    .catch(res=>{
                        vm.$toast('网络异常，请联系管理员');
                        console.log(res);
                        console.log('err0000');
                    })
            },
            set_timeout(){
                let vm = this;
                let time = 60;
                this.canSend = false;
                this.timeout = time;
                vm.timmer = setInterval(function(){
                    time--;
                    if(time==-1){
                        clearInterval(vm.timmer);
                        vm.timeout = "发送验证码";
                        vm.canSend = true;
                        return false;
                    }
                    vm.timeout = time;
                },1000);
            },
            getCode(){
              let phone = this.data.tel;
              if(!/^1[0-9]{10}$/.test(phone)){
                  this.$toast('请填写正确手机号');
                  return false;
              }
                let vm = this;
                this.axios.get(vm.baseUrl+'laxin/sendsms?mobile='+phone,)
                    .then(res=>{
                        let data = res.data;
                        console.log(data);
                        console.log(6789);
                        if(data.code == 1){
                            let instance = vm.$toast(data.msg);
                            setTimeout(() => {
                                vm.set_timeout();
                            }, 2000);
                        }else{
                            vm.$toast(data.msg);
                        }
                    })
                    .catch(res=>{
                        vm.$toast('网络异常，请联系管理员');
                        console.log(res);
                        console.log('err0000');
                    })
            },
            onSubmit(){
                let data = this.data;
                let money = parseFloat(data.money.replace(/,/g,""));
                let cash = parseFloat(data.cash.replace(/,/g,""));
                if(!money || !/^[0-9]+.?[0-9]*$/.test(money) || money>cash){
                    this.$toast("请输入小于可提现金额的数字");
                    return false;
                }
                if(money < 20){
                    this.$toast("提现金额需大于等于￥20");
                    return false;
                }
                if(data.payname.length<1){
                    this.$toast("请填写支付宝姓名");
                    return false;
                }
                if(data.payuser.length<1){
                    this.$toast("请填写支付宝账号");
                    return false;
                }
                if(!/^1[0-9]{10}$/.test(data.tel)){
                    this.$toast("请填写正确的手机号");
                    return false;
                }
                if(!/^[0-9]{4,}$/.test(data.tel)){
                    this.$toast("请填写验证码");
                    return false;
                }

                let openid = localStorage.getItem("openid");
                data.openid = openid;
                let vm = this;
                console.log(data);
                this.axios.post(vm.baseUrl+'laxin/tixian',data)
                    .then(res=>{
                        let data = res.data;
                        if(data.code == 1){
                            let instance = vm.$toast(data.msg);
                            console.log('kkkkk');
                            setTimeout(() => {
                                instance.close();
                                console.log(data.data.create_at);
                                vm.timeout = "发送验证码";
                                vm.canSend = true;
                                vm.timmer = null;
                                vm.$router.push('/verify/'+data.data.created_at);
                            }, 2000);
                        }else{
                            vm.$toast(data.msg);
                        }
                    })
                    .catch(res=>{
                        vm.$toast('网络异常，请联系管理员');
                        console.log(res);
                        console.log('err0000');
                    })

            }
        }
    }
</script>

<style scoped lang="less">
    #cash{
        width: 100%;
        height: 100%;
        background: #F2F2F2;
        box-sizing: border-box;
        padding-top: 0.15rem;
    }
    .page-part{
        margin-bottom: 0.2rem;
        background: #fff;
        padding-left: 20px;
        .money{
            text-align: left;
            padding: 0.12rem 0;
            .label{
                color: #333;
                margin-bottom: 0.12rem;
            }
            span,input{
                display: inline-block;
                vertical-align: middle;
                color: #333;
                font-size: 0.24rem;
                border: none;
                outline: none;
            }
            .able{
                margin-top: 0.12rem;
                padding-top: 0.12rem;
                border-top: 1px solid #F2F2F2;
                font-size: 0.12rem;
                color: red;
            }
        }
        .getCode{
            outline: none;
            border: none;
            height: 0.27rem;
            line-height: 0.27rem;
            width: 0.7rem;
            text-align: center;
            background: #6AA7FF;
            color: #fff;
            font-size: 0.12rem;
            border-radius: 3px;
            &.grey{
                background: #9F9F9F;
            }
        }
    }
    .btn-box{
        margin-top: 0.25rem;
        button{
            display: block;
            margin: 0 auto;
            background: #9F9F9F;
            border-radius: 7px;
            color: #fff;
            width: 3.35rem;
            height:0.35rem;
            background: #6AA7FF;

        }
    }
    .tip{
        padding-left: 20px;
        margin-top: 0.25rem;
        text-align: left;
        font-size: 0.12rem;
        color: #757575;
    }
</style>