(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b9f47"],{"34c3":function(e,r,t){"use strict";t.r(r);t("b0c0");var a=t("7a23"),n={class:"container mt-5 pt-5"},s={class:"card card-body"},o=Object(a["g"])("h1",{class:"text-center mt-3"},"Register",-1),c={class:"form-group col-8 mt-3"},i=Object(a["g"])("label",{for:"name"},"Name",-1),l={class:"form-group col-8 mt-3"},u=Object(a["g"])("label",{for:"email"},"Email",-1),m={class:"form-group col-8 mt-3"},d=Object(a["g"])("label",{for:"password"},"Password",-1),p={class:"form-group col-8 mt-3"},b=Object(a["g"])("label",{for:"confirmPassword"},"Confirm Password",-1),f={class:"lead mt-4",style:{width:"300px","margin-left":"72px"}},w=Object(a["f"])(" Have An Account? "),g=Object(a["f"])("Login");function O(e,r,t,O,j,P){var h=Object(a["w"])("router-link");return Object(a["p"])(),Object(a["d"])("div",n,[Object(a["g"])("div",s,[o,Object(a["g"])("form",{action:"/users/register",method:"POST",class:"row d-flex flex-column align-items-center",onSubmit:r[5]||(r[5]=Object(a["G"])((function(){return P.handleSubmit&&P.handleSubmit.apply(P,arguments)}),["prevent","stop"]))},[Object(a["g"])("div",c,[i,Object(a["F"])(Object(a["g"])("input",{id:"name",name:"name","onUpdate:modelValue":r[1]||(r[1]=function(e){return j.name=e}),type:"text",class:"form-control",placeholder:"Enter name",autocomplete:"username",required:"",autofocus:""},null,512),[[a["B"],j.name]])]),Object(a["g"])("div",l,[u,Object(a["F"])(Object(a["g"])("input",{id:"email",name:"email","onUpdate:modelValue":r[2]||(r[2]=function(e){return j.email=e}),type:"email",class:"form-control",placeholder:"Enter email",autocomplete:"email",required:""},null,512),[[a["B"],j.email]])]),Object(a["g"])("div",m,[d,Object(a["F"])(Object(a["g"])("input",{id:"password",name:"password","onUpdate:modelValue":r[3]||(r[3]=function(e){return j.password=e}),type:"password",class:"form-control",placeholder:"Enter Password",autocomplete:"new-password",required:""},null,512),[[a["B"],j.password]])]),Object(a["g"])("div",p,[b,Object(a["F"])(Object(a["g"])("input",{id:"confirmPassword",name:"confirmPassword","onUpdate:modelValue":r[4]||(r[4]=function(e){return j.confirmPassword=e}),type:"password",class:"form-control",placeholder:"Confirm Password",autocomplete:"new-password",required:""},null,512),[[a["B"],j.confirmPassword]])]),Object(a["g"])("button",{type:"submit",class:"btn btn-primary btn-block col-6 mt-5",disabled:j.isProcessing}," Register ",8,["disabled"]),Object(a["g"])("p",f,[w,Object(a["g"])(h,{to:{name:"signin"}},{default:Object(a["E"])((function(){return[g]})),_:1})])],32)])])}var j=t("1da1"),P=(t("96cf"),t("737f")),h=t("2fa3"),v={data:function(){return{name:"",email:"",password:"",confirmPassword:"",isProcessing:!1}},methods:{handleSubmit:function(){var e=this;return Object(j["a"])(regeneratorRuntime.mark((function r(){var t,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(r.prev=0,e.name&&e.email&&e.password&&e.confirmPassword){r.next=3;break}return r.abrupt("return",h["b"].fire({icon:"warning",title:"Please fill out all fields."}));case 3:if(e.password===e.confirmPassword){r.next=5;break}return r.abrupt("return",h["b"].fire({icon:"warning",title:"Password and confirmPassword do not match."}));case 5:return e.isProcessing=!0,r.next=8,P["a"].signup({name:e.name,email:e.email,password:e.password,confirmPassword:e.confirmPassword});case 8:if(t=r.sent,a=t.data,"success"===a.status){r.next=15;break}if(e.isProcessing=!1,"error"!==a.status){r.next=14;break}return r.abrupt("return",h["b"].fire({icon:"error",title:a.message}));case 14:throw new Error(a.message);case 15:return h["b"].fire({icon:"success",title:a.message}),r.abrupt("return",e.$router.push({name:"signin"}));case 19:return r.prev=19,r.t0=r["catch"](0),e.isProcessing=!1,r.abrupt("return",h["b"].fire({icon:"warning",title:"Unable to create an account, please try again later."}));case 23:case"end":return r.stop()}}),r,null,[[0,19]])})))()}}};v.render=O;r["default"]=v}}]);
//# sourceMappingURL=chunk-2d0b9f47.8b407400.js.map