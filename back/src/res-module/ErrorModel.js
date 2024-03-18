/**
 * @description 错误返回的数据模型
 * @author XuJunhao
 */

// 错误返回的数据模型
class ErrorModel {
	// 错误返回的数据模型, 默认错误码为-1, 默认错误信息为"error"
	constructor(errno = -1, message = "error") {
		// 错误码, 默认为-1
		this.errno = errno;
		// 返回时携带错误信息
		this.message = message;
	}
}

// 导出模块
module.exports = ErrorModel;
