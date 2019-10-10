
//引入第三方包 开始
import Vue from 'vue'

//引入mint-ui
import Mint from 'mint-ui'
//引入 mint 样式
import 'mint-ui/lib/style.css'
//注册插件
Vue.use(Mint)

//MUI:引入mui的样式
import '../static/vendor/mui/dist/css/mui.css';
//全局样式
import '../static/css/global.css';

//引入路由
import VueRouter from 'vue-router'
//注册插件
Vue.use(VueRouter)

//引入 axios 
import Axios from 'axios'
//挂载到vue原型
Vue.prototype.$ajax = Axios
//设置默认 地址
Axios.defaults.baseURL = 'http://www.baiwei.com/AJAX/coms/'
//Axios:拦截器操作loading
Axios.interceptors.request.use(function(config){
	//显示图标
	Mint.Indicator.open({
  			text: '加载中...',
  			spinnerType: 'fading-circle'
		});
	return config
})
Axios.interceptors.response.use(function(config){
	//隐藏图标
	Mint.Indicator.close()
	return config
})

//引入moment
import Moment from 'moment'

//引入 vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
//引入第三方包 结束

// 引入全局组件 开始
import NavBar from './components/navbar/navbar.vue'
// 引入全局组件 结束


//定义全局组件或过滤器 开始
Vue.filter('convertDate',function(value){
	// console.log(Moment().format('YYYY-MM-DD'))
	return Moment(value).format('YYYY-MM-DD');
})

Vue.component('NavBar',NavBar)//顶部导航栏
Vue.component('Comment',Comment)//评论
 
//定义全局组件或过滤器 结束


//引入自己的vue文件==开始
import App from './app.vue'
import Home from './components/home/home.vue'
import Member from './components/member/member.vue'
import Search from './components/search/search.vue'
import Shopcart from './components/shopcart/shopcart.vue'
import NewList from './components/newlist/newlist.vue'
import NewsDetail from './components/newlist/newsdetail.vue'
import PhotoShare from './components/photo/photoshare.vue'
import PhotoDetail from './components/photo/photodetail.vue'
import Comment from './components/common/comment.vue'//评论
import GoodList from './components/goodlist/goodlist.vue'
// 引入自己的vue文件==结束


//配置路由规则
let router = new VueRouter({
	linkActiveClass:'mui-active',
	routes:[
	{path:'/',redirect:{name:'home'}},//重定向
	{name:'home',path:'/home',component:Home},//首页
	{name:'member',path:'/member',component:Member},//会员
	{name:'search',path:'/search',component:Search},//查找
	{name:'shopcart',path:'/shopcart',component:Shopcart},//购物车
	{name:'newlist',path:'/newlist',component:NewList},//新闻列表
	{name:'newsdetail',path:'/newsdetail',component:NewsDetail},//新闻详情
	{name:'photoshare',path:'/photo/share',component:PhotoShare},//图文分享
	{name:'photo.detail',path:'/photo/detail/:id',component:PhotoDetail},//图文详情
	{name:'good.list',path:'/good/list',component:GoodList}//商品列表
	]
})

//创建vue 实例
new Vue({
	el:'#app',
	router,//让vue 识别
	render:c=>c(App)
})