const router = require("koa-router")(); // 引入koa-router
const { register, login } = require("../controller/user"); // 引入controller
const { SuccessModel, ErrorModel } = require("../res-module/index"); // 引入返回格式
router.prefix("/api/user"); // 设置路由前缀
// 注册
router.post("/register", async function (ctx, next) {
	// 获取注册信息
	const { username, password } = ctx.request.body;
	// 使用try catch捕获异常, 防止程序崩溃
	try {
		// 注册
		const newUser = await register(username, password);
		// 存入session
		ctx.session.userInfo = { username:newUser.username };
		// 注册成功, 返回用户信息, 多返回一个信息(newUser)，防止前端有需求变动，再来找后端修改代码
		ctx.body = new SuccessModel(newUser);
	} catch (ex) {
		// 注册失败
		console.error(ex);
		// 返回错误信息
		ctx.body = new ErrorModel(10001, `注册失败: ${ex.message}`);
	}
});

//登录
router.post("/login", async function (ctx, next) {
	// 获取登录信息
	const { username, password } = ctx.request.body;
	// 查询单个用户（登录验证）
	const res = await login(username, password);
	//使用try catch捕获异常
	try{
		if (res) {
			// 验证成功，设置 session.userInfo
			console.log(`登录成功`);
			ctx.session.userInfo = { username };
			// 登录成功
			console.log(ctx.session.userInfo);
			ctx.body = new SuccessModel();
		} else {
			// 登录失败
			ctx.body = new ErrorModel(10002, `登录验证失败`);
		}
	}catch(error){
		console.log("登录失败，请重试")
	}
	
});

// 导出路由
module.exports = router;
