<template>
	<view class="home">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<tab :list="tabList" :tabIndex="tabIndex" @tab="tab"></tab>
		<view class="home-list">
			<list :tab="tabList" @change="change" :activeIndex="activeIndex"></list>
		</view>
		<!-- <list-scroll>
			<list-card mode="base"></list-card>
			<list-card mode="image"></list-card>
			<list-card mode="column"></list-card>
		</list-scroll> -->
	</view>
</template>

<script>
	//easyCom components/组件名/组件名.vue 局部引入
	// import navbar from '@/components/navbar/navbar.vue'
	export default {
		// components:{
		// 	navbar
		// },
		data() {
			return {
				tabList:[],
				tabIndex:0,
				activeIndex:0
			}
		},
		onLoad() {
			this.getLabel();
			uni.$on('labelChange',()=>{
				this.tabList = [];
				this.tabIndex = 0;
				this.activeIndex = 0;
				this.getLabel();
			})
		},
		methods: {
			getLabel(){
				this.$api.get_label().then(res => {
					const {data} = res;
					data.unshift({
						name:'全部'
					})
					this.tabList = data;
				})
			},
			tab({data,index}){
				console.log({data,index});
				this.activeIndex = index;
			},
			change(current){
				console.log('dangqian',current)
				this.tabIndex = current;
				this.activeIndex = current;
			}
		}
	}
</script>

<style lang="scss">
page{
	height: 100%;
	display: flex;
}
.home{
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow: hidden;
}
.home-list{
	flex: 1;
	box-sizing: border-box;
}
</style>