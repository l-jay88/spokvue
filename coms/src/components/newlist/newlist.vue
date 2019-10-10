<template>
	<div>
		<!-- mui 新闻列表 导航栏 -->
		<nav-bar title = '新闻列表'></nav-bar> 
		<!-- mui - 新闻列表 -->
		<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for = "(news,index) in newlist" :key='news.id'>
					<router-link :to = "{name:'newsdetail',query:{id:news.id}}">
						<img class="mui-media-object mui-pull-left" :src="news.img_url">
						<div class="mui-media-body">
							{{news.title}}
							<p class="mui-ellipsis mui-ellip">
								<span class="click">点击数:{{news.click}}</span>
								<span class='addTime'>发表时间:{{news.add_time | convertDate}}</span>
							</p>
						</div>
					</router-link>
				</li>

			</ul>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				newlist:[]

			}
		},
		created(){
			this.$ajax.get('newlist.php')
			.then(res=>{
				// console.log(res.data)
				this.newlist = res.data
			})
			.catch(err=>{
				console.log(err)
			})
		}
	}
</script>
<style scoped>
	.mui-table-view{
		margin-bottom:50px;
		margin-top: 80px;
	}
	.mui-table-view .mui-ellip{
		font-size: 12px;
		color: #26a2ff;
		text-overflow:clip;
	}
	.mui-table-view .mui-ellip .click{
		text-align: left;
	}
	.mui-table-view .mui-ellip .addTime{
		/*display: block;*/
		margin-left: 60px;

	}
</style>