import{Q as h,a as n}from"./QBreadcrumbs.748b511b.js";import{Q as d}from"./QSeparator.bc4ab105.js";import{Q as u}from"./QCardSection.e1b33e5d.js";import{Q as m}from"./QInput.af1131ec.js";import{Q as g}from"./QDate.5fadbd5d.js";import{Q as b}from"./QPopupProxy.93b59590.js";import{_ as w,o as Q,e as V,w as s,i,f as a,h as p,t as c,l as D}from"./index.372b62db.js";import{Q as _}from"./QCard.ba25df8d.js";import{Q as y}from"./QCheckbox.56fc04bd.js";import{Q as C}from"./QCardActions.ec89f197.js";import{Q as v}from"./QForm.6350f481.js";import{Q as x}from"./QPage.df56d1c1.js";import"./use-dark.cd8e6500.js";import"./use-key-composition.13002416.js";import"./use-split-attrs.ea225c22.js";import"./uid.42677368.js";import"./focus-manager.b507780d.js";import"./use-form.951763b6.js";import"./use-cache.b0833c75.js";import"./format.3e32b8d9.js";import"./QDialog.9471a2e4.js";import"./use-prevent-scroll.43125bb0.js";import"./scroll.34254c72.js";import"./use-timeout.72e0ae7f.js";import"./focusout.d5a07f8b.js";import"./use-transition.d67f9a8c.js";import"./QMenu.f463cb0d.js";import"./selection.e182eadb.js";import"./option-sizes.11139b01.js";const S={name:"CreateCall",data(){return{loading:!1,showDialog:!1,proxyDate:"2019/03/01",formData:{title:"",is_active:!1,date_range:{from:"",to:""},date_from:"",date_to:""},rules:{required:e=>!!e||"This field is required",dateRangeFrom:e=>!e||!this.formData.date_range.to||e<=this.formData.date_range.to||"Start date must be less than end date",dateRangeTo:e=>!e||!this.formData.date_range.from||e>=this.formData.date_range.from||"End date must be greater than start date",submissionDate:e=>{const{from:t}=this.formData.date_range,{review_date:l}=this.formData;return(!t||e>t)&&(!l||e<l)||"Submission date must be greater than start date and less than review date"},reviewDate:e=>{const{submission_date:t,selection_date:l}=this.formData;return(!t||e>t)&&(!l||e<l)||"Review date must be greater than submission date and less than selection date"},selectionDate:e=>{const{review_date:t,date_range:l}=this.formData;return(!t||e>t)&&(!l.to||e<l.to)||"Selection date must be greater than review date and less than the end date"}}}},created(){},methods:{createCall(){console.log(this.formData.date_from),this.formData.date_from=new Date(this.formData.date_from).toJSON().split("T")[0],this.formData.date_to=new Date(this.formData.date_to).toJSON().split("T")[0],this.$api.post("calls/",this.formData).then(e=>{window.location="/calls",this.$utilsStore.setLoading(!1),this.showDialog=!1})},setDateRange(){this.formData.date_from=this.formData.date_range.from,this.formData.date_to=this.formData.date_range.to},cancelCreate(){this.showDialog=!1},setFormData(){this.formData={title:"",is_active:!1,date_range:{from:"",to:""},date_from:"",date_to:""}}},watch:{showPopup(e,t){this.showDialog=e},showDialog(e,t){this.$emit("showPopupChanged",e)}}},q={class:"q-ma-md"},R=i("div",{class:"text-h6"},"New Call",-1),N=i("span",{class:"text-grey text-caption"},"From : ",-1),T=i("span",{class:"text-grey text-caption"},"To : ",-1);function B(e,t,l,U,o,f){return Q(),V(x,null,{default:s(()=>[i("div",q,[a(h,null,{default:s(()=>[a(n,{icon:"home",to:"/",label:"Home"}),a(n,{icon:"campaign",to:"/calls",label:"Calls"}),a(n,{label:"Create New Call",icon:"campaign"})]),_:1})]),a(d,{spaced:"",size:"0.5px"}),a(v,{onSubmit:f.createCall,class:"q-gutter-md flex justify-center"},{default:s(()=>[a(_,{style:{width:"500px"}},{default:s(()=>[a(u,null,{default:s(()=>[R]),_:1}),a(d),a(u,{class:"q-pt-lg q-pb-md"},{default:s(()=>[a(m,{modelValue:o.formData.title,"onUpdate:modelValue":t[0]||(t[0]=r=>o.formData.title=r),label:"Title of your call",outlined:"",required:"",rules:[o.rules.required]},null,8,["modelValue","rules"]),a(_,{flat:"",bordered:"",class:"flex items-center justify-between q-pa-sm q-mt-sm"},{default:s(()=>[i("div",null,[N,p(" "+c(e.$formatDate(o.formData.date_from)),1)]),i("div",null,[T,p(" "+c(e.$formatDate(o.formData.date_to)),1)]),a(D,{icon:"event",round:"",color:"primary"},{default:s(()=>[a(b,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:s(()=>[a(g,{onRangeEnd:f.setDateRange,modelValue:o.formData.date_range,"onUpdate:modelValue":t[1]||(t[1]=r=>o.formData.date_range=r),range:""},null,8,["onRangeEnd","modelValue"])]),_:1})]),_:1})]),_:1}),a(m,{class:"q-my-sm",modelValue:o.formData.submission_date,"onUpdate:modelValue":t[2]||(t[2]=r=>o.formData.submission_date=r),type:"date",label:"Applications Submission Deadline?",outlined:""},null,8,["modelValue"]),a(m,{class:"q-my-sm",modelValue:o.formData.review_date,"onUpdate:modelValue":t[3]||(t[3]=r=>o.formData.review_date=r),type:"date",label:"Applications Review Deadline?",outlined:""},null,8,["modelValue"]),a(m,{class:"q-my-sm",modelValue:o.formData.selection_date,"onUpdate:modelValue":t[4]||(t[4]=r=>o.formData.selection_date=r),type:"date",label:"Applications Selection Deadline?",outlined:""},null,8,["modelValue"]),a(y,{modelValue:o.formData.is_active,"onUpdate:modelValue":t[5]||(t[5]=r=>o.formData.is_active=r),label:"Set this as currently active period"},null,8,["modelValue"])]),_:1}),a(d,{spaced:""}),a(C,{align:"right"},{default:s(()=>[a(D,{type:"submit",color:"primary",label:"Create"})]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})}var ne=w(S,[["render",B]]);export{ne as default};
