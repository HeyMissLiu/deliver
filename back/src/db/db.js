/**
 * @description mongoose 连接数据库, 并导出mongoose对象, 供其他模块使用
*/
const mongoose = require("mongoose");


//开始连接, 连接成功后会触发mongoose.connection的open事件
mongoose.connect(`mongodb://127.0.0.1:27017/JD`, {
	useNewUrlParser: true, //使用新的url解析器，用于解决一些安全性问题
	useUnifiedTopology: true, //使用统一的拓扑结构
});

//连接对象, 用于监听连接成功或者失败
const db = mongoose.connection;
// 连接失败
db.on("error", (err) => {
	console.error("mongoose connect error", err);
});
// db.once 监听一次open事件, 用于监听连接成功, 一旦连接成功, 就不会再监听, 所以用once, 而不是on, on会一直监听
db.once('open', () => {
    console.log('mongoose连接成功')
})

//导出mongoose对象
module.exports = mongoose;
