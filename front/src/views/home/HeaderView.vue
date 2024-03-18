<template>
    <div class="head">
        <div class="head-info">
            <div class="left">
                <span class="iconfont icon-location"></span>
                <span class="address">北京理工大学国防科技园2号楼10层</span>
            </div>
            <span class="iconfont icon-notice"></span>
        </div>
        <Search />
    </div>
</template>

<script>
import Search from "./SearchView.vue"
export default {
    name: "Header",
    components: {
        Search,
    }
}
</script>

<style lang="scss" scoped>
    .head {
    background-color: #fff;
    position: fixed;
    height: 26.1333vw;
    width: 100%;
    padding: 4.2667vw 4.8vw 3.2vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .head-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
            .iconfont {
                margin-right: 2.4vw;
                font-size: 5.8667vw;
                &.icon-location {
                    color: #333333;
                }
            }
            .address {
                font-family: PingFangSC-Regular;
                font-size: 4.2667vw;
                color: #333333;
            }
        }
        .iconfont {
            font-size: 5.8667vw;
            &.icon-notice{
                color: #000;
            }
        }
    }
    .icon-search{
        color: #b7b7b7;
        font-size:4.8vw;
        position:absolute;
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
}
</style>