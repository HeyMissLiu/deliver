import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "@/views/home/Home.vue"
import Login from "@/views/login/LoginView.vue"
import Register from "@/views/register/RegisterView.vue"
import Shop from "@/views/shop/ShopView.vue"
import OrderConfirmation from '@/views/order/OrderConfirmationView.vue'
import OrderList from "@/views/order/OrderListView.vue"
import Cart from "@/views/cart/CartView.vue"
import User from "@/views/user/UserView.vue"
import AddressList from "@/views/address/AddressListView.vue"
import AddressCreate from "@/views/address/AddressCreateView.vue"
import AddressEdit from "@/views/address/AddressEditView.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to,from,next) => {
      if(localStorage.isLogin === "true"){
        next({name: "Home"});
      }else{
        next();
      }
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: (to,from,next) => {
      if(localStorage.isLogin === "true"){
        next({ name: 'Home'})
      }else{
        next()
      }
    }
  },
  {
    path: "/shop/:id",
    name: "Shop",
    component: Shop,
  },
  {
    path: "/order-confirmation/:id",
    name: "OrderConfirmation",
    component: OrderConfirmation,
  },
  {
    path: "/order-list",
    name: "OrderList",
    component: OrderList,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/address-list",
    name: "AddressList",
    component: AddressList
  },
  {
    path: "/address-create",
    name: "AddressCreate",
    component: AddressCreate
  },
  {
    path: "/address-edit/:id",
    name: "AddressEdit",
    component: AddressEdit
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



router.beforeEach((to,from,next) => {
  if(localStorage.isLogin === "true" || to.name === "Login" || to.name === "Register"){
    next();
  }else{
    next({name: "Login"});
  }
})

export default router
