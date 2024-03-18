/**
 * @description Address Model, 用户模型, 用于存储地址信息
 */

// 引入mongoose, 用于操作数据库, 以及定义数据结构
const mongoose = require("../db/db");

// 创建Schema, 用于定义数据结构, 以及数据类型, 以及是否必需, 是否唯一, 默认值等, 用于约束数据
const Schema = mongoose.Schema(
	{
		// 城市
		city: {
			type: String, // 数据类型, 字符串
			required: true, // 必需
		},
		// 小区
		community: {
			type: String, // 数据类型, 字符串
			required: true, // 必需
		},
		// 门牌号
		building: {
			type: String, // 数据类型, 字符串
			required: true, // 必需
		},
		// 用户信息
		username: {
			type: String, // 数据类型, 字符串
			required: true, // 必需
		},
		// 收货人姓名
		receiveName: {
			type: String, // 数据类型, 字符串
			required: true, // 必需
		},
		// 收货人电话
		phone: {
			type: String, // 数据类型, 字符串
			required: true, // 必需
		},
	},
	{ timestamps: true } // 时间戳, 用于记录数据的创建时间和更新时间
);

// 创建模型, 对应数据库中的集合(addresses), 用于操作数据库
const Address = mongoose.model("address", Schema);

// 导出模型
module.exports = Address;
