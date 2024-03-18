<template>
    <div class="container">
        <div class="head">
            <span class="iconfont icon-left" @click="toAddressList"></span>
            <span class="title">新建收货地址</span>
            <span class="button" @click="submitFrom">保存</span>
        </div>
        <div class="info">
            <div class="item">
                <span class="text">所在城市：</span>
                <input v-model="address.city" type="text" class="input-item" placeholder="如北京市" />
            </div>
            <div class="gap"></div>
            <div class="item">
                <span class="text">小区/大厦/学校：</span>
                <input v-model="address.community" type="text" class="input-item" placeholder="如理工大学国防科技园" />
            </div>
            <div class="gap"></div>
            <div class="item">
                <span class="text">楼号-门牌号：</span>
                <input v-model="address.building" type="text" class="input-item" placeholder="A号楼B层" />
            </div>
            <div class="gap"></div>
            <div class="item">
                <span class="text">收货人：</span>
                <input v-model="address.receiveName" type="text" class="input-item" placeholder="请填写收货人的姓名" />
            </div>
            <div class="gap"></div>
            <div class="item">
                <span class="text">联系电话：</span>
                <input v-model="address.phone" type="text" class="input-item" placeholder="请填写收货手机号" />
            </div>
        </div>
    </div>
    <Toast v-if="isShowToast" :message="toastMessage" />
</template>

<script>
import { reactive } from 'vue';
import Schema from "async-validator"
import router from "@/router"
import Toast, { showToastEffect } from "@/components/Toast.vue"
import { post } from "../../utils/request"
export default {
    name: "AddressCreate",
    components: {
        Toast,
    },
    setup() {
        //调用弹窗相关代码
        const { showToast, isShowToast, toastMessage } = showToastEffect();
        //定义响应式数据，存储新建的地址
        const address = reactive({
            //城市
            city: "",
            //社区/学校
            community: "",
            //楼号
            building: "",
            //收货人
            receiveName: "",
            //联系电话
            phone: "",
        });
        //定义表单输入规则
        const rule = {
            city: [
                {
                    required: true,
                    message: "城市不能为空",
                },
            ],
            community: [
                {
                    required: true,
                    message: "小区不能为空",
                },
            ],
            building: [
                {
                    required: true,
                    message: "楼号不能为空",
                },
            ],
            receiveName: [
                {
                    required: true,
                    message: "收货人不能为空",
                },
                {
                    pattern: /^[\u4e00-\u9fa5]{2,4}$/,
                    message: "请输入有效的中文名字",
                },
            ],
            phone: [
                {
                    required: true,
                    message: "联系电话不能为空",
                },
                {
                    pattern: /^1[0-9]{10}$/,
                    message: "请输入有效的手机号码",
                },
            ],
        };
        //校验表单
        const validateForm = async() => {
            //创建校验器
            const validator = new Schema(rule);
            try{
                //异步校验，参数为地址
                await validator.validate(address);
                //将地址转成普通对象
                const addressData = JSON.parse(JSON.stringify(address));
                //发送请求，获取响应数据
                const result = await post("/user/address", addressData);
                if(result.errno === 0){
                    showToast("创建成功");
                    //两秒后跳转到地址列表页
                    setTimeout(() => {
                        router.push("/address-list")
                    },2000)
                }else{
                    //新建失败
                    showToast(result.message)
                }
            }
            catch(errors){
                showToast(errors.errors[0].message);
            }
        }
        //返回上一页
        const toAddressList = () => {
            router.push("/address-list")
        }
        //表单验证
        const submitFrom = () => {
            validateForm();
        }
        return {
            toAddressList,
            address,
            submitFrom,
            isShowToast,
            toastMessage
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../style/address-common.scss";
</style>