/**
 * @description order controller, 订单相关数据处理
 */
// 引入模型
const Order = require("../models/Order");
/**
 * 创建订单
 * @param {string} username 用户名
 * @param {Object} data 订单数据
 * @returns {Promise} 返回订单数据
 */
async function createOrder(username, data) {
	// 创建订单
	const newOrder = await Order.create({
		username, // 用户名
		...data, // 订单数据
	});
	// 返回订单数据
	return newOrder;
}
/**
 * 获取订单列表（作业）
 * @param {string} username 用户名
 * @returns {Promise} 返回订单列表
 */
async function getOrderList(username) {
	// 通过用户名查找订单, 逆序排序
	const list = await Order.find({ username }).sort({ _id: -1 });
	// 返回订单列表
	return list;
}
// 导出
module.exports = {
	createOrder,
	getOrderList,
};
