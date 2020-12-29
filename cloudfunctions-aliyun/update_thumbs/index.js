'use strict';
const db = uniCloud.database();
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event;
	
	const user = await db.collection('user').doc(user_id).get();
	const thumbs = user.data[0].thumbs_up_article_ids;
	const operate = null;
	if(thumbs.includes(article_id)){
		return{
			code:200,
			msg:'你已经点过赞了!'
		}
	}else{
		await db.collection('user').doc(user_id).update({
			thumbs_up_article_ids:dbCmd.addToSet(article_id)
		})
		await db.collection('article').doc(article_id).update({
			thumbs_up_count: dbCmd.inc(1)
		})
		return {
			code:200,
			msg:'点赞成功!'
		}
	}
};
