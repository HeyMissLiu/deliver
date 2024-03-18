/**
 * @description Tag Model, 商店商品分类模型
 */

// 引入mongoose, 用于操作数据库, 以及定义数据结构
const mongoose = require("../db/db");

// 创建Schema, 用于定义数据结构, 以及数据类型, 以及是否必需, 是否唯一, 默认值等, 用于约束数据
const Schema = mongoose.Schema(
	{
		// 分类名
		name: {
			type: String,
			require: true,
		},
		// 分类描述
		text: {
			type: String,
			require: true,
		},
		// 商店id
		shopId: {
			type: String,
			require: true,
		},
	},
	{ timestamps: true } // 时间戳, 用于记录数据的创建时间和更新时间
);

// 创建模型, 对应数据库中的集合(Tags), 用于操作数据库
const Tag = mongoose.model("tag", Schema);

// 导出模型
module.exports = Tag;
