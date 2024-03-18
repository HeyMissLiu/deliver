/**
 * @description 登录验证中间件
 */

const { ErrorModel } = require("../res-module/index");

module.exports = async (ctx, next) => {
	// 获取session
	const session = ctx.session;
	console.log(JSON.stringify(session));
	// 判断session是否存在, 以及session中是否有userInfo, 如果有, 则说明已经登录, 可以继续执行后续操作
	if (session && session.userInfo) {
		// 执行后续操作, 例如: 获取用户信息, 获取购物车信息等, 通过await next()实现
		await next();
    // 成功了, 就不需要再执行下面的代码了, 直接return
		return;
	}
	// 如果没有登录, 则返回错误信息
	ctx.body = new ErrorModel(10003, "登录验证失败");
};
