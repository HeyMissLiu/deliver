<template>
	<div class="toast">{{ message }}</div>
</template>
<script>

import { reactive, toRefs } from "vue";
export default(await import ('vue')).defineComponent( {
	name: "Toast",
	props:{
		message: {
			type: String,
			default: "",
		}
	}
});

export const showToastEffect = () => {
    //定义响应式数据，存储弹框相应的数据
    const toastData = reactive({
        isShowToast: false,
        toastMessage: "",
    })

    //封装弹框的方法
    const showToast = (message) => {
        toastData.isShowToast = true;
        toastData.toastMessage = message;
        setTimeout(() => {
            toastData.isShowToast = false;
            toastData.toastMessage = "";
        },2000)
    }

	//解构 toastData 中的数据
	const { isShowToast, toastMessage } = toRefs(toastData)
    return {
        isShowToast,
		toastMessage,
        showToast,
    }
}
</script>
<style lang="scss" scoped>
.toast {
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background-color: rgba(0, 0, 0, 0.5);
	padding: 3vw;
	border-radius: 1vw;
	color: #fff;
}
</style>