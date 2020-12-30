import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
	state:{
		historyList:uni.getStorageSync("_history") || [],
		userInfo:uni.getStorageSync("userInfo") || {}
	},
	mutations:{
		SET_HISTORY_LIST(state,history){
			state.historyList = history
		},
		CLEAR_HISTORY_LIST(state){
			state.historyList = [];
		},
		SET_USER_INFO(state,userInfo){
			state.userInfo = userInfo;
		}
	},
	actions:{
		set_history({commit,state},history){
			let list = state.historyList;
			list.unshift(history);
			uni.setStorageSync("_history",list);
			commit("SET_HISTORY_LIST",list);
		},
		clear_history({commit}){
			// uni.setStorageSync("_history",[]);
			uni.removeStorageSync("_history");
			commit("CLEAR_HISTORY_LIST");
		},
		set_userInfo({commit},userInfo){
			uni.setStorageSync('userInfo',userInfo);
			commit("SET_USER_INFO",userInfo);
		}
	}
})
export default store;