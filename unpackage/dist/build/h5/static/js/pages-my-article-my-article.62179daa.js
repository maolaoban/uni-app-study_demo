(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-article-my-article"],{1338:function(t,n,e){"use strict";e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return i}));var i={listCard:e("5c06").default},r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",t._l(t.list,(function(t){return e("list-card",{key:t.id,attrs:{item:t}})})),1)},u=[]},b3e2:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{list:[]}},onLoad:function(){this.getMyArticle()},methods:{getMyArticle:function(){var n=this;this.$api.get_my_article({}).then((function(e){t.log(e);var i=e.data;n.list=i}))}}};n.default=e}).call(this,e("5a52")["default"])},bde1:function(t,n,e){"use strict";e.r(n);var i=e("1338"),r=e("bfd5");for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);var a,c=e("f0c5"),f=Object(c["a"])(r["default"],i["b"],i["c"],!1,null,"26c88a2f",null,!1,i["a"],a);n["default"]=f.exports},bfd5:function(t,n,e){"use strict";e.r(n);var i=e("b3e2"),r=e.n(i);for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);n["default"]=r.a}}]);