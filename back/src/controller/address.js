/**
 * @description address controller
 */

// 引入地址模型
const Address = require("../models/Address");

/**
 * 创建地址
 * @param {string} username 用户名
 * @param {Object} data 地址的详细信息
 * @returns {Promise} 返回地址信息
 */
async function createAddress(username, data) {
	// 创建地址
	const address = await Address.create({
		username, // 把 username 拼接上，因为前端传入的数据没有 username
		...data, // 把前端传入的数据拼接上
	});
	// 返回地址信息
	return address;
}

/**
 * 获取地址列表
 * @param {string} username 用户名
 * @returns {Promise} 返回地址列表
 */
async function getAddressList(username) {
	// 查询地址列表, 按更新时间倒序, 通过用户名查询
	const list = await Address.find({ username }).sort({ updatedAt: -1 });
	// 返回地址列表
	return list;
}

/**
 * 查找单个收货地址
 * @param {string} id id
 * @returns {Promise} 返回地址
 */
async function getAddressById(id) {
	// 通过 id 查找地址
	const address = await Address.findById(id);
	// 返回地址
	return address;
}

/**
 * 更新地址信息
 * @param {string} id 地址id
 * @param {string} username 用户名
 * @param {Object} data 地址的详细信息
 * @returns {Promise} 返回地址
 */
async function updateAddress(id, username, data) {
	// 通过 id 和 username 查找地址, 并更新, 防止用户修改别人的地址
	const address = await Address.findOneAndUpdate(
		{ _id: id, username }, // 查询条件
		{ username, ...data }, // 要更新的数据，别忘了 username
		{ new: true } // 返回更新之后的最新数据，默认是 false 返回更新之前的数据
	);
	// 返回地址
	return address;
}

// 导出
module.exports = {
	createAddress,
	getAddressList,
	getAddressById,
	updateAddress,
};
