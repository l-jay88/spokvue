<template>
	<div>
		<nav-bar title = '图片详情'></nav-bar>
		<!-- 图片详情内容 -->
		<div class="mui-content detail-view" style="background-color:#fff">
		    <h5 style="color:#1ddaf3;font-size: 18px;font-weight: 700;" v-text = "info.title"></h5>
		    <span class="span">发起日期：{{info.add_time | convertDate}}</span>
		    <span class="span">{{info.click}}次浏览</span>
		    <span class="span">民生经济</span>
		   <!--  <ul class="mui-table-view mui-grid-view">
		        <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for = "img in imgs">
		            <a href="javascript:;">
		            	<p>
		            		<img class="mui-media-object" :src="img.src" >
		            	</p>
		                




		            </a></li></ul>  -->
        	<vue-preview class="preview" :slides="slide1" @close="handleClose" ></vue-preview>
		    <p v-text = "info.content"></p>
		</div>
		
		<!-- 评论 -->
		<Comment :cid = "pid"></Comment>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				 slide1: [],
				imgs:[],//详情图片
				info:[],//详情数据
				slideobject:{},
				pid: ''

			}
		},
		created(){
			this.pid = this.$route.params.id
			// 获取图片
			this.$ajax.get('photodetailimg.php',{
				params:{imgid:this.pid}
			})
			.then(res=>{
				// console.log(res.data)
				this.imgs = res.data

				//生成图片对象
				this.imgs.forEach((ele) =>{
					this.slideobject.src = ele.src
					this.slideobject.msrc = ele.src
					this.slideobject.alt = 'picture'
					this.slideobject.title = 'Img Caption'
					this.slideobject.h = 300
					this.slideobject.w = 300
					this.slide1.push(this.slideobject)

				})
				
			})
			.catch(err=>{
				consolog.log(err)
			})

			// 获取content
			this.$ajax.get('photodetailinfo.php',{
				params:{infoid:this.pid}
			})
			.then(res=>{
				// console.log(res.data[0])
				this.info = res.data[0]
			})
			.catch(err=>{
				consolog.log(err)
			})
		},
		methods: {
      		handleClose () {
        		console.log('close event')
      			}
    	}
	}
</script>
<style scoped>
	.detail-view{
		margin-top: 90px;
	}
	.span{
		font-size: 14px;
		margin-left: 15px;
	}

</style>
<style>
	.preview img{
		width: 150px;
	}
	.preview figure{
		margin: 0 0 0 5px;
		display: inline-block;
	}
</style>