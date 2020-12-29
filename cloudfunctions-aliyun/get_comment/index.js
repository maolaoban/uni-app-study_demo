'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate;
exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event;
	
	let list = await db.collection('article')
	.aggregate()
	.match({
		_id:article_id
	})
	.unwind('$comment')
	.project({
		_id:0,
		comment:1
	})
	.replaceRoot({
		newRoot:'$comment'
	})
	.end()
	
	//返回数据给客户端
	return {
		code:200,
		msg:'请求成功',
		data:list.data
	}
};
