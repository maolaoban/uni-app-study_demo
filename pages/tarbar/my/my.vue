<template>
	<view>
	<view class="my-header">
		<view class="my-header_background">
			<image :src="userInfo.avatar" mode="aspectFill"></image>
		</view>
		<view class="my-header_logo">
			<view class="my-header_logo-box">
				<image :src="userInfo.avatar" mode="aspectFill"></image>
			</view>
			<text class="my-header_name">{{userInfo.author_name}}</text>
		</view>
		<view class="my-header_info">
			<view class="my-header_info-box">
				<text class="my-header_info-title">被关注</text>
				<text>{{userInfo.follow_count}}</text>
			</view>
			<view class="my-header_info-box">
				<text class="my-header_info-title">粉丝</text>
				<text>{{userInfo.fans_count}}</text>
			</view>
			<view class="my-header_info-box">
				<text class="my-header_info-title">积分</text>
				<text>{{userInfo.integral_count || 0}}</text>
			</view>
		</view>
	</view>
	<view class="my-content">
		<view class="my-content_list" @click="openMyArticle">
			<view class="my-content_list-title">
				<uni-icons type="contact" size="16" color="#666"></uni-icons>
				<text>我的文章</text>
			</view>
			<uni-icons type="arrowright" size="24" color="#666"></uni-icons>
		</view>
		<view class="my-content_list" @click="openFeedBack">
			<view class="my-content_list-title">
				<uni-icons type="help" size="16" color="#666"></uni-icons>
				<text>意见反馈</text>
			</view>
			<uni-icons type="arrowright" size="24" color="#666"></uni-icons>
		</view>
	</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		onLoad() {
			console.log(this.userInfo);
		},
		methods: {
			openMyArticle(){
				uni.navigateTo({
					url:'../../my-article/my-article'
				})
			},
			openFeedBack(){
				uni.navigateTo({
					url:'../../feedback/feedback'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.my-header{
		padding-bottom: 15px;
		position: relative;
		.my-header_background{
			position: absolute;
			top:0;
			bottom: 0;
			left: 0;
			right: 0;
			filter: blur(8px);
			opacity: 0.3;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.my-header_logo{
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 30px;
			.my-header_logo-box{
				width: 60px;
				height: 60px;
				border-radius: 50%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.my-header_name{
				margin-top: 15px;
				font-size: 16px;
				font-weight: bold;
			}
		}
		.my-header_info{
			margin-top: 15px;
			display: flex;
			.my-header_info-box{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 100%;
				font-size: 12px;
				color: #999;
				.my-header_info-title{
					font-size: 14px;
					color: #333;
				}
			}
		}
	}
	.my-content{
		margin-top: 10px;
		.my-content_list{
			display: flex;
			justify-content: space-between;
			padding: 15px;
			margin-bottom: 10px;
			background-color: #FFFFFF;
			color: #333;
			font-size: 14px;
			.my-content_list-title{
				display: flex;
				align-items: center;
				text{
					margin-left: 5px;
				}
			}
		}
	}
</style>
