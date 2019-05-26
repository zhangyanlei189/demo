<template>
    <div class="desc">
        <div class="spart-line">活动说明</div>
        <div class="intro">
            <p>1.转发行车视线公众号当日文章至朋友圈；（保留3个小时以上且不设分组）</p>
            <p>2.上传当日转发截图并通过审核，即可获得1元奖励；（截图反馈截止至次日24:00）</p>
            <p>3.邀请1好友进群参与活动，即可赢8.88元现金奖；（被邀好友连续完成打卡5天）</p>
            <p>4.奖励可在“我的钱包”进行查看、提现；</p>
            <p>5.客服微信：nihuiyizhi666。</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="less">
    .spart-line{
        font-size: 0.16rem;
        color: #7c7c7c;
        margin-top: 0.3rem;
        &:before,&:after{
                       content: "";
                       height: 1px;
                       width: 1.2rem;
                       background: #D8D8D8;
                       display: inline-block;
                       vertical-align: middle;
                   }
        &:before{margin-right: 0.12rem;}
        &:after{margin-left: 0.12rem;}
    }
    .intro{
        margin-top: 0.15rem;
        padding: 0 0.2rem;
    p{
        font-size: 0.12rem;
        color: #757575;
        line-height: 2em;
        text-align: left;
    }
    }
</style>