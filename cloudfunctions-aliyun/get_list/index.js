'use strict';
//获取数据库的引用
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	//接收分类,筛选数据
	const {
		user_id,
		name,
		page = 1,
		pageSize = 10
	} = event;
	let mathcObj = {};
	if(name !== "全部"){
		mathcObj = {
			classify: name
		}
	}
	
	const userInfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids
	
	//聚合，更精细化的去处理数据
	const list = await db.collection('article')
	.aggregate()
	.addFields({
		is_like:$.in(['$_id',article_likes_ids])
	})
	.match(mathcObj)
	.project({
		content:false
	})
	.skip((page - 1) * pageSize)//跳过多少条
	.limit(pageSize) //限制条数
	.end()
	// const list = await db.collection('article')
	// .field({
	// 	//false表示不返回这个字段，true表示返回这个字段
	// 	content:false
	// })
	// .get()
	
	//返回数据给客户端
	return {
		code:200,
		msg:'请求成功',
		data:list.data
	}
};
