/**
 * @description shop controller, 商店相关数据处理
 */
// 引入模型
const Shop = require("../models/Shop");
const Product = require("../models/Product");
const Tag = require("../models/Tag");
/**
 * 获取商店列表（热门商店）
 */
async function getHotList() {
	// 逆序排序, 获取所有商店
	const list = await Shop.find().sort({ _id: -1 });
	// 返回商店列表
	return list;
}
/**
 * 获取商店信息
 * @param {string} id id
 * @returns {Promise} 返回商店信息
 */
async function getShopInfo(id) {
	// 通过 id 查找商店
	const shop = await Shop.findById(id);
	// 返回商店信息
	return shop;
}
/**
 * 根据商店获取商品
 * @param {string} shopId 商店id
 * @param {string} tab tab分类
 * @returns {Promise} 返回商品列表
 */
async function getProductsByShopId(id) {
	const list = await Product.find({
		// 由于mongoose版本的影响，这里需要按照如下方式书写
		shopId: id,
	});
	return list; // 返回商品列表
}
/**
 * 根据商店获取商品分类
 * @param {string} shopId 商店id
 * @returns {Promise} 返回商品分类列表
 */
async function getTagsByShopId(id) {
	const list = await Tag.find({
		// 由于mongoose版本的影响，这里需要按照如下方式书写
		shopId: id,
	}); // 逆序
	return list; // 返回商品列表
}
// 导出
module.exports = {
	getHotList,
	getShopInfo,
	getProductsByShopId,
	getTagsByShopId,
};
