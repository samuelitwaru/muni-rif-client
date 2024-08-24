import{a as p,Q as h}from"./QBreadcrumbs.c3e1ce91.js";import{Q as f}from"./QSeparator.d1f4a56a.js";import{Q as y}from"./QBtnToggle.743b4d29.js";import{Q as g}from"./QInput.d21a7e16.js";import{_ as Q,r as q,o as i,h as n,g as l,a as e,w as r,f as d,F as v,i as b,c as x,Q as S,t as V,j as w,s as P}from"./index.542c6195.js";import{Q as I,a as c}from"./QItem.419ce596.js";import{Q as k}from"./QChip.91c2f2a3.js";import{Q as E}from"./QList.39042cc1.js";import{Q as B}from"./QSpinnerIos.b3efbdd9.js";import{Q as D}from"./QInnerLoading.de485640.js";import{p as L}from"./helpers.f4954f99.js";import"./use-dark.3250c496.js";import"./QBtnGroup.6ea4cb74.js";import"./use-form.94504a9c.js";import"./use-key-composition.13c30634.js";import"./use-split-attrs.44f15fb2.js";import"./uid.42677368.js";import"./focus-manager.b507780d.js";import"./use-transition.566a6544.js";import"./auth.285be793.js";const C={name:"ProposalList",data(){return{stateData:this.$utilsStore.getStateData(),loading:!1,proposals:[],search_query:"",status_query:null}},created(){L(this.$options.name),this.status_query=this.stateData.ProposalList_status_query,this.getProposals()},methods:{getProposals(){this.loading=!0;var s={exclude__status:"EDITING"};this.search_query.length&&(s.search=this.search_query),this.status_query&&(s.status=this.status_query);var o=this.$buildURLQuery(s);this.$api.get(`proposals?${o}`).then(u=>{this.proposals=u.data,this.loading=!1})}},watch:{search_query(s){this.getProposals()},status_query(s){this.$utilsStore.setStateData("ProposalList_status_query",s)}}},T={class:"q-ma-md"},N={class:"flex justify-between items-center text-h6 q-px-sm"},$={class:"flex"},U={style:{width:"100px"}},R={key:0,align:"center",style:{"margin-top":"10rem"}},j=l("p",null,"No proposals found",-1),F=[j];function G(s,o,u,z,a,m){const _=q("router-link");return i(),n("div",null,[l("div",T,[e(h,null,{default:r(()=>[e(p,{icon:"home",to:"/",label:"Home"}),e(p,{label:"Proposals",icon:"note"})]),_:1})]),e(f,{spaced:""}),l("h2",N,[d(" Proposals "),l("div",$,[e(y,{flat:"",modelValue:a.status_query,"onUpdate:modelValue":[o[0]||(o[0]=t=>a.status_query=t),m.getProposals],"toggle-color":"primary",options:[{label:"All",value:null},{label:"Pending",value:"SUBMITTED"},{label:"Reviewed",value:"REVIEWED"},{label:"Selected",value:"SELECTED"}],class:"q-mx-sm"},null,8,["modelValue","onUpdate:modelValue"]),e(g,{dense:"",outlined:"",modelValue:a.search_query,"onUpdate:modelValue":o[1]||(o[1]=t=>a.search_query=t),type:"text",label:"Search",class:"q-mr-sm",onInput:o[2]||(o[2]=t=>m.getProposals())},null,8,["modelValue"])])]),e(E,{bordered:"",class:"q-ma-sm"},{default:r(()=>[(i(!0),n(v,null,b(a.proposals,t=>(i(),x(I,{class:"flex justify-between items-center",key:t.id},{default:r(()=>[e(c,{avatar:""},{default:r(()=>[e(S,{color:"",name:"book"})]),_:1}),e(c,null,{default:r(()=>[e(_,{to:`proposals/${t.id}`},{default:r(()=>[d(V(t.title),1)]),_:2},1032,["to"])]),_:2},1024),l("div",null,[e(w,{color:"primary",dense:"",outline:"",label:"Go To Reviews",onClick:A=>s.$router.push(`/proposals/${t.id}/reviewers`)},null,8,["onClick"])]),l("div",U,[e(k,{color:"secondary",class:"text-center",dense:"",label:t.status},null,8,["label"])])]),_:2},1024))),128))]),_:1}),e(D,{showing:a.loading},{default:r(()=>[e(B,{size:"50px",color:"primary"})]),_:1},8,["showing"]),a.proposals.length==0?(i(),n("div",R,F)):P("",!0)])}var pe=Q(C,[["render",G]]);export{pe as default};