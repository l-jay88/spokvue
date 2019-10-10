<template>
	<div>
		<!--  home 轮播图 --> 
		<mt-swipe :auto="4000">
  			<mt-swipe-item v-for = "(img,index) in imgs" :key = 'index' ><a :href="img.sourse"><img :src="img.image"></a></mt-swipe-item>
		</mt-swipe>
		<!-- home 九宫格 -->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link :to="{name:'newlist'}">
		                    <span class="mui-icon mui-icon-home"></span>
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link :to = "{name:'photoshare'}">
		                    <span class="mui-icon mui-icon-email"></span>
		                    <div class="mui-media-body">图文分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link :to = "{name:'good.list'}">
		                    <span class="mui-icon mui-icon-chatbubble"></span>
		                    <div class="mui-media-body" >商品展示</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-location"></span>
		                    <div class="mui-media-body">留言返馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-search"></span>
		                    <div class="mui-media-body">搜索咨询</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-phone"></span>
		                    <div class="mui-media-body">联系我们</div></a></li>
		           
		        </ul>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				imgs:[]
			}
		}, 
		created(){
			this.$ajax.get('json.php')
			.then(res=>{
				this.imgs = res.data
				// console.log(this.imgs)

			})
			.catch(err=>{
				console.log(err)
			})
		}
	}
</script>
<style scoped>
	/*轮播图样式*/
	.mint-swipe{
		height: 187px;
	}
	.mint-swipe-item img{
		height: 100%;
		width: 100%
	}
	/*九宫格样式*/
	.mui-table-view{
		background-color: white;
		border: 0; 
	}
	.mui-table-view .mui-table-view-cell{
		border: 0;
	}

	/*九宫格 清除图标*/
	.mui-icon-home:before,
	.mui-icon-email:before,
	.mui-icon-chatbubble:before,
	.mui-icon-location:before,
	.mui-icon-search:before,
	.mui-icon-phone:before
	{
		content:"";
	}
	/*九宫格 添加背景*/
	.mui-icon-home{
		background-image:url('../../../static/img/news.png');
	}
	.mui-icon-email{
		background-image:url('../../../static/img/picShare.png');
	}
	.mui-icon-chatbubble{
		background-image:url('../../../static/img/goodShow.png');
	}
	.mui-icon-location{
		background-image:url('../../../static/img/feedback.png');
	}
	.mui-icon-search{
		background-image:url('../../../static/img/search.png');
	}
	.mui-icon-phone{
		background-image:url('../../../static/img/callme.png');
	}
	.mui-icon{
		background-repeat: round;
		height: 50px;
		width: 50px;
	}


	
</style>