/**
 * @description order router, 订单相关路由
 */
// 引入路由, 用于定义路由
const router = require("koa-router")();
// 引入返回数据模型, 用于返回数据
const { SuccessModel, ErrorModel } = require("../res-module/index");
// 登录校验的中间件
const loginCheck = require("../middleware/loginCheck");
// 引入controller, 用于处理数据
const { createOrder, getOrderList } = require("../controller/order");
// 设置路由前缀
router.prefix("/api/order");
// 创建订单
router.post("/", loginCheck, async function (ctx, next) {
	// 当前用户名
	const userInfo = ctx.session.userInfo;
	const username = userInfo.username;
	// 获取订单数据
	const data = ctx.request.body;
	//创建订单
	try {
		// 创建订单
		const newOrder = await createOrder(username, data);
		// 返回订单
		ctx.body = new SuccessModel(newOrder);
	} catch (ex) {
		// 订单创建失败, 返回错误信息
		console.error(ex);
		ctx.body = new ErrorModel(10005, "订单创建失败");
	}
});
// 获取当前用户的订单列表
router.get("/", loginCheck, async function (ctx, next) {
	// 有登录验证，可以直接获取 session
	const userInfo = ctx.session.userInfo;
	const username = userInfo.username;
	// 获取订单列表
	const list = await getOrderList(username);
	// 返回订单列表
	ctx.body = new SuccessModel(list);
});
// 导出路由
module.exports = router;
