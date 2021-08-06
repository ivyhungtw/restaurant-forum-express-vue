(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6712578e"],{2566:function(e,t,r){},"498a":function(e,t,r){"use strict";var n=r("23e7"),a=r("58a8").trim,c=r("c8d2");n({target:"String",proto:!0,forced:c("trim")},{trim:function(){return a(this)}})},5652:function(e,t,r){"use strict";r.r(t);r("b0c0");var n=r("7a23"),a=Object(n["H"])("data-v-67b3bbe3");Object(n["s"])("data-v-67b3bbe3");var c={class:"container py-5"},i={class:"my-4"},s={class:"row"},o={class:"col-auto"},u={class:"col-auto"},b={class:"table table-striped"},g=Object(n["g"])("thead",{class:"table-dark"},[Object(n["g"])("tr",null,[Object(n["g"])("th",{scope:"col",width:"60"}," # "),Object(n["g"])("th",{scope:"col"}," Category Name "),Object(n["g"])("th",{scope:"col",width:"210"}," Action ")])],-1),d={scope:"row"},l={class:"position-relative"},f={class:"d-flex justify-content-between"};Object(n["q"])();var p=a((function(e,t,r,a,p,m){var j=Object(n["w"])("spinner"),O=Object(n["w"])("AdminNav");return Object(n["p"])(),Object(n["d"])("div",c,[p.isLoading?(Object(n["p"])(),Object(n["d"])(j,{key:0})):(Object(n["p"])(),Object(n["d"])(n["a"],{key:1},[Object(n["g"])(O),Object(n["g"])("form",i,[Object(n["g"])("div",s,[Object(n["g"])("div",o,[Object(n["F"])(Object(n["g"])("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=function(e){return p.newCategoryName=e}),class:"form-control",placeholder:"Create category..."},null,512),[[n["B"],p.newCategoryName]])]),Object(n["g"])("div",u,[Object(n["g"])("button",{type:"button",class:"btn btn-primary",onClick:t[2]||(t[2]=Object(n["G"])((function(){return m.createCategory&&m.createCategory.apply(m,arguments)}),["prevent","stop"])),disabled:p.isCreating}," Create ",8,["disabled"])])])]),Object(n["g"])("table",b,[g,Object(n["g"])("tbody",null,[(Object(n["p"])(!0),Object(n["d"])(n["a"],null,Object(n["v"])(p.categories,(function(e){return Object(n["p"])(),Object(n["d"])("tr",{key:e.id},[Object(n["g"])("th",d,Object(n["y"])(e.id),1),Object(n["g"])("td",l,[Object(n["F"])(Object(n["g"])("div",{class:"category-name"},Object(n["y"])(e.name),513),[[n["C"],!e.isEditing]]),Object(n["F"])(Object(n["g"])("input",{"onUpdate:modelValue":function(t){return e.name=t},type:"text",class:"form-control"},null,8,["onUpdate:modelValue"]),[[n["C"],e.isEditing],[n["B"],e.name]]),Object(n["F"])(Object(n["g"])("span",{class:"cancel",onClick:Object(n["G"])((function(t){return m.cancel(e.id)}),["prevent","stop"])}," ✕ ",8,["onClick"]),[[n["C"],e.isEditing]])]),Object(n["g"])("td",f,[Object(n["F"])(Object(n["g"])("button",{type:"button",class:"btn btn-link mr-2",onClick:function(t){return m.toggleIsEditing(e.id)}}," Edit ",8,["onClick"]),[[n["C"],!e.isEditing]]),Object(n["F"])(Object(n["g"])("button",{type:"button",class:"btn btn-link mr-2",onClick:Object(n["G"])((function(t){return m.updateCategory({categoryId:e.id,name:e.name})}),["stop","prevent"])}," Save ",8,["onClick"]),[[n["C"],e.isEditing]]),Object(n["g"])("button",{type:"button",class:"btn btn-link mr-2",onClick:Object(n["G"])((function(t){return m.deleteCategory(e.id)}),["stop","prevent"])}," Delete ",8,["onClick"])])])})),128))])])],64))])})),m=r("5530"),j=r("1da1"),O=(r("96cf"),r("d81d"),r("498a"),r("4de4"),r("e04c")),y=r("2375"),v=r("be6c"),h=r("2fa3"),C={name:"AdminCategory",components:{AdminNav:O["a"],Spinner:y["a"]},data:function(){return{categories:[],newCategoryName:"",isCreating:!1,isLoading:!0}},created:function(){this.fetchCategories()},methods:{fetchCategories:function(){var e=this;return Object(j["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.isLoading=!0,t.next=4,v["a"].categories.get();case 4:if(r=t.sent,n=r.data,"success"===n.status){t.next=8;break}throw new Error(n.message);case 8:e.categories=n.categories.map((function(e){return Object(m["a"])(Object(m["a"])({},e),{},{isEditing:!1,nameCached:""})})),e.isLoading=!1,t.next=17;break;case 12:t.prev=12,t.t0=t["catch"](0),e.isLoading=!1,console.log(t.t0),h["b"].fire({icon:"warning",title:"Unable to get category data, please try again later."});case 17:case"end":return t.stop()}}),t,null,[[0,12]])})))()},createCategory:function(){var e=this;return Object(j["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,e.newCategoryName.trim()){t.next=3;break}return t.abrupt("return",h["b"].fire({icon:"error",title:"Category name can not be empty"}));case 3:return e.isCreating=!0,t.next=6,v["a"].categories.create({name:e.newCategoryName});case 6:if(r=t.sent,n=r.data,"success"===n.status){t.next=13;break}if(e.isCreating=!1,"error"!==n.status){t.next=12;break}return t.abrupt("return",h["b"].fire({icon:"error",title:n.message}));case 12:throw new Error(n.message);case 13:return e.categories.unshift({id:n.category.id,name:n.category.name}),e.newCategoryName="",h["b"].fire({icon:"success",title:"Create a category ".concat(n.category.name," successfully!")}),e.isCreating=!1,t.abrupt("return",null);case 20:return t.prev=20,t.t0=t["catch"](0),e.isCreating=!1,console.log(t.t0),t.abrupt("return",h["b"].fire({icon:"warning",title:"Unable to create a category, please try again later."}));case 25:case"end":return t.stop()}}),t,null,[[0,20]])})))()},deleteCategory:function(e){var t=this;return Object(j["a"])(regeneratorRuntime.mark((function r(){var n,a,c;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,Object(h["a"])();case 3:if(n=r.sent,!n.isConfirmed){r.next=15;break}return r.next=7,v["a"].categories.delete({categoryId:e});case 7:if(a=r.sent,c=a.data,"success"===c.status){r.next=13;break}if("error"!==c.status){r.next=12;break}return r.abrupt("return",h["b"].fire({icon:"error",title:c.message}));case 12:throw new Error(c.message);case 13:h["b"].fire({icon:"success",title:"Delete the category successfully!"}),t.categories=t.categories.filter((function(t){return t.id!==e}));case 15:return r.abrupt("return",null);case 18:return r.prev=18,r.t0=r["catch"](0),console.log(r.t0),r.abrupt("return",h["b"].fire({icon:"warning",title:"Unable to delete the category, please try again later."}));case 22:case"end":return r.stop()}}),r,null,[[0,18]])})))()},toggleIsEditing:function(e){this.categories=this.categories.map((function(t){return t.id===e?Object(m["a"])(Object(m["a"])({},t),{},{isEditing:!t.isEditing,nameCached:t.name}):t}))},updateCategory:function(e){var t=this;return Object(j["a"])(regeneratorRuntime.mark((function r(){var n,a,c,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(n=e.categoryId,a=e.name,r.prev=1,a.trim()){r.next=4;break}return r.abrupt("return",h["b"].fire({icon:"error",title:"Category name can not be empty"}));case 4:return r.next=6,v["a"].categories.update({categoryId:n,name:a});case 6:if(c=r.sent,i=c.data,"success"===i.status){r.next=12;break}if("error"!==i.status){r.next=11;break}return r.abrupt("return",h["b"].fire({icon:"error",title:i.message}));case 11:throw new Error(i.message);case 12:return t.toggleIsEditing(n),h["b"].fire({icon:"success",title:"Update the category to ".concat(a," successfully!")}),r.abrupt("return",null);case 17:return r.prev=17,r.t0=r["catch"](1),console.log(r.t0),r.abrupt("return",h["b"].fire({icon:"warning",title:"Unable to update the category, please try again later."}));case 21:case"end":return r.stop()}}),r,null,[[1,17]])})))()},cancel:function(e){this.categories=this.categories.map((function(t){return t.id===e?Object(m["a"])(Object(m["a"])({},t),{},{name:t.nameCached}):t})),this.toggleIsEditing(e)}}};r("e1c3");C.render=p,C.__scopeId="data-v-67b3bbe3";t["default"]=C},be6c:function(e,t,r){"use strict";r("b0c0");var n=r("2fa3");t["a"]={categories:{get:function(){return n["c"].get("/admin/categories")},create:function(e){var t=e.name;return n["c"].post("/admin/categories",{name:t})},update:function(e){var t=e.categoryId,r=e.name;return n["c"].put("/admin/categories/".concat(t),{name:r})},delete:function(e){var t=e.categoryId;return n["c"].delete("/admin/categories/".concat(t))}},restaurants:{create:function(e){var t=e.formData;return n["c"].post("/admin/restaurants",t)},get:function(){return n["c"].get("/admin/restaurants")},getDetail:function(e){var t=e.restaurantId;return n["c"].get("/admin/restaurants/".concat(t))},update:function(e){var t=e.restaurantId,r=e.formData;return n["c"].put("/admin/restaurants/".concat(t),r)},delete:function(e){var t=e.restaurantId;return n["c"].delete("/admin/restaurants/".concat(t))}},users:{get:function(){return n["c"].get("/admin/users")},update:function(e){var t=e.userId;return n["c"].put("/admin/users/".concat(t),null)}}}},c8d2:function(e,t,r){var n=r("d039"),a=r("5899"),c="​᠎";e.exports=function(e){return n((function(){return!!a[e]()||c[e]()!=c||a[e].name!==e}))}},d81d:function(e,t,r){"use strict";var n=r("23e7"),a=r("b727").map,c=r("1dde"),i=c("map");n({target:"Array",proto:!0,forced:!i},{map:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},e04c:function(e,t,r){"use strict";var n=r("7a23"),a={class:"mb-3"},c=Object(n["g"])("h1",null,"Admin Backend",-1),i=Object(n["f"])("Restaurants"),s=Object(n["f"])(" | "),o=Object(n["f"])("Categories"),u=Object(n["f"])(" | "),b=Object(n["f"])("Users");function g(e,t,r,g,d,l){var f=Object(n["w"])("router-link");return Object(n["p"])(),Object(n["d"])("div",a,[c,Object(n["g"])(f,{to:{name:"admin-restaurants"}},{default:Object(n["E"])((function(){return[i]})),_:1}),s,Object(n["g"])(f,{to:{name:"admin-categories"}},{default:Object(n["E"])((function(){return[o]})),_:1}),u,Object(n["g"])(f,{to:{name:"admin-users"}},{default:Object(n["E"])((function(){return[b]})),_:1})])}var d={name:"AdminNav"};d.render=g;t["a"]=d},e1c3:function(e,t,r){"use strict";r("2566")}}]);
//# sourceMappingURL=chunk-6712578e.60ed3ca8.js.map