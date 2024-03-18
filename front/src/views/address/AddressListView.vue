<template>
    <div class="container">
        <div class="head">
            <span class="iconfont icon-left" @click="backtoUser"></span>
            <span class="title">管理收货地址</span>
            <span class="button" @click="createAddress">新建</span>
        </div>
        <div class="title">我的收货地址</div>
        <div class="address-list">
            <div @click="toEditAddress(item.id)" v-for="item of addressList" :key="item.id" class="address-item">
                <div class="left">
                    <div class="top">
                        <span class="username">{{ item.receiveName }}</span>
                        <span class="phone">{{ item.phone }}</span>
                    </div>
                    <div class="bottom">
                        <p class="address-info">{{ item.city }} {{ item.community }} {{ item.building }}</p>
                    </div>
                </div>
                <div class="right">
                    <span class="iconfont icon-right"></span>
                </div>
            </div>
        </div>
        </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import router from "@/router"
import { get } from "../../utils/request.js"
export default {
    name: "AddressList",
    setup() {
        const addressList = ref([]);
        const getAddressList = async() => {
            //通过 ajax 获取商铺相关的信息
            const result = await get(`/user/address`)
            addressList.value = result.data;
        }
        //挂载到生命周期
        onMounted(() => {
            getAddressList();
        })
        //返回用户页
        const backtoUser = () => {
            router.push("/user")
        }
        //新建地址
        const createAddress = () => {
            router.push("/address-create")
        }
        //跳转到修改地址页面
        const toEditAddress = (id) => {
            router.push(`/address-edit/${id}`)
        };
        return{
            addressList,
            backtoUser,
            createAddress,
            toEditAddress
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
    background-color: #f8f8f8;
    @import "../../style/head-common.scss";

    .title {
        margin: 3.2vw 0;
        padding-left: 4.8vw;
        font-family: PingFangSC-Regular;
        font-size: 3.7333vw;
        color: #333333;
    }

    .address-list {
        .address-item {
            width: 90.4vw;
            height: 27.7333vw;
            background: #ffffff;
            border-radius: 1.0667vw;
            margin: 0 auto 4.2667vw;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 4.2667vw;

            .left {
                .top {
                    margin-bottom: 2.1333vw;
                    font-family: PingFangSC-Regular;
                    font-size: 3.7333vw;
                    color: #999999;

                    .username {
                        margin-right: 17.6vw;
                    }
                }

                .bottom {
                    .address-info {
                        width: 69.3333vw;
                        font-family: PingFangSC-Regular;
                        font-size: 3.7333vw;
                        color: #333333;
                        line-height: 5.8667vw;
                    }
                }
            }

            .right {
                .iconfont {
                    font-size: 4.2667vw;
                    color: #999999;
                }
            }
        }
    }
}
</style>