<template>
	<div class="container">
		<div class="head">
			<span @click='handleBackClick' class="iconfont icon-left"></span>
			<span class="iconfont icon-search"></span>
			<input type="text" class="search-input" placeholder="请输入商品名称搜索" />
		</div>
		<div class="shop-container">
			<ShopInfo :item="item" :showBorder="false" />
		</div>
		<div class="shop-body">
			<div class="category">
				<div v-for="item in leftItems" :key="item.id" :tab-name="item.name"
					:class="{ 'category-item': true, 'active': item.name === currentItemName }"
					@click="handleItemClick(item.name)">{{ item.text }}</div>
			</div>
			<div class="detail">
				<div v-for="item in rightItems" :key="item.id" class="detail-item">
					<div class="left">
						<img :src="item.img" alt="" class="product-img" />
					</div>
					<div class="right">
						<div class="product-title">{{ item.title }}</div>
						<div class="product-sale">月售{{ item.sale }}件</div>
						<div class="product-data">
							<div class="data-left">
								<span class="current-price">{{ item.currentPrice }}</span>
								<span class="previous-price">¥{{ item.previousePrice }}</span>
							</div>
							<div class="data-right">
								<span @click="changeProductCount(item.id,-1)" v-show="item.productCount" class="iconfont icon-minus-circle"></span>
								<span v-show="item.productCount" class="product-count">{{ item.productCount }}</span>
								<span @click="changeProductCount(item.id,1)" class="iconfont icon-plus-circle-fill"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="foot">
					<div class="left">
						<span class="dot" v-show="total">{{ total }}</span>
						<img src="../../assets/img/cart.png" @click="cartIconClick" alt="" class="cart-img" />
						<span class="left-title" v-show="JSON.stringify(cartItems) === '[]'">购物车是空的</span>
						<span class="left-title" v-show="JSON.stringify(cartItems) !== '[]'">总计：</span>
						<span class="left-price" v-show="JSON.stringify(cartItems) !== '[]'">¥{{ sumPrice }}</span>
					</div>
					<router-link class="right" :to="{ path: `/order-confirmation/${shopId}`}" v-show="JSON.stringify(cartItems) !== '[]' && sumPrice != 0">
						<div>提交订单</div>
					</router-link>
				</div>
			</div>
		</div>
		<div class="cart-mask" v-show="isShowCartList" @click="cartMaskClick">
			<div class="cart-info">
				<div class="cart-top">
					<div class="left"  @click="changeAllChecked">
						<span class="iconfont icon-Checkbox_unselected2" v-show="!isSelectAll" @click="selectAll"></span>
						<span class="iconfont icon-selected" v-show="isSelectAll" @click="selectAll"></span>
						<span class="text">全选</span>
					</div>
					<div class="button" @click="clearCart">清空购物车</div>
				</div>
				<div class="cart-content">
					<div class="cart-item" v-for="item in cartItems" :key="item.id">
						<div class="left">
							<span class="iconfont icon-Checkbox_unselected2" v-show="!item.checked" @click="changeItemChecked(item.id,item.checked)"></span>
							<span class="iconfont icon-selected" v-show="item.checked" @click="changeItemChecked(item.id,item.checked)"></span>
							<img :src="item.img" alt="" class="cart-img" />
							<div class="product-info">
								<div class="product-title">{{ item.title }}</div>
								<div class="product-data">
									<span class="current-price">{{ item.currentPrice }}</span>
									<span class="previous-price">¥{{ item.previousePrice }}</span>
								</div>
							</div>
						</div>
						<div class="right">
							<span class="iconfont icon-minus-circle" @click="changeProductCount(item.id,-1)"></span>
							<span class="product-count">{{ item.productCount }}</span>
							<span class="iconfont icon-plus-circle-fill" @click="changeProductCount(item.id,1)"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useStore } from "vuex";
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get } from "@/utils/request";
import ShopInfo from "@/components/ShopInfo.vue"
export default (await import("vue")).defineComponent({
	name: "Shop",
	components: {
		ShopInfo,
	},
	setup() {
		//定义参数控制购物车列表显示
		const isShowCartList = ref(false);
		//获取路由对象
		const router = useRouter();
		//获取路由参数
		const route = useRoute();

		const store = useStore();
		//从路由参数中获取 id
		const shopId = route.params.id;
		//定义响应式数据
		const item = ref({});
		const leftItems = ref({});
		const rightItems = ref([]);
		//创建一个变量存储所有的商品数据
		let allItems = [];
		//获取顶部数据
		const getItemData = async () => {
			const result = await get(`/shop/${shopId}`);
			item.value = result.data;
		};
		//获取左侧数据
		const getLeftItems = async () => {
			const result = await get(`/shop/${shopId}/tags`);
			leftItems.value = result.data;
		}
		//获取右侧数据
		const getRightItems = async () => {
			const result = await get(`/shop/${shopId}/products`);
			//将商品信息保存起来
			allItems = result.data;
			//调用方法，从 vuex 中获取购物车中的商品数量
			allItems.forEach((element) => {
				element.productCount = getProductFromVuex(shopId, element.id).cartCount;
				element.checked = getProductFromVuex(shopId, element.id).checked;
			})
			rightItems.value = allItems
		}
		//获取地址数据，判断是否有地址，没有跳转到新建地址页
		const getAddress = async () => {
            //使用 ajax 获取收货地址信息
            const result = await get(`/user/address`);
			if(result.data.length === 0){
				router.push("/address-create")
			}
        }
		//挂载
		onMounted(() => {
			getAddress();
			getItemData();
			getLeftItems();
			getRightItems();
		})

		//获取购物车数据，右侧数据中 productCount 的值不为0的商品
		const cartItems = computed( () => {
			//定义数组存储数据
			const cartArr = [];
			//保存 isShowCartList 的值
			const isShowCartListValue = isShowCartList;
			const shopId = route.params.id
			//获取每个商品的数量和选中状态
			rightItems.value.forEach((element) => {
				element.productCount = getProductFromVuex(shopId, element.id).cartCount;
				element.checked = getProductFromVuex(shopId, element.id).checked;
			});
			rightItems.value.forEach((element) => {
				if(element.productCount > 0){
					cartArr.push(element);
				}
			})
			//如果购物车中没有数据，自动退出购物车
			if(cartArr.length === 0 && isShowCartListValue){
				isShowCartList.value = !isShowCartListValue
			}
			return cartArr;
		})

		//查询vuex获取商品数量和选中状态，更新页面数据
		const getProductFromVuex = (shopId,productId) => {
			let cartCount = 0;
			let checked = false;
			//获取所有商铺数据，没有商铺默认为空
			const cartData = store.state.cartData || [];
			//通过 shopId 获取单个商铺数据
			let shop = {
				products: []
			}
			cartData.forEach((element) => {
				if(element.id === shopId){
					shop = element;
				}
			})
			//通过 productId 获取商品数据
			let product = {}
			shop.products.forEach((element) => {
				if(element.id === productId){
					product = element;
				}
			})

			cartCount = product.productCount || 0;
			checked = product.checked || false;
			return{
				cartCount,
				checked,
			};
		}
		//调用 getProductCount，计算商品总数
		const total = computed(() => {
			//定义总数量
			let totalNumber = 0;
			//通过 shopId，productId获取当前商品在购物车中的数量
			rightItems.value.forEach((element) => {
				if(element.checked === true){
					totalNumber += getProductFromVuex(shopId, element.id).cartCount;
				}
			})
			return totalNumber;
		});

		//计算商品总价
		const sumPrice = computed(() => {
			//定义总价格
			let totalPrice = 0;
			//通过 shopId，productId 获取当前商品的价格和数量
			rightItems.value.forEach((element) => {
				if(element.checked === true){
					totalPrice += getProductFromVuex(shopId, element.id).cartCount * element.currentPrice;
				}
			});
			//保留两位小数
			return totalPrice.toFixed(2);
		})
		

		//定义点击返回上一页的事件处理函数
		const handleBackClick = () => {
			router.push("/")
		}

		//创建响应式数据存储当前分类
		const currentItemName = ref("all")

		//定义点击分类的事件处理函数
		const handleItemClick = (name) => {
			//选中当前的分类，复制给currentItemName，实现左侧的变化
			currentItemName.value = name;
			//过滤右侧商品数据
			rightItems.value = allItems.filter((item) => {
				return item.tags.includes(name);
			})
		}
		//定义点击增加按钮事件处理函数
		const changeProductCount = (productId,productNumber) => {
			//获取 shop 的信息
			const shopInfo = item.value;
			//通过productId，获取商品信息
			const products = rightItems.value
			//在商品中找有特定 productId 的对象
			const productInfo = products.find((item) => {
				return item.id === productId;
			})
			//通过 mutation, 修改 vuex 中的数据
			store.commit("changeProductCount",{
				shopInfo,
				productInfo,
				productNumber,
			})
		}

		//定义购物车图标点击事件
		const cartIconClick = () => {
			//如果购物车数量为0，点击无效
			if(cartItems.value.length === 0){
				return true;
			}
			isShowCartList.value = !isShowCartList.value;
		}
		//定义点击购物车黑色蒙层退出购物车事件
		const cartMaskClick = (event) =>{
			//查看触发事件的元素，类名是 cart-mask 才触发
			if(event.target.className !== "cart-mask"){
				return;
			}
			cartIconClick();
		}
		//使用computed实现每个选中状态影响全选
		const isSelectAll = computed(() => {
			for (const element of cartItems.value) {
				if (!element.checked) {
					return false;
				}
			}
			return true;
		})
		//定义切换商品的选中状态事件
		const changeItemChecked = (productId,checked) => {
			//获取 shopId
			const shopId = item.value.id;
			//通过mutation，修改 vuex 中的数据
			store.commit("changeItemChecked",{
				shopId,
				productId,
				checked,
			});
		};
		//定义点击全选事件
		const selectAll = () => {
			//遍历购物车数据，将 checked全部改为true(函数是将原来的状态取非，要传false)
			cartItems.value.forEach((element) => {
				changeItemChecked(element.id, false)
			})
		}
		//定义清空购物车事件
		const clearCart = () => {
			//获取 shopId
			const shopId = item.value.id;
			store.commit("clearCart",{
				shopId,
			})
		}
		return {
			item,//商铺信息
			shopId,//商铺id
			handleBackClick,//返回上个页面
			leftItems,//左侧商品分类
			currentItemName,//当前分类
			handleItemClick,//点击分类事件
			rightItems,//右侧商品数据
			changeProductCount,//增加或者减少商品事件
			total,//购物车商品总件数
			sumPrice,//购物车商品总价
			isShowCartList,//是否展示购物车数据
			cartIconClick,//显示/隐藏购物车点击事件
			cartMaskClick,//显示购物车状态下点击蒙层退出购物车事件
			cartItems,//购物车商品数据
			isSelectAll,//是否全选
			changeItemChecked,//切换选中状态事件
			selectAll,//切换全选/全不选事件
			clearCart,//清除购物车事件
			
		}
	}
})
</script>

