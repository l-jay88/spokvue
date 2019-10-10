<template>
    <div>
                <!-- 评论内容开始 -->
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span @click='sendComment'>提交评论</span>
                        <span><a @click = "goback">返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="msg"></textarea>
                </li>
                <li>
                   <mt-button size="large" type="primary" @click='sendComment'>发表评论按钮</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>99+</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for = "comment in commentData">
                    {{comment.user_name}}:{{comment.content}}{{comment.add_time | convertDate}}
                </li>
            </ul>
            <mt-button type="danger" size="large" plain @click="loadMore">加载更多按钮</mt-button>
        </div>

        <!-- 评论内容结束 -->

    
<!--改变颜色<mt-button type="default">default</mt-button>
<mt-button type="primary">primary</mt-button>
<mt-button type="danger">danger</mt-button> -->

<!-- 改变大小
<mt-button size="small">small</mt-button>
<mt-button size="large">large</mt-button>
<mt-button size="normal">normal</mt-button>
幽灵按钮
<mt-button type="danger" plain>plain</mt-button> -->


    </div>
</template>
<script>
    import {Toast} from "mint-ui"
    export default{
        data(){
            return{
                msg:'',
                commentData:[],
                pageindex:1
            }
        },
        props:['cid'],
        created(){
            this.loadFirst()
        },
        methods:{
            //获取第一页数据
            loadFirst(){
                this.$ajax.get("comment.php",{
                    params:{airtid:this.cid, pageindex:1}
                })
                .then(res=>{
                    // console.log(res.data)
                    this.commentData = res.data
                })
                .catch(err=>{
                    console.log(err)
                })
            },
            //获取更多数据
            loadMore(){
                this.$ajax.get("comment.php",{
                    params:{airtid:this.cid,pageindex:(++this.pageindex)}
                })
                .then(res=>{
                    // console.log(this.commentData.concat(res.data))
                    //如果是最后一页直接结束函数
                    if (res.data[0].user_name === undefined) {
                        // console.log(1)
                        Toast('已经没有更多评论了哦')
                        return
                    }
                    this.commentData = this.commentData.concat(res.data)
                    
                })
                .catch(err=>{
                    console.log(err)
                })
            },
            //发表评论
            sendComment(){
                if (!((/^[^\x00-\xff]+/).test(this.msg))) {
                    Toast('评论不能为空')
                    return
                }
                this.$ajax.post("comment.php",'airtid='+this.cid+'&content='+this.msg)
                .then(res=>{
                    console.log(res.data)
                    this.loadFirst()
                    this.msg = ''
                })
                .catch(err=>{
                    console.log(err)
                })
            },
            //返回
            goback(){
                this.$router.go(-1)
            }

        }
    }
</script>
<style scoped>
 /*评论样式 开始*/
 .photo-bottom{
    margin-bottom: 60px;
 }
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

/*评论样式 结束*/   
</style>