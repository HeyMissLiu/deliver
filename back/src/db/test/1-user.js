/**
 * @description 用户数据操作, 用于测试数据库的增删改查操作
 * @author XuJunhao
 */

// 引入User模型
const User = require("../../models/User");

// 测试数据库的增删改查操作
!(async () => {
	// 注册:创建一个新的用户
	// await User.create({
	//     username: 'zhangsan', // 用户名
	//     password: '123' // 密码
	// })
	// 再建一个新的用户
	// await User.create({
	//     username: '18666666666',
	//     password: '123'
	// })
	// 登录：查询单个用户
	// const zhangsan = await User.findOne({
	// 	username: "zhangsan",
	// 	password: "123",
	// });
	// console.log("zhangsan", zhangsan);
})();
