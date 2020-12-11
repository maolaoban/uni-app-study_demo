'use strict';
//获取数据库的引用
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event;
	
	const userInfo = await db.collection('user').doc(user_id).get()
	const article_id_ids = userInfo.data[0].article_likes_ids
	let dbCmdFun = null;
	if(article_id_ids.includes(article_id)){
		dbCmdFun = dbCmd.pull(article_id);
	}else{
		dbCmdFun = dbCmd.addToSet(article_id)
	}
	
	await db.collection('user').doc(user_id).update({	
		article_likes_ids: dbCmdFun
	})
	
	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功',
		data:userInfo.data[0]
	}
};
