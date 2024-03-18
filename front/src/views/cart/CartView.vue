<template>
    <div class="container">
        <div class="head">
            <span class="iconfont"></span>
            <span class="title">我的全部购物车（{{ total }}）</span>
            <span class="button"></span>
        </div>
        <div class="cart-list">
            <CartItem v-for="item of cartData" :key="item.id" :shop="item" @click="toshop(item.id)" />
        </div>
    </div>
    <Tabber tag="cart" />
    <Toast v-if="isShowToast" :message="toastMessage" />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Tabber from '@/components/Tabber.vue'
import Toast, { showToastEffect } from "@/components/Toast.vue"
import CartItem from '@/components/CartItem.vue'
export default (await import('vue')).defineComponent({
    name: "Cart",
    components: {
        Tabber,
        CartItem,
        Toast,
    },
    setup() {
        const router = useRouter();
        //获取弹窗数据
        const { showToast, isShowToast, toastMessage } = showToastEffect();
        //从 vuex 中获取数据
        const store = useStore();
        const cartData = computed(() => store.state.cartData);
        const total = computed(() => {
            let total = 0;
            if (cartData.value.length === 0) {
                showToast("购物车中没有商品");
            }
            else (
                cartData.value.forEach((product) => {
                    product.products.forEach((item) => {
                        total += item.productCount;
                    })
                })
            );
            return total
        });
        //返回商店
        const toshop = (shopId) => {
            router.push(`/shop/${shopId}`)
        }
        return {
            cartData,
            total,
            isShowToast,
            toastMessage,
            toshop,
        };
    }
})
</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #f8f8f8;
    @import "../../style/head-common.scss";
    @import "../../style/cart-list-common.scss";
}
</style>