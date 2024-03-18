import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "normalize.css"

//引入字体图标
import "./assets/font/iconfont.css"
//引入自定义css
import "./style/reset.css"

createApp(App).use(store).use(router).mount('#app')


