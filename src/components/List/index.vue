<template>
        <div class="list clearfix">
            <div class="left-box fl">
                <h2>{{itemObj.title}}</h2>
                <div class="intro">{{itemObj.intro}}</div>
            </div>
            <div class="right-box fr">
                <h2 :class="itemObj.status==1?'blue':itemObj.status==2?'grey':'red'">{{itemObj.val}}</h2>
                <div class="val-info">{{itemObj.valInfo}}</div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "index",
        props:{
            'itemObj':Object
        }
    }
</script>

<style scoped lang="less">
    .content{
        padding: 20px;
    }
    .list{
        padding: 0.12rem 0 0.1rem 0;
        border-bottom: 1px solid #F2F2F2;
        .left-box{
            text-align: left;
            h2{
                font-size: 0.16rem;
                color: #333333;
                font-weight: bold;
                margin-bottom: 0.07rem;
            }
            .intro{
                font-size: 0.12rem;
                color: #9f9f9f;
            }
        }
        .right-box{
            text-align: right;
            h2{
                font-size: 0.16rem;
                font-weight: bold;
                margin-bottom: 0.07rem;
                &.red{
                    color:  #FF9393;
                }
                &.blue{
                    color: #4A90E2;
                }
                &.grey{
                    color: #949494;
                }
            }
            .val-info{
                font-size: 0.12rem;
                color: #9f9f9f;
            }
        }
    }
</style>