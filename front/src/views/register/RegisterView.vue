<template>
    <div class="container">
        <div class="head">
            <img src="../../assets/img/head-img.png" alt="" class="head-img" />
        </div>
        <div class="info">
            <input type="text" class="input-item phone" placeholder="请输入手机号" v-model="username"/>
            <input type="password" class="input-item pwd" placeholder="请输入密码" v-model="password"/>
            <input type="password" class="input-item pwd" placeholder="确认密码" v-model="confirmPassword"/>
        </div>
        <div class="button" @click="handleRegister">注册</div>
        <div class="button-group">
            <a href="javascript:;" @click="handleLogin" class="button-group-item login-now">已有账号去登录</a>
        </div>
    </div>
    <Toast v-if="isShowToast" :message="toastMessage" />
</template>

<script>
    import { useRouter } from "vue-router";
    import { reactive, toRefs } from "vue";
    import { post } from "@/utils/request";
    import Toast, {showToastEffect} from "../../components/Toast.vue"

    //将跳转到登录页逻辑封装
    const userLoginEffect = () => {
        const router = useRouter();
        const handleLogin = () => {
            router.push({ name: "Login"});
        }
        return{
            handleLogin,
        }
    }
    //封装注册验证逻辑
    const userRegisterEffect = (showToast) => {
        const data = reactive({
            username: "",
            password: "",
            confirmPassword: "",
        })

        const router = useRouter();

        //定义验证逻辑
        const handleRegister = async() => {
            if(data.username.trim() === "" || data.password.trim() === ""){
                showToast("用户名和密码不能为空!")
                return;
            }
            //定义正则表达式验证手机号
            const reg = /^1[3-9]\d{9}$/;
            if(!reg.test(data.username)){
                showToast("手机号不合法!");
                return;
            }
            if(data.password !== data.confirmPassword){
                showToast("两次输入的密码不一致!");
                return;
            }
            //发送请求
            try{
                const result = await post("/user/register",{
                    username: data.username,
                    password: data.password,
                })
                if(result.errno === 0){
                    showToast("注册成功");
                    //成功跳转到登录页，两秒后跳转
                    setTimeout(() => {
                        router.push({ name: "Login"});
                    },2000)
                    
                }else{
                    showToast("注册失败，请重试!");
                }
            }catch(error){
                showToast("发送请求失败!")
            }
        }

        //将数据拆分
        const { username, password, confirmPassword } = toRefs(data)
        return{
            username,
            password,
            confirmPassword,
            handleRegister,
        }
    }

    export default(await import("vue")).defineComponent({
        name: "Register",
        components: {
            Toast,
        },
        setup(){
            const { isShowToast, toastMessage, showToast } = showToastEffect();
            const { username, password, confirmPassword, handleRegister } = userRegisterEffect(showToast);
            const { handleLogin } = userLoginEffect();
            return {
                handleLogin,
                isShowToast,
                toastMessage,
                username,
                password,
                confirmPassword,
                handleRegister
            }
        },
    });
</script>

<style lang="scss" scoped>
    @import '../../style/login-register-common.scss';
</style>