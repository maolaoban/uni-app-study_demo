<template>
	<view class="scroll">
		<scroll-view scroll-y="true" class="list-scroll" @scrolltolower="loadMore">
			<slot></slot>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods:{
			loadMore(){
				this.$emit("loadMore");
			}
		}
	}
</script>

<style lang="scss">
	.scroll {
		height: 100%;
		flex: 1;
		overflow: hidden;
		box-sizing: content-box;

		.list-scroll {
			height: 100%;
			display: flex;
			flex-direction: column;
		}
	}
</style>
