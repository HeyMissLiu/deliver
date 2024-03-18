/**
 * @description 商店数据操作, 用于测试数据库的增删改查操作
 * @author XuJunhao
 */

// 引入Shop模型
const Shop = require("../../models/Shop");

!(async () => {
	// 创建两个商店
	// await Shop.create({
	// 	name: "沃尔玛", // 商店名称
	// 	imgUrl: "images/shop/wmt.jpeg", // 商店图片
	// 	sales: 10000, // 销量
	// 	expressLimit: 0, // 满多少免运费
	// 	expressPrice: 5, // 运费
	// 	slogan: "VIP尊享满89元减4元运费券", // 商店广告语
	// });
	// await Shop.create({
	// 	name: "山姆会员商店", // 商店名称
	// 	imgUrl: "images/shop/sam.jpeg", // 商店图片
	// 	sales: 2000, // 销量
	// 	expressLimit: 0, // 满多少免运费
	// 	expressPrice: 5, // 运费
	// 	slogan: "联合利华洗护满10减5", // 商店广告语
	// });

	// 附近商店
	// const shopList = await Shop.find().sort({ _id: -1 });
	// console.log(shopList);

	// 获取商店详情
	// const id = "6448c2490873290df8619f4a";
	// const shop = await Shop.findById(id);
	// console.log(shop);
})();
