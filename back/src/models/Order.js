/**
 * @description Order Model, 订单模型, 用于存储订单信息
 */

// 引入mongoose, 用于操作数据库, 以及定义数据结构
const mongoose = require("../db/db");

// 创建Schema, 用于定义数据结构, 以及数据类型, 以及是否必需, 是否唯一, 默认值等, 用于约束数据
const Schema = mongoose.Schema(
	{
		address: {
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
		// 订单是否已经取消
		isCanceled: {
			type: Boolean, // 数据类型, 布尔值
			default: false, // 默认值, false
		},
		id: String, // 商店id
		logo: String, // 商店logo
		title: String, // 商店名
		tags: [String], // 商店标签
		promotion: String, // 商店促销信息
		// 用户名
		username: {
			type: String, // 数据类型, 字符串
			require: true, //必需
		},
		// 订单商品, 数组, 数组中的每一项是一个对象, 对象中包含商品信息
		products: [
			{
				// 商品id
				id: {
					type: String, // 数据类型, 字符串
					require: true, // 必需
				},
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
				// 商品现价
				currentPrice: Number,
				// 商品原价
				previousePrice: Number,
				// 商品标签
				tags: [String], //示例 tabs:['all','seckill']
				// 购物车中商品数量
				cartCount: {
					type: Number, // 数据类型, 数字
				},
			},
		],
	},
	{ timestamps: true } // 时间戳, 用于记录数据的创建时间和更新时间
);

// 创建模型, 对应数据库中的集合(orders), 用于操作数据库
const Order = mongoose.model("order", Schema);

// 导出模型
module.exports = Order;
