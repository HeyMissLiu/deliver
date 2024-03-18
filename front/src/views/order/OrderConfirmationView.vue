<template>
    <div class="container">
        <div class="head">
            <span class="iconfont icon-left" @click="handleBackClick"></span>
            <span class="title">确认订单</span>
        </div>
        <div class="address">
            <div class="left">
                <div class="title">收货地址</div>
                <div class="order-address">{{ address.city }} {{ address.community }} {{ address.building }}</div>
                <div class="user-info">
                    <span class="username">{{ address.receiveName }}</span>
                    <span class="user-phone">{{ address.phone }}</span>
                </div>
            </div>
            <div class="right">
                <span class="iconfont icon-right"></span>
            </div>
        </div>
        <div class="cart-list">
            <CartItem :shop="shop" />
        </div>
        <div class="foot">
            <div class="left">
                <span class="left-title">实付金额</span>
                <span class="left-price">¥{{ totalPrice }}</span>
            </div>
            <div class="right" @click="submitOrder">提交订单</div>
        </div>
    </div>
    <div class="confirm-mask" v-show="isShowConfirmMask" @click.self="cancelOrder">
        <div class="modal">
            <div class="modal-title">确认要离开收银台？</div>
            <div class="modal-content">请尽快完成支付，否则将被取消</div>
            <div class="modal-buttons">
                <div class="modal-button cancel" @click="cancelOrder">取消订单</div>
                <div class="modal-button confirm" @click="confirmPayment">确认支付</div>
            </div>
        </div>
    </div>
    <div class="remind-mask" v-show="isShowRemindMask" @click.self="paymentEnd">
        <div class="modal">
            <span class="iconfont icon-wrong-b" @click="paymentEnd"></span>
            <span class="iconfont icon-correct"></span>
            <p class="content">支付成功，等待配送</p>
        </div>
    </div>
    <div class="remind-mask" v-show="isShowCancelMask" @click.self="paymentEnd">
        <div class="modal">
            <span class="iconfont icon-wrong-b" @click="paymentEnd"></span>
            <span class="iconfont icon-correct"></span>
            <p class="content">订单已取消</p>
        </div>
    </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { computed, ref, onMounted } from "vue";
