<template>
    <div class="record">
        <List v-for="itemObj in items" :itemObj="itemObj"></List>
    </div>
</template>

<script>
    import List from '@/components/List'
    export default {
        name: "record",
        components:{
            List
        },
        data(){
            /**
             *  status:1蓝色-通过  ,status:2 灰色 ,status:3  红色
             */
            return {
                items: [
                    /*{
                        title:'上传截图',
                        intro:'2019.05.10 10:42',
                        val:'审核通过',
                        valInfo:'',
                        status:'1'
                    },
                    {
                        title:'上传截图',
                        intro:'2019.05.10 10:42',
                        val:'待审核',
                        valInfo:'预计2个工作日内完成审核',
                        status:'2'
                    },
                    {
                        title:'上传截图',
                        intro:'2019.05.10 10:42',
                        val:'待审核',
                        valInfo:'预计2个工作日内完成审核',
                        status:'3'
                    }*/
                ]
            }
        },
        activated(){
            let router = this.$route;
            this.initData(router.name);
            console.log(router);
            console.log(123456789)
        },
        methods:{
            initData(param){
                let _url = "",vm = this;
                if(param == "authstatus"){
                    _url = "orderlist?";
                }else if (param == "cashrecord"){
                    _url = "payinfo?"
                } else {
                    _url = "orderlist?type=2&";
                }
                let openid = localStorage.getItem("openid");
                this.axios.get(vm.baseUrl+"laxin/"+_url+"openid="+openid)
                    .then((res) => {
                        console.log(res);
                        console.log("dddmmm");
                        if(res.data.code == 1){
                            console.log(res.data.data);
                            if(param == 'authstatus'){
                                //status:1蓝色-通过  ,status:2 灰色-待审 ,status:3  红色-拒绝
                                vm.items = res.data.data.map((item)=>{
                                    if(item.status == 1){   //1 待审   2、通过    3、拒绝
                                        item.status = 2;
                                        item.val = "待审核";
                                    }else if (item.status == 2) {
                                        item.status = 1;
                                        item.val = "审核通过";
                                    }else {
                                        item.val = "审核失败";
                                    }
                                    item.title = item.type;
                                    item.intro = item.created_at;
                                    item.valInfo = item.reason?item.reason:"";
                                    return item;
                                });
                            } else if (param == 'cashrecord'){
                                vm.items = res.data.data.map((item)=> {
                                    item.status = 1;
                                    if(item.status == 1){   //1 待审   2、通过    3、拒绝
                                        item.status = 2;
                                        item.val = "提现中";
                                    }else if (item.status == 2) {
                                        item.status = 1;
                                        item.val = "已到账";
                                    }else {
                                        item.val = "提现失败";
                                    }
                                    item.title ="￥"+ item.money;
                                    item.intro = item.created_at;
                                    item.valInfo = item.desc?item.desc:"";
                                    return item;
                                });
                            } else {
                                vm.items = res.data.data.map((item)=> {
                                    item.status = 1;
                                    item.val = "￥"+ item.money;
                                    item.title = item.type;
                                    item.intro = item.created_at;
                                    item.valInfo = item.desc?item.desc:"";
                                    return item;
                                });
                            }
                        }else {
                            vm.$toast(data.msg);
                        }
                    }).catch((res)=>{
                    vm.$toast('网络异常，请联系管理员');
                    console.log('err000')
                    console.log(res);
                });
            }
        },
        beforeRouteEnter(to,from,next){
            console.log(to);
            console.log(from);
            console.log(next);
            next();
        }
    }
</script>

<style scoped>
    .record{
        padding: 0.2rem;
    }
</style>