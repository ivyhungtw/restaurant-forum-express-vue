(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-59814d58"],{"22ab":function(e,t,r){"use strict";r.r(t);var n=r("7a23"),a={class:"container py-5"},s=Object(n["g"])("div",{class:"title text-center col-12 p-5 mb-3"},[Object(n["g"])("h1",{class:"mb-3"},"Top Users"),Object(n["g"])("p",null," Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus magna fringilla urna porttitor rhoncus. Tellus orci ac auctor augue mauris. ")],-1),c=Object(n["g"])("hr",null,null,-1),o={class:"row text-center justify-content-center"};function u(e,t,r,u,i,l){var b=Object(n["w"])("spinner"),d=Object(n["w"])("user-card");return Object(n["p"])(),Object(n["d"])("div",a,[i.isLoading?(Object(n["p"])(),Object(n["d"])(b,{key:0})):(Object(n["p"])(),Object(n["d"])(n["a"],{key:1},[s,c,Object(n["g"])("div",o,[(Object(n["p"])(!0),Object(n["d"])(n["a"],null,Object(n["v"])(i.topUsers,(function(e){return Object(n["p"])(),Object(n["d"])(d,{key:e.id,"initial-user":e,"current-user-id":i.currentUserId},null,8,["initial-user","current-user-id"])})),128))])],64))])}var i=r("1da1"),l=(r("96cf"),r("b0c0"),Object(n["H"])("data-v-39e9a729"));Object(n["s"])("data-v-39e9a729");var b={class:"col-3"},d={class:"badge bg-secondary"},p={key:0,class:"mt-3"};Object(n["q"])();var f=l((function(e,t,r,a,s,c){var o=Object(n["w"])("router-link");return Object(n["p"])(),Object(n["d"])("div",b,[Object(n["g"])(o,{to:{name:"user-profile",params:{id:s.user.id}}},{default:l((function(){return[Object(n["g"])("img",{src:e.$filter.emptyImageFilter(s.user.image)},null,8,["src"])]})),_:1},8,["to"]),Object(n["g"])("h2",null,Object(n["y"])(s.user.name),1),Object(n["g"])("span",d,"followers："+Object(n["y"])(s.user.followerCount||0),1),r.currentUserId!==s.user.id?(Object(n["p"])(),Object(n["d"])("p",p,[s.user.isFollowed?(Object(n["p"])(),Object(n["d"])("button",{key:0,type:"button",class:"btn btn-danger",onClick:t[1]||(t[1]=Object(n["G"])((function(e){return c.unfollow(s.user.id)}),["prevent","stop"]))}," Unfollow ")):(Object(n["p"])(),Object(n["d"])("button",{key:1,type:"button",class:"btn btn-primary",onClick:t[2]||(t[2]=Object(n["G"])((function(e){return c.follow(s.user.id)}),["prevent","stop"]))}," Follow "))])):Object(n["e"])("",!0)])})),j=r("5530"),O=(r("a9e3"),r("4cce")),w=r("2fa3"),g={props:{initialUser:{type:Object,required:!0},currentUserId:{type:Number,required:!0}},data:function(){return{user:this.initialUser}},methods:{follow:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,O["a"].follow(e);case 3:if(n=r.sent,a=n.data,"success"===a.status){r.next=7;break}throw new Error(a.message);case 7:t.user=Object(j["a"])(Object(j["a"])({},t.user),{},{followerCount:t.followerCount?t.followerCount+1:1,isFollowed:!0}),r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](0),w["b"].fire({icon:"error",title:"Unable to follow the user, please try again later."});case 13:case"end":return r.stop()}}),r,null,[[0,10]])})))()},unfollow:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,O["a"].unfollow(e);case 3:if(n=r.sent,a=n.data,"success"===a.status){r.next=7;break}throw new Error(a.message);case 7:t.user=Object(j["a"])(Object(j["a"])({},t.user),{},{followerCount:Number(t.followerCount)-1,isFollowed:!1}),r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](0),w["b"].fire({icon:"error",title:"Unable to unfollow the user, please try again later."});case 13:case"end":return r.stop()}}),r,null,[[0,10]])})))()}}};r("a313");g.render=f,g.__scopeId="data-v-39e9a729";var m=g,v=r("2375"),h={data:function(){return{topUsers:[],currentUserId:-1,isLoading:!0}},components:{UserCard:m,Spinner:v["a"]},methods:{fetchTopUsers:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.isLoading=!0,t.next=4,O["a"].getTopUsers();case 4:r=t.sent,n=r.data,e.topUsers=n.users,e.currentUserId=n.id,e.isLoading=!1,t.next=15;break;case 11:t.prev=11,t.t0=t["catch"](0),e.isLoading=!1,w["b"].fire({icon:"error",title:"Unable to get top users data, please try again later."});case 15:case"end":return t.stop()}}),t,null,[[0,11]])})))()}},created:function(){this.fetchTopUsers()}};h.render=u;t["default"]=h},9629:function(e,t,r){},a313:function(e,t,r){"use strict";r("9629")}}]);
//# sourceMappingURL=chunk-59814d58.474b8473.js.map