<style lang="scss" scoped>
@import "../../style/foot-common.scss";

.container {
	overflow: hidden;
	width: 100vw;
	height: 100vh;
	background-color: #fff;
}

.container .head {
	position: relative;
	margin-top: 4.2667vw;
	width: 100vw;
	height: 8.5333vw;
	display: flex;
	align-items: center;
	padding: 0 4.8vw;
}

.container .head .icon-search {
	position: absolute;
	top: 1.8667vw;
	left: 18.9333vw;
	color: #b7b7b7;
	font-size: 4.8vw;
}

.container .head .icon-left {
	font-size: 5.8667vw;
	color: #b6b6b6;
	margin-right: 4.2667vw;
}

.container .head .search-input {
	padding-left: 11.7333vw;
	width: 82.6667vw;
	background: #f5f5f5;
	border-radius: 4.2667vw;
	height: 8.5333vw;
}

.container .shop-info {
	height: 28.2667vw;
	width: 100vw;
	padding: 0 4.8vw;
	display: flex;
	align-items: center;
}

.container .shop-info .left .shop-logo {
	width: 14.9333vw;
	margin-right: 4.2667vw;
}

.container .shop-info .right .shop-title {
	font-family: PingFangSC-Regular;
	font-size: 4.2667vw;
	color: #333333;
	margin-bottom: 2.1333vw;
}

