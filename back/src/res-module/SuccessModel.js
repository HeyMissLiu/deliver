/**
 * @description 成功返回的数据模型
 * @author XuJunhao
 */

/**
 * 成功返回的数据模型
 */
class SuccessModel {
	// 只需要传入数据, 默认成功码为0
	constructor(data) {
		// 如果成功, errno为0
		this.errno = 0;
		// 如果有数据, 则返回时携带数据
		if (data != null) {
			this.data = data;
		}
	}
}
// 导出模块
module.exports = SuccessModel;
