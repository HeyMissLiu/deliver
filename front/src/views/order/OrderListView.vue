<template>
	<div class="container">
		<div class="head">
			<span class="iconfont"></span>
			<span class="title">我的订单</span>
			<span class="button"></span>
		</div>
		<div class="order-list">
			<div v-for="item of orderList" :key="item.id" class="order-item" @click="toshop(item.id)">
				<div class="top">
					<span class="shop-name">{{ item.title }}</span>
					<span class="order-status">{{ item.isCanceled ? "已取消" : "已完成" }}</span>
				</div>
				<div class="bottom">
					<div class="products">
						<img v-for="product of item.products.slice(0, 5)" :key="product.id" :src="product.img" alt=""
							class="product-img" />
					</div>
					<div class="data">
						<div class="price">¥{{ computedTotal(item.products).totalPrice.toFixed(2) }}</div>
						<div class="count">共{{ computedTotal(item.products).totalNumber }}件</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Tabber tag="order" />
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { get } from "../../utils/request.js"
import Tabber from "../../components/Tabber.vue"
export default (await import('vue')).defineComponent({
	name: "OrderList",
	components: {
		Tabber,
	},
	setup() {
		const router = useRouter();

		const orderList = ref([]);
		const getOrderList = async () => {
			const result = await get(`/order`);
			//获取的数据存到响应式数据中
			orderList.value = result.data;
		};
		//挂载
		onMounted(() => {
			getOrderList();
		})
		//计算商品总数和总价
		const computedTotal = (products) => {
			let totalNumber = 0;
			let totalPrice = 0;
			products.forEach((element) => {
				totalNumber += element.productCount;
				totalPrice += element.productCount * element.currentPrice;
			});
			return {
				totalNumber,
				totalPrice
			}
		}
		//进入对应商店
		const toshop = (shopId) => {
			router.push(`/shop/${shopId}`)
		}
		return {
			orderList,
			computedTotal,
			toshop
		}
	}
})
</script>

<style lang="scss" scoped>
.container {
	width: 100vw;
	height: 100vh;
	background-color: #f8f8f8;
	overflow: hidden;
	@import "../../style/head-common.scss";

	.order-list {
		position: fixed;
		top: 11.7333vw;
		right: 0;
		bottom: 13.0667vw;
		left: 0;
		overflow-y: auto;
		padding-top: 4.2667vw;

		.order-item {
			width: 90.4vw;
			height: 29.3333vw;
			background: #ffffff;
			border-radius: 1.0667vw;
			margin: 0 auto 4.2667vw;
			padding: 4.2667vw;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.shop-name {
					font-family: PingFangSC-Medium;
					font-weight: 500;
					font-size: 4.2667vw;
					color: #333333;
				}

				.order-status {
					font-family: PingFangSC-Medium;
					font-weight: 500;
					font-size: 3.7333vw;
					color: #999999;
				}
			}

			.bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.products {
					.product-img {
						width: 10.6667vw;
						height: 10.6667vw;
						margin-right: 3.2vw;
						object-fit: cover;
						transform: translateY(0.5333vw);
					}
				}

				.data {
					.price {
						font-family: PingFangSC-Regular;
						font-size: 3.7333vw;
						color: #e93b3b;
						text-align: right;
						margin-bottom: 1.0667vw;
					}

					.count {
						font-family: PingFangSC-Regular;
						font-size: 3.2vw;
						color: #333333;
						text-align: right;
						line-height: 3.7333vw;
					}
				}
			}
		}
	}
}</style>