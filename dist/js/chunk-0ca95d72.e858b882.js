(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0ca95d72"],{1511:function(e,t,r){"use strict";r.r(t);var n=r("7a23"),l={class:"container mt-5 pt-5",id:"user-profile"},c={class:"row"},o={class:"row"},a={class:"row mb-3"};function s(e,t,r,s,i,u){var b=Object(n["w"])("spinner"),f=Object(n["w"])("user-profile-card"),d=Object(n["w"])("user-followings-card"),g=Object(n["w"])("user-followers-card"),j=Object(n["w"])("user-comments-card"),O=Object(n["w"])("user-fav-restaurants-card");return Object(n["p"])(),Object(n["d"])("div",l,[i.isLoading?(Object(n["p"])(),Object(n["d"])(b,{key:0})):(Object(n["p"])(),Object(n["d"])(n["a"],{key:1},[Object(n["g"])("div",c,[Object(n["g"])(f,{"user-profile":i.userProfile,"initial-following":i.isFollowed},null,8,["user-profile","initial-following"])]),Object(n["g"])("div",o,[Object(n["g"])(d,{followings:i.followings},null,8,["followings"]),Object(n["g"])(g,{followers:i.followers},null,8,["followers"])]),Object(n["g"])("div",a,[Object(n["g"])(j,{restaurants:i.commentRestaurants},null,8,["restaurants"]),Object(n["g"])(O,{restaurants:i.favRestaurants},null,8,["restaurants"])])],64))])}var i=r("5530"),u=r("1da1"),b=(r("96cf"),r("b0c0"),{class:"col-12 col-md-6 col-lg-4"}),f={class:"col-12 col-md-6 col-lg-8 d-flex flex-column justify-content-between pt-4 pb-5"},d={class:"mb-3"},g=Object(n["f"])(" 已評論餐廳 "),j=Object(n["f"])(" 收藏的餐廳 "),O=Object(n["f"])(" followings "),p=Object(n["f"])(" followers "),w={key:0},m=Object(n["f"])("Edit"),v={key:1};function y(e,t,r,l,c,o){var a=Object(n["w"])("router-link");return Object(n["p"])(),Object(n["d"])(n["a"],null,[Object(n["g"])("div",b,[Object(n["g"])("img",{src:e.$filter.emptyImageFilter(r.userProfile.image),style:{width:"250px","margin-bottom":"25px"}},null,8,["src"])]),Object(n["g"])("div",f,[Object(n["g"])("div",d,[Object(n["g"])("h3",null,Object(n["y"])(r.userProfile.name),1),Object(n["g"])("p",null,Object(n["y"])(r.userProfile.email),1),Object(n["g"])("div",null,[Object(n["g"])("strong",null,Object(n["y"])(r.userProfile.commentRestaurantsLength),1),g]),Object(n["g"])("div",null,[Object(n["g"])("strong",null,Object(n["y"])(r.userProfile.favRestaurantsLength),1),j]),Object(n["g"])("div",null,[Object(n["g"])("strong",null,Object(n["y"])(r.userProfile.followingsLength),1),O]),Object(n["g"])("div",null,[Object(n["g"])("strong",null,Object(n["y"])(r.userProfile.followersLength),1),p])]),e.currentUser.id===r.userProfile.id?(Object(n["p"])(),Object(n["d"])("div",w,[Object(n["g"])(a,{to:{name:"user-profile-edit",params:{id:e.currentUser.id}},class:"btn btn-primary"},{default:Object(n["E"])((function(){return[m]})),_:1},8,["to"])])):(Object(n["p"])(),Object(n["d"])("div",v,[c.isFollowed?(Object(n["p"])(),Object(n["d"])("button",{key:0,type:"button",class:"btn btn-danger",onClick:t[1]||(t[1]=Object(n["G"])((function(e){return o.unfollow(r.userProfile.id)}),["stop","prevent"]))}," Unfollow ")):(Object(n["p"])(),Object(n["d"])("button",{key:1,type:"button",class:"btn btn-primary",onClick:t[2]||(t[2]=Object(n["G"])((function(e){return o.follow(r.userProfile.id)}),["stop","prevent"]))}," Follow "))]))])],64)}var h=r("5502"),x=r("4cce"),k=r("2fa3"),F={props:{userProfile:{type:Object,required:!0},initialFollowing:{type:Boolean,required:!0}},data:function(){return{isFollowed:this.initialFollowing}},computed:Object(i["a"])({},Object(h["b"])(["currentUser"])),watch:{initialFollowing:function(e){this.isFollowed=e}},methods:{follow:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function r(){var n,l;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,x["a"].follow(e);case 3:if(n=r.sent,l=n.data,"success"===l.status){r.next=7;break}throw new Error(l.message);case 7:t.isFollowed=!0,r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](0),k["b"].fire({icon:"error",title:"Unable to follow the user, please try again later."});case 13:case"end":return r.stop()}}),r,null,[[0,10]])})))()},unfollow:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function r(){var n,l;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,x["a"].unfollow(e);case 3:if(n=r.sent,l=n.data,"success"===l.status){r.next=7;break}throw new Error(l.message);case 7:t.isFollowed=!1,r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](0),k["b"].fire({icon:"error",title:"Unable to unfollow the user, please try again later."});case 13:case"end":return r.stop()}}),r,null,[[0,10]])})))()}}};F.render=y;var R=F,P={class:"col-12 col-lg-6 px-2 mb-3"},U={class:"info-container border"},L={class:"title-container px-4 py-3"},E=Object(n["f"])(" followings "),C={class:"image-container col-12 p-4 d-flex flex-wrap"};function q(e,t,r,l,c,o){var a=Object(n["w"])("router-link");return Object(n["p"])(),Object(n["d"])("div",P,[Object(n["g"])("div",U,[Object(n["g"])("div",L,[Object(n["g"])("div",null,[Object(n["g"])("strong",null,Object(n["y"])(r.followings.length),1),E])]),Object(n["g"])("div",C,[(Object(n["p"])(!0),Object(n["d"])(n["a"],null,Object(n["v"])(r.followings,(function(t){return Object(n["p"])(),Object(n["d"])("div",{key:t.id,class:"mb-2 me-2"},[Object(n["g"])(a,{to:{name:"user-profile",params:{id:t.id}}},{default:Object(n["E"])((function(){return[Object(n["g"])("img",{src:e.$filter.emptyImageFilter(t.image)},null,8,["src"])]})),_:2},1032,["to"])])})),128))])])])}var $={props:{followings:{type:Array,required:!0}}};$.render=q;var I=$,_={class:"col-12 col-lg-6 px-2 mb-3"},A={class:"info-container border"},G={class:"title-container px-4 py-3"},J=Object(n["f"])(" followers "),B={class:"image-container col-12 p-4 d-flex flex-wrap"};function S(e,t,r,l,c,o){var a=Object(n["w"])("router-link");return Object(n["p"])(),Object(n["d"])("div",_,[Object(n["g"])("div",A,[Object(n["g"])("div",G,[Object(n["g"])("div",null,[Object(n["g"])("strong",null,Object(n["y"])(r.followers.length),1),J])]),Object(n["g"])("div",B,[(Object(n["p"])(!0),Object(n["d"])(n["a"],null,Object(n["v"])(r.followers,(function(t){return Object(n["p"])(),Object(n["d"])("div",{key:t.id,class:"mb-2 me-2"},[Object(n["g"])(a,{to:{name:"user-profile",params:{id:t.id}}},{default:Object(n["E"])((function(){return[Object(n["g"])("img",{src:e.$filter.emptyImageFilter(t.image)},null,8,["src"])]})),_:2},1032,["to"])])})),128))])])])}var z={props:{followers:{type:Array,required:!0}}};z.render=S;var D=z,H={class:"col-12 col-lg-6 px-2 mb-3"},K={class:"info-container border"},M={class:"title-container px-4 py-3"},N=Object(n["f"])(" 已評論餐廳 "),Q={class:"image-container col-12 p-4 d-flex flex-wrap"};function T(e,t,r,l,c,o){var a=Object(n["w"])("router-link");return Object(n["p"])(),Object(n["d"])("div",H,[Object(n["g"])("div",K,[Object(n["g"])("div",M,[Object(n["g"])("div",null,[Object(n["g"])("strong",null,Object(n["y"])(r.restaurants.length),1),N])]),Object(n["g"])("div",Q,[(Object(n["p"])(!0),Object(n["d"])(n["a"],null,Object(n["v"])(r.restaurants,(function(t){return Object(n["p"])(),Object(n["d"])("div",{key:t.id,class:"mb-2 me-2"},[Object(n["g"])(a,{to:{name:"restaurant",params:{id:t.id}}},{default:Object(n["E"])((function(){return[Object(n["g"])("img",{src:e.$filter.emptyImageFilter(t.image)},null,8,["src"])]})),_:2},1032,["to"])])})),128))])])])}var V={props:{restaurants:{type:Array,required:!0}}};V.render=T;var W=V,X={class:"col-12 col-lg-6 px-2 mb-3"},Y={class:"info-container border"},Z={class:" px-4 py-3",style:{"border-bottom":"#cfcfcf9e solid 1px","background-color":"#f8f9fa"}},ee=Object(n["f"])(" 收藏的餐廳 "),te={class:"image-container col-12 p-4 d-flex flex-wrap"};function re(e,t,r,l,c,o){var a=Object(n["w"])("router-link");return Object(n["p"])(),Object(n["d"])("div",X,[Object(n["g"])("div",Y,[Object(n["g"])("div",Z,[Object(n["g"])("div",null,[Object(n["g"])("strong",null,Object(n["y"])(r.restaurants.length),1),ee])]),Object(n["g"])("div",te,[(Object(n["p"])(!0),Object(n["d"])(n["a"],null,Object(n["v"])(r.restaurants,(function(t){return Object(n["p"])(),Object(n["d"])("div",{key:t.id,class:"mb-2 me-2"},[Object(n["g"])(a,{to:{name:"restaurant",params:{id:t.id}}},{default:Object(n["E"])((function(){return[Object(n["g"])("img",{src:e.$filter.emptyImageFilter(t.image)},null,8,["src"])]})),_:2},1032,["to"])])})),128))])])])}var ne={props:{restaurants:{type:Array,required:!0}}};ne.render=re;var le=ne,ce=r("2375"),oe={data:function(){return{userProfile:{},commentRestaurants:[],followers:[],followings:[],favRestaurants:[],isFollowed:!1,isLoading:!0}},components:{UserProfileCard:R,UserFollowingsCard:I,UserFollowersCard:D,UserCommentsCard:W,UserFavRestaurantsCard:le,Spinner:ce["a"]},methods:{fetchUser:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function r(){var n,l,c,o,a,s,u,b;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,t.isLoading=!0,r.next=4,x["a"].get(e);case 4:if(n=r.sent,l=n.data,"success"===l.status){r.next=8;break}throw new Error(l.message);case 8:c=l.userProfile,o=l.commentRestaurants,a=l.followers,s=l.followings,u=l.favRestaurants,b=l.isFollowed,t.userProfile=Object(i["a"])(Object(i["a"])({},c),{},{commentRestaurantsLength:o.length,followersLength:a.length,followingsLength:s.length,favRestaurantsLength:u.length}),t.commentRestaurants=o,t.followers=a,t.followings=s,t.favRestaurants=u,t.isFollowed=b,t.isLoading=!1,r.next=22;break;case 18:r.prev=18,r.t0=r["catch"](0),t.isLoading=!1,k["b"].fire({icon:"error",title:"Unable to get user data, please try again later."});case 22:case"end":return r.stop()}}),r,null,[[0,18]])})))()}},created:function(){var e=this.$route.params.id;this.fetchUser(e)},beforeRouteUpdate:function(e,t,r){var n=e.params.id;this.fetchUser(n),r()}};r("833f");oe.render=s;t["default"]=oe},"1ffa":function(e,t,r){},"833f":function(e,t,r){"use strict";r("1ffa")}}]);
//# sourceMappingURL=chunk-0ca95d72.e858b882.js.map