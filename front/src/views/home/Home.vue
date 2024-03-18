<template>
	<div class="container">
    <Header />
    <Banner />
    <Category />
    <Gap />
    <NearBy/>
    <Tabber/>
  </div>
</template>

<script>
// 1. 引入Home组件
import Header from "./HeaderView.vue";
import Banner from "./BannerView.vue";
import Category from "./CategoryView.vue";
import Gap from "./GapView.vue";
import NearBy from "./NearbyView.vue"
import Tabber from "../../components/Tabber.vue"
// 导出App组件
export default (await import('vue')).defineComponent({
	// 组件名
	name: "App",
	// 2. 组件注册
	components: {
    Header,
    Banner,
    Category,
    Gap,
    NearBy,
    Tabber,
  },
});
</script>

<style lang="scss">
  .container {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    overflow: auto;
}
</style>