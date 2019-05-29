<template>
    <div id="callet">
        <div class="top">
            <h2>Hi! {{data.nickname}}</h2>
            <div class="callet-info clearfix">
                <div class="left-box clearfix">
                    <div class="balance-tip fl">当前余额</div>
                    <router-link to="/cashrecord" tag="div" class="cash-his fr">提现记录</router-link>
                </div>
                <div class="right-box clearfix">
                    <div class="money fl">￥{{data.cash}}</div>
                    <div class="deal-box fr">
                        <span v-if="data.status == 2">抱歉，您无法提现，详情请咨询客服。</span>
                        <router-link to="/cash" tag="button" v-else>提现</router-link>
                    </div>
                </div>
                <div class="total">
                    <router-link to="/rewardrecord" tag="div">累计奖励：￥{{data.countcash}}</router-link>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="bottom">
            <div class="btns">
                <router-link to="/upload" tag="button" class="upload">上传截图</router-link>
                <router-link to="/authstatus" tag="button" class="show">查看审核状态</router-link>
            </div>
            <div class="intro-box">
                <Intro></Intro>
            </div>
        </div>
    </div>
</template>

<script>
    import Intro from '@/components/Intro'
    export default {
        name: "wallet",
        components:{
            Intro
        },
        data(){
          return {
              data:{}
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
                        // vm.$indicator.close();
                        let data = res.data;
                        if(data.code == 1){
                            vm.data = data.data;
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
    #callet{
        width: 100%;
        height: 100%;
        background: #fff;
    }
    .top{
        box-sizing: border-box;
        width: 100%;
        height: 2.49rem;
        padding: 0.15rem;
        background: #fff;
        h2{
            font-size: 0.24rem;
            color: #333;
            text-align: left;
        }
        .callet-info{
            box-sizing: border-box;
            padding: 0.15rem 0.1rem;
            margin-top: 0.2rem;
            width: 100%;
            height: 1.6rem;
            background: url("/images/image_card.png") no-repeat;
            background-size: cover;
            .left-box{
                text-align: left;
                color: #fff;
                .balance-tip{
                    font-size: 0.14rem;
                }
                .cash-his{
                    font-size: 0.14rem;
                }
            }
            .right-box{
                text-align: right;
                color: #fff;
                .money{
                    margin-top: 0.24rem;
                    font-size: 0.2rem;
                }
                .deal-box{
                    margin-top: 0.23rem;
                    span{
                        padding-top: 0.06rem;
                        display: block;
                        font-size: 0.11rem;
                    }
                    button{
                        width: 0.7rem;
                        height: 0.27rem;
                        line-height: 0.27rem;
                        text-align: center;
                        border: none;
                        color: #55B8FA;
                        background: #fff;
                        border-radius: 3px;
                    }
                }

            }
            .total{
                font-size: 0.14rem;
                margin-top: 0.14rem;
                border-top: 1px solid #fff;
                padding: 0.15rem 0;
                text-align: left;
                color: #fff;
            }
        }
    }
    .line{
        height: 0.2rem;
        background: #F2F2F2;
    }
    .bottom{
        padding-top: 0.25rem;
        .btns{
            button{
                margin: 0 auto;
                display: block;
                width: 3.35rem;
                height: 0.35rem;
                border-radius: 6px;
                border:none;
            }
            .upload{
                background: #6AA7FF;
                color: #fff;
            }
            .show{
                margin-top: 0.25rem;
                background: #fff;
                border: 1px solid #6AA7FF;
                color: #6AA7FF;
            }
        }

    }
    .intro-box{
        width: 3.35rem;
        margin: 0 auto;
    }
</style>