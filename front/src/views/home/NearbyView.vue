<template>
    <div class="nearby">
        <div class="title">附近店铺</div>
        <router-link :to="`/shop/${item.id}`" v-for="item in nearbyItems" :key="item.id" >
            <ShopInfo :item="item" :showBorder="true" v-if="item.logo"/>
        </router-link>
    </div>
    <Toast v-if="isShowToast" :message="toastMessage" />
</template>

<script>
import { onMounted, ref } from 'vue';
import Toast, { showToastEffect } from "../../components/Toast.vue"
import { get } from "../../utils/request";
import ShopInfo from '../../components/ShopInfo.vue'
//封装获取数据逻辑代码
const getNearbyItemsEffect = (showToast) => {
    //定义一个响应式数据，存储商家数据
    const nearbyItems = ref([]);
    //异步获取数据
    const getNearbyItems = async () => {
        try {
            const res = await get("/shop/hot-list")
            //根据错误码判断结果
            if (res.errno !== 0) {
                showToast("数据获取失败！");
                return;
            }
            nearbyItems.value = res.data;
        } catch (error) {
            showToast("获取数据失败！")
        }
    }
    return {
        nearbyItems,
        getNearbyItems,
    }
}

//

export default {
    name: "Nearby",
    components: {
        Toast,
        ShopInfo,
    },
    setup() {
        const { isShowToast, toastMessage, showToast } = showToastEffect();
        const { nearbyItems, getNearbyItems } = getNearbyItemsEffect(showToast);
        onMounted(() => {
            getNearbyItems();
        });
        return {
            isShowToast,
            toastMessage,
            showToast,
            nearbyItems
        }
    }
}
</script>

<style lang="scss" scoped>
.nearby {
    padding: 4.2667vw 4.8vw 17.3333vw;
    .title {
        font-family: PingFangSC-Medium;
        font-size: 4.8vw;
        color: #333333;
        font-weight: 500;
        margin-bottom: 3.7333vw;
    }
}
</style>