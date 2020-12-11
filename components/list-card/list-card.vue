<template>
	<view>
		<!-- 基础卡片 -->
		<view class="listcard" v-if="item.mode === 'base'">
			<view class="listcard-image">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="listcard-content">
				<view class="listcard-content_title">
					<text>
						{{item.title}}
					</text>
					<likes :item="item"></likes>
				</view>
				<view class="listcard-content_des">
					<view class="listcard-content_des-label">
						<view class="label-item">
							{{item.classify}}
						</view>
					</view>
					<view class="listcard-content_des-browse">
						{{item.browse_count}}人浏览
					</view>
				</view>
			</view>
		</view>
		<!-- 多图 -->
		<view class="listcard mode-column" v-if="item.mode === 'image'">
			<view class="listcard-content">
				<view class="listcard-content_title">
					<text>
						{{item.title}}
					</text>
					<likes :item="item"></likes>
				</view>
				<view class="listcard-image">
					<view class="listcard-image_item" v-if="index < 3" v-for="(item,index) in item.cover">
						<image :src="item" mode="aspectFill"></image>
					</view>
				</view>
				<view class="listcard-content_des">
					<view class="listcard-content_des-label">
						<view class="label-item">
							{{item.classify}}
						</view>
					</view>
					<view class="listcard-content_des-browse">
						{{item.browse_count}}人浏览
					</view>
				</view>
			</view>
		</view>
		<!-- 大图 -->
		<view class="listcard mode-image" v-if="item.mode === 'column'">
			<view class="listcard-image">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="listcard-content">
				<view class="listcard-content_title">
					<text>
						{{item.title}}
					</text>
					<likes :item="item"></likes>
				</view>
				<view class="listcard-content_des">
					<view class="listcard-content_des-label">
						<view class="label-item">
							{{item.classify}}
						</view>
					</view>
					<view class="listcard-content_des-browse">
						{{item.browse_count}}人浏览
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			mode:{
				type:String,
				default:'base'
			},
			item:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.listcard{
		display: flex;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		box-shadow:  0 0 5px 1px rgba($color: #000000, $alpha: .1);
		.listcard-image{
			flex-shrink: 0;
			width: 60px;
			height: 60px;
			border-radius: 5px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.listcard-content{
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			padding-left: 10px;
			width: 100%;
			.listcard-content_title{
				font-size: 14px;
				color: #333;
				font-weight: 400;
				line-height: 1.2;
				display: flex;
				justify-content: space-between;
				text{
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp:2;
					-webkit-box-orient:vertical;
				}
			}
			.listcard-content_des{
				display: flex;
				justify-content: space-between;
				font-size: 12px;
				.listcard-content_des-label{
					display: flex;
					.label-item{
						padding: 0 5px;
						margin-left: 5px;
						border-radius: 15px;
						color:$mk-base-color;
						border:1px solid $mk-base-color;
					}
				}
				.listcard-content_des-browse{
					color:#999;
					line-height: 1.5;
				}
			}
		}
		&.mode-column{
			.listcard-content{
				width: 100%;
				padding-left: 0;
			}
			.listcard-image{
				display: flex;
				margin-top:10px;
				width: 100%;
				height:70px;
				.listcard-image_item{
					margin-left: 10px;
					width: 100%;
					border-radius: 5px;
					overflow: hidden;
					&:first-child{
						margin-left: 0;
					}
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
			.listcard-content_des{
				margin-top: 10px;
			}
		}
		&.mode-image{
			flex-direction: column;
			.listcard-image{
				width: 100%;
				height: 100px;
			}
			.listcard-content{
				padding-left: 0;
				margin-top: 10px;
				.listcard-content_des{
					display: flex;
					align-items: center;
					margin-top: 10px;
				}
			}
		}
	}
</style>
