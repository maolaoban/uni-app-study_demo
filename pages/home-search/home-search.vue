<template>
	<view class="home">
		<!-- 自定义导航栏 -->
		<navbar :isSearch="true"></navbar>
		<view class="home-list">
			<view class="label-box">
				<view class="label-header">
					<text class="label-header_history">搜索历史</text>
					<text class="label-header_null">清空</text>
				</view>
				<view class="label-content">
					<view class="label-content_item" v-for="item in 10">
						蛤蟆的油
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		width: 100%;
		display: flex;
		background-color: #f5f5f5;
	}
	.home{
		width: 100%;
		display: flex;
		flex-direction: column;
		felx:1;
		border: 1px solid red;
		.label-box{
			background-color: #FFFFFF;
			margin-bottom: 10rpx;
			.label-header{
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px solid #f5f5f5;
				.label-header_history{
					color: $mk-base-color;
				}
				.label-header_null{
					color: #30b33a;
					font-weight: bold;
				}
			}
			.label-content{
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;
				.label-content_item{
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px solid #666;
					font-size: 14px;
					color: #666;
				}
			}
		}
	}
</style>
