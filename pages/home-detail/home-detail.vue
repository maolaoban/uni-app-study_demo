<template>
	<view class="detail">
		<view class="detail-title">
			{{formData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-avatar">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header_content">
				<view class="detail-header_name">
					{{formData.author.author_name}}
				</view>
				<view class="detail-header_info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}} 浏览</text>
					<text>{{formData.thumbs_up_count}} 赞</text>
				</view>
			</view>
			<button type="default" class="detail-header_button" @click="follow(formData.author.id)">{{formData.is_author_like?'已关注':'关注'}}</button>
		</view>
		
		<view class="detail-content">
			<view class="detail-html">
				<u-parse :content="formData.content" :noData="noData"></u-parse>
			</view>
			
			<view class="detail-comment">
				<view class="comment-title">
					最新评论
				</view>
				<view class="comment-content">
					<view v-for="(item,index) in commentList" :key="item.comment_id">
						<comment-box :comment="item" @reply="reply"></comment-box>
					</view>
				</view>
			</view>
		</view>
		
		<view class="detail-bottom">
			<view class="detail-bottom_input" @click="openConment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom_box">
				<view class="detail-bottom_icons" @click="openComment">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom_icons" @click="likeBtn(formData._id)">
					<uni-icons :type="formData.is_like?'heart-filled':'heart'" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom_icons" @click="addThumbs(formData._id)">
					<uni-icons :type="formData.is_thumbs_up?'hand-thumbsup-filled':'hand-thumbsup'" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header_item" @click="close">取消</text>
					<text class="popup-header_item" @click="submit">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="commentValue" maxlength="200" fixed="true" placeholder="谈谈你的看法..." />
					<view class="popup-count">
						{{commentValue.length}}/200
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue';
	
	export default {
		data() {
			return {
				formData:{},
				noData:'<p style="text-align:center;color:#666;">详情加载中...</p>',
				commentValue:'',
				commentList:[],
				replyFormData:{}
			}
		},
		components:{
			uParse
		},
		onLoad(query) {
			console.log(JSON.parse(query.params));
			this.formData = JSON.parse(query.params);
			this.getDetail();
			this.getComments();
		},
		onReady() {
			
		},
		methods: {
			openComment(){
				uni.navigateTo({
					url:'../detail-comment/detail-comment'
				})
			},
			//打开弹窗
			openConment(){
				this.$refs.popup.open();
			},
			//关闭弹窗
			close(){
				this.$refs.popup.close();
			},
			//发布
			submit(){
				if(!this.commentValue){
					uni.showToast({
						title:'评论不能为空',
						icon:'none'
					})
					return;
				}
				this.setUpdateComment({
					content:this.commentValue,
					...this.replyFormData
				});
			},
			reply(e){
				this.replyFormData = {
					comment_id: e.comment.comment_id,
					is_reply:e.is_reply
				}
				if(e.comment.reply_id){
					this.replyFormData.reply_id = e.comment.reply_id
				}
				this.openConment();
				console.log(this.replyFormData);
			},
			getDetail(){
				this.$api.get_detail({
					article_id:this.formData._id
				}).then(res => {
					const {data} = res;
					this.formData = data;
					console.log('---formData---',this.formData);
				})
			},
			setUpdateComment(content){
				const paramsData = {
					article_id:this.formData._id,
					...content
				}
				console.log(paramsData);
				uni.showLoading();
				this.$api.update_comment(paramsData)
				.then(res => {
					console.log(res);
					uni.hideLoading();
					uni.showToast({
						title:'评论发布成功!',
						icon:'none'
					})
					this.commentValue = '';
					this.getComments();
					this.close();
					this.replyFormData = {};
				})
			},
			getComments(){
				this.$api.get_comment({
					article_id:this.formData._id
				}).then(res => {
					console.log(res);
					let {data} = res;
					this.commentList = data;
				})
			},
			follow(id){
				this.$api.update_author({
					author_id:id
				}).then(res => {
					console.log(res);
					this.formData.is_author_like = !this.formData.is_author_like;
				})
			},
			likeBtn(id){
				this.$api.update_like({
					article_id:id
				}).then(res => {
					console.log(res);
					this.formData.is_like = !this.formData.is_like;
					uni.$emit('update-article');
				})
			},
			addThumbs(id){
				this.$api.update_thumbs({
					article_id:id
				}).then(res => {
					console.log(res);
					this.formData.is_thumbs_up = true;
					this.formData.thumbs_up_count++;
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail{
		padding: 15px 0;
		padding-bottom: 50px;
	}
	.detail-title{
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}
	.detail-header{
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;
		.detail-avatar{
			flex-shrink: 0;
			width: 40px;
			height:40px;
			border-radius: 50%;
			overflow: hidden;
			image{
				width: 100%;
				height:100%;
			}
		}
		.detail-header_content{
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;
			padding-left: 10px;
			.detail-header_name{
				font-size: 14px;
				color: #333;
			}
			.detail-header_info{
				color:#999;
				text{
					margin-right: 10px;
				}
			}
		}
		
		.detail-header_button{
			flex-shrink: 0;
			height: 30px;
			font-size: 12px;
			background-color: $mk-base-color;
			color:#fff;
		}
	}
	.detail-content{
		width: 100%;
		margin-top: 10px;
		.detail-html{
			padding: 10px 15px;
		}
		.detail-comment{
			margin-top: 30px;
			.comment-title{
				padding: 10px 15px;
				font-size: 16px;
				font-weight: bold;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;
			}
			.comment-content{
				padding: 0 15px;
				border-top: 1px #eee solid;
			}
		}
	}
	
	.detail-bottom{
		height: 50px;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		border-top: 1px solid #f5f5f5;
		box-sizing: border-box;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px;
		.detail-bottom_input{
			width: 70%;
			height: 30px;
			border: 1px solid #ddd;
			border-radius: 15px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 10px;
			text{
				color: #999;
				font-size: 14px;
			}
		}
		.detail-bottom_box{
			width: 30%;
			display: flex;
			justify-content: space-around;
			flex-shrink: 0;
			padding: 0 10px;
		}
	}
	.popup-wrap{
		background-color: #fff;
		.popup-header{
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color:#666;
			border-bottom: 1px solid #f5f5f5;
			.popup-header_item{
				height: 50px;
				line-height: 50px;
				padding: 0 15px;
			}
		}
		.popup-content{
			width: 100%;
			padding: 15px;
			box-sizing: border-box;
			.popup-textarea{
				width: 100%;
				height: 200px;
			}
			.popup-count{
				display: flex;
				justify-content: flex-end;
				font-size: 14px;
				color: #999;
			}
		}
	}
</style>
