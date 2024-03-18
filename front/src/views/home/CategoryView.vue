<template>
    <div class="category">
        <div v-for="(category,index) of categoryItems" :key="index" class="category-row">
            <div v-for="(item,index) of category" :key="index" class="category-item">
                <img class="item-img" :src="item.img" alt="" />
                <p class="item-title">{{ item.title }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Category",
    setup(){
        const categoryItems = [
            [
                {
                    img: require('../../assets/img/超市@3x.png'),
                    title: "超市便利"
                },
                {
                    img: require("../../assets/img/菜市场@3x.png"),
                    title: "菜市场"
                },
                {
                    img: require("../../assets/img/水果店@3x.png"),
                    title: "水果店"
                },
                {
                    img: require("../../assets/img/鲜花@3x.png"),
                    title: "鲜花绿植"
                },
                {
                    img: require("../../assets/img/医药健康@3x.png"),
                    title: "医药健康"
                },
            ],
            [
                {
                    img: require("../../assets/img/家居@3x.png"),
                    title: "家居时尚",
                },
                {
                    img: require("../../assets/img/蛋糕@3x.png"),
                    title: "洪培蛋糕",
                },
                {
                    img: require("../../assets/img/签到@3x.png"),
                    title: "签到",
                },
                {
                    img: require("../../assets/img/大牌免运@3x.png"),
                    title: "大牌免运",
                },
                {
                    img: require("../../assets/img/红包@3x.png"),
                    title: "红包套餐",
                },
            ]
        ];
        return {
            categoryItems,
        }
    }
}
</script>

<style lang="scss" scoped>
    .category{
    height: 46.4vw;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .category-row{
        display: flex;
        justify-content: space-evenly;
        height: 16.8vw;
        .category-item{
            width: 12.8vw;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            .item-img{
                width: 10.6667vw;
                height: 10.6667vw;
            }
            item-title{
                font-family: PingFangSC-Regular;
                font-size: 3.2vw;
                color: #333333;
                text-align: center;
            }
        }
    }
}
</style>