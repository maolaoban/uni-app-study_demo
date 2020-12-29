<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">
					我的标签
				</view>
				<view class="label-edit" @click="editLabel">
					{{is_edit?'编辑':'完成'}}
				</view>
			</view>
			<view class="label-content">
				<view class="label-content_item" v-for="(item,index) in labelList" :key="item._id">
					{{item.name}}
					<uni-icons class="icons-close" type="clear" size="20" color="red" v-show="!is_edit"
						@click="delLabel(index)"
					></uni-icons>
				</view>
				<view class="no_label" v-if="labelList.length == 0">
					无标签内容
				</view>
			</view>
		</view>
		
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">
					标签推荐
				</view>
			</view>
			<view class="label-content">
				<view class="label-content_item" v-for="(item,index) in list" :key="item._id" @click="!is_edit && addLabel(index)">
					{{item.name}}
				</view>
				<view class="no_label" v-if="list.length == 0">
					无标签推荐
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_edit:true,
				labelList:[],
				list:[]
			}
		},
		onLoad() {
			this.getLabel();
		},
		methods: {
			editLabel(){
				if(this.is_edit){
					this.is_edit = false;
				}else{
					this.is_edit = true;
					this.setUpdateLabel(this.labelList);
				}
			},
			getLabel(){
				this.$api.get_label({
					type: 'all'
				}).then(res => {
					console.log(res);
					const {data} = res;
					this.labelList = data.filter(item => item.current);
					this.list = data.filter(item => !item.current);
				})
			},
			delLabel(index){
				this.list.push(this.labelList[index]);
				this.labelList.splice(index,1);
			},
			addLabel(index){
				this.labelList.push(this.list[index]);
				this.list.splice(index,1);
			},
			setUpdateLabel(label){
				let newArrIds = [];
				label.forEach(item => {
					newArrIds.push(item._id);
				})
				uni.showLoading();
				console.log(newArrIds);
				this.$api.update_label({
					label:newArrIds
				}).then(res => {
					console.log(res);
					uni.hideLoading();
					uni.showToast({
						icon:'none',
						title:'编辑完成'
					})
					uni.$emit('labelChange');
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.label{
		.label-box{
			background-color: #fff;
			margin-bottom: 10px;
			.label-header{
				display: flex;
				justify-content: space-between;
				padding: 10px 15px;
				font-size:14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;
				.label-edit{
					color:#30b33a;
					font-weight: bold;
				}
			}
			.label-content{
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;
				.label-content_item{
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
					position: relative;
					.icons-close{
						position: absolute;
						right: -8px;
						top:-8px;
						background-color: #fff;
						border-radius: 20px;
					}
				}
			}
		}
	}
	.no_label{
		width: 100%;
		height:20px;
		margin-top: 10px;
		text-align: center;
		font-size: 14px;
		color: #666;
	}
</style>
