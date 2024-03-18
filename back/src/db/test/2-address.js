/**
 * @description 地址数据操作, 用于测试数据库的增删改查操作
 * @author XuJunhao
 */

// 引入Address模型
const Address = require("../../models/Address");

!(async () => {
	// 创建收货地址
	// await Address.create({
	// 	username: "zhangsan",
	// 	city: "北京",
	// 	department: "xxx小区",
	// 	houseNumber: "门牌号1",
	// 	name: "张三",
	// 	phone: "18666666666",
	// });

	// 再创建一个地址;
	// await Address.create({
	// 	username: "zhangsan",
	// 	city: "上海",
	// 	department: "yyy小区",
	// 	houseNumber: "门牌号22",
	// 	name: "张三三",
	// 	phone: "18666666666",
	// });
	// 再创建一个地址;
	// await Address.create({
	// 	username: "lisi",
	// 	city: "上海",
	// 	department: "yyy小区",
	// 	houseNumber: "门牌号2",
	// 	name: "李四",
	// 	phone: "18555555555",
	// });
	// 再创建一个地址
	// await Address.create({
	// 	username: "wangwu",
	// 	city: "广州",
	// 	department: "ddd小区",
	// 	houseNumber: "门牌号3",
	// 	name: "王五",
	// 	phone: "18777777777",
	// });

	// 获取收货地址列表（获取 zhangsan 的）
	// const addressList = await Address.find({
	// 	username: "zhangsan", // 查询条件
	// }).sort({
	// 	updateAt: -1, // 按照更新时间倒序
	// });
	// console.log(addressList); // 打印结果

	// 根据id获取单个收货地址
	// const id = "64481c1938e6a21ec00930dc"; // 收货地址的id
	// const address = await Address.findById(id); // 根据id查询
	// console.log(address); // 打印结果

	// 更新收货地址
	// const id = "64481c1938e6a21ec00930dc";
	// const newData = {
	// 	username: "lisisi",
	// 	city: "深圳",
	// 	department: "yyy小区B",
	// 	houseNumber: "门牌号2B",
	// 	name: "李思思",
	// 	phone: "18888888888",
	// };
	// const address = await Address.findOneAndUpdate({ _id: id, username: "lisi" }, newData, {
	// 	new: true, //返回更新之后的最新数据（默认是false，返回更新之前的数据）
	// });
	// console.log(address);
})();