.container .shop-info .right .tags {
	display: flex;
	margin-bottom: 2.1333vw;
}

.container .shop-info .right .tags .tag-item {
	font-family: PingFangSC-Regular;
	font-size: 3.4667vw;
	color: #333333;
	margin-right: 4.2667vw;
}

.container .shop-info .right .promotion {
	font-family: PingFangSC-Regular;
	font-size: 3.4667vw;
	color: #e93b3b;
}

.container .shop-body {
	position: fixed;
	top: 41.0667vw;
	left: 0;
	right: 0;
	bottom: 13.0667vw;
	display: flex;
}

.container .shop-body .category {
	overflow-y: auto;
	width: 20.2667vw;
	background-color: #f5f5f5;
}

.container .shop-body .category .category-item {
	background: #f5f5f5;
	height: 10.6667vw;
	border-radius: 0.5333vw;
	font-family: PingFangSC-Regular;
	font-size: 3.7333vw;
	color: #333333;
	text-align: center;
	line-height: 10.6667vw;
}

.container .shop-body .category .category-item.active {
	background: #ffffff;
	font-weight: 700;
}

.container .shop-body .detail {
	flex-grow: 1;
	overflow-y: auto;
}

.container .shop-body .detail .detail-item {
	width: 70.6667vw;
	height: 24.5333vw;
	padding: 3.2vw 0;
	border-bottom: 0.2667vw solid #f1f1f1;
	margin: 0 auto;
	display: flex;
}

