<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<view :style="{height:statusBarHeight + 2 +'px'}"></view>
			<view class="navbar-content" 
				:class="{search:isSearch}"
				:style="{height:navBarHeight + 'px',width:windowWidth+'px'}">
				<view class="navbar-content_back" v-if="isSearch" @click="goBack">
					<uni-icons type="back" color="#fff" size="22"></uni-icons>
				</view>
				<view v-if="!isSearch" class="navbar-search" @click.stop="open">
					<view class="navbar-search_icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar-search_text">
						uni-app、vue
					</view>
				</view>
				<view v-else class="navbar-search">
					<input class="navbar-search_text" type="text" v-model="val" placeholder="请输入您要搜索的内容..."
						@input="inputChange"
					/>
				</view>
			</view>
		</view>
		<view :style="{height: statusBarHeight + navBarHeight + 'px'}"></view>
	</view>
</template>

<script>
	import '../../common/css/icons.css';
	export default {
		props:{
			value:{
				type:[String,Number],
				default:''
			},
			isSearch:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				statusBarHeight: 20,
				navBarHeight: 45,
				windowWidth:375,
				val:''
			}
		},
		watch:{
			value(newVal){
				this.val = newVal;
			}
		},
		created(){
			//获取手机系统信息,设置状态栏高度
			const sysInfo = uni.getSystemInfoSync();
			console.log(sysInfo);
			this.statusBarHeight = sysInfo.statusBarHeight;
			this.windowWidth = sysInfo.windowWidth;
			
			//#ifndef H5 || APP-PLUS || MP-ALIPAY
			//获取微信小程序顶部胶囊位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			console.log(menuButtonInfo);
			
			//(胶囊底部高度 - 状态栏高度) + (胶囊顶部高度 - 状态栏的高度) = 导航栏
			this.navBarHeight = (menuButtonInfo.bottom - sysInfo.statusBarHeight) + 
				(menuButtonInfo.top - sysInfo.statusBarHeight);
			console.log(this.navBarHeight);
			this.windowWidth = menuButtonInfo.left;
			//#endif
		},
		methods: {
			open(){
				if(this.isSearch){
					return;
				}else{
					uni.navigateTo({
						url:"/pages/home-search/home-search",
						success(res) {
							console.log(res)
						}
					})
				}
			},
			goBack(){
				// uni.navigateBack({
				// 	delta:1
				// })
				uni.switchTab({
					url:'../../pages/tarbar/index/index'
				})
			},
			inputChange(e){
				const {value} = e.detail;
				this.$emit("inputChange",value);
			}
		}
	}
</script>

<style lang="scss">
	.navbar{
		.navbar-fixed{
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			width: 100%;
			background-color: $mk-base-color;
			.navbar-content{
				height: 45px;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 15px;
				box-sizing: border-box;
				.navbar-search{
					height: 30px;
					width: 100%;
					padding: 0 10px;
					border-radius: 30px;
					background-color: #fff;
					display: flex;
					align-items: center;
					.navbar-search_icon{
						margin-right: 10px;
					}
					.navbar-search_text{
						width: 100%;
						font-size: 12px;
						color:#999;
					}
				}
				&.search{
					padding-left: 0;
					.navbar-content_back{
						margin-left: 10px;
						margin-right: 10px;
					}
					.navbar-search{
						border-radius: 5px;
					}
				}
			}
		}	
	}
</style>
