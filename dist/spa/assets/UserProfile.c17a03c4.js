import{a as p,Q}from"./QBreadcrumbs.748b511b.js";import{Q as b}from"./QSeparator.bc4ab105.js";import{_ as y,r as l,o as f,j as h,i as e,f as t,w as r,Q as q,t as o,v as C}from"./index.372b62db.js";import{Q as n}from"./QCardSection.e1b33e5d.js";import{Q as w}from"./QMarkupTable.bdafed48.js";import{Q as B}from"./QCardActions.ec89f197.js";import{Q as k}from"./QCard.ba25df8d.js";import"./use-dark.cd8e6500.js";const S={data(){return{user:null}},created(){this.getUser()},methods:{getUser(){this.user=this.$authStore.currentUser}}},U={class:"q-ma-md"},N={key:0},V={class:"text-h5 q-mt-sm q-mb-xs"},z={class:"text-overline"},D={class:"text-caption text-grey"},E={class:"text-left"},M=e("strong",null,"Faculty",-1),P={class:"text-left"},j=e("strong",null,"Department",-1),A={class:"text-left"},F=e("strong",null,"Qualification",-1),H={class:"text-right"},I={class:"row"},T={class:"col-md-6",align:"center"},G={class:"col-md-4 col-sm-6"};function J(K,L,O,R,s,W){const g=l("user-logout"),x=l("update-user"),v=l("change-password");return f(),h("div",null,[e("div",U,[t(Q,null,{default:r(()=>[t(p,{icon:"home",to:"/",label:"Home"}),t(p,{label:"My Profile",icon:"person"})]),_:1})]),t(b,{spaced:""}),s.user?(f(),h("div",N,[t(k,{class:"my-card q-ma-md",flat:"",bordered:""},{default:r(()=>[t(n,{horizontal:""},{default:r(()=>[t(n,{class:"col-3 flex flex-center"},{default:r(()=>[t(q,{name:"person",size:"xl"})]),_:1}),t(n,{class:"col q-pt-xs"},{default:r(()=>{var a;return[e("div",V,o(s.user.first_name)+" "+o(s.user.last_name),1),e("div",z,o(s.user.groups),1),e("div",D,o((a=s.user.profile)==null?void 0:a.designation),1),t(w,{flat:"",bordered:""},{default:r(()=>{var c,i,d,_,u,m;return[e("tbody",null,[e("tr",null,[e("td",E,[M,e("div",null,o((i=(c=s.user.profile)==null?void 0:c.faculty)==null?void 0:i.name),1)])]),e("tr",null,[e("td",P,[j,e("div",null,o((_=(d=s.user.profile)==null?void 0:d.department)==null?void 0:_.name),1)])]),e("tr",null,[e("td",A,[F,e("div",null,o((m=(u=s.user.profile)==null?void 0:u.qualification)==null?void 0:m.name),1)])]),e("tr",null,[e("td",H,[t(g)])])])]}),_:1})]}),_:1})]),_:1}),t(B,{align:"right"})]),_:1})])):C("",!0),e("div",I,[e("div",T,[t(x)]),e("div",G,[t(v)])])])}var re=y(S,[["render",J]]);export{re as default};