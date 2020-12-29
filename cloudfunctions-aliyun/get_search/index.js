'use strict';
//获取数据库的引用
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	//接收分类,筛选数据
	const {
		user_id,
		value
	} = event;
	console.log('value',value);
	const userInfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids
	//聚合，更精细化的去处理数据
	const list = await db.collection('article')
	.aggregate()
	.addFields({
		is_like:$.in(['$_id',article_likes_ids])
	})
	.project({
		content:0
	})
	.match({
		title: new RegExp(value)
	})
	.end()
	
	//返回数据给客户端
	return {
		code:200,
		msg:'请求成功',
		data:list.data
	}
};
