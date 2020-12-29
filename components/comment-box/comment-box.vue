<template>
	<view class="comment-box">
		<view class="comment-header">
			<view class="comment-header_avatar">
				<image :src="comment.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comment-header_Info">
				<view class="comment-header_name">
					{{comment.author.author_name}}
				</view>
				<view class="comment-header_data">
					{{comment.create_time | create_time}}
				</view>
			</view>
		</view>
		
		<view class="comment-content">
			<view>{{comment.comment_content}}</view>
			<view class="comment-info">
				<view class="comment-button" @click="commentReply({comment,is_reply:reply})">
					回复
				</view>
			</view>
			
			<view class="comment-reply" v-for="(item,index) in comment.replys" :key="item.comment_id">
				<comment-box :reply="true" :comment="item" @reply="commentReply"></comment-box>
			</view>
		</view>
	</view>
</template>

<script>
	import commentBox from '@/components/comment-box/comment-box.vue';
	import {parseTime} from '@/utils/index.js';
	export default {
		name:'comment-box',
		props:{
			comment:{
				type:Object,
				default(){
					return {}
				}
			},
			reply:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				
			};
		},
		components:{
			commentBox
		},
		filters:{
			create_time(time){
				// let times  = new Date(time);
				// let year = times.getFullYear();
				// let month = times.getMonth() + 1;
				// let days = times.getDate();
				// let hours = times.getHours();
				// let seconds = times.getMinutes();
				// return year + '-' + month + '-' + days + ' ' + hours + ':' +seconds
				return parseTime('yyyy-mm-dd hh:ii',new Date(time));
			}
		},
		methods:{
			commentReply(params){
				// console.log('params',params);
				if(params.is_reply){
					params.comment.reply_id = params.comment.comment_id,
					params.comment.comment_id = this.comment.comment_id
				}
				// console.log(params);
				this.$emit('reply',params);
			}
		}
	}
</script>

<style lang="scss">
	.comment-box{
		margin: 15px 0;
		padding: 10px;
		.comment-header{
			display: flex;
			.comment-header_avatar{
				flex-shrink: 0;
				width: 30px;
				height: 30px;
				border-radius: 50%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.comment-header_Info{
				display: flex;
				flex-direction: column;
				padding-left: 15px;
				font-size: 12px;
				color: #999;
				line-height: 1;
				.comment-header_name{
					margin-bottom: 10px;
					font-size: 14px;
					color: #333;
				}
			}
		}
		.comment-content{
			margin-top: 10px;
			font-size: 14px;
			color: #000;
			.comment-info{
				margin-top: 15px;
				display: flex;
				.comment-button{
					padding: 2px 10px;
					font-size: 12px;
					color: #999;
					border-radius: 20px;
					border: 1px solid #ccc;
				}
			}
			.comment-reply{
				display: flex;
				margin: 15px 0;
				padding: 0 10px;
				border: 1px #eee solid;
			}
		}
	}
</style>
