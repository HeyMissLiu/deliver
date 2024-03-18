<template>
	<div class="cart-item">
		<div class="title">{{ shop.title }}</div>
		<div v-for="item of shop.products.slice(0, 2)" :key="item.id" class="cart-info clearfix">
			<img :src="item.img" alt="" class="fl product-img" />
			<div class="product-name fl">{{ item.title }}</div>
			<div class="product-data fl clearfix">
				<div class="left fl">
					<span class="price">{{ item.currentPrice }}</span>
					<span class="compute-type"> × </span>
					<span class="count">{{ item.productCount }}</span>
				</div>
				<div class="right flr">
					<span class="total">{{ (item.currentPrice * item.productCount).toFixed(2) }}</span>
				</div>
			</div>
		</div>
		<div v-show="!isShowMore" v-for="(item, index) of shop.products.slice(2)" :key="item.id" class="cart-info clearfix">
			<img :src="item.img" alt="" class="fl product-img" />
			<div class="product-name fl">{{ item.title }}</div>
			<div class="product-data fl clearfix">
				<div class="left fl">
					<span class="price">{{ item.currentPrice }}</span>
					<span class="compute-type"> × </span>
					<span class="count">{{ item.productCount }}</span>
				</div>
				<div class="right flr">
					<span class="total">{{ (item.currentPrice * item.productCount).toFixed(2) }}</span>
				</div>
			</div>
		</div>
		<div class="more" @click="handleShowMoreClick" v-show="shop.products.length >= 3 && isShowMore">
			共计 {{ shop.products.length }} 件 <span class="iconfont icon-arrow-down"></span>
		</div>
	</div>
</template>

<script>
import { ref, toRefs } from "vue";
export default (await import ('vue')).defineComponent({
	name: "CartItem",
	props: {
		shop: {
			type: Object,
			default: () => ({}),
		},
	},
	setup(props) {
		const { shop } = toRefs(props);
		shop.value.products = shop.value.products.filter(item => {
			return item.checked === true
		})	
		// 是否显示更多
		const isShowMore = ref(true);
		// 点击更多按钮, 显示更多
		const handleShowMoreClick = () => {
			isShowMore.value = false;
		};
		return {
			isShowMore,
			handleShowMoreClick,
			shop,
		};
	},
});
</script>

<style lang="scss" scoped>
.cart-item {
	width: 90.4vw;
	background: #ffffff;
	border-radius: 1.0667vw;
	margin: 0 auto 4.2667vw;
	padding: 4.2667vw;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.title {
		font-family: PingFangSC-Medium;
		font-weight: 500;
		font-size: 4.2667vw;
		color: #333333;
		margin-bottom: 4.2667vw;
	}
	.cart-info {
		margin-bottom: 4.2667vw;
		&:last-child {
			margin-bottom: 0;
		}
		.product-img {
			width: 12.2667vw;
			height: 12.2667vw;
			margin-right: 4.2667vw;
		}
		.product-name {
			line-height: 1.4;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			font-size: 3.7333vw;
			color: #333333;
			width: calc(100% - 16.5333vw);
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-bottom: 1.6vw;
		}
		.product-data {
			font-family: PingFangSC-Regular;
			font-size: 3.7333vw;
			color: #e93b3b;
			line-height: 5.3333vw;
			width: calc(100% - 16.5333vw);
			.left {
				.price {
					&::before {
						content: "¥";
						display: inline-block;
						transform: scale(0.8);
						transform-origin: right bottom;
					}
				}
			}
			.right {
				.total {
					color: #000;
					&::before {
						content: "¥";
						display: inline-block;
						transform: scale(0.8);
						transform-origin: right bottom;
					}
				}
			}
		}
	}
	.more {
		width: 81.8667vw;
		height: 7.4667vw;
		background: #f5f5f5;
		font-family: PingFangSC-Light;
		font-size: 3.7333vw;
		color: #999999;
		text-align: center;
		line-height: 6.6667vw;
		.iconfont {
			margin-left: 2.1333vw;
			display: inline-block;
			transform: translateY(0.5333vw);
			font-size: 5.3333vw;
		}
	}
}
</style>