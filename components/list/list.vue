<template>
		<swiper class="home-swiper" :current="activeIndex" @change="change">
			<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
				<list-item :list="listCatchData[index]" @loadMore="loadMore" :load="load[index]"></list-item>
			</swiper-item>
		</swiper>
</template>

<script>
	import listItem from './list-item.vue';
	export default {
		props:{
			tab:{
				type:Array,
				default:[]
			},
			activeIndex:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				listCatchData:{},
				load:{},
				pageSize:10
			};
		},
		components:{
			listItem
		},
		watch:{
			tab(newVal){
				if(newVal.length == 0) return;
				this.listCatchData = {};
				this.load = {};
				this.getList(this.activeIndex);
			}
		},
		created(){
			uni.$on('update-article',()=>{
				this.listCatchData = {};
				this.load = {};
				this.getList(this.activeIndex);
			})
		},
		methods:{
			change(e){
				const {current} = e.detail;
				this.$emit("change",current);
				if(!this.listCatchData[current] || this.listCatchData[current].length === 0){
					this.getList(current);
				}
			},
			getList(current){
				if(!this.load[current]){
					this.load[current] = {
						page:1,
						loading:'loading'
					}
				}
				this.$api.get_list({
					name: this.tab[current].name,
					page: this.load[current].page,
					pageSize: this.pageSize
				}).then(res => {
					const {data} = res;
					console.log('数据',res);
					if(data.length === 0){
						let oldLoad = {};
						oldLoad.loading = 'noMore';
						oldLoad.page = this.load[current].page;
						this.$set(this.load,current,oldLoad);
						//强制渲染页面
						this.$forceUpdate();
						return;
					}
					let oldList = this.listCatchData[current] || [];
					oldList.push(...data);
					this.$set(this.listCatchData,current,oldList);
				})
			},
			loadMore(){
				if(this.load[this.activeIndex].loading === 'noMore'){
					return;
				}
				this.load[this.activeIndex].page++;
				this.getList(this.activeIndex);
			}
		}
	}
</script>

<style lang="scss">
	.home-swiper{
		height: 100%;
		.swiper-item{
			height: 100%;
			overflow-y: scroll;
			.list-scroll{
				height: 100%;
				overflow: hidden;
			}
		}
	}
</style>
