/**
 * @description 商品数据操作测试, 用于测试商品数据的增删改查, 以及各种复杂的查询, 以及聚合查询等
 * @author XuJunhao
 */

// 引入mongoose, 用于操作数据库, 以及定义数据结构
const Product = require("../../models/Product");

!(async () => {
	// 创建
	// await Product.create({
	// 	shopId: "6448c2490873290df8619f4d", // 沃尔玛
	// 	name: "葡萄", // 商品名称
	// 	imgUrl: "/images/product/grape.jpg",
	// 	sales: 100, // 月售多少
	// 	price: 33, // 当前价格
	// 	oldPrice: 36, // 原价
	// 	tabs: ["all", "seckill", "fruit"], // 商品分类
	// });
	// 创建
	// await Product.create({
	// 	shopId: "6448c2490873290df8619f4d", // 沃尔玛
	// 	name: "苹果", // 商品名称
	// 	imgUrl: "/images/product/apple.jpeg", // 商品图片
	// 	sales: 200, // 月售多少
	// 	price: 25, // 当前价格
	// 	oldPrice: 27, // 原价
	// 	tabs: ["all", "seckill", "fruit"], // 商品分类
	// });
	// 创建
	// await Product.create({
	// 	shopId: "6448c2490873290df8619f4a", // 山姆会员店
	// 	name: "桃子", // 商品名称
	// 	imgUrl: "/images/product/peach.jpg", // 商品图片
	// 	sales: 50, // 月售多少
	// 	price: 16, // 当前价格
	// 	oldPrice: 19, // 原价
	// 	tabs: ["all", "seckill", "fruit"], // 商品分类
	// });
	// 创建
	// await Product.create({
	// 	shopId: "6448c2490873290df8619f4a", // 山姆会员店
	// 	name: "西瓜", // 商品名称
	// 	imgUrl: "/images/product/watermelon.jpg", // 商品图片
	// 	sales: 180, // 月售多少
	// 	price: 13, // 当前价格
	// 	oldPrice: 15, // 原价
	// 	tabs: ["all", "seckill", "fruit"], // 商品分类
	// });

	// 查询某个商店，某个tab的商品列表
	// const list = await Product.find({
	//     shopId: '6448c2490873290df8619f4a'
	// })
	// const list = await Product.find({
	// 	shopId: "6448c2490873290df8619f4a", //沃尔玛
	// 	tabs: {
	// 		$in: "seckill", // 秒杀
	// 	},
	// });
	// console.log(list);
})();
