(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-90f9d1e4"],{"73a3":function(t,e,n){"use strict";n.r(e);var a=n("7a23"),r={class:"container py-5"},c=Object(a["f"])(" New Restaurant ");function s(t,e,n,s,u,i){var o=Object(a["w"])("admin-nav"),d=Object(a["w"])("router-link"),b=Object(a["w"])("admin-restaurants-table");return Object(a["p"])(),Object(a["d"])("div",r,[Object(a["g"])(o),Object(a["g"])(d,{to:{name:"admin-restaurant-new"},class:"btn btn-primary mb-4"},{default:Object(a["E"])((function(){return[c]})),_:1}),Object(a["g"])(b)])}var u=n("e04c"),i=(n("b0c0"),{key:1,class:"table table-striped"}),o=Object(a["g"])("thead",{class:"table-dark"},[Object(a["g"])("tr",null,[Object(a["g"])("th",{scope:"col"}," # "),Object(a["g"])("th",{scope:"col"}," Category "),Object(a["g"])("th",{scope:"col"}," Name "),Object(a["g"])("th",{scope:"col",width:"300"}," 操作 ")])],-1),d={scope:"row"},b={class:"d-flex justify-content-between"},l=Object(a["f"])("Detail"),f=Object(a["f"])("Edit");function j(t,e,n,r,c,s){var u=Object(a["w"])("spinner"),j=Object(a["w"])("router-link");return c.isLoading?(Object(a["p"])(),Object(a["d"])(u,{key:0})):(Object(a["p"])(),Object(a["d"])("table",i,[o,Object(a["g"])("tbody",null,[(Object(a["p"])(!0),Object(a["d"])(a["a"],null,Object(a["v"])(c.restaurants,(function(t){return Object(a["p"])(),Object(a["d"])("tr",{key:t.id},[Object(a["g"])("th",d,Object(a["y"])(t.id),1),Object(a["g"])("td",null,Object(a["y"])(t.Category?t.Category.name:"uncategorized"),1),Object(a["g"])("td",null,Object(a["y"])(t.name),1),Object(a["g"])("td",b,[Object(a["g"])(j,{to:{name:"admin-restaurant",params:{id:t.id}},class:"btn btn-link"},{default:Object(a["E"])((function(){return[l]})),_:2},1032,["to"]),Object(a["g"])(j,{to:{name:"admin-restaurant-edit",params:{id:t.id}},class:"btn btn-link"},{default:Object(a["E"])((function(){return[f]})),_:2},1032,["to"]),Object(a["g"])("button",{type:"button",class:"btn btn-link",onClick:Object(a["G"])((function(e){return s.deleteRestaurant(t.id)}),["prevent","stop"])}," Delete ",8,["onClick"])])])})),128))])]))}var O=n("1da1"),g=(n("4de4"),n("96cf"),n("2375")),m=n("be6c"),p=n("2fa3"),v={data:function(){return{restaurants:[],isLoading:!0}},components:{Spinner:g["a"]},created:function(){this.fetchRestaurants()},methods:{fetchRestaurants:function(){var t=this;return Object(O["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,t.isLoading=!0,e.next=4,m["a"].restaurants.get();case 4:n=e.sent,a=n.data,t.restaurants=a.restaurants,t.isLoading=!1,e.next=15;break;case 10:e.prev=10,e.t0=e["catch"](0),t.isLoading=!1,console.log(e.t0),p["b"].fire({icon:"error",title:"Unable to get restaurants data, please try again later."});case 15:case"end":return e.stop()}}),e,null,[[0,10]])})))()},deleteRestaurant:function(t){var e=this;return Object(O["a"])(regeneratorRuntime.mark((function n(){var a,r,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(p["a"])();case 3:if(a=n.sent,!a.isConfirmed){n.next=13;break}return n.next=7,m["a"].restaurants.delete({restaurantId:t});case 7:if(r=n.sent,c=r.data,"success"===c.status){n.next=11;break}throw new Error(c.message);case 11:e.restaurants=e.restaurants.filter((function(e){return e.id!==t})),e.$router.push({name:"admin-restaurants"});case 13:n.next=19;break;case 15:n.prev=15,n.t0=n["catch"](0),console.log(n.t0),p["b"].fire({icon:"error",title:"Unable to delete the restaurant, please try again later."});case 19:case"end":return n.stop()}}),n,null,[[0,15]])})))()}}};v.render=j;var h=v,w={components:{AdminNav:u["a"],AdminRestaurantsTable:h}};w.render=s;e["default"]=w},be6c:function(t,e,n){"use strict";n("b0c0");var a=n("2fa3");e["a"]={categories:{get:function(){return a["c"].get("/admin/categories")},create:function(t){var e=t.name;return a["c"].post("/admin/categories",{name:e})},update:function(t){var e=t.categoryId,n=t.name;return a["c"].put("/admin/categories/".concat(e),{name:n})},delete:function(t){var e=t.categoryId;return a["c"].delete("/admin/categories/".concat(e))}},restaurants:{create:function(t){var e=t.formData;return a["c"].post("/admin/restaurants",e)},get:function(){return a["c"].get("/admin/restaurants")},getDetail:function(t){var e=t.restaurantId;return a["c"].get("/admin/restaurants/".concat(e))},update:function(t){var e=t.restaurantId,n=t.formData;return a["c"].put("/admin/restaurants/".concat(e),n)},delete:function(t){var e=t.restaurantId;return a["c"].delete("/admin/restaurants/".concat(e))}},users:{get:function(){return a["c"].get("/admin/users")},update:function(t){var e=t.userId;return a["c"].put("/admin/users/".concat(e),null)}}}},e04c:function(t,e,n){"use strict";var a=n("7a23"),r={class:"mb-3"},c=Object(a["g"])("h1",null,"Admin Backend",-1),s=Object(a["f"])("Restaurants"),u=Object(a["f"])(" | "),i=Object(a["f"])("Categories"),o=Object(a["f"])(" | "),d=Object(a["f"])("Users");function b(t,e,n,b,l,f){var j=Object(a["w"])("router-link");return Object(a["p"])(),Object(a["d"])("div",r,[c,Object(a["g"])(j,{to:{name:"admin-restaurants"}},{default:Object(a["E"])((function(){return[s]})),_:1}),u,Object(a["g"])(j,{to:{name:"admin-categories"}},{default:Object(a["E"])((function(){return[i]})),_:1}),o,Object(a["g"])(j,{to:{name:"admin-users"}},{default:Object(a["E"])((function(){return[d]})),_:1})])}var l={name:"AdminNav"};l.render=b;e["a"]=l}}]);
//# sourceMappingURL=chunk-90f9d1e4.95b7c1fc.js.map