<template>
    <span class="iconfont icon-search"></span>
    <input type="text" class="head-search" placeholder="山姆会员商店优惠商品" />
</template>

<script>
export default {
    name: "Search",
}
</script>

<style lang="scss" scoped>
.icon-search {
    color: #b7b7b7;
    font-size: 4.8vw;
    position: absolute;
    top: 16.2267vw;
    left: 9.0667vw
}


.head-search{
        width: 90.4vw;
        height: 8.5333vw;
        background: #f5f5f5;
        border-radius: 4.2668vw;
        padding-left: 11.7333vw;
        &::placeholder{
            font-family: PingFangSC-Regular;
            font-size: 3.7333vw;
            color: #b7b7b7;
            line-height: 4.2667vw;
        }
    }
</style>