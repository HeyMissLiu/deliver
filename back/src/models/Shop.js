/**
 * @description Shop Model, 商店模型, 用于存储商店信息
 */

// 引入mongoose, 用于操作数据库, 以及定义数据结构
const mongoose = require("../db/db");

// 创建Schema, 用于定义数据结构, 以及数据类型, 以及是否必需, 是否唯一, 默认值等, 用于约束数据
const Schema = mongoose.Schema(
	{
		// 商店名
		title: {
			type: String,
			require: true,
		},
		// 商店logo
		logo: {
			type: String,
			require: true,
		},
		tags: {
			type: Array,
			default: [],
		},
		// 商店公告
		promotion: String,
	},
	{ timestamps: true } // 时间戳, 用于记录数据的创建时间和更新时间
);

// 创建模型, 对应数据库中的集合(shops), 用于操作数据库
const Shop = mongoose.model("shop", Schema);

// 导出模型
module.exports = Shop;
