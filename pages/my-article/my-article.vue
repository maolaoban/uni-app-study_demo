<template>
	<view>
		<list-card v-for="item in list" :key="item.id" :item="item"></list-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad(){
			this.getMyArticle()
		},
		methods: {
			getMyArticle(){
				this.$api.get_my_article({
					
				}).then(res => {
					console.log(res);
					const {data} = res;
					this.list = data;
				})
			}
		}
	}
</script>

<style>

</style>
