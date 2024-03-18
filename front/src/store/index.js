import { createStore } from 'vuex'

//定义保存购物车数据方法
const setLocalCartData = (state) => {
  //获取购物车数据
  const { cartData } = state;
  //将数据转成 JSON 字符串
  const cartDataStirng = JSON.stringify(cartData)
  //保存到 localStorage
  localStorage.cartData = cartDataStirng;
}

//定义从缓存中获取购物车数据方法
const getLocalCartData = () => {
  let result = [];
  if(localStorage.cartData){
    result = JSON.parse(localStorage.cartData);
  };
  return result;
}

export default createStore({
  state: {
      cartData: getLocalCartData(),
  },
  getters: {
  },
  mutations: {
    changeProductCount(state,payload){
      //从payload中获取传递过来的参数
      //shopInfo：店铺信息，productInfo：商品信息，productNumber：购物车添加的商品数量
      //shopInfo 的作用是：通过id获取store中的店铺信息，shopInfo中不包含商品信息
      const { shopInfo, productInfo, productNumber } = payload;
      //先判断 state（购物车数据） 中是否有 shopInfo 这个商铺
      const shop = state.cartData.find((item) => {
        if(item.id === shopInfo.id){
          return true;
        }
      });
      //如果没有这个商铺，则添加这个商铺以及商品的购物车信息
      if(!shop){
        //修改商品的购物车信息
        productInfo.productCount += productNumber;
        //把商品选中
        productInfo.checked = true;
        //把商品加入到 shopInfo 中, 将shopInfo中的数据和商品数据合并，形成完整的cartData中的数据
        shopInfo.products = [];
        shopInfo.products.push(productInfo);
        //把shopInfo加入到state.cartData中
        state.cartData.push(shopInfo);
      }
      //如果有这个商铺，判断购物车中是否有这个商品
      else{
        const product = shop.products.find((item) => {
          if(item.id === productInfo.id){
            return true;
          }
        })
        //如果没有，添加这个商品
        if(!product){
          //修改商品的购物车数量
          productInfo.productCount += productNumber;
          //把商品选中
          productInfo.checked = true;
          //把商品加入shopInfo中
          shop.products.push(productInfo);
        }
        else{
          //如果有这个商品，修改购物车数量
          product.productCount += productNumber;
          //选中商品
          product.checked = true;
          //如果购物车数量为0，删除该商品
          if(product.productCount === 0){
            //获取这个商品的索引
            const index = shop.products.findIndex((item) => {
              if(item.id === product.id){
                return true;
              }
            })
            //删除这个商品
            shop.products.splice(index,1);
            //如果该购物车中没有商品了，删除该购物车
            if(shop.products.length === 0){
              //获取该商铺的索引
              const index = state.cartData.findIndex((item) => {
                if(item.id === shop.id){
                  return true;
                }
              });
              //删除这个商铺
              state.cartData.splice(index,1);
            }
          }
        }
      }
      setLocalCartData(state);
    },
    //改变商品选中状态
    changeItemChecked(state,payload){
      //获取shopId：商铺id、productId：商品id 和 checked：选中状态
      const {shopId, productId, checked} = payload;
      //通过shopId 和 productId找到对应的商品
      const shop = state.cartData.find((item) => {
        if(item.id === shopId){
          return true;
        }
      });
      const product = shop.products.find((item) => {
        if(item.id === productId){
          return true;
        }
      });
      //修改商品的选中状态
      product.checked = !checked;
      setLocalCartData(state);
    },
    //清除购物车中所有数据
    clearCart(state,payload){
      const { shopId } = payload;
      state.cartData = state.cartData.filter(item => {
        return item.id !== shopId
      })
      
      setLocalCartData(state);
    }
  },
  actions: {
  },
  modules: {
  }
})
