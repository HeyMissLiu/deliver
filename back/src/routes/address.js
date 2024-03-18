/**
 * @description address router
 */

// 引入路由, 用于定义路由
const router = require("koa-router")();

// 引入返回数据模型, 用于返回数据
const { SuccessModel, ErrorModel } = require("../res-module/index");
// 引入登录验证中间件, 用于验证登录
const loginCheck = require("../middleware/loginCheck");
// 引入controller, 用于处理数据
const { createAddress, getAddressList, getAddressById, updateAddress } = require("../controller/address");

// 设置路由前缀
router.prefix("/api/user/address");

// 创建收货地址
router.post("/", loginCheck, async function (ctx, next) {
	// 有登录验证，可以直接获取 session
	const userInfo = ctx.session.userInfo;
	// 获取用户名
	const username = userInfo.username;
	// 获取前端传来的数据
	const data = ctx.request.body || {};

	// 创建数据
	try {
		// 创建地址
		const newAddress = await createAddress(username, data);
		// 返回地址信息
		ctx.body = new SuccessModel(newAddress);
	} catch (ex) {
		// 创建失败, 打印错误信息
		console.error(ex);
		// 返回失败
		ctx.body = new ErrorModel(10004, `创建地址失败`);
	}
});

// 获取收货地址列表
router.get("/", loginCheck, async function (ctx, next) {
	// 有登录验证，可以直接获取 session
	const userInfo = ctx.session.userInfo;
	// 获取用户名
	const username = userInfo.username;
	// 获取列表
	const list = await getAddressList(username);
	// 返回列表
	ctx.body = new SuccessModel(list);
});

// 获取单个收货地址
router.get("/:id", loginCheck, async function (ctx, next) {
	// 获取路由的动态参数
	const id = ctx.params.id;
	console.log(id);
	// 获取收货地址, 通过id
	const address = await getAddressById(id);
	// 返回收货地址
	ctx.body = new SuccessModel(address);
});

// 更新收货地址
router.put("/:id", loginCheck, async function (ctx, next) {
	const id = ctx.params.id; // 获取路由的动态参数, 地址的id
	const data = ctx.request.body || {}; // 前端传来的数据, 地址的详细信息
	const userInfo = ctx.session.userInfo; // 有登录验证，可以直接获取 session
	const username = userInfo.username; // 获取用户名

	// 更新
	const newAddress = await updateAddress(id, username, data);
	// 返回更新后的数据
	ctx.body = new SuccessModel(newAddress);
});

// 导出路由
module.exports = router;
