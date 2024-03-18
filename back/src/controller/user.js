/**
 * @description user controller, 用户控制器, 用于处理用户相关的业务逻辑, 例如: 注册, 登录, 获取用户信息等
 */

// 引入User模型, 用于操作数据库
const User = require("../models/User");

/**
 * 注册
 * @param {string} username 用户名
 * @param {string} password 密码
 * @returns {Object} 注册成功返回用户信息, 注册失败返回错误信息
 */

async function register(username, password) {
	// 保存到数据库
	const newUser = await User.create({ username, password });
	// 返回用户信息, 注意: 不能返回密码
	// 删除密码
	const user = newUser.toObject();
	delete user.password;
	return user;
}

/**
 * 登录
 * @param {String} username 用户名
 * @param {String} password 密码
 * @returns {Boolean} 登录成功返回true, 登录失败返回false
 */

async function login(username, password) {
	// 查询数据库, 判断用户是否存在
	const user = await User.findOne({ username, password });
	// 判断用户是否存在
	if (user != null) {
		// 登录成功
		return true;
	}
	// 登录失败
	return false;
}

// 导出模块
module.exports = {
	register, // 注册
	login, // 登录
};
