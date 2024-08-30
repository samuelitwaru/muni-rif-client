import{Q as _,a as n}from"./QBreadcrumbs.1dcd539e.js";import{Q as d}from"./QSeparator.f2419a3c.js";import{Q as p}from"./QCardSection.c5fd739f.js";import{Q as s}from"./QInput.21ead741.js";import{Q as h}from"./QDate.fb265d75.js";import{Q as g}from"./QPopupProxy.b6cf49de.js";import{_ as Q,o as V,e as w,w as l,i,f as e,h as f,t as u,l as c}from"./index.3ceec1d0.js";import{Q as D}from"./QCard.6a05c192.js";import{Q as C}from"./QCheckbox.93875e9c.js";import{Q as b}from"./QCardActions.ac72d3cf.js";import{Q as y}from"./QForm.568aa704.js";import{Q as v}from"./QPage.b16d2175.js";import"./use-dark.cdc1981a.js";import"./use-key-composition.be73f6ad.js";import"./use-split-attrs.9038d558.js";import"./uid.42677368.js";import"./focus-manager.b507780d.js";import"./use-form.6d2fe591.js";import"./use-cache.b0833c75.js";import"./format.3e32b8d9.js";import"./QDialog.ee91c4a1.js";import"./use-prevent-scroll.1aecfb27.js";import"./scroll.1f71a2f6.js";import"./use-timeout.a878214f.js";import"./focusout.b7dd7394.js";import"./use-transition.0c217553.js";import"./QMenu.e361c0a0.js";import"./selection.6ac5d2d4.js";import"./option-sizes.83fb2e02.js";const x={name:"CreateCall",data(){return{loading:!1,showDialog:!1,proxyDate:"2019/03/01",formData:{title:"",is_active:!1,date_range:{from:"",to:""},date_from:"",date_to:""}}},created(){},methods:{createCall(){this.formData.date_from=new Date(this.formData.date_from).toJSON().split("T")[0],this.formData.date_to=new Date(this.formData.date_to).toJSON().split("T")[0],this.$api.post("calls/",this.formData).then(r=>{window.location="/calls",this.$utilsStore.setLoading(!1),this.showDialog=!1})},setDateRange(){this.formData.date_from=this.formData.date_range.from,this.formData.date_to=this.formData.date_range.to},cancelCreate(){this.showDialog=!1},setFormData(){this.formData={title:"",is_active:!1,date_range:{from:"",to:""},date_from:"",date_to:""}}},watch:{showPopup(r,t){this.showDialog=r},showDialog(r,t){this.$emit("showPopupChanged",r)}}},S={class:"q-ma-md"},q=i("div",{class:"text-h6"},"New Call",-1),N=i("span",{class:"text-grey text-caption"},"From : ",-1),B=i("span",{class:"text-grey text-caption"},"To : ",-1);function U(r,t,k,P,a,m){return V(),w(v,null,{default:l(()=>[i("div",S,[e(_,null,{default:l(()=>[e(n,{icon:"home",to:"/",label:"Home"}),e(n,{icon:"campaign",to:"/calls",label:"Calls"}),e(n,{label:"Create New Call",icon:"campaign"})]),_:1})]),e(d,{spaced:"",size:"0.5px"}),e(y,{onSubmit:m.createCall,class:"q-gutter-md flex justify-center"},{default:l(()=>[e(D,{style:{width:"500px"}},{default:l(()=>[e(p,null,{default:l(()=>[q]),_:1}),e(d),e(p,{class:"q-pt-lg q-pb-md"},{default:l(()=>[e(s,{modelValue:a.formData.title,"onUpdate:modelValue":t[0]||(t[0]=o=>a.formData.title=o),label:"Title of your call",outlined:"",required:""},null,8,["modelValue"]),e(D,{flat:"",bordered:"",class:"flex items-center justify-between q-pa-sm q-mt-sm"},{default:l(()=>[i("div",null,[N,f(" "+u(r.$formatDate(a.formData.date_from)),1)]),i("div",null,[B,f(" "+u(r.$formatDate(a.formData.date_to)),1)]),e(c,{icon:"event",round:"",color:"primary"},{default:l(()=>[e(g,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(h,{onRangeEnd:m.setDateRange,modelValue:a.formData.date_range,"onUpdate:modelValue":t[1]||(t[1]=o=>a.formData.date_range=o),range:""},null,8,["onRangeEnd","modelValue"])]),_:1})]),_:1})]),_:1}),e(s,{class:"q-my-sm",modelValue:a.formData.submission_date,"onUpdate:modelValue":t[2]||(t[2]=o=>a.formData.submission_date=o),type:"date",label:"Applications Submission Deadline?",outlined:""},null,8,["modelValue"]),e(s,{class:"q-my-sm",modelValue:a.formData.review_date,"onUpdate:modelValue":t[3]||(t[3]=o=>a.formData.review_date=o),type:"date",label:"Applications Review Deadline?",outlined:""},null,8,["modelValue"]),e(s,{class:"q-my-sm",modelValue:a.formData.selection_date,"onUpdate:modelValue":t[4]||(t[4]=o=>a.formData.selection_date=o),type:"date",label:"Applications Selection Deadline?",outlined:""},null,8,["modelValue"]),e(C,{modelValue:a.formData.is_active,"onUpdate:modelValue":t[5]||(t[5]=o=>a.formData.is_active=o),label:"Set this as currently active period"},null,8,["modelValue"])]),_:1}),e(d,{spaced:""}),e(b,{align:"right"},{default:l(()=>[e(c,{color:"primary",label:"Create",onClick:m.createCall},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})}var ne=Q(x,[["render",U]]);export{ne as default};