<template>
    <div class="container">
        <div class="head">
            <img src="../../assets/img/head-img.png" alt="" class="head-img" />
        </div>
        <div class="info">
            <input type="text" class="input-item phone" placeholder="请输入手机号" v-model="phone" />
            <input type="password" class="input-item pwd" placeholder="请输入密码" v-model="password" />
        </div>
        <div class="button" @click="handleLogin">登录</div>
        <div class="button-group">
            <a href="javascript:;" @click="handleRegister" class="button-group-item register-now">立即注册</a>
            <span class="gap button-group-item">|</span>
            <a href="javascript:;" class="forget-password button-group-item">忘记密码</a>
        </div>
    </div>
    <Toast v-if="isShowToast" :message="toastMessage" />
</template>

<script>
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { post } from "../../utils/request.js"
import Toast, { showToastEffect } from '../../components/Toast.vue'

//将登录逻辑拆分出来
const userLoginEffect = (showToast) => {
    const data = reactive({
        phone: "",
        password: "",
    });
    const router = useRouter()

    //点击登录，调用接口
    const handleLogin = async () => {
        //判断手机号和密码是否为空，去除首尾的空格
        if (data.phone.trim() === "" || data.password.trim() === "") {
            //提示用户账号密码不能为空
            showToast("用户名和密码不能为空!")
            return;
        }
        //使用正则判断手机号是否合法
        const reg = /^1[3-9]\d{9}$/;
        if (!reg.test(data.phone)) {
            //提示用户
            showToast("手机号不合法!");
            return;
        }
        try {
            const result = await post("/user/login", {
                username: data.phone,
                password: data.password,
            });
            if (result.errno === 0) {
                localStorage.setItem("isLogin", "true");
                router.push({ name: "Home" })
            } else {
                showToast("登录失败，请检查用户名或密码!")
            }
        } catch (error) {
            showToast("发送请求失败!")
            console.log(error)
        }
    }

    //返回数据
    const { phone, password } = toRefs(data);
    return {
        phone,
        password,
        handleLogin,
    }
}

//将跳转注册页面逻辑拆分出来
const userRegisterEffect = () => {
    const router = useRouter();
    const handleRegister = () => {
        router.push({ name: "Register" });
    }
    return {
        handleRegister,
    }
}
export default (await import('vue')).defineComponent({
    name: "Login",
    components: {
        Toast,
    },
    setup() {
        //弹框逻辑解构
        const { isShowToast, toastMessage, showToast } = showToastEffect();
        //登录验证逻辑解构
        const { phone, password, handleLogin } = userLoginEffect(showToast);
        //跳转注册页面解构
        const { handleRegister } = userRegisterEffect()
        return {
            handleLogin,
            handleRegister,
            phone,
            password,
            isShowToast,
            toastMessage
        }
    },
})
</script>

<style lang="scss" scoped>
@import '../../style/login-register-common.scss';
</style>