import store from "../../store/index"
import CartItem from "../../components/CartItem.vue"
import { post, get } from "@/utils/request"
export default (await import('vue')).defineComponent({
    name: "OrderConfirmation",
    components: {
        CartItem,
    },
    setup() {
        //获取路由参数
        const route = useRoute();
        //获取路由
        const router = useRouter();
        //从路由参数中获取商铺id
        const shopId = route.params.id;
        //定义是否显示弹窗
        const isShowConfirmMask = ref(false);
        //判断是否取消了订单
        const isCanceled = ref(false);
        const isShowRemindMask = ref(false);
        const isShowCancelMask = ref(false);
        //定义地址信息
        const address = ref({});
        //获取用户的默认地址
        const getAddress = async () => {
            //使用 ajax 获取收货地址信息
            const result = await get(`/user/address`);
            //第一个商铺信息为默认
            address.value = result.data[0];
        }
        //挂载到onMounted
        onMounted(() => {
            getAddress();
        })
        //从 vuex 中获取当前商铺信息
        const shop = computed(() => {
            let shopData = store.state.cartData.find((item) => item.id == shopId);
            //如果没有找到，设置默认值
            if (!shopData) {
                shopData = {
                    id: 0,
                    title: "",
                    products: [],
                };
            }
            return shopData;
        });

        //计算总价
        const totalPrice = computed(() => {
            let total = 0;
            shop.value.products.forEach((element => {
                if (element.checked === true && element.productCount !== 0) {
                    total += element.currentPrice * element.productCount;
                }
            }))
            return total.toFixed(2)
        })


        //定义更多按钮点击事件
        const handleShowMoreClick = () => {
            isShowMore.value = false;
        }
        //定义返回上一页点击事件
        const handleBackClick = () => {
            router.back();
        }
        //定义提交订单点击事件
        const submitOrder = () => {
            isShowConfirmMask.value = true;
        }
        //定义取消订单点击事件
        const cancelOrder = async () => {
            //隐藏确认框
            isShowConfirmMask.value = false
            //显示订单取消框
            isShowCancelMask.value = true;
            //标记订单已取消
            isCanceled.value = true;
            const orderData = {
                isCanceled: isCanceled.value,
                address: address.value,
                id: shop.value.id,
                logo: shop.value.logo,
                title: shop.value.title,
                tags: shop.value.tags,
                promotion: shop.value.promotion,
                products: shop.value.products,
                username: address.value.username,
            }
            //提交表单
            const result = await post('/order', orderData);
            try {
                if (result.errno === 0) {
                    //2秒后清空购物车，自动隐藏提示框，并跳转到订单列表页
                    setTimeout(() => {
                        isShowCancelMask.value = false;
                        //获取当前商铺的id
                        const shopId = route.params.id;
                        //清空购物车
                        store.commit("clearCart", { shopId });
                        //跳转到订单列表页
                        router.push("/order-list");
                    }, 2000)
                }
            } catch (errors) {
                console.log(errors);
            }
        }
        //定义确认支付点击事件
        const confirmPayment = async () => {
            isShowRemindMask.value = true;
            isShowConfirmMask.value = false;
            //标记取消订单为false
            isCanceled.value = false;
            //需要提交的表单
            const orderData = {
                isCanceled: isCanceled.value,
                address: address.value,
                id: shop.value.id,
                logo: shop.value.logo,
                title: shop.value.title,
                tags: shop.value.tags,
                promotion: shop.value.promotion,
                products: shop.value.products,
                username: address.value.username,
            }
            //提交表单
            const result = await post('/order', orderData);
            try{
                if (result.errno === 0) {
                    //2秒后清空购物车，自动隐藏提示框，并跳转到订单列表页
                    setTimeout(() => {
                        isShowRemindMask.value = false;
                        //获取当前商铺的id
                        const shopId = route.params.id;
                        //清空购物车
                        store.commit("clearCart", { shopId });
                        //跳转到订单列表页
                        router.push("/order-list")
                    }, 2000)
                }
            }catch(errors){
                console.log(errors);
            }
            
        }
        //定义事件结束
        const paymentEnd = () => {
            isShowRemindMask.value = false;
        }
        return {
            shop,
            totalPrice,
            handleBackClick,
            handleShowMoreClick,
            isShowConfirmMask,
            submitOrder,
            cancelOrder,
            confirmPayment,
            isShowRemindMask,
            isShowCancelMask,
            paymentEnd,
            address,
        }
    }
});
</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
    background-color: #f8f8f8;

    .head {
        width: 100vw;
        height: 42.4vw;
        background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
        padding-top: 10.9333vw;
        text-align: center;

        .title {
            font-family: PingFangSC-Regular;
            font-size: 4.2667vw;
            color: #ffffff;
        }

        .iconfont {
            font-size: 5.3333vw;
            color: #ffffff;
            position: fixed;
            top: 11.4667vw;
            left: 4.9333vw;
        }
    }

    .address {
        width: 90.4vw;
        height: 29.6vw;
        margin: -19.7333vw auto 4.2667vw;
        background: #ffffff;
        border-radius: 1.0667vw;
        padding: 4.2667vw;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
            .title {
                font-family: PingFangSC-Medium;
                font-weight: 500;
                font-size: 4.2667vw;
                color: #333333;
                margin-bottom: 3.7333vw;
            }

            .order-address {
                font-family: PingFangSC-Regular;
                font-size: 3.7333vw;
                color: #333333;
                margin-bottom: 1.6vw;
            }

            .user-info {
                font-family: PingFangSC-Regular;
                font-size: 3.2vw;
                color: #666666;

                .username {
                    margin-right: 1vw;
                }
            }
        }

        .right {
            color: #666;
        }
    }

    @import "../../style/cart-list-common.scss";

    .cart-list {
        top: 56.5333vw;
        padding-top: 0vw;
    }

    @import "../../style/foot-common.scss";
}

.confirm-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);

    .modal {
        text-align: center;
        z-index: 99;
        width: 80.2667vw;
        height: 41.8667vw;
        background: #fff;
        border-radius: 1.0667vw;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 6.4vw;

        .modal-title {
            font-family: PingFangSC-Medium;
            font-weight: 500;
            font-size: 4.8vw;
            color: #333333;
            margin-bottom: 2.1333vw;
        }

        .modal-content {
            font-family: PingFangSC-Regular;
            font-size: 3.7333vw;
            color: #666666;
            margin-bottom: 6.4vw;
        }

        .modal-buttons {
            display: flex;
            justify-content: space-evenly;

            .modal-button {
                border: 0.2667vw solid #4fb0f9;
                border-radius: 4.2667vw;
                font-family: PingFangSC-Regular;
                font-size: 3.7333vw;
                width: 21.3333vw;
                height: 8.5333vw;
                display: flex;
                justify-content: center;
                align-items: center;

                &.cancel {
                    color: #0091ff;
                }

                &.confirm {
                    color: #ffffff;
                    background: #4fb0f9;
                }
            }
        }
    }
}

.remind-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);

    .modal {
        text-align: center;
        z-index: 99;
        width: 80.2667vw;
        height: 41.8667vw;
        background: #fff;
        border-radius: 1.0667vw;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 6.4vw;

        .icon-wrong-b {
            color: #666;
            position: absolute;
            right: 3.2vw;
            top: 3.2vw;
            font-size: 6.4vw;
        }

        .icon-correct {
            display: inline-block;
            font-size: 13.3333vw;
            margin-top: 4.2667vw;
            margin-bottom: 4.2667vw;
        }

        .content {
            font-family: PingFangSC-Medium;
            font-weight: 500;
            font-size: 4.8vw;
            color: #333333;
        }
    }
}
</style>