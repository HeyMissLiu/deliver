/**
 * @description 订单数据操作, 用于操作订单数据, 以及订单相关的数据, 订单里面的商品和商铺信息, 以及地址信息, 是复制到订单里面的, 而不是引用, 所以需要通过id查询之后, 再写入到订单里面
 * @author XuJunhao
 */

// 引入mongoose, 用于操作数据库, 以及定义数据结构
const Order = require("../../models/Order"); // 引入订单模型
const Product = require("../../models/Product"); // 引入商品模型
const Address = require("../../models/Address"); // 引入地址模型

!(async () => {
	//创建订单
	const requestBody = {
		addressId: "64481ba58ad9018cecb9be94", // 地址id
		shopId: "6448c2490873290df8619f4a", // 商铺id
		shopName: "沃尔玛", // 商铺名
		isCanceled: false, //订单是否被取消
		// 商品列表
		products: [
			{
				id: "6448c3e1fb31b0d9232cb35c", // 商品id
				num: 3, //购买数量
			},
			{
				id: "6448c3e1fb31b0d9232cb35e", // 商品id
				num: 5, //购买数量
			},
		],
	};
	// 获取 address
	const address = await Address.findById(requestBody.addressId);

	// 获取商品列表
	const pIds = requestBody.products.map((p) => p.id); //['商品1 id'],['商品2 id']
	// 通过商品id, 查询商品列表
	const productListInDb = await Product.find({
		shopId: requestBody.shopId, //沃尔玛的商品
		_id: {
			$in: pIds,
		},
	});

	//整合订单购买数量, 拼接商品信息
	const productListWidthSales = productListInDb.map((pInDb) => {
		// 商品 id, 转成字符串
		const id = pInDb._id.toString();

		// 通过id找商品, 从请求体中找到商品, 从而获得购买数量, 注意是一个数组, 里面是对象
		const filterProducts = requestBody.products.filter((item) => item.id === id);

		// 返回拼接好的商品信息, 和 models/Order.js 中的 products 字段对应
		return {
			orderSales: filterProducts[0].num, // 销量
			product: {
				shopId: pInDb.shopId, // 商铺id
				name: pInDb.name, // 商品名
				imgUrl: pInDb.imgUrl, // 商品图片
				sales: pInDb.sales, // 商品销量
				price: pInDb.price, // 商品价格
				oldPrice: pInDb.oldPrice, // 商品原价
			},
		};
	});

	// 创建订单, 包含了商品信息, 商铺信息, 地址信息, 复制关系, 不是引用关系
	await Order.create({
		username: "zhangsan", // 用户名
		shopId: requestBody.shopId, // 商铺id
		shopName: requestBody.shopName, // 商铺名
		isCanceled: requestBody.isCanceled, // 订单是否被取消
		products: productListWidthSales, // 商品列表
		// 地址的详细信息
		address: {
			username: address.username, // 用户名
			city: address.city, // 城市
			department: address.department, // 小区
			houseNumber: address.houseNumber, // 门牌号
			name: address.name, // 收货人姓名
			phone: address.phone, // 收货人电话
		},
	});
})();
