import{Q as d}from"./QCardSection.e1b33e5d.js";import{Q as u}from"./QSeparator.bc4ab105.js";import{Q as s}from"./QInput.af1131ec.js";import{Q as n}from"./QCheckbox.56fc04bd.js";import{_ as p,o as f,e as c,w as r,f as t,i,t as h,l as _,v as g}from"./index.372b62db.js";import{Q as D}from"./QCardActions.ec89f197.js";import{Q}from"./QCard.ba25df8d.js";import{Q as V}from"./QForm.6350f481.js";import{Q as C}from"./QPage.df56d1c1.js";import"./use-dark.cd8e6500.js";import"./use-key-composition.13002416.js";import"./use-split-attrs.ea225c22.js";import"./uid.42677368.js";import"./focus-manager.b507780d.js";import"./use-form.951763b6.js";import"./option-sizes.11139b01.js";const y={name:"UpdateCall",data(){return{loading:!1,showDialog:!1,call:null,formData:{title:""}}},created(){this.getCall()},methods:{getCall(){this.$api.get(`calls/${this.$route.params.call_id}/`).then(a=>{a.status==200&&(this.call=a.data,this.formData=a.data)})},updateCall(){this.$utilsStore.setLoading(!0),this.$api.put(`calls/${this.$route.params.call_id}/`,this.formData).then(a=>{a.status==200&&(this.call=a.data,this.$router.push("/calls/"),this.$utilsStore.setLoading(!1))})},setFormData(){this.formData={title:"Muni RIF Management System",is_active:!0,date_from:"2024-06-24T09:57:11.467359Z",date_to:"2024-06-24T09:57:11.467359Z"}}},watch:{showPopup(a,e){this.showDialog=a},showDialog(a,e){this.$emit("showPopupChanged",a)}}},b={class:"text-h6"},w=i("label",null,"Name your call",-1),S={class:"row q-col-gutter-xs q-my-sm"};function x(a,e,v,k,l,m){return l.call?(f(),c(C,{key:0,padding:""},{default:r(()=>[t(V,{onSubmit:m.updateCall,class:"q-gutter-md flex justify-center"},{default:r(()=>[t(Q,{style:{width:"500px"}},{default:r(()=>[t(d,null,{default:r(()=>[i("div",b,h(l.call.title),1)]),_:1}),t(u),t(d,{class:"q-pt-lg q-pb-md"},{default:r(()=>[w,t(s,{modelValue:l.formData.title,"onUpdate:modelValue":e[0]||(e[0]=o=>l.formData.title=o),label:"Title of your call",outlined:"",required:""},null,8,["modelValue"]),i("div",S,[t(s,{class:"col",modelValue:l.formData.date_from,"onUpdate:modelValue":e[1]||(e[1]=o=>l.formData.date_from=o),type:"date",label:"Period Starts From?",outlined:""},null,8,["modelValue"]),t(s,{class:"col",modelValue:l.formData.date_to,"onUpdate:modelValue":e[2]||(e[2]=o=>l.formData.date_to=o),type:"date",label:"Period Ends On?",outlined:""},null,8,["modelValue"])]),t(n,{modelValue:l.formData.is_active,"onUpdate:modelValue":e[3]||(e[3]=o=>l.formData.is_active=o),label:"Set as currently active period"},null,8,["modelValue"])]),_:1}),t(u,{spaced:""}),t(D,{align:"right"},{default:r(()=>[t(_,{color:"primary",label:"Update",onClick:m.updateCall},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})):g("",!0)}var R=p(y,[["render",x]]);export{R as default};