<template>
    <div class="container">
        <div class="head">
            <span class="iconfont icon-user-edit"></span>
        </div>
        <div class="info">
            <img src="../../assets/img/head-img.jpg" alt="" class="head-img" />
            <h1 class="user-title">热心市民李先生</h1>
            <span class="tag">16</span>
            <p class="user-id">ID: 1069643013</p>
            <div class="gap"></div>
            <div class="user-data">
                <div class="item">
                    <span class="text">红包</span>
                    <span class="count">218</span>
                </div>
                <div class="item">
                    <span class="text">优惠券</span>
                    <span class="count">12张</span>
                </div>
                <div class="item">
                    <span class="text">鲜豆</span>
                    <span class="count">88</span>
                </div>
                <div class="item">
                    <span class="text">白条</span>
                    <span class="count">1000</span>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="item">
                <div class="left">
                    <span class="iconfont icon-rmb"></span>
                    <span class="text">我的钱包</span>
                </div>
                <div class="right">
                    <span class="iconfont icon-right"></span>
                </div>
            </div>
            <div class="item" @click="toAddressList">
                <div class="left">
                    <span class="iconfont icon-locationfill"></span>
                    <span class="text">我的地址</span>
                </div>
                <div class="right">
                    <span class="iconfont icon-right"></span>
                </div>
            </div>
            <div class="item">
                <div class="left">
                    <span class="iconfont icon-icon_users"></span>
                    <span class="text">客服与帮助</span>
                </div>
                <div class="right">
                    <span class="iconfont icon-right"></span>
                </div>
            </div>
        </div>
    </div>
    <Tabber tag="user" />
</template>

<script>
import { computed, mounted } from "vue";
import router from "../../router/index.js"
import Tabber from "../../components/Tabber";
export default (await import('vue')).defineComponent({
    name: "User",
    components: {
        Tabber,
    },
    setup(){
        const toAddressList = () => {
            //路由跳转
            router.push("/address-list");
        }
        return{
            toAddressList,
        }
    }
});
</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
    background: #ffffff;

    .head {
        height: 66.6667vw;
        background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
        border-bottom-right-radius: 100% 60%;
        border-bottom-left-radius: 100% 60%;

        .iconfont {
            color: #fff;
            font-size: 6.4vw;
            position: fixed;
            right: 5.6vw;
            top: 13.6vw;
        }
    }

    .info {
        width: 90.4vw;
        height: 54.1333vw;
        position: fixed;
        top: 28.8vw;
        left: 50%;
        transform: translateX(-50%);
        background: #ffffff;
        box-shadow: 0 2.1333vw 4.2667vw 0 rgba(0, 0, 0, 0.08);
        border-radius: 2.1333vw;
        text-align: center;

        .head-img {
            width: 25.0667vw;
            height: 25.0667vw;
            border-radius: 50%;
            margin-top: -12.5333vw;
            margin-bottom: 2vw;
        }

        .user-title {
            font-size: 6.4vw;
            color: #262628;
            letter-spacing: 0.0507vw;
            text-align: center;
            line-height: 9.6vw;
            font-weight: normal;
            margin-bottom: 0.5333vw;
            margin-top: 0;
        }

        .tag {
            line-height: 4vw;
            display: inline-block;
            width: 9.3333vw;
            height: 4vw;
            position: absolute;
            right: 9.8667vw;
            top: 18.6667vw;
            background-image: url(../../assets/img/tag.png);
            background-size: contain;
            padding-right: 2.1333vw;
            font-size: 2.6667vw;
            color: #ffffff;
            letter-spacing: -0.096vw;
            text-align: right;
        }

        .user-id {
            font-size: 3.7333vw;
            color: #c1c0c9;
            text-align: center;
            margin-bottom: 3.2vw;
        }

        .gap {
            width: 100%;
            height: 0.2667vw;
            background: #f1f1f1;
            margin-bottom: 3.2vw;
        }

        .user-data {
            display: flex;
            justify-content: space-evenly;

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;

                .text {
                    font-size: 3.2vw;
                    color: #c1c0c9;
                    text-align: center;
                    margin-bottom: 0.8vw;
                }

                .count {
                    padding-top: 1vw;
                    font-size: 5.3333vw;
                    color: #262628;
                    text-align: center;
                }
            }
        }
    }

    .list {
        width: 90.4vw;
        height: 38.9333vw;
        position: fixed;
        top: 87.2vw;
        background: #ffffff;
        box-shadow: 0 2.1333vw 4.2667vw 0 rgba(0, 0, 0, 0.08);
        border-radius: 2.1333vw;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 4.2667vw;
        padding-right: 4.2667vw;

        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left {
                .iconfont {
                    font-size: 3.7333vw;
                    display: inline-block;
                    color: #fff;
                    border-radius: 2.1333vw;
                    width: 5.8667vw;
                    height: 5.8667vw;
                    line-height: 5.8667vw;
                    text-align: center;
                    margin-right: 2.1333vw;

                    &.icon-rmb {
                        background: #ed4a47;
                    }

                    &.icon-locationfill {
                        background: #32c5ff;
                    }

                    &.icon-icon_users {
                        background: rgba(144, 19, 254, 0.92);
                    }
                }

                .text {
                    font-size: 3.7333vw;
                    color: #262626;
                }
            }

            .right {
                .iconfont {
                    color: #c2c4ca;
                    font-size: 3.2vw;
                }
            }
        }
    }
}</style>