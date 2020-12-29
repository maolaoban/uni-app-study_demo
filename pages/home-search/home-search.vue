<template>
	<view class="home">
		<!-- 自定义导航栏 -->
		<navbar :isSearch="true" @inputChange="inputChange" v-model="value"></navbar>
		<view class="home-list">
			<view class="label-box" v-if="is_history">
				<view class="label-header">
					<text class="label-header_history">搜索历史</text>
					<text class="label-header_null" @click="clearHistory">清空</text>
				</view>
				<view class="label-content" v-if="historyList.length">
					<view class="label-content_item" v-for="item in historyList" @click="searchHistory(item.name)">
						{{item.name}}
					</view>
				</view>
				<view class="no-data" v-else>
					没有搜索数据!
				</view>
			</view>
			<list-scroll class="list-scroll" v-else>
				<view v-if="searchList.length > 0">
					<list-card v-for="(item,index) in searchList" :key="item.id" :item="item">
					</list-card>
				</view>
				<uni-load-more :status="load" iconType="snow"></uni-load-more>
				<view class="no-data" v-if="searchList.length === 0">
					没有搜索到相关数据！
				</view>
			</list-scroll>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				is_history:true,
				searchList:[],
				value:'',
				load:'noMore'
			}
		},
		computed:{
			...mapState(['historyList'])
		},
		methods: {
			inputChange(value){
				console.log(value);
				if(!value){
					clearTimeout(this.timer);
					this.mark = false;
					this.getSearch();
					return;
				}
				if(!this.mark){
					this.mark = true;
					this.timer = setTimeout(()=>{
						this.mark = false;
						this.is_history = false;
						this.load = 'loading';
						this.getSearch(value);
					},1000)
				}
			},
			searchHistory(history){
				this.value = history;
				this.inputChange(history);
			},
			getSearch(value){
				if(!value){
					this.searchList = [];
					this.is_history = true;
					return;
				}
				
				this.$store.dispatch('set_history',{
					name: value
				})
				
				this.$api.get_search({
					name: value
				}).then(res => {
					const {data} = res;
					console.log('搜索结果',data);
					this.searchList = data;
					this.load = 'noMore';
				}).catch(err => {
					this.load = 'noMore';
				})
			},
			clearHistory(){
				this.$store.dispatch('clear_history');
				uni.showToast({
					title:'清空完成'
				})
			}
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
	.no-data{
		height: 200px;
		line-height: 200px;
		width: 100%;
		text-align: center;
		color: #666;
		background-color: #f5f5f5;
	}
</style>
