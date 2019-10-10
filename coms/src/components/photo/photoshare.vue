<template>
	<div>
		<!-- 图片分享导航栏 -->
		<nav-bar title = '图文分享'></nav-bar>
		<!-- 分类栏 -->
		<section class="category">
			<ul class="category-view">
			<li v-for ="category in categorys" :key = "category.id"><a href="javascript:;" @click = "loadimg(category.id)">{{category.title}}</a></li>
		</ul>
		</section>

		<!-- 图文分享卡片 -->
		<section class="card-view">
			<div class="mui-card" v-for = "img in imgs" :key = "img.id">
				<div class="mui-card-header mui-card-media">
					<!-- <img :src="img.img_url"> -->
					<div class="mui-media-body">
						小M
						<p>发表于 2019-06-30 15:30</p>
					</div>
				</div>
				<div class="mui-card-content">
					<router-link :to = "{name:'photo.detail',params:{id:img.id}}">
						<img v-lazy="img.img_url" alt="" width="100%">
					</router-link>
				</div>
				<div class="mui-card-footer">
					<!-- <a class="mui-card-link">Like</a> -->
					<!-- <a class="mui-card-link">Comment</a>
					<a class="mui-card-link">Read more</a> -->
					<span v-text = "img.title"></span>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				categorys:[],
				imgs:[]
			}
		},
		created(){
			// 发起请求获取导航栏数据
			this.$ajax.get("category.php")
			.then(res=>{
				// console.log(res.data)
				this.categorys = res.data
				// 将全部添加到数组的第一个
				this.categorys.unshift({
					id: 'all',
					title: '全部'
				})
			})
			.catch(err=>{
				console.log(err)
			})

			// 发起请求获取图片数据
			// this.$ajax.get("getitemages.php",{
			// 	params:{id:'all'}
			// })
			// .then(res=>{
			// 	// console.log(res.data)
			// 	this.imgs = res.data
			// 	console.log(this.imgs)
			// })
			// .catch(err=>{
			// 	console.log(err)
			// })

			this.loadimg('all')
		},
		methods:{
			loadimg(imgid){
				this.$ajax.get("getitemages.php",{
				params:{id:imgid}
			})
			.then(res=>{
				// console.log(res.data)
				this.imgs = res.data
				// console.log(this.imgs)
			})
			.catch(err=>{
				console.log(err)
			})
			}
		}
	}
</script>
<style>
	.category{
		margin-top: 86px;
		/*width: 100%;
		overflow: scroll;*/
	}
	.category-view{
		width: 100%;
		overflow: scroll;
		white-space:nowrap;   
		padding-left: 0;
		margin:10px 0;
	}
	.category-view li{
		display: inline-block;
		margin: 5px 0 0 15px;
	}
	/*图文卡片样式*/
	.card-view{
		margin-bottom: 60px;
	}
	/*懒加载样式*/
	image[lazy=loading] {
	  width: 40px;
	  height: 300px;
	  margin: auto;
	}

</style>