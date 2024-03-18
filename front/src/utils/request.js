import axios from 'axios'

//配置 axios, 设置 content-type
axios.defaults.headers.post["Content-Type"] = "application/json";

//配置 axios 基础路径
axios.defaults.baseURL = "api"

//设置允许跨域携带cookie
axios.defaults.withCredentials = true;

//响应拦截，将_id转成id
axios.interceptors.response.use((response) => {
    //如果响应状态码为200，直接返回响应的数据
    if(response.status === 200 && response.data.errno === 0){
        //将_id用id替换掉
        let dataStr = JSON.stringify(response.data).replace(/"_id"/g, '"id"');
        response.data = JSON.parse(dataStr)
        return response;
    }
    //如果响应的错误码为10003，说明登录信息过期，跳转到登录界面
    if(response.status === 200 && response.data.errno === 10003){
        //清除登录状态
        window.localStorage.removeItem("isLgin");
        //刷新页面
        window.location.reload();
    }
    else{
        return response
    }
})

//定义 post 方法，url：请求地址，data：数据
const post = (url, data = {}) => {
    //返回一个 promise 对象
    return new Promise((resolve, reject) => {
        //调用 axios 的 post 方法，传入 url 和 data
        axios
            .post(url, data)
            .then(
                (response) => {
                    resolve(response.data);
                },
                (error) => {
                    reject(error);
                }
            );
    });
};

//定义 get 方法，url:请求地址
const get = (url, params = {}) => {
    //返回一个 promise 对象
    return new Promise((resolve, reject) => {
        axios
            .get(url, { params })
            .then(
                (response) => {
                    resolve(response.data);
                },
                (error) => {
                    reject(error);
                }
            );
    })
};

const put = (url, data = {}) => {
    //返回一个promise对象
    return new Promise((resolve, reject) => {
        axios
            .put(url, data)
            .then(
                (response) => {
                    resolve(response.data);
                },
                (error) => {
                    reject(error);
                }
            );
    })
}
//导出 post 方法
export {
    post,
    get,
    put
}