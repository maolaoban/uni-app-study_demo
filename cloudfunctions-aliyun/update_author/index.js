'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	const {
		user_id,
		author_id
	} = event;
	
	let user = await db.collection('user').doc(user_id).get()
	let author_likes = user.data[0].author_likes_ids;
	
	let operate = null;
	if(author_likes.includes(author_id)){
		operate = dbCmd.pull(author_id);
	}else{
		operate = dbCmd.addToSet(author_id);
	}
	await db.collection('user').doc(user_id).update({
		author_likes_ids : operate
	})
	
	//返回数据给客户端
	return {
		code:200,
		msg:'更新成功'
	}
};
