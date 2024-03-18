/**
 * @description 返回数据模型 入口文件
 */

// 导入模块
const SuccessModel = require("./SuccessModel"); // 处理成功返回的数据
const ErrorModel = require("./ErrorModel"); // 处理失败返回的数据

// 导出模块
module.exports = { SuccessModel, ErrorModel };
