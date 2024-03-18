const Koa = require("koa");

const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
// 登录验证
const session = require("koa-generic-session");
// 跨域
const cors = require("koa2-cors");
const app = new Koa();
//cors配置, 允许跨域
app.use(
	cors({
		origin: function(ctx){
			console.log(ctx)
			return "http:192.168.1.6:8080";
		},
		methods:['GET','POST','PUT'],
		credentials: true, //允许跨域携带cookie, 否则session无法使用
	})
);

const index = require("./routes/index");
const users = require("./routes/users");
const addressRouter = require("./routes/address");
const shopRouter = require("./routes/shop");
const orderRouter = require("./routes/order");

// error handler
onerror(app);

//配置session
app.keys = ["7.rC28eTKKK3AV7"]; //秘钥，用于加密
app.use(
	session({
		//配置cookie
		cookie: {
			path: "/",
			httpOnly: true, //只能通过后端修改cookie，不允许前端js改
			maxAge: 24 * 60 * 60 * 1000, //24h
		},
	})
);

// middlewares
app.use(
	bodyparser({
		enableTypes: ["json", "form", "text"],
	})
);
app.use(json());
app.use(logger());
// 静态资源, 通过public, 可以访问到public下的所有文件, 包括各种图片
app.use(require("koa-static")(__dirname + "/public"));

app.use(
	views(__dirname + "/views", {
		extension: "pug",
	})
);

// logger
app.use(async (ctx, next) => {
	//ctx.set("Access-Control-Allow-Origin","https://deliver.goel4.cloud")
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(addressRouter.routes(), addressRouter.allowedMethods());
app.use(shopRouter.routes(), shopRouter.allowedMethods());
app.use(orderRouter.routes(), orderRouter.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
	console.error("server error", err, ctx);
});

module.exports = app;