.container .shop-body .detail .detail-item .left .product-img {
	width: 18.1333vw;
	height: 18.1333vw;
	-o-object-fit: cover;
	object-fit: cover;
	margin-right: 4.2667vw;
}

.container .shop-body .detail .detail-item .right {
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	min-width: 0;
}

.container .shop-body .detail .detail-item .right .product-title {
	font-family: PingFangSC-Medium;
	font-weight: 500;
	font-size: 3.7333vw;
	color: #333333;
	margin-bottom: 1.6vw;
	//标题过长用省略号代替
	padding-bottom: 4.5vw;
	width: 48.26vw;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.container .shop-body .detail .detail-item .right .product-sale {
	font-family: PingFangSC-Regular;
	font-size: 3.2vw;
	color: #333333;
	line-height: 4.2667vw;
	margin-bottom: 1.6vw;
}

.container .shop-body .detail .detail-item .right .product-data {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.container .shop-body .detail .detail-item .right .product-data .data-left .current-price {
	font-family: PingFangSC-Semibold;
	font-weight: 900;
	font-size: 3.7333vw;
	color: #e93b3b;
	line-height: 5.3333vw;
	margin-right: 1.6vw;
}

.container .shop-body .detail .detail-item .right .product-data .data-left .current-price::before {
	content: "¥";
	font-size: 2.6667vw;
}

.container .shop-body .detail .detail-item .right .product-data .data-left .previous-price {
	font-family: PingFangSC-Regular;
	font-size: 2.6667vw;
	color: #999999;
	line-height: 5.3333vw;
	text-decoration: line-through;
}

.container .shop-body .detail .detail-item .right .product-data .data-right {
	display: flex;
	align-items: center;
}

.container .shop-body .detail .detail-item .right .product-data .data-right .iconfont {
	font-size: 5.8667vw;
}

.container .shop-body .detail .detail-item .right .product-data .data-right .iconfont.icon-minus-circle {
	color: #666;
	font-size: 6.1333vw;
}

.container .shop-body .detail .detail-item .right .product-data .data-right .iconfont.icon-plus-circle-fill {
	display: inline-block;
	transform: translateY(-0.2667vw);
	color: #0091ff;
}

.container .shop-body .detail .detail-item .right .product-data .data-right .product-count {
	margin: 0 2.6667vw;
	font-family: PingFangSC-Regular;
	font-size: 3.7333vw;
	color: #333333;
	line-height: 4.2667vw;
}

.container .foot {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 13.0667vw;
	display: flex;
	box-shadow: 0 -0.2667vw 0.2667vw 0 #f1f1f1;
}

.container .foot .left {
	width: 73.8667vw;
	background: #ffffff;
	display: flex;
	align-items: center;
}

.container .foot .left .left-title {
	margin-left: 6.4vw;
	font-family: PingFangSC-Regular;
	font-size: 3.7333vw;
	color: #333333;
	text-align: right;
	line-height: 13.0667vw;
	margin-right: 1.6vw;
}

.container .foot .left .left-price {
	font-family: PingFangSC-Medium;
	font-weight: 500;
	font-size: 4.2667vw;
	color: #333333;
	text-align: right;
	line-height: 13.0667vw;
}

.container .foot .right {
	flex-grow: 1;
	background: #4fb0f9;
	font-family: PingFangSC-Medium;
	font-weight: 500;
	font-size: 3.7333vw;
	color: #ffffff;
	text-align: center;
	line-height: 13.0667vw;
}

.container .foot .left {
	padding-left: 6.4vw;
}

.container .foot .left .dot {
	position: absolute;
	left: 12.5333vw;
	top: 1.8667vw;
	min-width: 2.6667vw;
	height: 2.6667vw;
	padding: 0.5333vw;
	background: #e93b3b;
	border-radius: 2.6667vw;
	text-align: center;
	line-height: 1.6vw;
	color: #fff;
	font-size: 2.1333vw;
}

.container .foot .left .cart-img {
	width: 7.4667vw;
}

.container .foot .left .left-title {
	font-family: PingFangSC-Regular;
	font-size: 3.2vw;
	color: #333333;
	transform: translateY(0.2667vw);
}

.container .foot .left .left-price {
	font-family: PingFangSC-Medium;
	font-weight: 500;
	font-size: 4.8vw;
	color: #e93b3b;
}

.cart-mask {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 49px;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
}

.cart-mask .cart-info {
	background-color: #fff;
	position: absolute;
	bottom: 0;
}

.cart-mask .cart-info .cart-top {
	width: 100vw;
	padding: 18px;
	height: 52px;
	background-color: #fff;
	border-bottom: 1px solid #f1f1f1;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.cart-mask .cart-info .cart-top .left {
	display: flex;
	align-items: center;
}

.cart-mask .cart-info .cart-top .left .iconfont {
	margin-right: 8px;
	font-size: 22px;
}

.cart-mask .cart-info .cart-top .left .iconfont.icon-Checkbox_unselected2 {
	color: #666;
}

.cart-mask .cart-info .cart-top .left .iconfont.icon-selected {
	color: #0091ff;
}

.cart-mask .cart-info .cart-top .left .text {
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #333333;
	line-height: 16px;
}

.cart-mask .cart-info .cart-top .button {
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #333333;
	text-align: right;
	line-height: 16px;
}

.cart-mask .cart-info .cart-content {
	max-height: 380px;
	overflow-y: auto;
}

.cart-mask .cart-info .cart-content .cart-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100vw;
	height: 46px;
	margin: 16px 0;
	padding: 0 18px;
}

.cart-mask .cart-info .cart-content .cart-item .left {
	display: flex;
	align-items: center;
}

.cart-mask .cart-info .cart-content .cart-item .left .iconfont {
	margin-right: 16px;
	font-size: 22px;
}

.cart-mask .cart-info .cart-content .cart-item .left .iconfont.icon-Checkbox_unselected2 {
	color: #666;
}

.cart-mask .cart-info .cart-content .cart-item .left .iconfont.icon-selected {
	color: #0091ff;
}

.cart-mask .cart-info .cart-content .cart-item .left .cart-img {
	width: 46px;
	height: 46px;
	-o-object-fit: cover;
	object-fit: cover;
	margin-right: 16px;
}

.cart-mask .cart-info .cart-content .cart-item .left .product-info .product-title {
	font-family: PingFangSC-Medium;
	font-weight: 500;
	font-size: 14px;
	color: #333333;
	margin-bottom: 6px;
	//标题过长用省略号代替
	width: 42.66vw;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.cart-mask .cart-info .cart-content .cart-item .left .product-info .product-data .current-price {
	font-family: PingFangSC-Semibold;
	font-weight: 900;
	font-size: 3.7333vw;
	color: #e93b3b;
	line-height: 5.3333vw;
	margin-right: 1.6vw;
}

.cart-mask .cart-info .cart-content .cart-item .left .product-info .product-data .current-price::before {
	content: "¥";
	font-size: 2.6667vw;
}

.cart-mask .cart-info .cart-content .cart-item .left .product-info .product-data .previous-price {
	font-family: PingFangSC-Regular;
	font-size: 2.6667vw;
	color: #999999;
	line-height: 5.3333vw;
	text-decoration: line-through;
}

.cart-mask .cart-info .cart-content .cart-item .right {
	display: flex;
	align-items: center;
}

.cart-mask .cart-info .cart-content .cart-item .right .iconfont {
	font-size: 5.8667vw;
}

.cart-mask .cart-info .cart-content .cart-item .right .iconfont.icon-minus-circle {
	color: #666;
	font-size: 6.1333vw;
}

.cart-mask .cart-info .cart-content .cart-item .right .iconfont.icon-plus-circle-fill {
	display: inline-block;
	transform: translateY(-0.2667vw);
	color: #0091ff;
}

.cart-mask .cart-info .cart-content .cart-item .right .product-count {
	margin: 0 2.6667vw;
	font-family: PingFangSC-Regular;
	font-size: 3.7333vw;
	color: #333333;
	line-height: 4.2667vw;
}
</style>