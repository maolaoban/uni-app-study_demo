<template>
	<list-scroll class="list-scroll" @loadMore="loadMore">
		<list-card v-for="(item,index) in list" :key="item.id" :item="item"></list-card>
		<uni-load-more v-if="list.length > 9 || list.length == 0" :status="load.loading || 'loading'" iconType="snow"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default(){
					return []
				}
			},
			load:{
				type:Object,
				default(){
					return{
						loading:"loading"
					}
				}
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			loadMore(){
				this.$emit("loadMore");
			}
		}
	}
</script>

<style lang="scss">
.list-scroll{
	height: 100%;
}
</style>
