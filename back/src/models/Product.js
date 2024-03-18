/**
 * @description Product Model, 商品模型, 用于存储商品信息
 */

// 引入mongoose, 用于操作数据库, 以及定义数据结构
const mongoose = require("../db/db");

// 创建Schema, 用于定义数据结构, 以及数据类型, 以及是否必需, 是否唯一, 默认值等, 用于约束数据
const Schema = mongoose.Schema(
	{
		// 商品所属商店
		shopId: {
			type: String, // 数据类型, 字符串
			require: true, // 必需
		},
		// 商品名称
		title: {
			type: String, // 数据类型, 字符串
			require: true, // 必需
		},
		// 商品图片
		img: {
			type: String, // 数据类型, 字符串
			require: true, // 必需
		},
		// 商品月售
		sale: Number,
		//商品数量
		cartCount: {
			type: Number,
			default: 0,
		},
		// 商品现价
		currentPrice: Number,
		// 商品原价
		previousePrice: Number,
		// 商品标签
		tags: [String], //示例 tabs:['all','seckill']
	},
	{ timestamps: true } // 时间戳, 用于记录数据的创建时间和更新时间
);

// 创建模型, 对应数据库中的集合(products), 用于操作数据库
const Product = mongoose.model("product", Schema);

// 导出模型
module.exports = Product;
