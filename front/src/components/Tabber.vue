<template>
	<div class="tabbar">
		<div
			@click="tabbarClick(item.path)"
			v-for="(item, index) of tabbarItems"
			:class="{ item: true, active: item.tag === tag }"
			:key="item.icon1"
		>
			<span :class="['one', 'iconfont', item.icon1]"> </span>
			<span :class="['two', 'iconfont', item.icon2]"> </span>
			<span class="text">{{ item.text }}</span>
		</div>
	</div>
</template>
<script>
import router from "@/router";

export default {
	name: "Tabbar",
	props: {
		tag: {
			type: String,
			default: "home",
		},
	},
	setup() {
		const tabbarItems = [
			{ icon1: "icon-home_light", icon2: "icon-home_fill_light", text: "首页", tag: "home", path: "/" },
			{ icon1: "icon-bag", icon2: "icon-bag-fill", text: "购物车", tag: "cart", path: "/cart" },
			{ icon1: "icon-order", icon2: "icon-order-fill", text: "订单", tag: "order", path: "/order-list" },
			{ icon1: "icon-user", icon2: "icon-a-userfill", text: "我的", tag: "user", path: "/user" },
		];
		const tabbarClick = (path) => {
			// 根据path, 跳转到对应的页面
			router.push({ path });
		};
		return {
			tabbarItems,
			tabbarClick, // 点击tabbar图标
		};
	},
};
</script>
<style scoped lang="scss">
.tabbar {
	color: blue;
	position: fixed;
	bottom: 0;
	background: #ffffff;
	box-shadow: 0 -0.2667vw 0.2667vw 0 #f1f1f1;
	width: 100vw;
	height: 13.0667vw;
	display: flex;
	justify-content: space-evenly;
	.item {
		&.active {
			color: #1fa4fc;
			.iconfont {
				&.one {
					display: none;
				}
				&.two {
					display: inline;
				}
			}
		}
		color: #333333;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.iconfont {
			font-size: 5.8667vw;
			margin-bottom: 1.0667vw;
			&.one {
				display: inline;
			}
			&.two {
				display: none;
			}
		}
		.text {
			font-size: 2.6667vw;
		}
	}
}
</style>
