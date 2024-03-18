/**
 * @description shop router, 商店相关路由
 */
// 引入路由, 用于定义路由
const router = require("koa-router")();
// 引入返回数据模型, 用于返回数据
const { SuccessModel, ErrorModel } = require("../res-module/index");
// 引入controller, 用于处理数据
const { getHotList, getShopInfo, getProductsByShopId, getTagsByShopId } = require("../controller/shop");
// 设置路由前缀
router.prefix("/api/shop");
// 热门商店（首页商店列表）
router.get("/hot-list", async function (ctx, next) {
	// 获取热门商店列表
	const list = await getHotList();
	// 返回列表
	ctx.body = new SuccessModel(list);
});
// 获取热搜词
router.get("/hot-search", async function (ctx, next) {
	// 定义热搜词
	const hotSearch = ["番茄", "草莓", "橙子", "苹果"];
	// 返回热搜词
	ctx.body = new SuccessModel(hotSearch);
});
// 根据 id 查询单个商店信息
router.get("/:id", async function (ctx, next) {
	const id = ctx.params.id; // 商店 id
	const shop = await getShopInfo(id); // 获取商店信息
	if (shop != null) {
		ctx.body = new SuccessModel(shop); // 返回商店信息
	} else {
		ctx.body = new ErrorModel(10006, "商店不存在"); // 返回错误信息
	}
});
// 获取商店的商品
router.get("/:id/products", async function (ctx, next) {
	// 商店 id
	const shopId = ctx.params.id;
	// 获取商品
	const products = await getProductsByShopId(shopId);
	// 判断是否获取成功
	if (products != null) {
		ctx.body = new SuccessModel(products); // 返回商店信息
	} else {
		ctx.body = new ErrorModel(10008, "获取商品失败!"); // 返回错误信息
	}
});
// 获取商店的商品分类
router.get("/:id/tags", async function (ctx, next) {
	// 商店 id
	const shopId = ctx.params.id;
	// 获取商品
	const tags = await getTagsByShopId(shopId);
	if (tags != null) {
		ctx.body = new SuccessModel(tags); // 返回商店信息
	} else {
		ctx.body = new ErrorModel(10007, "获取分类失败!"); // 返回错误信息
	}
});
// 导出路由
module.exports = router;
