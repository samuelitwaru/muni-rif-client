import{Q as V}from"./QDate.648cb7dc.js";import{Q as b}from"./QPopupProxy.4a29f19b.js";import{k,T,U as h,aN as x,l as _,S as N,m as n,Q as U,G as D,ag as B,B as E,_ as R,o as g,c as Q,w as o,g as r,a as l,h as P,F as j,i as A,f as p,t as u,j as S,s as F}from"./index.542c6195.js";import{Q as c}from"./QInput.d21a7e16.js";import{a as Y,u as I}from"./use-dark.3250c496.js";import{Q as q}from"./QCardSection.2e3c7736.js";import{Q as w}from"./QSeparator.d1f4a56a.js";import{Q as C}from"./QCard.afc089a4.js";import{Q as L}from"./QCheckbox.6798d8d2.js";import{Q as J}from"./QCardActions.63948365.js";import{Q as M}from"./QForm.1332b4b2.js";import{Q as O}from"./QPage.3405bde5.js";import"./use-cache.b0833c75.js";import"./use-form.94504a9c.js";import"./format.3e32b8d9.js";import"./QDialog.ccae1525.js";import"./use-prevent-scroll.f7d9b58d.js";import"./scroll.652ffd25.js";import"./use-timeout.04e0df1e.js";import"./focusout.e24870b5.js";import"./focus-manager.b507780d.js";import"./use-transition.566a6544.js";import"./QMenu.349a7bd2.js";import"./selection.8c192d65.js";import"./use-key-composition.13c30634.js";import"./use-split-attrs.44f15fb2.js";import"./uid.42677368.js";import"./option-sizes.9718bf87.js";var G=k({name:"QTimelineEntry",props:{heading:Boolean,tag:{type:String,default:"h3"},side:{type:String,default:"right",validator:e=>["left","right"].includes(e)},icon:String,avatar:String,color:String,title:String,subtitle:String,body:String},setup(e,{slots:i}){const s=T(x,h);if(s===h)return console.error("QTimelineEntry needs to be child of QTimeline"),h;const f=_(()=>`q-timeline__entry q-timeline__entry--${e.side}`+(e.icon!==void 0||e.avatar!==void 0?" q-timeline__entry--icon":"")),a=_(()=>`q-timeline__dot text-${e.color||s.color}`),m=_(()=>s.layout==="comfortable"&&s.side==="left");return()=>{const t=N(i.default,[]);if(e.body!==void 0&&t.unshift(e.body),e.heading===!0){const y=[n("div"),n("div"),n(e.tag,{class:"q-timeline__heading-title"},t)];return n("div",{class:"q-timeline__heading"},m.value===!0?y.reverse():y)}let d;e.icon!==void 0?d=[n(U,{class:"row items-center justify-center",name:e.icon})]:e.avatar!==void 0&&(d=[n("img",{class:"q-timeline__dot-img",src:e.avatar})]);const v=[n("div",{class:"q-timeline__subtitle"},[n("span",{},D(i.subtitle,[e.subtitle]))]),n("div",{class:a.value},d),n("div",{class:"q-timeline__content"},[n("h6",{class:"q-timeline__title"},D(i.title,[e.title]))].concat(t))];return n("li",{class:f.value},m.value===!0?v.reverse():v)}}}),K=k({name:"QTimeline",props:{...Y,color:{type:String,default:"primary"},side:{type:String,default:"right",validator:e=>["left","right"].includes(e)},layout:{type:String,default:"dense",validator:e=>["dense","comfortable","loose"].includes(e)}},setup(e,{slots:i}){const s=E(),f=I(e,s.proxy.$q);B(x,e);const a=_(()=>`q-timeline q-timeline--${e.layout} q-timeline--${e.layout}--${e.side}`+(f.value===!0?" q-timeline--dark":""));return()=>n("ul",{class:a.value},D(i.default))}});const z={name:"UpdateCall",data(){return{loading:!1,showDialog:!1,call:null,formData:{title:""}}},computed:{timelineDates(){if(!this.call)return[];var e=[{title:"Call Start",name:"date_from",date:this.call.date_from,description:"",icon:"campaign"},{title:"Submission",name:"submission_date",date:this.call.submission_date,description:"",icon:"description"},{title:"Review",name:"review_date",date:this.call.review_date,description:"",icon:"search"},{title:"Selection",name:"selection_date",date:this.call.selection_date,description:"",icon:"check"},{title:"Call End",name:"date_to",date:this.call.date_to,description:"",icon:"stop"}];return e}},created(){this.getCall()},methods:{getCall(){this.$api.get(`calls/${this.$route.params.call_id}/`).then(e=>{e.status==200&&(this.call=e.data,this.formData=e.data,this.formData.date_range={from:this.formData.date_from,to:this.formData.date_to})})},updateCall(){this.formData.date_from=new Date(this.formData.date_range.from).toJSON().split("T")[0],this.formData.date_to=new Date(this.formData.date_range.to).toJSON().split("T")[0],this.$utilsStore.setLoading(!0),this.$api.put(`calls/${this.$route.params.call_id}/`,this.formData).then(e=>{e.status==200&&(this.call=e.data,this.$router.push("/calls/"),this.$utilsStore.setLoading(!1))})},setDateRange(){this.formData.date_from=this.formData.date_range.from,this.formData.date_to=this.formData.date_range.to}},watch:{showPopup(e,i){this.showDialog=e},showDialog(e,i){this.$emit("showPopupChanged",e)}}},H={class:"flex q-gutter-md"},W={class:"text-h6"},X=r("span",{class:"text-grey text-caption"},"From : ",-1),Z=r("span",{class:"text-grey text-caption"},"To : ",-1);function $(e,i,s,f,a,m){return a.call?(g(),Q(O,{key:0,padding:""},{default:o(()=>[r("div",H,[l(K,{style:{width:"500px"},color:"secondary",layout:"dense"},{default:o(()=>[(g(!0),P(j,null,A(m.timelineDates,t=>(g(),Q(G,{key:t,icon:t.icon},{title:o(()=>[r("div",null,[p(u(e.$formatDate(t.date)||"Not Added!")+" ",1),l(c,{outlined:"",modelValue:a.formData[t.name],"onUpdate:modelValue":d=>a.formData[t.name]=d},{append:o(()=>[l(U,{name:"event",class:"cursor-pointer"},{default:o(()=>[l(b,{cover:"",breakpoint:1e3},{default:o(()=>[l(V,{mask:"YYYY-MM-DD",modelValue:a.formData[t.name],"onUpdate:modelValue":d=>a.formData[t.name]=d},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue"])])]),subtitle:o(()=>[p(u(t.title),1)]),default:o(()=>[r("div",null,u(t.description),1)]),_:2},1032,["icon"]))),128))]),_:1}),l(M,{onSubmit:m.updateCall,class:"q-gutter-md flex justify-center"},{default:o(()=>[l(C,{style:{width:"500px"}},{default:o(()=>[l(q,null,{default:o(()=>[r("div",W,u(a.call.title),1)]),_:1}),l(w),l(q,{class:"q-pt-lg q-pb-md"},{default:o(()=>[l(c,{modelValue:a.formData.title,"onUpdate:modelValue":i[0]||(i[0]=t=>a.formData.title=t),label:"Title of your call",outlined:"",required:""},null,8,["modelValue"]),l(C,{flat:"",bordered:"",class:"flex items-center justify-between q-pa-sm q-mt-sm"},{default:o(()=>[r("div",null,[X,p(" "+u(e.$formatDate(a.formData.date_from)),1)]),r("div",null,[Z,p(" "+u(e.$formatDate(a.formData.date_to)),1)]),l(S,{icon:"event",round:"",color:"primary"},{default:o(()=>[l(b,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:o(()=>[l(V,{onRangeEnd:m.setDateRange,modelValue:a.formData.date_range,"onUpdate:modelValue":i[1]||(i[1]=t=>a.formData.date_range=t),range:""},null,8,["onRangeEnd","modelValue"])]),_:1})]),_:1})]),_:1}),l(c,{class:"q-my-sm",modelValue:a.formData.submission_date,"onUpdate:modelValue":i[2]||(i[2]=t=>a.formData.submission_date=t),type:"date",label:"Applications Submission Deadline?",outlined:""},null,8,["modelValue"]),l(c,{class:"q-my-sm",modelValue:a.formData.review_date,"onUpdate:modelValue":i[3]||(i[3]=t=>a.formData.review_date=t),type:"date",label:"Applications Review Deadline?",outlined:""},null,8,["modelValue"]),l(c,{class:"q-my-sm",modelValue:a.formData.selection_date,"onUpdate:modelValue":i[4]||(i[4]=t=>a.formData.selection_date=t),type:"date",label:"Applications Selection Deadline?",outlined:""},null,8,["modelValue"]),l(L,{modelValue:a.formData.is_active,"onUpdate:modelValue":i[5]||(i[5]=t=>a.formData.is_active=t),label:"Set as currently active period"},null,8,["modelValue"])]),_:1}),l(w,{spaced:""}),l(J,{align:"right"},{default:o(()=>[l(S,{color:"primary",label:"Update",onClick:m.updateCall},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onSubmit"])])]),_:1})):F("",!0)}var ke=R(z,[["render",$]]);export{ke as default};
