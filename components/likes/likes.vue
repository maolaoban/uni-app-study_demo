<template>
	<view class="icons" @click.stop="updateLikes">
		<uni-icons :type="like?'heart-filled':'heart'" color="#f07373" size="20"></uni-icons>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				like:false
			};
		},
		watch:{
			item(newVal){
				this.like = this.item.is_like
			}
		},
		created() {
			this.like = this.item.is_like
		},
		methods:{
			updateLikes(){
				uni.showLoading()
				this.like = !this.like;
				this.$api.update_like({
					article_id:this.item._id
				}).then(res => {
					console.log(res);
					uni.hideLoading()
					uni.showToast({
						title:this.like ? "收藏成功":"取消收藏",
						icon:'none'
					})
				}).catch(()=>{
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
	.icons {
		display: flex;
		flex: 0;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
	}
</style>
